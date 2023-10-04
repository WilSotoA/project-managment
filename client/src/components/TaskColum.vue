        
<script setup>
import TaskCard from './TaskCard.vue'

defineProps({
    title: String,
    tasks: Array
})
</script>
<template>
    <div class="flex px-4 pb-8 items-start overflow-x-scroll">
        <div class="rounded bg-grey-light  flex-no-shrink w-64 p-2 mr-3">
            <div class="flex justify-between py-1">
                <h3 class="text-sm">New landing page</h3>
                <svg class="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path
                        d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
                </svg>
            </div>
            <div class="text-sm mt-2">
                <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
            </div>
            <p class="mt-3 text-grey-dark">Add a card...</p>
        </div>
    </div>
</template>