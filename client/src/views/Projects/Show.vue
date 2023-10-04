<script setup>
import TaskColum from '../../Components/TaskColum.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth';
import LoadingButton from '../../Components/LoadingButton.vue';
import { RouterLink, useRoute } from 'vue-router';

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
            data.value = res.data
        })
    load.value = true;
}
</script>
<template>
    <div class="container mx-auto mt-6">

        <div class="w-full shadow-md p-5">
            <div class="w-full" v-if="authStore.authUser === 1">
                <RouterLink :to="{ name: 'createTask', params: { projectId: data?.project?.id } }"
                    class="flex justify-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </RouterLink>
            </div>
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
</template>
