import React from 'react';
import { BsGlobe2, BsClock, BsPerson, BsInfoCircle } from 'react-icons/bs';
import { AiOutlineImport } from 'react-icons/ai'
import { getAuth, signOut, updatePassword } from 'firebase/auth';

export default function Settings() {

  function logout(){
    const auth = getAuth();
    signOut(auth)
  }

  return (
    <div className='Settings'>
      <div className='item'>
        <BsGlobe2 />
        <h3>Lenguaje</h3>
        <select name='' disabled>
          <option value='es'>Español</option>
          <option value='en'>English</option>
        </select>
      </div>
      <div className='item'>
        <BsClock />
        <h3>Formato de hora</h3>
        <select name='' disabled>
          <option value='24'>24</option>
          <option value='12' disabled>12</option>
        </select>
      </div>
      <div className='item'>
        <BsPerson />
        <h3>Cuenta <p style={{marginLeft: 10,fontWeight:200, fontSize: 15}}>{"(no disponible)"}</p></h3>
      </div>
      <div className='item'>
        <BsInfoCircle />
        <h3>Sobre la app <p style={{marginLeft: 10,fontWeight:200, fontSize: 15}}>{"(no disponible)"}</p></h3>
      </div>
      <div className='item' onClick={logout}>
        <AiOutlineImport />
        <h3>Cerrar sesión</h3>
      </div>
      
    </div>
  )
}
