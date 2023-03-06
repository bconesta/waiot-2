import React, { useState } from 'react';
import './Pages.scss';
import { GiWaterfall } from 'react-icons/gi';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


export default function Login(props) {
    const[mail, setMail] = useState("");
    const[pass, setPass] = useState("");
    const[error, setError] = useState("");

    function login(){
        const auth = getAuth();
        signInWithEmailAndPassword(auth, mail, pass).then().catch((error)=>{
            console.log(error.code)
            if(error.code==="auth/wrong-password"){setError("Contraseña incorrecta")}
            else if(error.code==="auth/user-not-found"){setError("Correo no registrado")}
            else if(error.code==="auth/invalid-email"){setError("Correo no valido")}
            else{setError("Error")}
        })
    }

    return (
        <div className='Login'>
            <GiWaterfall />
            <h1>WAIOT</h1>
            <div className='mail'>
                <label htmlFor='mail'>Correo</label>
                <input type='email' name='mail' value={mail} onChange={(e)=>{setMail(e.target.value);setError("")}} />
            </div>
            <div className='pass'>
                <label htmlFor='pass'>Contraseña</label>
                <input type='password' name='pass' value={pass} onChange={(e)=>{setPass(e.target.value);setError("")}} />
            </div>
            <h4>{error}</h4>
            <button onClick={login}>INGRESAR</button>
            <a href="#" onClick={()=>{props.handleSection(0)}}>Registrarse</a>
            <a href="#" onClick={()=>{props.handleSection(2)}}>Olvidé mi contraseña</a>
        </div>
    )
}
