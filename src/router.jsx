import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import RootLayout from './components/RootLayout';

// Lazy load components
const Post = lazy(() => import('./pages/Post'));
const Home = lazy(() => import('./pages/Home'));

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
]); 