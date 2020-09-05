const fs = require('fs');
const { remote } = require('electron');
const { data } = require('jquery');
const { dialog } = remote;

//All the stored log JSON Data
var storedLogs = {}
//The upload Button
const btnclick = document.getElementById('uploadfile');


//When the upload button gets cliocked, DO:
btnclick.addEventListener('click', () => {
    dialog.showOpenDialog({
        filters: [
            { extensions: ['.json', '.evtx', '.xml', '.log'] }
        ],
    }).then(result => {
        fs.readFile(result.filePaths[0], 'utf8', function (err, data) {
            drawAccordion(err, data)
        })
    })
});

count = 0
function drawAccordion(err, data) {
    if (err) throw err;
    storedLogs = JSON.parse(data)
    storedLogs.forEach(log => {
        count += 1
        console.log(count)

        //Create a card for each log in stored logs
        createCard(log)
    });
    addAccordionBehaviour()
}

//Create the accordion cards
function createCard(log) {
    Date.parse
    template = document.getElementById("cardTemplate")
    var clone = template.cloneNode(true)
    clone.id = btoa(null)
    clone.firstChild.nextElementSibling.innerText = convertWindowsDates(log.timestamp) + "\n" + log.user_name + " \=\> " + log.process_name
    document.getElementById("list1").appendChild(clone)
}


function addAccordionBehaviour() {
    //update the list of active cards
    cardList = document.getElementsByClassName("card")
    //Apply the collapsible behavior to each card in the accordion
    for (i = 0; i < cardList.length; i++) {
        cardList[i].style.visibility = "visible"
        cardList[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
}

//god I fucking hate microsoft
function convertWindowsDates(windows_timestamp) {
    if (typeof windows_timestamp == 'number') {
        windows_timestamp = windows_timestamp.toString()
    } else if (!/^\d+$/.test(windows_timestamp)) {
        throw new TypeError('Not a number')
    }

    const windows_timestamp_ms = parseInt(windows_timestamp.slice(0, -4))

    if (!Number.isSafeInteger(windows_timestamp_ms)) {
        throw new Error('Not a safe integer')
    }

    return new Date(windows_timestamp_ms + Date.UTC(1601, 0, 1))
}
