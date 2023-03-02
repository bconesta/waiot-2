import React, { useState } from 'react';
import './App.scss';
import Tabs from './components/Tabs';
import { AiFillHome, AiFillSetting, AiFillClockCircle } from 'react-icons/ai';
import Home from './tabs/Home';
import Time from './tabs/Time';
import Settings from './tabs/Settings';
import Header from './components/Header';

function App() {

  const[section, setSection] = useState(1);

  function handleSection(i){
    setSection(i)
  }

  return (
    <div className="App">
      <Header section={section}/>
      {section===0 && <Time />}
      {section===1 && <Home />}
      {section===2 && <Settings />}
      <Tabs section={section} handleSection={handleSection}>
        <AiFillClockCircle />
        <AiFillHome />
        <AiFillSetting />
      </Tabs>
    </div>
  );
}

export default App;
