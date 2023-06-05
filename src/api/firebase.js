import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase(app);

export const login = () => {
  signInWithPopup(auth, provider).catch(console.error);
};

export const logout = () => {
  signOut(auth).catch(console.error);
};

// 사용자 상태 정보
// 사용자 로그인 정보 변경될 때마다 콜백함수 호출
export const onUserStateChange = (callback) => {
  // 어드민 사용자로부터 리턴받은 isAdmin을 추가된 사용자를 콜백에 전달해줘야됨
  // adminUser어드민 함수는 비동기 함수이니까 async 써줘야 됨
  onAuthStateChanged(auth, async (user) => {
    // user가 로그인 했다면 adminUser를 통해서 업뎃된 사용자를 받아오길 기다렸다가 updatedUser에 할당
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
};

// 어드민 사용자
// 외부에서 필요한 데이터는 아니니 export생략, 네트워크 통신을 할거니까 async
const adminUser = async (user) => {
  return get(ref(database, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      // console.log(admins);
      // 받아온 admins배열안에 user의 uid가 있는지 확인
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    // admins라는 데이터가 없는 경우, 네트워크 오류일 경우
    return user;
  });
};

// 제품 추가하기
// product : 제품 정보
export const addNewProduct = async (product, imageUrl) => {
  // 제품 고유ID => uuid
  // 고유ID 안에 제품 정보 등록
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: imageUrl,
    options: product.options.split(","),
  });
};

// 제품 정보 가져오기
export const getProducts = async () => {
  return get(ref(database, "products")).then((snapshot) => {
    // snapshot은 key-value의 객체 형태라, 지금은 값만 필요하니까 values를 씀
    if (snapshot.exists()) {
      // console.log(snapshot);
      // console.log(snapshot.val());
      return Object.values(snapshot.val());
    }
    // snapshot없다면 빈배열 반환
    return [];
  });
};

// 특정 사용자의 장바구니 읽어오기
export const getCart = async (userId) => {
  // ref로 가지고 오고자하는 데이터를 명시해줌
  // 사용자의 아이디별로 장바구니 보관해줄거임
  return get(ref(database, `carts/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};

    return Object.values(items);
  });
};

// 장바구니 추가/ 업뎃
// 제품아이디, 가격, 추가수량...
export const addOrUpdateToCart = async (userId, product) => {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
};

// 장바구니 삭제
export const removeFromCart = async (userId, productId) => {
  return remove(ref(database, `carts/${userId}/${productId}`));
};
