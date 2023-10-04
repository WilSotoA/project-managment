<script setup>
import axios from 'axios';
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth';
import DeleteIcon from './icons/DeleteIcon.vue';
import EditIcon from './icons/EditIcon.vue';
import { confirmation } from '../functions';
defineProps({
    project: Object
})
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;
const deleteProject = (id, name) => {
    confirmation(name, (`/projects/${id}`), '');
}
</script>
<template>
    <div class="w-[45%] bg-white p-5 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
        <h2 class="text-xm font-bold uppercase">{{ project.title }}</h2>
        <p class="text-sm font-light">{{ project.description }}</p>
        <div class="flex w-full justify-between">
            <div class="mt-2" v-if="authStore.authUser === 1">
                <button class="w-[10px]">
                    <EditIcon />
                </button>
                <button class="w-[25px]" v-on:click="deleteProject(project.id, 'Proyecto')">
                    <DeleteIcon />
                </button>
            </div>
            <div class="justify-self-end">
                <RouterLink :to="{ name: 'projectsShow', params: { projectId: project.id } }"
                    class="px-4 py-2 bg-blue-500 text-white rounded-sm">Ver Proyecto
                </RouterLink>
            </div>
        </div>
    </div>
</template>
