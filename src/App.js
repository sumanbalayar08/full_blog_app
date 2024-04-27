import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import Home from './pages/Home';
import Single from './pages/Single';
import Write from './pages/Write';
import Navbar from '../src/Components/Navbar.js'
import Footer from '../src/Components/Footer.js'
import Reset from '../src/pages/Reset.js'
import ProtectedRoute from './Components/ProtectedRoute.js';
import PublicRoute from './Components/PublicRoute.js'
import { UserProvider } from './context/UserContext';
import { useState } from 'react';


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute><Home /></ProtectedRoute>,
      },
      {
        path: '/getpost/:id',
        element: <Single />,
      },
      {
        path: '/write',
        element: <ProtectedRoute><Write /></ProtectedRoute>,
      },
    ],
  },
  {
    path: '/register',
    element: <PublicRoute><Register /></PublicRoute>,
  },
  {
    path: '/login',
    element: <PublicRoute><Login /></PublicRoute>,
  },
  {
    path: '/reset',
    element: <PublicRoute><Reset /></PublicRoute>,
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;