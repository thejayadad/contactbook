'use client'
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { FiEdit2 } from "react-icons/fi";
import { updateContact } from '@/lib/actions/update-contact';
import toast from 'react-hot-toast';

const UpdateContact = ({ contact }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updating, setUpdating] = useState(false); // State to track update process

  const handleUpdate = async (event) => {
    event.preventDefault();
    setUpdating(true); // Set updating state to true during update process

    try {
      // Collect updated contact information from form inputs
      const updatedContact = {
        id: contact.id,
        name: event.target.name.value,
        email: event.target.email.value,
        phone: event.target.phone.value
      };

      // Call updateContact function (assuming it accepts updated contact data)
      await updateContact(updatedContact);

      // Show success toast notification
      toast.success('Contact updated successfully');

      // Close the modal and optionally refresh the page
      onClose();
      window.location.reload(); // Replace with appropriate state management if needed
    } catch (error) {
      console.error('Error updating contact:', error);
      // Show error toast notification
      toast.error('Failed to update contact');
    } finally {
      setUpdating(false); // Reset updating state
    }
  };

  return (
    <>
      <Button variant='light' onPress={onOpen}><FiEdit2 /></Button>
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Update Contact</ModalHeader>
          <ModalBody>
            <form onSubmit={handleUpdate} className='flex flex-col gap-4'>
              <input type='hidden' id='id' name='id' defaultValue={contact.id} />
              <div>
                <span>Name</span>
                <Input name='name' id='name' defaultValue={contact.name} />
              </div>
              <div>
                <span>Email</span>
                <Input name='email' id='email' type='email' defaultValue={contact.email} />
              </div>
              <div>
                <span>Phone Number</span>
                <Input name='phone' id='phone' defaultValue={contact.phone} />
              </div>
              <Button type='submit' className='w-full bg-secondary text-white'>
                {updating ? 'Updating...' : 'Update Contact'}
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateContact;
