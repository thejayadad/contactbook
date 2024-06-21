'use client'
import React, { useEffect, useState, useMemo } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import { getContacts } from '@/lib/actions/get-contact';
import UpdateContact from './update-contact';
import DeleteContact from './delete-contact';
import {Popover, PopoverTrigger, PopoverContent, Button, Input} from "@nextui-org/react";
import ActionItems from './action-items';


const ContactList = ({ query }) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

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


  const handleLetterClick = async (letter) => {
    setSelectedLetter(letter);
    setPage(1); // Reset page when selecting a new letter
  };

  const clearFilter = () => {
    setSelectedLetter('');
    setFilteredContacts(contacts); // Reset filtered contacts to all contacts
    setPage(1); // Reset page when clearing filter
  };

  const pages = Math.ceil(filteredContacts.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredContacts.slice(start, end);
  }, [page, filteredContacts]);

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
        <TableBody emptyContent="No contacts to display.">
          {items.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>
                <p className='text-sm font-light tracking-tighter'>{contact.name}</p>
              </TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>
               <div className='flex justify-center items-center'>
                  <ActionItems contact={contact} />
               </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default ContactList;
