# Sistema de Reservaciones - La Parada

Este proyecto es un sistema de reservaciones para el restaurante "La Parada". Permite a los usuarios gestionar las reservas a través de un CRUD funcional desarrollado con **HTML, CSS y JavaScript** en el frontend, y **Node.js con Express.js** en el backend.

## 📌 Funcionalidades

### 🖥️ Frontend
- Interfaz simple y funcional con **HTML, CSS y JavaScript**.
- Formulario para crear nuevas reservaciones.
- Listado de reservas con opción de editar o eliminar.
- Validaciones básicas en el formulario.

### 🔧 Backend
- API REST desarrollada con **Node.js y Express.js**.
- Endpoints para:
  - Crear una nueva reservación (`POST /reservas`)
  - Obtener todas las reservaciones (`GET /reservas`)
  - Obtener una reservación específica (`GET /reservas/:id`)
  - Actualizar una reservación (`PUT /reservas/:id`)
  - Eliminar una reservación (`DELETE /reservas/:id`)
- Datos almacenados en un archivo **JSON**.

## 🚀 Instalación y uso

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tuusuario/sistema-reservaciones.git
cd sistema-reservaciones
```

### 2️⃣ Configurar el backend
1. Instalar las dependencias:
   ```bash
   cd backend
   npm install
   ```
2. Configurar variables de entorno (`.env`):
   ```env
   PORT=3000
   DATA_FILE=reservas.json
   ```
3. Iniciar el servidor:
   ```bash
   npm start
   ```

### 3️⃣ Ejecutar el frontend
1. Abrir el archivo `index.html` en un navegador o servirlo con un servidor local.

## 📡 API Endpoints

| Método | Endpoint         | Descripción                 |
|--------|-----------------|-----------------------------|
| GET    | /reservas       | Obtener todas las reservas |
| GET    | /reservas/:id   | Obtener una reserva        |
| POST   | /reservas       | Crear una nueva reserva    |
| PUT    | /reservas/:id   | Actualizar una reserva     |
| DELETE | /reservas/:id   | Eliminar una reserva       |

## 🛠️ Tecnologías usadas
- **Frontend**: HTML, CSS, JavaScript.
- **Backend**: Node.js, Express.js.
- **Base de Datos**: Archivo JSON.

## 📌 Notas
- Asegúrate de que el backend esté en ejecución antes de probar el frontend.
- Se recomienda usar herramientas como **Postman** para probar los endpoints.

## 📞 Contacto
Si tienes alguna duda o sugerencia, ¡no dudes en contribuir o abrir un issue! 🚀

proyecto-la-parada/
├── backend/
│   ├── data/
│   │   └── reservations.json
│   ├── routes/
│   │   └── reservationRoutes.js
│   ├── app.js
│   └── package.json
└── frontend/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── main.js
    ├── index.html
    └── favicon.ico