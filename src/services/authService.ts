const API_URL = 'https://numbercomm.onrender.com';

const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if(response.status===400){
      alert("Please check your username and password");
    }

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
    if(response.status===400){
        alert("User Name already in use");
    }

    if (!response.ok) {
      throw new Error('Registration failed');

    }
  } catch (error) {
    console.error('Registration error:');
    throw error;
  }
};

const authService = {
  login,
  register,
};

export default authService;
