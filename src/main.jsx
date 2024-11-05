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
import Transaction from './pages/transaction.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
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
        path: 'transactions',
        element: <Transaction />,
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
