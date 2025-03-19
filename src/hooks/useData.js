import { useState, useEffect } from 'react';

// Mock data for testing
const MOCK_DATA = {
  posts: [
    {
      id: 1,
      title: 'Getting Started with React',
      body: 'React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and efficiently update the DOM when your data changes. In this post, we will explore the basics of React and how to get started with it.',
      imageUrl: 'https://via.placeholder.com/300x200?text=React'
    },
    {
      id: 2,
      title: 'Performance Optimization in React',
      body: 'Performance is crucial for providing a good user experience. React offers several ways to optimize your application, such as memoization, code splitting, and virtualization. This post covers these techniques and more.',
      imageUrl: 'https://via.placeholder.com/300x200?text=Performance'
    },
    {
      id: 3,
      title: 'State Management with Zustand',
      body: 'Zustand is a small, fast, and scalable state management solution for React. It has a simple API that makes it easy to use and understand. In this post, we will see how to use Zustand for state management in your React applications.',
      imageUrl: 'https://via.placeholder.com/300x200?text=Zustand'
    },
    {
      id: 4,
      title: 'Building Responsive UIs',
      body: 'Creating responsive user interfaces is essential for modern web applications. This post explores techniques for building responsive UIs that work well on all device sizes.',
      imageUrl: 'https://via.placeholder.com/300x200?text=Responsive'
    },
    {
      id: 5,
      title: 'Web Vitals and Performance Monitoring',
      body: 'Web Vitals are a set of metrics that help you understand the user experience of your website. This post covers how to measure and improve these metrics in your React application.',
      imageUrl: 'https://via.placeholder.com/300x200?text=WebVitals'
    }
  ]
};

export function useData(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      if (MOCK_DATA[endpoint]) {
        setData(MOCK_DATA[endpoint]);
        setIsLoading(false);
      } else {
        setError('Endpoint not found');
        setIsLoading(false);
      }
    }, 1000); // Simulate network delay

    return () => clearTimeout(timer);
  }, [endpoint]);

  const mutate = (newData) => {
    if (typeof newData === 'function') {
      setData(prev => newData(prev));
    } else {
      setData(newData);
    }
  };

  return {
    data,
    isLoading,
    isError: !!error,
    error,
    mutate
  };
} 