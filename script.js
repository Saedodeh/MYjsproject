"use strict";

// Sample data (initial contacts)
let contacts = [
    { id: 319054995, username: "Yazan", phone: "0526464234", email: "Yazan@example.com", address: "123 Main St", photo: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 325499937, username: "Saed", phone: "0543219664", email: "Saed@example.com", address: "456 Elm St", photo: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: 321755128, username: "Anton", phone: "0526543210", email: "anton@example.com", address: "943 1010 St", photo: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 328951211, username: "Yamen", phone: "0526543210", email: "yamen@example.com", address: "663 1444 St", photo: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: 547987666, username: "Salam", phone: "0526543210", email: "salam@example.com", address: "773 9010 St", photo: 'https://randomuser.me/api/portraits/men/5.jpg' }
];

// Function to sort contacts by username
function sortContacts(contacts) {
    return contacts.sort((a, b) => a.username.localeCompare(b.username));
}

// Function to create contact element with Info button
function createContactElement(contact) {
    const div = document.createElement('div');
    div.classList.add('contact');

    // Display contact photo
    const photo = document.createElement('img');
    photo.src = contact.photo;
    photo.alt = `${contact.username}'s photo`;
    photo.classList.add('contact-photo');
    div.appendChild(photo);

    // Display username
    const usernamePara = document.createElement('p');
    usernamePara.classList.add('username');
    usernamePara.textContent = `${contact.username}`;
    div.appendChild(usernamePara);

    // Create Info Button
    const infoBtn = document.createElement('button');
    infoBtn.textContent = 'Info';
    infoBtn.classList.add('infoBtn');
    infoBtn.addEventListener('click', () => openInfoModal(contact));
    div.appendChild(infoBtn);

    // Create Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('editBtn');
    editBtn.addEventListener('click', () => openEditModal(contact));
    div.appendChild(editBtn);

    // Create Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click', () => confirmDeleteContact(contact));
    div.appendChild(deleteBtn);

    return div;
}

// Function to display contacts
function displayContacts() {
    const phonebook = document.getElementById('phonebook');
    phonebook.innerHTML = '';

    const sortedContacts = sortContacts([...contacts]);

    sortedContacts.forEach(contact => {
        const contactElement = createContactElement(contact);
        phonebook.appendChild(contactElement);
    });

    const deleteAllButton = document.getElementById('deleteAllContactsButton');
    deleteAllButton.style.display = contacts.length === 0 ? 'none' : 'block'; //0 when there is contacts
}

// Function to open Info Modal and display contact information
function openInfoModal(contact) {
    const infoModal = document.getElementById('infoModal');
    document.getElementById('infoUsername').textContent = `Username: ${contact.username}`;
    document.getElementById('infoId').textContent = `ID: ${contact.id}`;
    document.getElementById('infoPhone').textContent = `Phone: ${contact.phone}`;
    document.getElementById('infoEmail').textContent = `Email: ${contact.email}`;
    document.getElementById('infoAddress').textContent = `Address: ${contact.address}`;
    infoModal.style.display = 'block';
}

// Function to close Info Modal
function closeInfoModal() {
    const infoModal = document.getElementById('infoModal');
    infoModal.style.display = 'none'; // x button
}

// Function to open Add Contact modal
function openAddModal() {
    const modal = document.getElementById('addModal');
    modal.style.display = 'block'; // bolck=show me
}

// Function to close Add Contact modal
function closeAddModal() {
    const modal = document.getElementById('addModal');
    modal.style.display = 'none';
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

    // Save the contact object reference to use in updateContact function
    modal.contact = contact;
}

// Function to close Edit Contact modal
function closeEditModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

// Function to validate ID
function validateId(id) {
    const idRegex = /^\d{9}$/; // Must be exactly 9 digits
    return idRegex.test(id);
}

// Function to validate phone number
function validatePhoneNumber(phone) {
    const phoneRegex = /^0\d{9}$/; // Must start with 0 and be followed by exactly 9 more digits
    return phoneRegex.test(phone);
}

// Function to validate email address
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic validation for format: word@word.com
    return emailRegex.test(email);
}

