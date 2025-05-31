import { StrictMode } from 'react';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";

import { Header } from '../../components/header/header'
import { AllVotings } from '../../pages/allVotings/allVotings'
import { MyVotings } from '../../pages/myVotings/myVotings'
import { PartVotings } from '../../pages/partVotings/partVotings'
import { CreateFrom } from '../../pages/createForm/createForm'
import { Login } from '../../pages/login/login'
import store from '../../utils/store';
import { Provider } from 'react-redux'; 
//убрать
import { FullCard} from '../fullCard/fullCard';
import {ProtectedRoute} from '../protectedRoute/protectedRoute';
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route 
      path="*" 
      element={<h1>Страница не найдена</h1>} />
    <Route 
      path="/login" 
      element={<ProtectedRoute forAuthorizedUser={false}><Login /></ProtectedRoute>} />
    <Route 
      path="/create" 
      element={<ProtectedRoute forAuthorizedUser={true}><CreateFrom /></ProtectedRoute>} />
    <Route path="/voting" element={<Header />} >
        <Route 
          path="all" 
          element={<AllVotings />} />
        <Route 
          path="my" 
          element={<ProtectedRoute forAuthorizedUser={true}><MyVotings /></ProtectedRoute>} />
        <Route 
          path="participate" 
          element={<ProtectedRoute forAuthorizedUser={true}><PartVotings /></ProtectedRoute>} />
    </Route>
    </>),
    {
      basename: process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : '/'
    }
    
); 

export const App = () => {
    return (
        <StrictMode>
          <Provider store={store}>
            <RouterProvider router={router} 
            basename={process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : '/'}>
                
            </RouterProvider>
          </Provider>

        </StrictMode>
    );
};


