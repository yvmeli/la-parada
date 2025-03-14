const API_URL = 'http://localhost:3000/api/reservations';

const reservationForm = document.getElementById('reservation-form');
const reservationsList = document.getElementById('reservations-list');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');
const cancelBtn = document.getElementById('cancel-btn');
const reservationIdInput = document.getElementById('reservation-id');
const notification = document.getElementById('notification');

let currentReservations = [];
let reservationToDelete = null;
let isEditing = false;

document.addEventListener('DOMContentLoaded', loadReservations);
reservationForm.addEventListener('submit', handleFormSubmit);
cancelBtn.addEventListener('click', resetForm);
searchBtn.addEventListener('click', filterReservations);
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') filterReservations();
});
confirmDeleteBtn.addEventListener('click', deleteReservation);
cancelDeleteBtn.addEventListener('click', () => {
  deleteModal.style.display = 'none';
  reservationToDelete = null;
});

async function loadReservations() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al cargar reservaciones');
    
    const data = await response.json();
    currentReservations = data;
    displayReservations(data);
  } catch (error) {
    console.error('Error:', error);
    showNotification('Error al cargar reservaciones', 'error');
  }
}

function displayReservations(reservations) {
  reservationsList.innerHTML = '';
  
  if (reservations.length === 0) {
    reservationsList.innerHTML = '<div class="no-results">No hay reservaciones disponibles.</div>';
    return;
  }
  
  const template = document.getElementById('reservation-template');
  
  reservations.forEach(reservation => {
    const reservationCard = document.importNode(template.content, true);

    reservationCard.querySelector('.reservation-card').dataset.id = reservation.id;
    reservationCard.querySelector('.reservation-name').textContent = reservation.name;
    reservationCard.querySelector('.reservation-date').textContent = formatDate(reservation.date);
    reservationCard.querySelector('.reservation-time').textContent = formatTime(reservation.time);
    reservationCard.querySelector('.reservation-guests').textContent = reservation.guests;
    reservationCard.querySelector('.reservation-phone').textContent = reservation.phone;
    reservationCard.querySelector('.reservation-email').textContent = reservation.email;
    
    if (reservation.notes) {
      reservationCard.querySelector('.reservation-notes').textContent = `Notas: ${reservation.notes}`;
    } else {
      reservationCard.querySelector('.reservation-notes').style.display = 'none';
    }

    const editBtn = reservationCard.querySelector('.btn-edit');
    const deleteBtn = reservationCard.querySelector('.btn-delete');
    
    editBtn.addEventListener('click', () => editReservation(reservation));
    deleteBtn.addEventListener('click', () => showDeleteModal(reservation.id));
    
    reservationsList.appendChild(reservationCard);
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    guests: parseInt(document.getElementById('guests').value),
    notes: document.getElementById('notes').value
  };
  
  try {
    let response;
    
    if (isEditing) {

      response = await fetch(`${API_URL}/${reservationIdInput.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Error al actualizar la reservación');
      showNotification('Reservación actualizada correctamente', 'success');
    } else {

      response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Error al crear la reservación');
      showNotification('Reservación creada correctamente', 'success');
    }
    
    resetForm();
    loadReservations();
  } catch (error) {
    console.error('Error:', error);
    showNotification('Error al procesar la reservación', 'error');
  }
}

function editReservation(reservation) {
  isEditing = true;
  cancelBtn.style.display = 'block';
  
  reservationIdInput.value = reservation.id;
  document.getElementById('name').value = reservation.name;
  document.getElementById('email').value = reservation.email;
  document.getElementById('phone').value = reservation.phone;
  document.getElementById('date').value = reservation.date;
  document.getElementById('time').value = reservation.time;
  document.getElementById('guests').value = reservation.guests;
  document.getElementById('notes').value = reservation.notes || '';

  document.querySelector('.reservation-form-container').scrollIntoView({ behavior: 'smooth' });
 
  document.querySelector('button[type="submit"]').textContent = 'Actualizar Reservación';
}

function showDeleteModal(id) {
  reservationToDelete = id;
  deleteModal.style.display = 'flex';
}

async function deleteReservation() {
  if (!reservationToDelete) return;
  
  try {
    const response = await fetch(`${API_URL}/${reservationToDelete}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) throw new Error('Error al eliminar la reservación');
    
    deleteModal.style.display = 'none';
    showNotification('Reservación eliminada correctamente', 'success');
    loadReservations();
  } catch (error) {
    console.error('Error:', error);
    showNotification('Error al eliminar la reservación', 'error');
  } finally {
    reservationToDelete = null;
  }
}

function filterReservations() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  if (!searchTerm) {
    displayReservations(currentReservations);
    return;
  }
  
  const filtered = currentReservations.filter(reservation => {
    return reservation.name.toLowerCase().includes(searchTerm) ||
           reservation.email.toLowerCase().includes(searchTerm) ||
           reservation.phone.includes(searchTerm) ||
           reservation.date.includes(searchTerm);
  });
  
  displayReservations(filtered);
}

function resetForm() {
  reservationForm.reset();
  reservationIdInput.value = '';
  isEditing = false;
  cancelBtn.style.display = 'none';
  document.querySelector('button[type="submit"]').textContent = 'Guardar Reservación';
}

function showNotification(message, type) {
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = 'block';
  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}`;
}