// Function to save new contact
function saveContact() {
    const username = document.getElementById('addUsernameInput').value.trim();
    const phone = document.getElementById('addPhoneInput').value.trim();
    const email = document.getElementById('addEmailInput').value.trim();
    const address = document.getElementById('addAddressInput').value.trim();
    const id = document.getElementById('addIdInput').value.trim();

    if (!username || !phone || !email || !address || !id) {
        alert("All fields (ID, Username, Phone, Email, Address) are required to add a contact.");
        return;
    }

    if (!validateId(id)) {
        alert("ID must contain exactly 9 digits.");
        return;
    }

    if (!validatePhoneNumber(phone)) {
        alert("Phone number must start with 0, be exactly 10 digits long, and contain only numbers.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Email must start with a word, followed by @, another word, and end with .com.");
        return;
    }

    const existingContact = contacts.find(contact => contact.username.toLowerCase() === username.toLowerCase());
    if (existingContact) {
        alert(`The username "${username}" already exists.`);
        return;
    }

    contacts.push({ id, username, phone, email, address, photo: 'https://randomuser.me/api/portraits/men/6.jpg' }); // Added default photo
    displayContacts();
    closeAddModal();

    // Clear input fields after saving
    document.getElementById('addUsernameInput').value = '';
    document.getElementById('addPhoneInput').value = '';
    document.getElementById('addEmailInput').value = '';
    document.getElementById('addAddressInput').value = '';
    document.getElementById('addIdInput').value = '';
}

// Function to update contact information
function updateContact() {
    const modal = document.getElementById('editModal');
    const contact = modal.contact;

    const username = document.getElementById('editUsernameInput').value.trim();
    const phone = document.getElementById('editPhoneInput').value.trim();
    const email = document.getElementById('editEmailInput').value.trim();
    const id = document.getElementById('editIdInput').value.trim();

    if (!validateId(id)) {
        alert("ID must contain exactly 9 numbers.");
        return;
    }

    if (!validatePhoneNumber(phone)) {
        alert("Phone number must start with 0, be exactly 10 digits long, and contain only numbers.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Email must start with a word, followed by @, another word, and end with .com.");
        return;
    }

    contact.id = id;
    contact.username = username;
    contact.phone = phone;
    contact.email = email;

    displayContacts();
    closeEditModal();
}

// Function to confirm deletion of a specific contact
function confirmDeleteContact(contactToDelete) {
    const confirmation = confirm(`Are you sure you want to delete the contact with username "${contactToDelete.username}"?`);
    
    if (confirmation) { ///true
        deleteContact(contactToDelete);
    }
}

// Function to delete a specific contact
function deleteContact(contactToDelete) {
    contacts = contacts.filter(contact => contact !== contactToDelete);
    displayContacts();
}

// Function to confirm deletion of all contacts
function confirmDeleteAll() {
    const confirmation = confirm("Are you sure you want to delete all contacts?");
    
    if (confirmation) {
        deleteAll();
    }
}

// Function to delete all contacts
function deleteAll() {
    contacts = [];
    displayContacts();
}

// Function to search contacts by username, starting with the typed letters
function searchContacts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    // Filter contacts whose username starts with the search input
    const filteredContacts = contacts.filter(contact =>
        contact.username.toLowerCase().startsWith(searchInput)
    );

    // Display filtered contacts sorted alphabetically
    displayFilteredContacts(filteredContacts);
}

// Function to display filtered contacts
function displayFilteredContacts(filteredContacts) {
    const phonebook = document.getElementById('phonebook');
    phonebook.innerHTML = '';

    const sortedFilteredContacts = sortContacts(filteredContacts);

    sortedFilteredContacts.forEach(contact => {
        const contactElement = createContactElement(contact);
        phonebook.appendChild(contactElement);
    });

    const deleteAllButton = document.getElementById('deleteAllContactsButton');
    deleteAllButton.style.display = filteredContacts.length === 0 ? 'none' : 'block';
}

// Add event listener for the delete all contacts button
document.getElementById('deleteAllContactsButton').addEventListener('click', confirmDeleteAll);

// Add event listener for the search input
document.getElementById('searchInput').addEventListener('input', searchContacts);

// Add event listeners to close modals when clicking outside or on close button
function setupModalEvents() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const closeButton = modal.querySelector('.close');
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

setupModalEvents();

// Initial display of contacts
displayContacts();
