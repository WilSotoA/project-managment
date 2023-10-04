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
        async login(form) {
            await axios.post('/login', form).then(
                (res) => {
                    console.log(res);
                    this.authToken = res.data.access_token;
                    this.authUser = res.data.role;
                    this.router.push('/projects')
                }
            ).catch(
                (err) => {
                    let desc = '';
                    if (err.response?.data?.message) desc = err.response?.data?.message
                    const errorObj = err.response?.data?.errors;
                    for (let error in errorObj) {
                        errorObj[error].map(e => desc += `${e} \n`)
                    }
                    showAlert(desc, 'error', '');
                }
            );
        },
        async register(form) {
            await axios.post('/register', form).then(
                (res) => {
                    showAlert(res.data.message, 'success', '');
                    setTimeout(() => this.router.push('/'), 2000);
                }
            ).catch(
                (err) => {
                    let desc = '';
                    if (err.response?.data?.message) desc = err.response?.data?.message
                    const errorObj = err.response?.data?.errors;
                    for (let error in errorObj) {
                        errorObj[error].map(e => desc += `${e} \n`)
                    }
                    showAlert(desc, 'error', '');
                }
            );
        },
        async logout() {
            await axios.get('/logout').then(
                (res) => {
                    console.log(res);
            }).catch(
                (err) => {
                    console.error(err);
            });
            this.authToken = null;
            this.authUser = null;
            this.router.push('/');
        }
    },
    persist: true
});