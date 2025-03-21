import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import RootLayout from './layouts/RootLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import DashboardPosts from './pages/DashboardPosts';
import DashboardSettings from './pages/DashboardSettings';

// Lazy load components - remove .jsx extensions
const Post = lazy(() => import('./pages/Post'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login.jsx'));
const EditPost = lazy(() => import('./pages/EditPost'));
const NewPost = lazy(() => import('./pages/NewPost'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DashboardEditor = lazy(() => import('./pages/DashboardEditor.jsx'));

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
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/post/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Post />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Register />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'posts',
        element: <DashboardPosts />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'settings',
        element: <DashboardSettings />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'editor',
        element: <DashboardEditor />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'editor/:id',
        element: <DashboardEditor />,
        errorElement: <ErrorBoundary />
      },
    ]
  },
  {
    path: '/dashboard/edit/:id',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <EditPost />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/new',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <NewPost />
        </Suspense>
      </ProtectedRoute>
    ),
  },
]); 