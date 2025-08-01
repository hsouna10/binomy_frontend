import axios from 'axios';

export const getProfile = async (token: string) => {
  const response = await axios.get('http://localhost:5000/api/students/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateProfile = async (token: string, data: any) => {
  const response = await axios.put('http://localhost:3000/api/students/me', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
