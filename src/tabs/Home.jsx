import React, { useEffect, useState } from 'react'
import { BsFillStopCircleFill, BsArrowClockwise } from "react-icons/bs";
import { getDatabase, ref, onValue, set} from "firebase/database";
import { getAuth } from 'firebase/auth';

export default function Home({data}) {

  const[nextEvent, setNextEvent] = useState("");

  const shortcutsStyle = {backgroundColor: data.auto ? '#272727' : '#002e6b'}
  const onButtonStyle = {backgroundColor: data.auto ? '#272727' : (data.run ? 'red' : 'green')}

  const db = getDatabase();
  const auth = getAuth();

  function changeAuto(isAuto){
    const reference = ref(db, 'users/'+ auth.currentUser.uid +'/auto')
    set(reference, isAuto)
    const runReference = ref(db, 'users/'+ auth.currentUser.uid +'/run')
    set(runReference, false);
    const referenceShortcut = ref(db, 'users/'+ auth.currentUser.uid +'/shortcut')
    set(referenceShortcut, "-")
  }

  function changeRun(isOn){
    const reference = ref(db, 'users/'+ auth.currentUser.uid +'/run')
    const referenceShortcut = ref(db, 'users/'+ auth.currentUser.uid +'/shortcut')
    set(reference, isOn)
    set(referenceShortcut, "-")
  }

  function shortcut(e){
    const reference = ref(db, 'users/'+ auth.currentUser.uid +'/run')
    const referenceShortcut = ref(db, 'users/'+ auth.currentUser.uid +'/shortcut')
    set(reference, true)
    set(referenceShortcut, e.target.innerHTML)
  }

  useEffect(()=>{
    const date = new Date();
    const currentTime = date.getHours()*100+date.getMinutes();
    const length = data.times ? data.times.length : 0;
    let nextTime = "00:00$00:00";
    for(let i=0; i<length; i++){
      const timeToNext = data.times[i].split("$")[0].replace(":","")-currentTime<0 ? (data.times[i].split("$")[0].replace(":","")-currentTime+2400) : (data.times[i].split("$")[0].replace(":","")-currentTime)
      const timeToPrev = nextTime.split("$")[0].replace(":","")-currentTime<0 ? (nextTime.split("$")[0].replace(":","")-currentTime+2400) : (nextTime.split("$")[0].replace(":","")-currentTime)
      if(nextTime === "" || timeToNext < timeToPrev){
        nextTime = data.times[i]
      }
    }
    if(nextTime === "00:00$00:00"){
      nextTime = "23:59$00:00"
      for(let i=0; i<length; i++){
        const time = data.times[i].split("$")[0].replace(":","");
        const prev = nextTime.split("$")[0].replace(":","");
        if(time < prev && prev !== ""){
          nextTime = data.times[i]
        }

      }
    }

    setNextEvent(nextTime.replace("$", " - "))
  }, [data.times])

  return (
    <div className='Home'>
      <div className="grid">
        <div className="card">
          <h3>Próximo evento</h3>
          <h4>{nextEvent}</h4>
        </div>
        <div className="card">
          <h3>Estado actual</h3>
          {!data.isRunning && <BsFillStopCircleFill />}
          {data.isRunning && <BsArrowClockwise className='running'/>}
        </div>
      </div>
      <div className='grid'>
        <button 
          disabled={data.auto}
          className={data.auto ? 'selected' : ''} 
          onClick={()=>{changeAuto(true)}}
        >
          Automático
        </button>
        <button 
          disabled={!data.auto} 
          className={!data.auto ? 'selected' : ''} 
          onClick={()=>{changeAuto(false)}}
        >
          Manual
        </button>
      </div>
      <div className='shortcuts'>
        <h3>Atajos</h3>
        <div className='grid'>
          <button style={onButtonStyle} onClick={()=>{changeRun(!data.run)}} disabled={data.auto}>
            {!data.run ? 'ON' : 'OFF'}
          </button>
          <button disabled={data.auto} style={shortcutsStyle} onClick={shortcut}>30s</button>
          <button disabled={data.auto} style={shortcutsStyle} onClick={shortcut}>60s</button>
          <button disabled={data.auto} style={shortcutsStyle} onClick={shortcut}>30m</button>
          <button disabled={data.auto} style={shortcutsStyle} onClick={shortcut}>1h</button>
          <button disabled={data.auto} style={shortcutsStyle} onClick={shortcut}>3h</button>
        </div>
      </div>
    </div>
  )
}
