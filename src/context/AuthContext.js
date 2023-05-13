import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // 기존 Header컴포넌트 안에서 관리하던 사용자 정보 state를 이사 시킴
  const [user, setUser] = useState();

  useEffect(() => {
    // 콜백함수가 받는 user가 어드민인지 아닌지에 따라 상태변경됨
    onUserStateChange((user) => {
      // console.log(user); // isAdmin: true
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthContext는 createContext로 새롭게 생성된 context객체이다.
// 생성된 객체인 AuthContext가 Provider을 사용해 하위 ProtectedRoute 컴포넌트로 값을 전달한다.
// 이 때, 전달된 값은 user, login, logout인데 ProtectedRoute 컴포넌트에서는 현재론 user만 사용한다.
// Provider : 컨텍스트 값을 하위 컴포넌트에 전달하기 위해 value prop을 사용해 값을 제공하는 역할
// Consumer : 해당 컨텍스트의 값을 사용하는 역할
// 하위 컴포넌트에서는 AuthContext.Consumer를 사용하여 값을 사용하게 되는데,
// useContext() 훅을 사용하면 Consumer를 사용하지 않고도 컨텍스트 값을 직접 사용할 수 있게된다.
// useContext() 훅은 createContext()함수로 생성된 컨텍스트 객체인 AuthContext를 사용하여 값을 조회한다.
// ProtectedRoute 컴포넌트에서는 useAuthContext 함수를 호출해 값을 받아 그 중 user만 구조분해할당으로 추출해 user변수에 할당해 사용한다.
