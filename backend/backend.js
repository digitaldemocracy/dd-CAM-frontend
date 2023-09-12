const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const path = require('path');

const fs2 = require("fs");
function readJSONFileSync(filePath) {
    try {
      const data = fs2.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (error) {
      throw new Error(`Error reading or parsing JSON file: ${error.message}`);
    }
  }

function readLogsDirSync(logsPath) {
    var fileNames = []
    try {
        fileNames = fs2.readdirSync(logsPath);
    } catch (error) {
        console.error(error.message);
    }
    return fileNames;
    
}

function parseFiles(folderPath, fileNames) {
    outcomes = {};
    fileNames.forEach(name => {
        let regex = /\d\d\d\d-\d\d-\d\d_\d\d-\d\d-\d\d_/i;
        updatedName = name.replace(regex, "")
        fullPath = path.join(folderPath, name);
        try {
            const jsonData = readJSONFileSync(fullPath);
            if (Object.keys(outcomes).includes(updatedName)) {
                if (outcomes[updatedName][2] < jsonData["Time"]) {
                    outcomes[updatedName] = [jsonData["Type"], jsonData["Message"], jsonData["Time"], jsonData];
                }
            } else {
                outcomes[updatedName] = [jsonData["Type"], jsonData["Message"], jsonData["Time"], jsonData];
            }
        } catch (error) {
            console.error(error.message);
        }
    })
    return outcomes;
}
function readFolder(folderPath) {
    outcomes = {}
    let files = readLogsDirSync(folderPath);

    const jsonFiles = files.filter(file => path.extname(file) === '.log');
    console.log(jsonFiles);
    return parseFiles(folderPath, jsonFiles);
}

var scripts = {}
function readConfig(configName) {
    try {
        const config = readJSONFileSync(configName);

        scripts["daily"] = config["daily"]
        scripts["weekly"] = config["weekly"]
        config["customruns"].forEach((group) => scripts[group["rundatetime"]] = group["scripts"]);

        return scripts;

    } catch (error) {
        console.error(error.message);
    }
}



app.get('/config/:folder', (req, res) => {
    const config = readConfig(req.params["folder"]);
    res.send(config);
});

app.get('/logs/:folder', (req, res) => {
    const results = readFolder(req.params["folder"]);
    res.send(results);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      