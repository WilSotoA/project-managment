<script setup>
import { nextTick, ref } from 'vue';
import { showAlert, sendRequest } from '../../functions';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();

const form = ref({
    'title': '',
    'description': '',
    'start_date': '',
    'end_date': '',

});
const save = () => {
    sendRequest('POST', form.value, '/projects', '/projects');
    form.value.title = '';
    form.value.description = '';
    form.value.start_date = '2023-01-01';
    form.value.end_date = '2030-01-01';

}
</script>
<template>
    <form @submit.prevent="save" class="flex justify-around flex-col items-end space-x-4 w-[80%] mx-auto mt-8">
        <h2 class="w-full text-center block mb-2 text-lx font-medium text-gray-900">Crear Nuevo Proyecto</h2>
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

        <div date-rangepicker class="my-2 w-full flex items-center justify-around">
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <input v-model="form.start_date" name="start" type="date" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5">
            </div>
            <span class="mx-4 text-gray-500">a</span>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <input v-model="form.end_date" name="end" type="date" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5">
            </div>
        </div>

        <div class="w-full">
            <button type="submit" class="bg-blue-500 rounded-sm text-white px-4 py-2 w-full">Crear Proyecto</button>
        </div>
    </form>
</template>