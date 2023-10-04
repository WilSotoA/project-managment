<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { sendRequest } from '../../functions';
import { useAuthStore } from '../../stores/auth';
import { useRoute } from 'vue-router';

const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;

const route = useRoute()
const { id } = route.params
const form = ref({
    'title': '',
    'description': '',
    'status': ''
});

onMounted(() => { getDetailTask() });
const getDetailTask = async () => {
    await axios.get(`/tasks/${id}`).then(
        res => { 
            form.value.title = res.data.title
            form.value.description = res.data.description
            form.value.status = res.data.status
        })
}


const save = () => {
    sendRequest('PUT', form.value, `/tasks/${id}`, `/projects/${id}`);
    form.value.title = '';
    form.value.description = '';
    form.value.status = '';

}
</script>
<template>
    <form @submit.prevent="save" class="flex justify-around flex-col items-end space-x-4 w-[80%] mx-auto mt-8">
        <h2 class="w-full text-center block mb-2 text-lx font-medium text-gray-900">Actualizar Tarea</h2>
        <div class="w-full mb-6">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900">
                Titulo: </label>
            <input v-model="form.title" type="title" id="title"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="title" required>
        </div>
        <div class="w-full">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900">
                Descripción: </label>
            <textarea v-model="form.description" id="description" rows="4"
                class="max-h-[100px] block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Descripción..." required></textarea>
        </div>
        <div class="w-full">
            <label>Estado: </label>
            <select v-model="form.status" class="shadow-sm mb-2 px-4 py-2 rounded-sm w-full">
                <option value="pendiente" selected>Pendiente</option>
                <option value="en progreso">En progreso</option>
                <option value="completada">Completada</option>
            </select>
        </div>
        <div class="w-full">
            <button type="submit" class="bg-blue-500 rounded-sm text-white px-4 py-2 w-full">Editar tarea</button>
        </div>
    </form>
</template>