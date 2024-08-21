"use strict";

// Sample data (initial contacts)
let contacts = [
    { id: 1, username: "Yazan", phone: "052-646-4234", email: "Yazan@example.com", address: "123 Main St" },
    { id: 2, username: "Saed", phone: "054-321-9664", email: "Saed@example.com", address: "456 Elm St" },
    { id: 3, username: "Anton", phone: "052-654-3210", email: "jane@example.com", address: "943 1010 St" }
];

// Function to display contacts
function displayContacts() {
    const phonebook = document.getElementById('phonebook');
    phonebook.innerHTML = '';

    contacts.forEach(contact => {
        const div = document.createElement('div');
        div.classList.add('contact');

        const idPara = document.createElement('p');
        idPara.textContent = `ID: ${contact.id}`;
        div.appendChild(idPara);

        const usernamePara = document.createElement('p');
        usernamePara.textContent = `Username: ${contact.username}`;
        div.appendChild(usernamePara);

        const phonePara = document.createElement('p');
        phonePara.textContent = `Phone: ${contact.phone}`;
        div.appendChild(phonePara);

        const emailPara = document.createElement('p');
        emailPara.textContent = `Email: ${contact.email}`;
        div.appendChild(emailPara);

        const addressPara = document.createElement('p');
        addressPara.textContent = `Address: ${contact.address}`;
        div.appendChild(addressPara);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('editBtn');
        editBtn.addEventListener('click', () => openEditModal(contact));
        div.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.addEventListener('click', () => deleteContact(contact));
        div.appendChild(deleteBtn);

        phonebook.appendChild(div);
    });
}

// Function to open Add Contact modal
function openAddModal() {
    const modal = document.getElementById('addModal');
    modal.style.display = 'block';
}

// Function to close Add Contact modal
function closeAddModal() {
    const modal = document.getElementById('addModal');
    modal.style.display = 'none';
}

// Function to generate a unique ID for new contacts
function generateUniqueId() {
    // Using current timestamp as a simple ID generator
    return Date.now();
}

function saveContact() {
    const id = generateUniqueId();
    const username = document.getElementById('addUsernameInput').value.trim();
    const phone = document.getElementById('addPhoneInput').value.trim();
    const email = document.getElementById('addEmailInput').value.trim();
    const address = document.getElementById('addAddressInput').value.trim();

    // Check if all fields are filled
    if (!username || !phone || !email || !address) {
        alert("All fields (Username, Phone, Email, Address) are required to add a contact.");
        return;
    }

    contacts.push({ id, username, phone, email, address });
    displayContacts();
    closeAddModal();

    // Clear input fields after saving
    document.getElementById('addUsernameInput').value = '';
    document.getElementById('addPhoneInput').value = '';
    document.getElementById('addEmailInput').value = '';
    document.getElementById('addAddressInput').value = '';
}

// Function to open Edit Contact modal
function openEditModal(contact) {
    const modal = document.getElementById('editModal');
    modal.style.display = 'block';

    // Fill modal fields with current contact data
    document.getElementById('editIdInput').value = contact.id;
    document.getElementById('editUsernameInput').value = contact.username;
    document.getElementById('editPhoneInput').value = contact.phone;
    document.getElementById('editEmailInput').value = contact.email;
    document.getElementById('editAddressInput').value = contact.address;

    // Save the contact object reference to use in updateContact function
    modal.contact = contact;
}

// Function to close Edit Contact modal
function closeEditModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

// Function to update contact
function updateContact() {
    const modal = document.getElementById('editModal');
    const contact = modal.contact;

    contact.username = document.getElementById('editUsernameInput').value;
    contact.phone = document.getElementById('editPhoneInput').value;
    contact.email = document.getElementById('editEmailInput').value;
    contact.address = document.getElementById('editAddressInput').value;

    displayContacts();
    closeEditModal();
}

// Function to delete a specific contact
function deleteContact(contactToDelete) {
    contacts = contacts.filter(contact => contact !== contactToDelete);
    displayContacts();
}

// Function to delete all contacts
function deleteAll() {
    contacts = [];
    displayContacts();
}

// Function to search contacts by username
function searchContacts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    const filteredContacts = contacts.filter(contact =>
        contact.username.toLowerCase().includes(searchInput)
    );

    displayFilteredContacts(filteredContacts);
}

// Function to display filtered contacts
function displayFilteredContacts(filteredContacts) {
    const phonebook = document.getElementById('phonebook');
    phonebook.innerHTML = '';

    filteredContacts.forEach(contact => {
        const div = document.createElement('div');
        div.classList.add('contact');

        const idPara = document.createElement('p');
        idPara.textContent = `ID: ${contact.id}`;
        div.appendChild(idPara);

        const usernamePara = document.createElement('p');
        usernamePara.textContent = `Username: ${contact.username}`;
        div.appendChild(usernamePara);

        const phonePara = document.createElement('p');
        phonePara.textContent = `Phone: ${contact.phone}`;
        div.appendChild(phonePara);

        const emailPara = document.createElement('p');
        emailPara.textContent = `Email: ${contact.email}`;
        div.appendChild(emailPara);

        const addressPara = document.createElement('p');
        addressPara.textContent = `Address: ${contact.address}`;
        div.appendChild(addressPara);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('editBtn');
        editBtn.addEventListener('click', () => openEditModal(contact));
        div.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.addEventListener('click', () => deleteContact(contact));
        div.appendChild(deleteBtn);

        phonebook.appendChild(div);
    });
}

// Initial display of contacts
displayContacts();
