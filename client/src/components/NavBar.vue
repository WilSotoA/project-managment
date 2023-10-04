<script setup>
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore();
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://wilsotoa.vercel.app/" target="_blank" class="flex items-center">
                <img src="https://wilsotoa.vercel.app/_next/static/media/Logo%20Wil.6cd983ac.svg" class="h-10 mr-3"
                    alt="WilSotA Logo" />
            </a>
            <div class="flex md:order-2 gap-1" v-if="!authStore.authUser">
                <RouterLink to="/"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Iniciar sesión</RouterLink>
                <RouterLink to="/register"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Registrarse</RouterLink>
            </div>
            <div class="flex md:order-2 gap-1" v-if="authStore.authUser">
                <button @click="authStore.logout"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Cerrar sesión</button>
            </div>
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                <ul
                    class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <RouterLink to="/projects"
                            class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                            aria-current="page">Proyectos</RouterLink>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>