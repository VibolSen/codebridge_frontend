const API_URL = 'http://localhost:5000/api';

export const projectService = {
  async getProjects() {
    const res = await fetch(`${API_URL}/projects`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || 'Failed to fetch projects'); }
    return res.json();
  },

  async getProject(id) {
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || 'Failed to fetch project'); }
    return res.json();
  },

  async createProject(formData) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const res = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json' 
      },
      body: formData,
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || 'Failed to create project'); }
    return res.json();
  },

  async updateProject(id, formData) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json' 
      },
      body: formData,
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || 'Failed to update project'); }
    return res.json();
  },

  async deleteProject(id) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json' 
      },
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || 'Failed to delete project'); }
    return res.json();
  },

  async reorderProjects(orders) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const res = await fetch(`${API_URL}/admin/projects/reorder`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json' 
      },
      body: JSON.stringify({ orders }),
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || 'Failed to reorder projects'); }
    return res.json();
  }
};
