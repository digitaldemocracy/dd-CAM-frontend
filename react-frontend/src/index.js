import React, { useEffect, useState } from "react";
import ReactDOMClient from "react-dom/client";
import "./index.css";
import axios from 'axios';
import Table from "./Table.js";
import NavBar from "./NavBar.js";
import FullLog from "./FullLog.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function MyApp() {
  const [config, setConfig] = useState({});
  const [logs, setLogs] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {

    fetchConfig().then( result => {
       if (result)
          setConfig(JSON.parse(result));
     });

     fetchLogs().then( result => {
      if (result)
         setLogs(JSON.parse(result));
    });

  }, [] );
  return (
    <div>
      <h1>DD Log Status Checker</h1>
      <BrowserRouter basename="/">
        <Routes>
          <Route
             path = "/"
             element = {
              <div>
              <NavBar config = {config} setFilter = {setFilter}/>
              <Table logs = {logs} config = {config} filter = {filter}></Table>
              </div>
             }>
             </Route>
          <Route 
            path = "/fullLog/:name"
            element = {
              <FullLog logs = {logs}/>
            }
            >

          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

async function fetchConfig(){
  try {
     const response = await axios.get('http://localhost:5001/config/log_config.json');
     return JSON.stringify(response.data);     
  }
  catch (error){
     console.log(error); 
     return false;         
  }
}

async function fetchLogs(){
  try {
     const response = await axios.get('http://localhost:5001/logs/logs');
     return JSON.stringify(response.data);     
  }
  catch (error){
     console.log(error); 
     return false;         
  }
}

// Initial render: Render an element to the Root
root.render(<MyApp />);