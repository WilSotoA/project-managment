<script setup>
import axios from 'axios'
import { useAuthStore } from '../stores/auth';
import { confirmation } from '../functions';
import EditIcon from './icons/EditIcon.vue';
import DeleteIcon from './icons/DeleteIcon.vue';
defineProps({
    task: Object
})
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;
const deleteProject = (id, name) => {
    confirmation(name, (`/tasks/${id}`), '');
}


</script>
<template>
    <div class="shadow-sm mb-4 p-4 rounded-sm">
        <div class="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
            <h1>{{ task.title }}</h1>
            <p>{{ task.description }}</p>
            <div class="mt-2" v-if="authStore.authUser === 1">
                <button class="w-[10px]">
                    <EditIcon />
                </button>
                <button class="w-[25px]" v-on:click="deleteProject(task.id, 'tarea')">
                    <DeleteIcon />
                </button>
            </div>
        </div>
</div></template>
