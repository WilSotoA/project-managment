import Swal from 'sweetalert2';
import { nextTick } from 'vue';
import { useAuthStore } from './stores/auth'
import axios from 'axios';

export function showAlert(msj, icon, focus) {
    if (!focus) nextTick(() => focus.value.focus());
    Swal.fire({
        title: msj,
        icon: icon,
        buttonsStyling: true
    })
}

export function confirmation(name, url, redirect) {
    const alert = Swal.mixin({ buttonsStyling: true });
    alert.fire({
        title: `¿Estas seguro de eliminar? ${name}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '✅ Si, Eliminar',
        cancelButtonText: '❌ Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            sendRequest('DELETE', {}, url, redirect);
        }
    });
}

export async function sendRequest(method, params, url, redirect = '') {
    const authStore = useAuthStore()
    axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;
    let res;
    await axios({ method, url, data: params }).then(
        response => {
            res = 200;
            showAlert(response.data.message, 'success', '');
            setTimeout(() => (!redirect) ? window.location.href = redirect : ''
                , 2000)
        }).catch((err) => {
        let desc = '',
            res = 400;
        const errorObj = err.response?.data?.errors;
        for (let error in errorObj) {
            errorObj[error].map(e => desc += `${e} \n`)
        }
        showAlert(desc, 'error', '');
    });
    return res;
}   