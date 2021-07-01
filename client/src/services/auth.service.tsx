import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/auth/`;

const login = async (email: String, password: String) => axios
  .post(`${API_URL}signin`, {
    email,
    password,
  })
  .then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  });

const logout = () => {
  localStorage.removeItem('user');
};

const register = (firstname: String, lastname: String, email: String, password: String, roles: any) => axios.post(`${API_URL}signup`, {
  firstname,
  lastname,
  email,
  password,
  roles,
});

const getCurrentUser = () => JSON.parse(localStorage.getItem('user') || '{}');

const AuthService = {
  login,
  logout,
  register,
  getCurrentUser,
};

export default AuthService;
