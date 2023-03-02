import React from 'react'
import { AiOutlineArrowRight, AiFillDelete } from "react-icons/ai";
import { getDatabase, ref, set, get } from "firebase/database";

export default function ListItem(props) {

  function remove(){
    const db = getDatabase();
    const refArray = 'users/RvPFB0mPkbbqDjprx44aOszya912/times'
    get(ref(db, refArray)).then((snapshot)=>{
        const times = snapshot.val()
        times.splice(props.arrIndex, 1)
        set(ref(db, refArray), times)
    })
  }

  return (
    <div className='item' style={{gridRow : props.rowPosition}}>
        <h3>{props.startHour}</h3>
        <AiOutlineArrowRight />
        <h3>{props.endHour}</h3>
        <button onClick={remove}>
            <AiFillDelete />
        </button>
    </div>
  )
}
