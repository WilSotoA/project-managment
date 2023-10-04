<script setup>
import axios from 'axios'
import { useAuthStore } from '../stores/auth';
import { confirmation } from '../functions';
import EditIcon from './icons/EditIcon.vue';
import DeleteIcon from './icons/DeleteIcon.vue';
import { RouterLink } from 'vue-router';
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
            <h1 class="font-bold text-xl mb-1 text-cyan-800">{{ task.title }}</h1>
            <p>{{ task.description }}</p>
            <div class="mt-2 flex" v-if="authStore.authUser === 1">
                <RouterLink :to="{ name: 'editTask', params: { id: task.id } }" class="hover:text-green-800">
                    <EditIcon />
                </RouterLink>
                <button class="hover:text-red-800" v-on:click="deleteProject(task.id, 'tarea')">
                    <DeleteIcon />
                </button>
            </div>
        </div>
    </div>
</template>
