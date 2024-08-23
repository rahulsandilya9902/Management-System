// script.js

// DOM elements
const form = document.getElementById('new-order-form');
const ordersTableBody = document.getElementById('ordersTableBody');
const previewSection = document.getElementById('order-preview');

let orderId = 0;
const orders = [];

// Function to add a new order
function addOrder(clientName, orderDescription, quantity, dueDate) {
    orderId++;
    const order = {
        id: orderId,
        clientName,
        orderDescription,
        quantity,
        dueDate,
        status: 'Pending'
    };
    orders.push(order);
    renderOrders();
}

// Function to render the orders
function renderOrders() {
    ordersTableBody.innerHTML = '';
    orders.forEach(order => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.clientName}</td>
            <td>${order.orderDescription}</td>
            <td>${order.quantity}</td>
            <td>${order.dueDate}</td>
            <td>${order.status}</td>
            <td class="action-buttons">
                <button onclick="completeOrder(${order.id})">Complete</button>
                <button onclick="deleteOrder(${order.id})">Delete</button>
            </td>
        `;
        ordersTableBody.appendChild(row);
    });
}

// Function to complete an order
function completeOrder(id) {
    const order = orders.find(order => order.id === id);
    if (order) {
        order.status = 'Completed';
        renderOrders();
    }
}

// Function to delete an order
function deleteOrder(id) {
    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex !== -1) {
        orders.splice(orderIndex, 1);
        renderOrders();
    }
}

// Function to update the preview
function updatePreview() {
    const clientName = document.getElementById('clientName').value;
    const orderDescription = document.getElementById('orderDescription').value;
    const quantity = document.getElementById('quantity').value;
    const dueDate = document.getElementById('dueDate').value;

    previewSection.innerHTML = `
        <h3>Order Preview</h3>
        <p><strong>Client Name:</strong> ${clientName}</p>
        <p><strong>Order Description:</strong> ${orderDescription}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Due Date:</strong> ${dueDate}</p>
    `;
}

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const clientName = document.getElementById('clientName').value;
    const orderDescription = document.getElementById('orderDescription').value;
    const quantity = document.getElementById('quantity').value;
    const dueDate = document.getElementById('dueDate').value;

    addOrder(clientName, orderDescription, quantity, dueDate);

    form.reset();
    updatePreview();
});

// Handle real-time preview updates
document.getElementById('clientName').addEventListener('input', updatePreview);
document.getElementById('orderDescription').addEventListener('input', updatePreview);
document.getElementById('quantity').addEventListener('input', updatePreview);
document.getElementById('dueDate').addEventListener('input', updatePreview);
