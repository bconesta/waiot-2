import React, { useEffect, useState } from 'react';
import './App.scss';
import Tabs from './components/Tabs';
import { AiFillHome, AiFillSetting, AiFillClockCircle } from 'react-icons/ai';
import Home from './tabs/Home';
import Time from './tabs/Time';
import Settings from './tabs/Settings';
import Header from './components/Header';

import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Login';
import Register from './pages/Register'
import { getDatabase, off, onValue, ref } from 'firebase/database';
import Forgotten from './pages/Forgotten';

function App() {

  const[section, setSection] = useState(1);
  const[isLogged, setIsLogged] = useState(false);
  const[checked, setChecked] = useState(false);
  const[data, setData] = useState({});

  const appStyle = {
    display: isLogged && checked ? 'block' : 'flex',
    height: '100vh',
    justifyContent: 'center', 
    alignItems: 'center'
  }

  function handleSection(i){
    setSection(i)
  }

  useEffect(()=>{
    const auth = getAuth();
    const db = getDatabase();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
        onValue(ref(db, "users/" + user.uid), (snapshot)=>{
          setData(snapshot.val())
        })
      } 
      else {
        off(ref(db));
        setIsLogged(false);
      }
      setSection(1)
      setChecked(true);
    });
  },[])

  return (
    <div className="App" style={appStyle}>
    {isLogged &&
      <>
      <Header section={section}/>
      {section===0 && <Time data={data}/>}
      {section===1 && <Home data={data}/>}
      {section===2 && <Settings data={data}/>}
      <Tabs section={section} handleSection={handleSection}>
        <AiFillClockCircle />
        <AiFillHome />
        <AiFillSetting />
      </Tabs>
      </>
    }
    {!isLogged &&
      <>
      {!checked && <SplashScreen />}
      {checked && section===1 && <Login handleSection={handleSection}/>}
      {checked && section===0 && <Register handleSection={handleSection}/>}
      {checked && section===2 && <Forgotten handleSection={handleSection}/>}
      </>
    }
    </div>
  );
}

export default App;
