import axios from 'axios';


export const getProfile = async (token: string) => {
  const response = await axios.get('http://localhost:5000/student/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateProfile = async (token: string, data: any) => {
  const response = await axios.put('http://localhost:5000/student/me', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
