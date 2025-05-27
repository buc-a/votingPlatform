import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../utils/store';
import { getUserSelector } from '../../slices/userSlice'
type ProtectedRouteProps = {
  children: React.ReactElement;
  forAuthorizedUser: boolean
};

export const ProtectedRoute = ({ children, forAuthorizedUser }: ProtectedRouteProps) => {
  const isAuthorized = useSelector(getUserSelector).isAuthorized;

  const location = useLocation();
  const from = location.state?.from || '/';
  if (isAuthorized && !forAuthorizedUser){
    return <Navigate to={from} />;
  }
  if (forAuthorizedUser && !isAuthorized){
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;

}