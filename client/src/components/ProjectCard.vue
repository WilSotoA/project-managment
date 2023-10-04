<script setup>
import { RouterLink } from 'vue-router'

defineProps({
    project: Object
})
</script>
<template>
    <div class="w-[45%] bg-white p-5 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
        <h2 class="text-xm font-bold uppercase">{{ project.title }}</h2>
        <p class="text-sm font-light">{{ project.description }}</p>
        <div class="flex justify-end">
            <RouterLink :to="`/projects/${project.id}`" class="px-4 py-2 bg-blue-500 text-white rounded-sm">View Project
            </RouterLink>
        </div>
    </div>
</template>
