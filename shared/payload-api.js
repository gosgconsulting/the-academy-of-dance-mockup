"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payloadAPI = void 0;
// Payload API client for frontend
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
class PayloadAPI {
    constructor(baseUrl = API_BASE) {
        this.baseUrl = baseUrl;
    }
    // Generic fetch method
    async fetch(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    }
    // Health check
    async health() {
        return this.fetch('/health');
    }
    // Media endpoints
    async getMedia(page = 1, limit = 10) {
        return this.fetch(`/media?page=${page}&limit=${limit}`);
    }
    async getMediaById(id) {
        return this.fetch(`/media/${id}`);
    }
    async uploadMedia(formData) {
        const response = await fetch(`${this.baseUrl}/media`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status}`);
        }
        return response.json();
    }
    // User endpoints
    async getUsers(page = 1, limit = 10) {
        return this.fetch(`/users?page=${page}&limit=${limit}`);
    }
    async getUserById(id) {
        return this.fetch(`/users/${id}`);
    }
    // Authentication endpoints
    async login(email, password) {
        return this.fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }
    async logout() {
        return this.fetch('/users/logout', {
            method: 'POST',
        });
    }
    async me() {
        return this.fetch('/users/me');
    }
}
exports.payloadAPI = new PayloadAPI();
