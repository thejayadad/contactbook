import React from 'react'
import ThemeToogle from './theme-toggle'

const Header = () => {
  return (
    <header className='py-4 px-4'>
        <nav className='mx-auto max-w-screen-md'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='title-font text-xl font-medium text-gray-900 mb-3'>The ContactHub</h1>
                    <p className='tracking-widest text-xs title-font font-medium text-primary mb-1'>Your personal online contact organizer</p>
                </div>
                <ThemeToogle />
            </div>
        </nav>
    </header>
  )
}

export default Header