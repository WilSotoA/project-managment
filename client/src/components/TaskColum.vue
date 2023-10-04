        
<script setup>
import TaskCard from './TaskCard.vue'

defineProps({
    title: String,
    tasks: Array
})
</script>
<template>
    <div class="flex px-4 pb-8 items-start overflow-x-scroll border border-cyan-800 bg-slate-400 bg-opacity-20">
        <div class="rounded bg-grey-light  flex-no-shrink w-64 p-2 mr-3">
            <div class="flex justify-between py-1">
                <h3 class="text-sm font-bold">{{ title }}</h3>
            </div>
            <div class="text-sm mt-2">
                <div class="text-sm mt-2">
                    <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
                </div>
            </div>
    </div>
</div></template>