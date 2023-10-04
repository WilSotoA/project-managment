<script setup>
import { ref } from 'vue'
import TaskColum from '../../Components/TaskColum.vue';

let props = defineProps({
    project: Object,
    tasks: Array
})

const form = ref({
    project_id: 1,
    title: '',
    description: '',
    status: '',
})

</script>
<template>
    <Header />
    <div class="container mx-auto mt-6">

        <div class="w-full shadow-md p-5">
            <h2 class="text-xl mb-3">Crear nueva tarea</h2>
            <form @submit.prevent="createTask()" class="flex justify-around items-end space-x-4">
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
            </form>
        </div>
    </div>
    <div class="tasks__container w-full flex align-items-center mt-10 mx-2 px-2">
        <TaskColum title="Pendiente" :tasks="tasks.pendiente" />
        <TaskColum title="En progreso" :tasks="tasks.en_progreso" />
        <TaskColum title="Completada" :tasks="tasks.completada" />

    </div>
</template>
