import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  // Fetch all contacts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contacts") // Replace with your backend URL
      .then((response) => setContacts(response.data))
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  // Fetch contact by ID
  const fetchContactById = (id) => {
    axios
      .get(`http://localhost:5000/api/contact/${id}`) // Replace with your backend URL
      .then((response) => setSelectedContact(response.data))
      .catch((error) => console.error("Error fetching contact by ID:", error));
  };

  // Delete a contact
  const deleteContact = (id) => {
    axios
      .delete(`http://localhost:5000/api/contact/${id}`) // Replace with your backend URL
      .then(() => {
        alert("Contact deleted successfully!");
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== id)
        );
        if (selectedContact?._id === id) {
          setSelectedContact(null); // Clear the selected contact if deleted
        }
      })
      .catch((error) => console.error("Error deleting contact:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Contact List</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Contact List */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => fetchContactById(contact._id)}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {contact.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {contact.phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {contact.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click triggering
                        deleteContact(contact._id);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Contact Details */}
        <div>
          {selectedContact ? (
            <div className="p-4 border border-gray-300 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">
                Details for {selectedContact.name}
              </h2>
              <p>
                <strong>Email:</strong> {selectedContact.email}
              </p>
              <p>
                <strong>Message:</strong> {selectedContact.message}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedContact.createdAt).toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              Click on a contact to view details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactList;
