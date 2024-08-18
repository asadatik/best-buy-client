import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root/Root';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import SignUp from './pages/Authentication/SignUp';
import AuthProvider from './pages/Provider/AuthProvider';
import Login from './pages/Authentication/Login';
import Home from './pages/Home/Home';
import { HelmetProvider } from 'react-helmet-async';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element:<Home></Home> ,
       
      },
    
       
    
      {
        path: "/joinUs",
        element: <SignUp></SignUp>
      },
      {
        path: "/login",
        element: <Login></Login>
      }, 

     
    ]


  },
]);




createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
    <HelmetProvider>
      <RouterProvider router={router} />
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>,
)
