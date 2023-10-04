import Swal from 'sweetalert2';
import { nextTick } from 'vue';

export function showAlert(msj, icon, focus) {
    if (!focus) nextTick(() => focus.value.focus());
    Swal.fire({
        title: msj,
        icon: icon,
        buttonsStyling: true
    })
}

export function confirmation(name, url, redirect){
    const alert = Swal.mixin({buttonsStyling:true});
    alert.fire({
        title: `¿Estas seguro de eliminar? ${name}`,
        icon:'question',
        showCancelButton: true,
        confirmButtonText: '✅ Si, Eliminar',
        cancelButtonText: '❌ Cancelar',
    }).then((result) => {
        if (result.isConfirmed){
            //send
        }
    });
}

export async function sendRequest(method, params, url, redirect=''){

}