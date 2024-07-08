const API_URL = 'http://localhost:5001';

const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.error('Login error:');
    throw error; // Propagate the error for handling in the UI
  }
};

const register = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }
  } catch (error) {
    console.error('Registration error:');
    throw error; // Propagate the error for handling in the UI
  }
};

const authService = {
  login,
  register,
};

export default authService;
