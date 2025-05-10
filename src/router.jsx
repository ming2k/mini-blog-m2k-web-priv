import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import RootLayout from './layouts/RootLayout';
import AuthLayout from './layouts/AuthLayout';
import App from "./App";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Editor from "./pages/Editor";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";

// Lazy load components
const LazyEditPost = lazy(() => import('./pages/EditPost'));
const LazyNewPost = lazy(() => import('./pages/NewPost'));

// Loading fallback
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
    Loading...
  </div>
);

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            path: "/",
            element: <Home />
          },
          {
            path: "/posts",
            element: <Posts />
          },
          {
            path: "/editor",
            element: <Editor />
          },
          {
            path: "/settings",
            element: <Settings />
          },
          {
            path: "/account",
            element: <Account />
          },
          {
            path: "/posts/:id/edit",
            element: (
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <LazyEditPost />
                </Suspense>
              </ProtectedRoute>
            )
          },
          {
            path: "/posts/new",
            element: (
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <LazyNewPost />
                </Suspense>
              </ProtectedRoute>
            )
          }
        ]
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <Login />
          },
          {
            path: "/register",
            element: <Register />
          }
        ]
      }
    ]
  }
]); 