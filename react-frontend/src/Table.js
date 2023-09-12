import React from 'react'
import { Link } from 'react-router-dom';


function TableHeader() {
    return (
        <thead>
          <tr>
            <th>File_Name</th>
            <th>Run Frequency</th>
            <th>Last Run</th>
            <th>Status</th>
          </tr>
        </thead>
    );  
}

function getFreq(fileName, config) {
    var currentElement = ""
    Object.keys(config).forEach(element => {
        if (config[element].includes(fileName.slice(0, -4))) {
            currentElement = element;
        }
    });
    return currentElement;
}

function TableBody(props) {
    const rows = Object.keys(props.logs).map((row, index) => {
        if (getFreq(row, props.config) === props.filter || props.filter === "") {
            return (
                <tr key = {row}>
                    <td>
                        <Link to = {"/fullLog/".concat(row)}>
                            {row.slice(0, -4)}
                        </Link>
                    </td>
                    <td>{getFreq(row, props.config)}</td>
                    <td>{props.logs[row][2]}</td>
                    <td>
                        {
                            props.logs[row][0] === "ERROR" ? <img className = "type2-icon" alt = "ERROR" width = "50" height = "50" src = {require("./errorIcon.jpeg")}/> : 
                            props.logs[row][0] === "INFO" ? <img className = "type2-icon" alt = "SUCCESS" width = "50" height = "50" src = {require("./successIcon.png")}/> :
                            <img className = "type2-icon" alt = "WARNING" width = "50" height = "50" src = {require("./warningIcon.png")}/>
                        }
                    </td>
                </tr>
            )
        }
        return <tr></tr>;

    });
    return (
        <tbody>
          {rows}
         </tbody>
     );
}

function Table(props) {
    return (
        <table>
            <TableHeader />
            <TableBody logs = {props.logs} config = {props.config} filter = {props.filter}/>
        </table>
    );
}

export default Table;