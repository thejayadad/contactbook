'use client'
// components/ContactList.js
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/table';
import { getContacts } from '@/lib/actions/get-contact';

const ContactList = ({ query }) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const fetchedContacts = await getContacts(selectedLetter);
        setContacts(fetchedContacts);
        setFilteredContacts(fetchedContacts); // Initialize filtered contacts with all contacts
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setContacts([]);
        setFilteredContacts([]);
      }
    };

    fetchContacts();
  }, [selectedLetter]);

  useEffect(() => {
    // Filter contacts based on selected letter and initial query
    let filtered = contacts;
    if (selectedLetter) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
      );
    }
    if (query) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilteredContacts(filtered);
  }, [contacts, selectedLetter, query]);

  const toggleFavorite = (contactId) => {
    if (favorites.includes(contactId)) {
      setFavorites(favorites.filter(id => id !== contactId));
    } else {
      setFavorites([...favorites, contactId]);
    }
  };

  const handleLetterClick = async (letter) => {
    setSelectedLetter(letter);
  };

  const clearFilter = () => {
    setSelectedLetter('');
    setFilteredContacts(contacts); // Reset filtered contacts to all contacts
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mx-auto max-w-screen-md mb-8">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className={`px-3 py-1 rounded-md ${
              selectedLetter === letter
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 dark:hover:bg-gray-400 dark:bg-transparent hover:bg-gray-400'
            }`}
            style={{ minWidth: '2.5rem' }}
          >
            {letter.toUpperCase()}
          </button>
        ))}
        <button
          onClick={clearFilter}
          className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 dark:hover:bg-gray-400 dark:bg-transparent hover:bg-gray-400"
          style={{ minWidth: '2.5rem' }}
        >
          Clear
        </button>
      </div>
      <Table aria-label="Contact List Table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>PHONE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody emptyContent="Loading Contacts One Second">
          {filteredContacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>
                <button onClick={() => toggleFavorite(contact.id)}>
                  {favorites.includes(contact.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactList;
