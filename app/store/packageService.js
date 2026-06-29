const API_URL = 'http://localhost:5000/api';

export const packageService = {
  async getPackages() {
    const res = await fetch(`${API_URL}/packages`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async getPackage(id) {
    const res = await fetch(`${API_URL}/packages/${id}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async createPackage(packageData) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/packages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      body: JSON.stringify(packageData),
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async updatePackage(id, packageData) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/packages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      body: JSON.stringify(packageData),
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async deletePackage(id) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/packages/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async reorderPackages(orders) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/admin/packages/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      body: JSON.stringify({ orders }),
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },
};
