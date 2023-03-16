import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user } = useAuthContext();

  // 로그인 안했거나, 어드민이 필수인데 어드민 권한 없는 사용자일 때
  if (!user || (requireAdmin && !user.isAdmin)) {
    // 잘못 들어온거니 /으로 돌아갈 때 히스토리 남기지 않게
    return <Navigate to="/" replace={true} />;
  }
  // 로그인한 사용자가 있는지 확인
  // 그 사용자가 어드민 권한이 있는지 확인
  // requireAdmin이 true인 경우에는 로그인도 되어 있어야 하고, 어드민 권한도 가지고 있어야 함
  // 조건에 맞지 않으면 / 상위 경로로 이동
  // 조건에 맞는 경우에만 전달된 children을 보여줌
  console.log(children);
  // 특정 로직을 한 컴포넌트에 머물러 있는것이 아니라 전역으로 쓰고 싶다면? context(우산)
  return <>{children}</>;
};

export default ProtectedRoute;
