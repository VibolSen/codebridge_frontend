const API_URL = 'http://localhost:5000/api';

export const userService = {
  async getUsers() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async deleteUser(id) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },
};
