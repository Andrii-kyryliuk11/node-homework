// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");
const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Contact = model("contact", contactSchema);

// const contactsPath = path.join(__dirname, "contacts.json");

// const getAllContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// const getContactById = async (id) => {
//   const data = await getAllContacts();
//   const result = data.find((contact) => contact.id === id);
//   return result || null;
// };

// const removeContact = async (id) => {
//   const contacts = await getAllContacts();
//   const contactToDelete = await getContactById(id);
//   if (!contactToDelete) {
//     return null;
//   }
//   const index = contacts.findIndex(
//     (contact) => contact.id === contactToDelete.id
//   );
//   contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return { message: "Contact deleted" };
// };

// const addContact = async ({ name, email, phone }) => {
//   const contacts = await getAllContacts();
//   const newContact = {
//     id: nanoid(),
//     name: name,
//     email: email,
//     phone: phone,
//   };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// const updateContact = async (id, body) => {
//   const contacts = await getAllContacts();
//   const contactToUpdate = await getContactById(id);
//   if (!contactToUpdate) {
//     return null;
//   }
//   const newContact = { ...contactToUpdate, ...body };

//   const index = contacts.findIndex(
//     (contact) => contact.id === contactToUpdate.id
//   );
//   contacts.splice(index, 1, newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

module.exports = Contact;
