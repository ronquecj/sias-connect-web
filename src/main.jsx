import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { Login } from './components/login/Login.jsx';
import { Signup } from './components/signup/Signup.jsx';
import { MainDashboard } from './components/main-dashboard/MainDashboard.jsx';
import { PdfViewer } from './components/PdfViewer.jsx';
import { PostIntro } from './components/postintro/PostIntro.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login/:role', element: <Login /> },
  { path: '/signup/:role', element: <Signup /> },
  { path: '/dashboard', element: <MainDashboard /> },
  { path: '/print', element: <PdfViewer /> },
  { path: '/postintro', element: <PostIntro /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
