const API_URL = 'http://localhost:5000/api';

export const teamService = {
  async getTeamMembers() {
    const res = await fetch(`${API_URL}/team-members`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async getTeamMember(id) {
    const res = await fetch(`${API_URL}/team-members/${id}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async createTeamMember(formData) {
    // formData is FormData (multipart) for image upload support
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/team-members`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      body: formData,
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async updateTeamMember(id, formData) {
    // Laravel doesn't support multipart PUT, use POST + _method override
    const token = localStorage.getItem('token');
    formData.append('_method', 'PUT');
    const res = await fetch(`${API_URL}/team-members/${id}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      body: formData,
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async deleteTeamMember(id) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/team-members/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async reorderTeamMembers(orders) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/admin/team/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      body: JSON.stringify({ orders }),
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },
};
