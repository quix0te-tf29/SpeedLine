const fs = require('fs');
const { remote } = require('electron');
const { dialog } = remote;
const {converter} = require('json-to-table');
const jsonToTable = require('json-to-table');
const { table } = require('console');

const btnclick = document.getElementById('uploadfile');
const logDisplay = document.getElementById('logDisplay');
const storedLogs = [];

btnclick.addEventListener('click', function () {
    dialog.showOpenDialog({
        filters: [
            { extensions: ['.json', '.evtx', '.xml', '.log'] }
        ],
    }).then(result => {
        fs.readFile(result.filePaths[0], 'utf8', (err, data) => {
            storedLogs.push(data);
            convertJSONtoTableRow(data)
            logDisplay.textContent = data;
        })
    })
});

function convertJSONtoTableRow(jsonObject){
    logs = JSON.parse(jsonObject)
    const tabled = jsonToTable(logs, 'N/A') 
}