const fs = require('fs');
const { remote } = require('electron');
const { data } = require('jquery');
const { dialog } = remote;

const btnclick = document.getElementById('uploadfile');

class LogEntry {
    constructor(data) {
        this.entry = data
    }
}

class Log {
    constructor(data) {
        this.Entries = []

        this.logFile = JSON.parse(data)

        this.logFile.forEach(element => {
            this.entry = new LogEntry(element)
            this.Entries.push(this.entry)
        });

        this.Entries.forEach(element => {
            console.log(element)
        });
    }
}

class Card {
    constructor(data){

    }
}

class Accordion {
constructor(data){
    this.cards = []
    this.accordion = data
}
    appendCard(card){
        this.cards.push(card)
    }
    removeCard(){

    }
    sortCards(){

    }
}

class Main {

    constructor() {
        this.logs = []
        this.report = []
    }

    loadLog(data) {
        this.log = new Log(data)
        this.logs.push(this.log)
    }
}

main = new Main()

btnclick.addEventListener('click', () => {
    dialog.showOpenDialog({
        filters: [
            { extensions: ['.json', '.evtx', '.xml', '.log'] }
        ],
    }).then(result => {
        fs.readFile(result.filePaths[0], 'utf8', function (err, data) {
            if (err) throw err;
            main.loadLog(data);
        })
    })
});