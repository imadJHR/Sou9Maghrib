// Authentication utility functions
export const login = (username, password) => {
    // In production, this would be an API call
    if (username === 'imadJHR12' && password === 'imadJHR12') {
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };
  
  export const logout = () => {
    localStorage.removeItem('isAuthenticated');
  };
  
  export const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };