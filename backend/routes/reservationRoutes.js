const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const reservationsFile = path.join(__dirname, '../data/reservations.json');

const getReservations = () => {
  const data = fs.readFileSync(reservationsFile);
  return JSON.parse(data);
};

const saveReservations = (reservations) => {
  fs.writeFileSync(reservationsFile, JSON.stringify(reservations, null, 2));
};

// CREATE - Crear nueva reservación
router.post('/', (req, res) => {
  try {
    const reservations = getReservations();
    const newReservation = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    reservations.push(newReservation);
    saveReservations(reservations);
    
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la reservación' });
  }
});

// READ - Obtener todas las reservaciones
router.get('/', (req, res) => {
  try {
    const reservations = getReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reservaciones' });
  }
});

// READ - Obtener una reservación específica
router.get('/:id', (req, res) => {
  try {
    const reservations = getReservations();
    const reservation = reservations.find(r => r.id === req.params.id);
    
    if (!reservation) {
      return res.status(404).json({ error: 'Reservación no encontrada' });
    }
    
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la reservación' });
  }
});

// UPDATE - Actualizar una reservación
router.put('/:id', (req, res) => {
  try {
    let reservations = getReservations();
    const index = reservations.findIndex(r => r.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Reservación no encontrada' });
    }
    
    reservations[index] = {
      ...reservations[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    saveReservations(reservations);
    res.json(reservations[index]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la reservación' });
  }
});

// DELETE - Eliminar una reservación
router.delete('/:id', (req, res) => {
  try {
    let reservations = getReservations();
    const filteredReservations = reservations.filter(r => r.id !== req.params.id);
    
    if (filteredReservations.length === reservations.length) {
      return res.status(404).json({ error: 'Reservación no encontrada' });
    }
    
    saveReservations(filteredReservations);
    res.json({ message: 'Reservación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la reservación' });
  }
});

module.exports = router;