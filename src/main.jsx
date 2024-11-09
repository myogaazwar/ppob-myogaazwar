import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import ProtectedRoute from './middleware/ProtectedRoute.jsx';
import HomeLayout from './components/Layouts/HomeLayout.jsx';
import TopUp from './pages/TopUp.jsx';
import NotFound from './pages/NotFound.jsx';
import Transaction from './pages/Transaction.jsx';
import Account from './pages/Account.jsx';
import ProtectedLogin from './middleware/ProtectedLogin.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedLogin>
        <Login />
      </ProtectedLogin>
    ),
  },
  {
    path: '/register',
    element: (
      <ProtectedLogin>
        <Register />
      </ProtectedLogin>
    ),
  },

  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <HomeLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'top-up',
        element: <TopUp />,
      },
      {
        path: 'transaction',
        element: <Transaction />,
      },

      {
        path: 'account',
        element: <Account />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
