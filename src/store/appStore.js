import { create } from 'zustand';

const useAppStore = create((set) => ({
  // App state
  isLoading: false,
  data: [],
  error: null,
  
  // Actions
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      set({ data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  updateItem: (id, updates) => {
    set((state) => ({
      data: state.data.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    }));
  }
}));

export default useAppStore; 