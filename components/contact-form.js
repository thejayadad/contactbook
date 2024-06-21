'use client'
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Input } from '@nextui-org/react';
import { addContact } from '@/lib/actions/add-contact';
import { Toaster, toast } from 'react-hot-toast';
import ContactNumberInput from './contact-number';

const ContactForm = () => {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await addContact(data); // Assuming addContact makes an API call to add contact

      // Reset form after successful submission
      toast.success('Contact added successfully!', { icon: '🎉' });
      reset(); // Reset the form fields
      window.location.reload()
    } catch (error) {
      toast.error('Failed to add contact. Please try again later.', { icon: '❌' });
    }
  };

  // Prevent form submission on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' onKeyPress={handleKeyPress}>
        <div className='flex flex-col gap-2'>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Name..." />}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Email..." />}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <ContactNumberInput
                value={field.value}
                onChange={field.onChange}
                errors={errors}
              />
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission
              handleSubmit(onSubmit)(e); // Manually trigger form submit
            }}
          >
            {isSubmitting ? 'Adding...' : 'Add Contact'}
          </Button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default ContactForm;

// Validation schema using Yup
const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
});
