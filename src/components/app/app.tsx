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
//убрать
import { FullCard} from '../fullCard/fullCard'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="*" element={<h1>Страница не найдена</h1>} />
    <Route path="/login" element={<Login />} />
    <Route path="/create" element={<CreateFrom />} />
    <Route path="/voting" element={<Header />} >
        <Route path="all" element={<AllVotings />} />
        <Route path="my" element={<MyVotings />} />
        <Route path="participate" element={<PartVotings />} />
    </Route>
    
    </>)
); 

export const App = () => {
    return (
        <StrictMode>
            <RouterProvider router={router} 
            basename={process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : '/'}>
                
            </RouterProvider>
            
        </StrictMode>
    );
};


