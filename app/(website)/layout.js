import Header from '@/components/header'
import React from 'react'

const layout = ({children}) => {
  return (
    <div className=''>
        <Header />
        {children}
    </div>
  )
}

export default layout