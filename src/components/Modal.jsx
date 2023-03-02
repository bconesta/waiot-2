import React, { useState } from 'react';
import { getDatabase, ref, set, get } from "firebase/database";

export default function Modal(props) {

    const[from, setFrom] = useState("");
    const[to, setTo] = useState("");

    const modalStyles = {
        container : {
            width : '100vw',
            height : '100vh',
            backgroundColor : 'rgba(0, 0, 0, 0.6)',
            position : 'absolute',
            top : 0,
            left : 0,
            zIndex : 1,
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center'
        },
        card : {
            width : '100%',
            margin : '15px',
            zIndex : 2,
            backgroundColor : '#272727',
            borderRadius : '15px'
        },
        tittle : {
            color : '#ffffffe6',
            gridColumn : '1 / 2'
        },
        grid : {
            display : 'grid',
            gridTemplateColumns : '1fr 1fr',
            width : '50%',
            gap : '10px',
            margin : '15px auto',
            color : 'white'
        },
        button : {
            margin : '10px 0 15px 0',
            border : '1px solid white',
            borderRadius : '15px',
            padding : '12px 15px',
            fontSize : '15px',
            color : 'white',
            backgroundColor : '#00000000'
        }
    }

    function add(){
        const db = getDatabase();
        const refArray = 'users/RvPFB0mPkbbqDjprx44aOszya912/times'
        get(ref(db, refArray)).then((snapshot)=>{
            const times = snapshot.val() ? snapshot.val() : [];
            const timeToAdd = from+"$"+to;
            if(!times.includes(timeToAdd)){
                times.push(timeToAdd)
                set(ref(db, refArray), times).then(props.handleModal(false))
            }
            else{
                props.handleModal(false)
            }
        })
        //set(refer, );
        
    }
    function close(e){
        if(e.target.id === 'background'){
            props.handleModal(false)
        }
    }

    return (
        <div style={modalStyles.container} id='background' onClick={close}>
            <div style={modalStyles.card}>
                <h3 style={modalStyles.tittle}>Añadir horario</h3>
                <div style={modalStyles.grid}>
                    <label htmlFor="from">Desde</label>
                    <input type="time" name="from" value={from} onChange={(e)=>{setFrom(e.target.value)}} />
                    <label htmlFor="to">Hasta</label>
                    <input type="time" name="to" value={to} onChange={(e)=>{setTo(e.target.value)}} />
                </div>
                <button style={modalStyles.button} onClick={add}>
                    Agregar
                </button>
            </div>
        </div>
    )
}
