<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth';
import ProjectCard from '../../Components/ProjectCard.vue';
import LoadingButton from '../../Components/LoadingButton.vue';

const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;
onMounted(()=>{ getProjects()});
const projects = ref([]);
const load = ref(false);
const getProjects = async () => {
    await axios.get('/projects').then(
    res => {projects.value = res.data})
    load.value = true;
}
</script>
<template>
    <div class="w-[80%] mx-auto mt-2" v-if="authStore.authUser === 1">
                <button @click="openModal(1)"
                    class="flex justify-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
    <div class="container mx-auto">
        <div v-if="projects" class="w-full flex justify-around flex-wrap gap-2 mt-2">
            <ProjectCard v-for="project in projects" :key="project.id" :project="project"/>
        </div>
        <div class="min-h-screen w-full h-full fixed top-[0] flex items-center justify-center bg-gray-500 bg-opacity-[10%]" v-if="!load">
            <LoadingButton/>
        </div>
    </div>
</template>