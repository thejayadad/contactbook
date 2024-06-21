import { getContacts } from '@/lib/actions/get-contact'
import React from 'react'

const Contacttable = async ({query}) => {
    const contacts = await getContacts(query)
    console.log("Contacts " + contacts)
  return (
    <div className="overflow-x-auto">
    <div className="p-6 rounded-2xl bg-gray-600">
      <table className="w-full min-w-max text-sm text-center text-gray-500">
        <thead className="text-sm text-gray-700 bg-gray-500">
          <tr>
            <th className="py-3 px-2 rounded-l-2xl">Name</th>
            <th className="py-3 px-2">Email</th>
            <th className="py-3 px-2">Phone Number</th>
            <th className="py-3 px-2 text-center rounded-r-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td className="py-3 px-2">{contact.name}</td>
              <td className="py-3 px-2">{contact.email}</td>
              <td className="py-3 px-2">{contact.phone}</td>
              <td className="py-3 px-2 text-center">Actions</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Contacttable