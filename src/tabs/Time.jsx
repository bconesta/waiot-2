import React, { useEffect, useState } from 'react'
import ListItem from '../components/ListItem'
import Modal from '../components/Modal'
import { getDatabase, ref} from "firebase/database";

export default function Time({data}) {
  
  const[showModal, setShowModal] = useState(false);
  const times = data.times ? data.times : []

  return (
    <div className='Time'>
      <div className='items'>
        {
          times.map((time)=>{
            const start = time.split("$")[0]
            const end = time.split("$")[1]
            let pos = times.length;
            for(let i=0;i<times.length;i++){
              if(start.replace(":", "")<times[i].split("$")[0].replace(":","")){
                pos-=1;
              }
            }
            return <ListItem key={pos} startHour={start} endHour={end} rowPosition={pos} arrIndex={times.indexOf(time)} />
          })
        }
      </div>
      <button className='add' onClick={()=>{setShowModal(true)}}>
        +
      </button>
      {showModal && <Modal handleModal={state => {setShowModal(state)}}/>}
    </div>
  )
}
