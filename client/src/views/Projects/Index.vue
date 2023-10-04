<script setup>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '../../stores/auth';
import ProjectCard from '../../Components/ProjectCard.vue';
import LoadingButton from '../../Components/LoadingButton.vue';

const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.authToken}`;
onMounted(() => { getProjects() });
const projectsRef = ref([]);
const projects = ref([]);
const load = ref(false);
const getProjects = async () => {
    await axios.get('/projects').then(
        res => { projects.value = res.data; projectsRef.value = res.data })
    load.value = true;
}
const start_date = ref('');
const end_date = ref('');

watch([start_date, end_date], ([newStartDate, newEndDate], [oldStartDate, oldEndDate]) => {
    let filteredProjects = projects.value.filter((project) => {
        if (!newStartDate && !newEndDate) {
            return true;
        }
        if (newStartDate && newEndDate) {
            return project.start_date >= newStartDate && project.end_date <= newEndDate;
        } else if (newStartDate) {
            return project.start_date >= newStartDate;
        } else {
            return project.end_date <= newEndDate;
        }
    });
    filteredProjects.sort((a, b) => a.start_date - b.start_date);
    projects.value = filteredProjects;
});
const resetProject = () => {
    projects.value = projectsRef.value
    start_date.value = '';
    end_date.value = '';

}
</script>
<template>
    <div class="w-full shadow-md p-5">
        <div class="w-full" v-if="authStore.authUser === 1">
            <RouterLink :to="{ name: 'createProject' }"
                class="flex justify-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </RouterLink>
        </div>
    </div>
    <div class="container mx-auto">
        <div date-rangepicker class="my-2 w-full flex items-center justify-around">
            <button class="bg-blue-500 rounded-2xl p-2 text-white" v-on:click="resetProject">
                Resetear
            </button>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <input v-model="start_date" name="start" type="date" required
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
                <input v-model="end_date" name="end" type="date" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5">
            </div>
        </div>
        <div v-if="projects" class="w-full flex justify-around flex-wrap gap-2 mt-2">
            <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
        </div>
        <div class="min-h-screen w-full h-full fixed top-[0] flex items-center justify-center bg-gray-500 bg-opacity-[10%]"
            v-if="!load">
            <LoadingButton />
        </div>
    </div>
</template>