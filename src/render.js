const fs = require('fs');
const { remote } = require('electron');
const { data } = require('jquery');
const { dialog } = remote;

//All the stored log JSON Data
var storedLogs = {}
//The upload Button
const btnclick = document.getElementById('uploadfile');


//When the upload button gets clicked, DO:
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
    //take all the logs and store them in an array of key-value pairs (basically a dict)
    logEntry = Object.entries(log)
    /*I made a template for a HTML card style button that can collapse and expand to show more details of each log entry, I need to duplicate it every
    time a new card gets created */
    template = document.getElementById("cardTemplate")
    var cardClone = template.cloneNode(true)
    //The text field for the button itself
    buttonText = cardClone.firstChild.nextElementSibling
    //the text field for the collapsible portion
    placardText = cardClone.lastElementChild.childNodes[1]

    //the placard also needs a clone for each log entry
    
    cardClone.id = btoa(null)

    //display the proper windows time stamp and other identifying information in the card header
    buttonText.innerText = convertWindowsDates(log.timestamp) + "\n" + log.user_name + " \=\> " + log.process_name
    
    //populate the placard/table in the card dropdown with the rest of the data
    logEntry.forEach(item => {
        var data1 = document.createElement("td")
        var text1 = document.createTextNode(item[0])
        data1.appendChild(text1)
        var data2 = document.createElement("td")
        var text2 = document.createTextNode(item[1])
        data2.appendChild(text2)
        placardText.appendChild(data1)
        placardText.appendChild(data2)
        var endrow = document.createElement("tr")
        placardText.appendChild(endrow)
    });
    //place the new cardclone in the viewer
    document.getElementById("list1").appendChild(cardClone)
    
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

//god I fucking hate microsoft sometimes... 1601?? seriously?!?
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
