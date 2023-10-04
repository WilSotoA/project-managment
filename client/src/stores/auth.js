import axios from 'axios';
import { defineStore } from 'pinia';
import { showAlert } from '../functions';

export const useAuthStore = defineStore('auth', {
    state: () => ({ authUser: null, authToken: null }),
    getters: {
        user: (state) => state.authUser,
        token: (state) => state.authToken
    },
    actions: {
        async getToken() {
            await axios.get('/sanctum/csrf-cookie');
        },
        async login(form) {
            await this.getToken();
            await axios.post('/api/login', form).then(
                (res) => {
                    this.authToken = res.data.access_token;
                    this.authUser = res.data.role;
                    this.router.push('/projects')
                }
            ).catch(
                (err) => {
                    let desc = '';
                    err.response.data.errors.map(
                        (e) => { desc = `${desc} ${e}` }
                    )
                    showAlert(desc, 'error', '');
                }
            );
        },
        async register(form) {
            await this.getToken();
            await axios.post('/api/register', form).then(
                (res) => {
                    showAlert(res.data.message, 'success', '');
                    setTimeout(() => this.router.push('/login'), 2000);
                }
            ).catch(
                (err) => {
                    let desc = '';
                    err.response.data.errors.map(
                        (e) => { desc = `${desc} ${e}` }
                    )
                    showAlert(desc, 'error', '');
                }
            );
        },
        async logout() {
            await axios.get('api/logout');
            this.authToken = null;
            this.authUser = null;
            this.router.push('/login');
        }
    },
    persist: true
});