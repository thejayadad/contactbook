'use client'
import React from 'react'
import {Popover, PopoverTrigger, PopoverContent, Button, Input} from "@nextui-org/react";
import {FiMoreVertical} from "react-icons/fi"
import UpdateContact from './update-contact';
import DeleteContact from './delete-contact';

const ActionItems = ({contact}) => {
  return (
    <Popover placement="bottom" showArrow offset={10}>
    <PopoverTrigger>
      <button color="primary">
        <FiMoreVertical className='h-4 w-4'  />
      </button>
    </PopoverTrigger>
    <PopoverContent>
        <div className='flex items-center'>
        <UpdateContact contact={contact}/>
        <DeleteContact contact={contact} />
        </div>
    </PopoverContent>
  </Popover>
  )
}

export default ActionItems