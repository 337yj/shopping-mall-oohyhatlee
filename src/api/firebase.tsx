import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { User } from "../types/common";
import { Product } from "../types/common";

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

export const login = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = () => {
  signOut(auth).catch(console.error);
};

// 사용자 상태 정보
export const onUserStateChange = (
  callback: (user: User | null) => void,
): void => {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
};

// 어드민 사용자
const adminUser = async (user: User): Promise<User> => {
  return get(ref(database, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
};

// 제품 추가하기
export const addNewProduct = async (product: Product, imageUrl: string) => {
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
export const getProducts = async (): Promise<Product[]> => {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
};

// 특정 사용자의 장바구니 읽어오기
export const getCart = async (uid: string | null): Promise<Product[]> => {
  return get(ref(database, `carts/${uid}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
};

// 장바구니 추가/ 업뎃
export const addOrUpdateToCart = async (
  uid: string | null,
  product: Product,
) => {
  return set(ref(database, `carts/${uid}/${product.id}`), product);
};

// 장바구니 삭제
export const removeFromCart = async (uid: string | null, id: string) => {
  return remove(ref(database, `carts/${uid}/${id}`));
};
