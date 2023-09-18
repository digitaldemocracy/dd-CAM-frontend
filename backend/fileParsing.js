

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
        fullPath = path.join(folderPath, name);
        try {
            const jsonData = readJSONFileSync(fullPath);
            outcomes[name] = jsonData["Type"];
        } catch (error) {
            console.error(error.message);
        }
    })
    return outcomes;
}
function readFolder(folderPath) {
    outcomes = {}
    let files = readLogsDirSync(folderPath);

    const jsonFiles = files.filter(file => path.extname(file) === '.json');
    return parseFiles(folderPath, jsonFiles);
}

var scripts = {}
function readConfig(configName) {
    try {
        const config = readJSONFileSync("./config.json")

        scripts["daily"] = config["daily"]
        scripts["weekly"] = config["weekly"]
        config["customruns"].forEach((group) => scripts[group["rundatetime"]] = group["scripts"]);

        return scripts;

    } catch (error) {
        console.error(error.message);
    }
}
const lineByLine = require("n-readlines");
function readFile(fileName) {
    const liner = new lineByLine(fileName);
    let line;
    let lineNum = 0;
    let completeJsons = []
    let currentStr = ""
    while (line = liner.next()) {
        let lineStr = line.toString('ascii').trimEnd();
        if (lineStr != "NoneType: None") {
            currentStr = currentStr + lineStr;
        }
        if (lineStr === '}') {
            completeJsons.push(JSON.parse(currentStr));
            currentStr = "";
        }
        lineNum++;
    }
    completeJsons.forEach((json) => console.log(json["Type"]));
}

readFile("logs/2023-09-12_18-04-57_ca_import_authors.py.log");
