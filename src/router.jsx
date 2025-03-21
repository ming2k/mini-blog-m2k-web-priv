import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import RootLayout from './layouts/RootLayout';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import DashboardPosts from './pages/DashboardPosts';
import DashboardSettings from './pages/DashboardSettings';

// Lazy load components
const Post = lazy(() => import('./pages/Post'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const EditPost = lazy(() => import('./pages/EditPost'));
const NewPost = lazy(() => import('./pages/NewPost'));

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
    path: '/login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
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
      }
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