# Project managment system 🥇

Projecto realizado para el manejo de proyectos y tareas con autenticación, CRUD y roles de usuario

## Tecnologias utilizadas

1. Back End: [Laravel](https://laravel.com/)
2. Front End: [Vue.js](https://vuejs.org/)
3. Base de datos: [MySQL](https://www.mysql.com/)

## ¿Como empezar?

>Para empezar es importante tener instalado Node.js, PHP Composer, MySQL
1. Ingresar al proyecto project-managment en tu editor

2. Abrir dos terminales en paralelo una para el back y otra para el front. Empezaremos con el back

### Back End

1. Ejecutar los siguientes comandos en la terminal.

```bash
cd api
composer install
```

2. Luego de que se instalen las dependencias procedemos a accer las migraciones e insertar los seeders para datos de prueba-

```bash
php artisan migrate
php artisan db:seed
```

>Importante haber configurado previamente las variables de entorno para conectarse correctamente a la base de datos

3. Ya podemos iniciar nuestra api con el siguiente comando

```bash	
php artisan serve
```

### Front End

1. Ejecutar los siguientes comandos en la terminal.

```bash
cd client
npm install
```

2. Crear un archivo .env y agregar la variable de entorno

```bash
VITE_API_URL = "http://localhost:8000/api"
```

3. Ejecutamos el servidor de vite 

```bash
npm run dev
```

Y listo a disfrutarr!! 😎