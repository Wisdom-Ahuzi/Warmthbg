import React from 'react'
import { ArrowLeft, ArrowRight } from "phosphor-react"

function Pagination({handleNextBlog,handlePreviousBlog}) {
  const size =  20
  return (
    <div className='pagination-Container'>
      <span className="previous" onClick={handlePreviousBlog}>
       <ArrowLeft size={size} />
       Previous
      </span>
      <span className="next" onClick={handleNextBlog}>
        Next
        <ArrowRight size={size}/>
      </span>
    </div>
  )
}

export default Pagination