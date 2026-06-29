const API_URL = 'http://localhost:5000/api';

export const serviceService = {
  async getServices() {
    const res = await fetch(`${API_URL}/services`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async getService(id) {
    const res = await fetch(`${API_URL}/services/${id}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async createService(serviceData) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      body: JSON.stringify(serviceData),
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async updateService(id, serviceData) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      body: JSON.stringify(serviceData),
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async deleteService(id) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/services/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async importServices(services) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/services/import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      body: JSON.stringify(services),
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async reorderServices(orders) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/admin/services/reorder`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json' 
      },
      body: JSON.stringify({ orders }),
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || 'Failed to reorder services'); }
    return res.json();
  }
};
