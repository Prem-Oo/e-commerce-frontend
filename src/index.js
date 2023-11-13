import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp'
import Cart from './components/Cart';
import CheckOut from './components/CheckOut'
import Orders from './components/Orders';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Body from './components/Body';
import Error from './components/Error';

import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';
import ManageProduct from './components/ManageProduct';
import UpdateProduct from './components/UpdateProduct';
import AddProduct from './components/AddProduct';
import AdminBody from './components/AdminBody';

const appRouter=createBrowserRouter([{
  path:'/',
  element:<App/>,
  errorElement:<Error/>,
  children:[
    {
      path:'/',
      element:<Body/>,
      errorElement:<Error/>
    },
    {
      path:'/cart',
      element:<Cart/>,
      errorElement:<Error/>
    },
    {
      path:'/checkout',
      element:<CheckOut/>,
      errorElement:<Error/>
    },
    {
      path:'/signIn',
      element:<SignIn/>,
      errorElement:<Error/>
    },
    {
      path:'/signUp',
      element:<SignUp/>,
      errorElement:<Error/>
    },
    {
      path:'/orders',
      element:<Orders/>,
      errorElement:<Error/>
    },
    {
      path:'/adminLogin',
      element:<AdminLogin/>,
      errorElement:<Error/>
    }
  ]
},
{
      path:'/admin',
      element:<Admin/>,
      errorElement:<Error/>,
      children:[
        {
          path:'/admin',
          element:<AdminBody/>
        },

        {
          path:'product',
          element:<ManageProduct/>
        },
        {
          path:'product/update/:pID',
          element:<UpdateProduct/>
        },
        {
          path:'product/add',
          element:<AddProduct/>
        },
        {
          path:'order',
          element:<><h1>Comming Soon !!!</h1></>
        },
        {
          path:'customer',
          element:<><h1>Comming Soon !!!</h1></>
        }
      ]
    }
    
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <RouterProvider router={appRouter}>
    <App />
  </RouterProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

