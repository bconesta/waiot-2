import React from 'react'

export default function Header(props) {
  return (
    <div className='Header'>
        {props.section === 0 && "Timer"}
        {props.section === 1 && "Home"}
        {props.section === 2 && "Settings"}
    </div>
  )
}
