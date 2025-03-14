const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Crear aplicación Express
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Asegurar que existe el archivo de datos
const dataFolder = path.join(__dirname, 'data');
const reservationsFile = path.join(dataFolder, 'reservations.json');

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
}

if (!fs.existsSync(reservationsFile)) {
  fs.writeFileSync(reservationsFile, JSON.stringify([], null, 2));
}

// Configurar para servir archivos estáticos desde la carpeta frontend
// Aquí ajustamos la ruta para que apunte a la carpeta frontend que está un nivel arriba
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas para CRUD de reservaciones
const reservationRoutes = require('./routes/reservationRoutes');
app.use('/api/reservations', reservationRoutes);

// Para cualquier otra ruta, servir el index.html del frontend
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});