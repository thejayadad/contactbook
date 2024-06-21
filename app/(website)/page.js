import ContactForm from '@/components/contact-form'
import ContactList from '@/components/contact-list'
import SearchBar from '@/components/search'
import React from 'react'



const HomePage = async ({searchParams}) => {
  const query = searchParams?.query || "";

  return (
    <section>
      <div className='mx-auto max-w-screen-md border rounded-xl'>
        <div className='grid grid-cols-1 md:grid-cols-8 gap-4'>
          <div className='col-span-1 md:col-span-2 p-4 border-r'>
            <div className='flex flex-col gap-2'>
            <p className='tracking-widest text-xs title-font font-medium text-secondary'>Add Contact</p>
            <ContactForm />
            </div>
          </div>
          <div className='col-span-1 md:col-span-6 p-4'>
            <div className='flex flex-col gap-8'>
              <div>
              <h2 className='title-font text-lg font-medium text-gray-900'>Search</h2>
              <p className='tracking-widest text-xs title-font font-medium text-secondary mb-1'>Search by anything you can think of</p>
              <SearchBar />
              </div>
              <div>
               {/* <Contacttable query={query} /> */}
               <ContactList query={query} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage