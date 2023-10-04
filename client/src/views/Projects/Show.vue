<script setup>
import TaskColum from '../../Components/TaskColum.vue';
import axios from 'axios';
import { ref, onMounted, nextTick } from 'vue'
import { sendRequest } from '../../functions';
import { useAuthStore } from '../../stores/auth';
import LoadingButton from '../../Components/LoadingButton.vue';
import { useRoute } from 'vue-router';
import Modal from '../../Components/Modal.vue';

const route = useRoute()
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;
let projectId
onMounted(() => {
    projectId = route.params?.projectId
    getDetailProjects()
});
const data = ref({});
const load = ref(false);
const getDetailProjects = async () => {
    await axios.get(`/projects/${projectId}`).then(
        res => {
            console.log(res);
            data.value = res.data
        })
    load.value = true;
}
const form = ref({
    'title': '',
    'description': '',
    'status': '',

})
const title = ref('')
const nameInput = ref('')
const operation = ref(1)
const id = ref('')
const close = ref([]);

const openModal = (op, title, description, status, task) => {
    clear();
    setTimeout(() => nextTick(() => nameInput.value.focus()), 600)
    operation.value = op;
    id.value = task
    if (op === 1) title.value = 'Crear Tarea';
    else {
        title.value = 'Crear Tarea'
        form.value.title = title
        form.value.description = description
        form.value.status = status
    }
}
const clear = () => {
    form.value.title = ''
    form.value.description = ''
    form.value.status = ''
}
const save = async () => {
    if (operation.value === 1) {
        const res = await sendRequest('POST', form.value, '/tasks', '');
        if (res) {
            clear();
            nextTick(() => nameInput.value.focus());
            getDetailProjects();
        }
    } else {
        const res = await sendRequest('PUT', form.value, `/tasks/${id.value}`, '');
        if (res) {
            nextTick(() => close.value.click());
            getDetailProjects();
        }
    }
}
</script>
<template>
    <div class="container mx-auto mt-6">

        <div class="w-full shadow-md p-5">
            <div class="w-full" v-if="authStore.authUser === 1">
                <button @click="openModal(1)"
                    class="flex justify-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>

            <!-- <form class="flex justify-around items-end space-x-4">
                <div class="w-1/4">
                    <label>Titulo: </label>
                    <input v-model="form.title" type="text" class="shadow-sm px-4 py-2 rounded-sm w-full" />
                </div>
                <div class="w-1/4">
                    <label>Descripción: </label>
                    <input v-model="form.description" type="text" class="shadow-sm px-4 py-2 rounded-sm w-full" />
                </div>
                <div class="w-1/4">
                    <label>Estado: </label>
                    <select v-model="form.status" class="shadow-sm px-4 py-2 rounded-sm w-full">
                        <option value="pendiente" selected>Pendiente</option>
                        <option value="en progreso">En progreso</option>
                        <option value="completada">Completada</option>
                    </select>
                </div>
                <div class="w-1/4">
                    <button type="submit" class="bg-blue-500 rounded-sm text-white px-4 py-2 w-full">Crear tarea</button>
                </div>
            </form> -->
        </div>
    </div>
    <div class="w-full flex justify-center align-items-center mt-10 mx-2 px-2">
        <TaskColum title="Pendiente" :tasks="data?.tasks?.pendiente" />
        <TaskColum title="En progreso" :tasks="data?.tasks?.en_progreso" />
        <TaskColum title="Completada" :tasks="data?.tasks?.completada" />

    </div>
    <div class="min-h-screen w-full h-full fixed top-[0] flex items-center justify-center bg-gray-500 bg-opacity-[10%]"
        v-if="!load">
        <LoadingButton />
    </div>
    <Modal :id="modal" :title="title">
        <div>
            <form @submit.prevent="save" class="flex justify-around items-end space-x-4">
                <div class="w-1/3">
                    <label>Titulo: </label>
                    <input v-model="form.title" type="text" class="shadow-sm px-4 py-2 rounded-sm w-full" />
                </div>
                <div class="w-1/3">
                    <label>Descripción: </label>
                    <input v-model="form.description" type="text" class="shadow-sm px-4 py-2 rounded-sm w-full" />
                </div>
                <div class="w-1/3">
                    <label>Estado: </label>
                    <select v-model="form.status" class="shadow-sm px-4 py-2 rounded-sm w-full">
                        <option value="pendiente" selected>Pendiente</option>
                        <option value="en progreso">En progreso</option>
                        <option value="completada">Completada</option>
                    </select>
                </div>
                <div class="w-full">
                    <button type="submit" class="bg-blue-500 rounded-sm text-white px-4 py-2 w-full">Crear tarea</button>
                </div>
                <Modal title="Actualizar tarea" modal="hola" />
            </form>
        </div>
    </Modal>
</template>
