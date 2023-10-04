<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { confirmation } from '../../functions';
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

const deleteProject = (id, name) => {
    confirmation(name, (`/projects/${id}`), '/projects');
}
</script>
<template>
    <div class="container mx-auto">
        <div v-if="projects" class="w-full flex justify-around flex-wrap gap-2 mt-10">
            <ProjectCard v-for="project in projects" :key="project.id" :project="project"/>
        </div>
        <div class="min-h-screen w-full h-full fixed top-[0] flex items-center justify-center bg-gray-500 bg-opacity-[10%]" v-if="!load">
            <LoadingButton/>
        </div>
    </div>
</template>