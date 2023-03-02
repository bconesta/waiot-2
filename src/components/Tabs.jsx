import React from 'react'

export default function Tabs(props) {
  return (
    <div className='Tabs'>
        {props.children.map((icon)=>{
            return(
                <button
                    key={props.children.indexOf(icon)}
                    className={"Tab" + (props.section===props.children.indexOf(icon) ? " selected" : "")} 
                    style={{width: 100/props.children.length+"%", height: "100%"}}
                    onClick={()=>{props.handleSection(props.children.indexOf(icon))}}    
                >
                    {icon}
                </button>
            )
        })}
    </div>
  )
}
