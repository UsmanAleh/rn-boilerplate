const mockEncryptedStorage = {
    getItem: async (key) => {
      // Mock implementation for web
      return localStorage.getItem(key);
    },
    removeItem: async (key) => {
      // Mock implementation for web
      localStorage.removeItem(key);
    },
    setItem: async (key, value) => {
      // Mock implementation for web
      localStorage.setItem(key, value);
    },
  };
  
  export default mockEncryptedStorage;