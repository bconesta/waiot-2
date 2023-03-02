import React, { useEffect, useState } from 'react'
import { BsFillStopCircleFill, BsArrowClockwise } from "react-icons/bs";
import { getDatabase, ref, onValue, set} from "firebase/database";

export default function Home() {

  const[auto, setAuto] = useState(false);
  const[isRunning, setIsRunning] = useState(false);
  const[run, setRun] = useState(false);
  const[nextEvent, setNextEvent] = useState("");

  const shortcutsStyle = {backgroundColor: auto ? '#272727' : '#002e6b'}
  const onButtonStyle = {backgroundColor: auto ? '#272727' : (run ? 'red' : 'green')}

  const db = getDatabase();

  function changeAuto(isAuto){
    const reference = ref(db, 'users/RvPFB0mPkbbqDjprx44aOszya912/auto')
    set(reference, isAuto)
  }

  function changeRun(isOn){
    const reference = ref(db, 'users/RvPFB0mPkbbqDjprx44aOszya912/run')
    const referenceShortcut = ref(db, 'users/RvPFB0mPkbbqDjprx44aOszya912/shortcut')
    set(reference, isOn)
    set(referenceShortcut, "-")
  }

  function shortcut(e){
    const reference = ref(db, 'users/RvPFB0mPkbbqDjprx44aOszya912/run')
    const referenceShortcut = ref(db, 'users/RvPFB0mPkbbqDjprx44aOszya912/shortcut')
    set(reference, true)
    set(referenceShortcut, e.target.innerHTML)
  }

  useEffect(()=>{
    const reference = ref(db, 'users/RvPFB0mPkbbqDjprx44aOszya912');
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      setRun(data.run);
      setIsRunning(data.isRunning);
      setAuto(data.auto);
      const date = new Date();
      const currentTime = date.getHours()*100+date.getMinutes()
      let nextTime = "00:00"
      for(let i=0; i<data.times.length; i++){
        const timeToNext = data.times[i].split("$")[0].replace(":","")-currentTime<0 ? (data.times[i].split("$")[0].replace(":","")-currentTime+2400) : (data.times[i].split("$")[0].replace(":","")-currentTime)
        const timeToPrev = nextTime.split("$")[0].replace(":","")-currentTime<0 ? (nextTime.split("$")[0].replace(":","")-currentTime+2400) : (nextTime.split("$")[0].replace(":","")-currentTime)
        if(nextTime === "" || timeToNext < timeToPrev){
          nextTime = data.times[i]
        }
      }
      setNextEvent(nextTime.replace("$", " - "))
    });
  }, [])

  return (
    <div className='Home'>
      <div className="grid">
        <div className="card">
          <h3>Próximo evento</h3>
          <h4>{nextEvent}</h4>
        </div>
        <div className="card">
          <h3>Estado actual</h3>
          {!isRunning && <BsFillStopCircleFill />}
          {isRunning && <BsArrowClockwise className='running'/>}
        </div>
      </div>
      <div className='grid'>
        <button 
          disabled={auto}
          className={auto ? 'selected' : ''} 
          onClick={()=>{changeAuto(true)}}
        >
          Automático
        </button>
        <button 
          disabled={!auto} 
          className={!auto ? 'selected' : ''} 
          onClick={()=>{changeAuto(false)}}
        >
          Manual
        </button>
      </div>
      <div className='shortcuts'>
        <h3>Atajos</h3>
        <div className='grid'>
          <button style={onButtonStyle} onClick={()=>{changeRun(!run)}} disabled={auto}>
            {!run ? 'ON' : 'OFF'}
          </button>
          <button disabled={auto} style={shortcutsStyle} onClick={shortcut}>30s</button>
          <button disabled={auto} style={shortcutsStyle} onClick={shortcut}>60s</button>
          <button disabled={auto} style={shortcutsStyle} onClick={shortcut}>30m</button>
          <button disabled={auto} style={shortcutsStyle} onClick={shortcut}>1h</button>
        </div>
      </div>
    </div>
  )
}
