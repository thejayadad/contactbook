'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Input } from '@nextui-org/react';
import { addContact } from '@/lib/actions/add-contact';
import { Toaster, toast } from 'react-hot-toast';

const ContactForm = () => {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    submitting: false,
    success: false,
    error: false,
  });

  const onSubmit = async (data) => {
    setSubmissionStatus({ submitting: true, success: false, error: false });
    try {
      await addContact(data); // Assuming addContact makes an API call to add contact
      setSubmissionStatus({ submitting: false, success: true, error: false });
      toast.success('Contact added successfully!', { icon: '🎉' });
      reset(); // Reset the form fields
      window.location.reload()
    } catch (error) {
      setSubmissionStatus({ submitting: false, success: false, error: true });
      toast.error('Failed to add contact. Please try again later.', { icon: '❌' });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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
              <Input
                {...field}
                placeholder="Phone Number..."
                type="tel"
                maxLength={10}
                className={`w-full ${errors.phone ? 'border-red-500' : ''}`}
              />
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || submissionStatus.submitting}
          >
            {submissionStatus.submitting ? 'Adding...' : 'Add Contact'}
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
