import React from 'react'
import { Bottom } from './_components/Bottom'
import Top from './_components/Top'


export default function page() {
  return (
    <section className='sm:p-5'>
      <p className='text-1xl font-bold'>Getting Started</p>
      <Top />
      <Bottom />
    </section>
  )
}
