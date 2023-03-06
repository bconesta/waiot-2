import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'

export default function Forgotten(props) {
    const[error, setError] = useState("");
    const[mail, setMail] = useState("");

    function resetPass(){
        sendPasswordResetEmail(getAuth(), mail).then(()=>{
            props.handleSection(1);
            alert("Correo enviado")
        }).catch((e)=>{
            console.log(e.code)
            if(e.code === "auth/invalid-email" || e.code === "auth/missing-email"){setError("Correo invalido")}
            else if(e.code === "auth/user-not-found"){setError("Usuario no registrado")}
            else{setError("Error")}
        })
    }

    return (
        <div className='Forgotten'>
        <h1>RECUPERAR</h1>
        <div className='mail'>
            <label htmlFor='mail'>Correo</label>
            <input type='email' name='mail' value={mail} onChange={(e)=>{setMail(e.target.value);setError("")}} />
        </div>
        <h4>{error}</h4>
        <button onClick={resetPass}>ENVIAR</button>
        <a href="#" onClick={()=>{props.handleSection(1)}}>Volver</a>
        </div>
    )
}
