const API_URL = 'http://localhost:5000/api';

export const authService = {
  async register(name, email, password, password_confirmation) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, password, password_confirmation }),
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.error || 'Login failed'); }
    return res.json();
  },

  async verifyOTP(email, otp) {
    const res = await fetch(`${API_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.error || 'Verification failed'); }
    return res.json();
  },

  async resendOTP(email) {
    const res = await fetch(`${API_URL}/auth/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.error || 'Failed to resend code'); }
    return res.json();
  },

  async logout() {
    const token = localStorage.getItem('token');
    if (!token) return;
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  async updateProfile(formData) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      body: formData,
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async updatePassword(current_password, new_password) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/auth/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      body: JSON.stringify({ current_password, new_password }),
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  async createProject(projectData) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      body: JSON.stringify(projectData),
    });
    if (!res.ok) { const error = await res.json(); throw new Error(error.message || JSON.stringify(error)); }
    return res.json();
  },

  setSession(token, user) {
    if (token) localStorage.setItem('token', token);
    if (user) localStorage.setItem('user', JSON.stringify(user));
  },

  getSession() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    
    // Handle the case where userStr might be the string "undefined" or null
    if (!userStr || userStr === 'undefined') {
      return { token, user: null };
    }

    try {
      return { token, user: JSON.parse(userStr) };
    } catch (e) {
      console.error("Error parsing user session:", e);
      return { token, user: null };
    }
  },

  getAuthHeader() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
};
