'use client'
import React from 'react';
import { deleteContact } from '@/lib/actions/delete-contact';
import { FiTrash } from 'react-icons/fi';
import toast, {Toaster} from 'react-hot-toast';
import { Button } from '@nextui-org/react';

const DeleteContact = ({ contact }) => {
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await deleteContact(contact.id); 
      toast.success('Contact deleted successfully'); 
      window.location.reload(); 
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact'); 
    
    }
  };

  return (
    <div>
          <form onSubmit={handleDelete}>
      <input type="hidden" id="id" name="id" defaultValue={contact.id} />
      <Button
      variant='light'
      type="submit">
        <FiTrash className="h-4 w-4" />
      </Button>
    </form>
    <Toaster />
    </div>
  );
};

export default DeleteContact;
