import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { SaveSession, ListSessions } from './comps/SaveSession';
import { Dic } from './ExampleInterfaces';
import { SessRecord } from './comps/Interfaces';
import { useState, useEffect, ChangeEvent, useRef, FormEvent } from 'react'



function App() {
  const [gc,setGc] = useState(0)
  const getData=()=>{
    return {'a':5,'b':6}
  }

  const enterSess = (x:SessRecord<Dic>)=>{

  }

  return (
    <div className="App">
      <button onClick={()=>setGc(gc+1)}>update</button>
      <ListSessions<Dic> dbName='test3'
       enter={enterSess} gc={gc}></ListSessions>
       {/* use verticalAlign not vertical-align here */}
      <SaveSession<Dic> editTextStyle={{'width':'80px','height':'6px','verticalAlign':'-5%'}} dbName='test3'
         getData={getData} notification download></SaveSession>
    </div>
  );
}

export default App;
