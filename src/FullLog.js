import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function FullLog(props) {
    let logName = useParams().name;
    console.log(logName);
    return (
        
        <div>
            <Link to = "/">Back to Home</Link>
            <pre>
                {JSON.stringify(props.logs[logName], null, 2)}
            </pre>
        </div>
    );
}

export default FullLog;