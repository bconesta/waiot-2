import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import React, { useState } from 'react'

export default function Register(props) {
  const[mail, setMail] = useState("");
  const[pass, setPass] = useState("");
  const[error, setError] = useState("");
  const[passConf, setPassConf] = useState("");
  
  const defaultObj = {
    auto : true,
    run : false,
    isRunning : false
  }

  async function createAccount(){
    const auth = getAuth();
    const db = getDatabase();
    if(pass === passConf){
      await createUserWithEmailAndPassword(auth, mail, pass).then((user)=>{
        set(ref(db, 'users/' + user.user.uid), defaultObj)
      }).catch((e)=>{
        if(e.code === "auth/invalid-email" || e.code === "auth/missing-email"){setError("Correo invalido")}
        else if(e.code === "auth/weak-password"){setError("Contraseña no valida")}
        else{setError("Error")}
      })
    }
    else{
      setError("Las contraseñas no coinciden")
    }
  }

  return (
    <div className='Register'>
      <h1>CREAR CUENTA</h1>
      <div className='mail'>
          <label htmlFor='mail'>Correo</label>
          <input type='email' name='mail' value={mail} onChange={(e)=>{setMail(e.target.value);setError("")}} />
      </div>
      <div className='pass'>
          <label htmlFor='pass'>Contraseña</label>
          <input type='password' name='pass' value={pass} onChange={(e)=>{setPass(e.target.value);setError("")}} />
      </div>
      <div className='pass'>
          <label htmlFor='passConfirm'>Repetir contraseña</label>
          <input type='password' name='passConfirm' value={passConf} onChange={(e)=>{setPassConf(e.target.value);setError("")}} />
      </div>
      <h4>{error}</h4>
      <button onClick={createAccount}>REGISTRARSE</button>
      <a href="#" onClick={()=>{props.handleSection(1)}}>Volver</a>
    </div>
  )
}
