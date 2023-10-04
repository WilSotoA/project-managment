<script setup>
import { ref } from 'vue'
let props = defineProps({
    task: Object
})
let isEditing = ref(false)
const form = ref({ title: '', description: '', status: '' });
</script>
<template>
    <div class="shadow-sm mb-4 p-4 rounded-sm" @dblclick="isEditing = !isEditing">
        <div v-if="isEditing">
            <form>
                <input v-model="form.title" type="text" class="border" />
                <textarea class="mt-2 p-2 max-h-20" v-model="form.description" cols="30" rows="2">
                </textarea>
                <select v-model="form.status" class="shadow-sm px-4 py-2 rounded-sm w-full">
                    <option value="pendiente" selected>Pendiente</option>
                    <option value="en progreso">En progreso</option>
                    <option value="completada">Completada</option>
                </select>
                <div class="w-full mt-2">
                    <button type="submit" class="bg-blue-500 rounded-sm text-white px-4 py-2 w-full">Actualizar
                        tarea</button>
                </div>
            </form>
        </div>
        <div v-else class="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
            <h1>{{ task.title }}</h1>
            <p>{{ task.description }}</p>
        </div>
    </div>
</template>
