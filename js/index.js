var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function loadTimeTasks() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(this.responseText);
            fillTimeTaskTable(resp);
        }
    };
    
    
    xhttp.open("GET", "https://taskmanagerapi-avihupinko.azurewebsites.net/api/timetask", true);
    xhttp.send();
}


function fillTimeTaskTable(arr) {
    var htmlString = "";
    var div = document.getElementById("TimeTaskBody");
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        htmlString += '<tr class="row100"onclick="showTimeTask(' + obj + ')">' +
            '<td class="column100 column1" data-column="column1">'+obj.title+'</td>' +
            '<td class="column100 column2" data-column="column2">' + obj.description + '</td>' +
            '<td class="column100 column3" data-column="column3">' + obj.startDate + '</td>' +
            '<td class="column100 column4" data-column="column4">'+obj.endDate+'</td></tr>';
    }
    div.innerHTML = htmlString;
}

function loadSeverityTasks() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(this.responseText);
            fillSeverityTaskTable(resp);
        }
    };


    xhttp.open("GET", "https://taskmanagerapi-avihupinko.azurewebsites.net/api/severitytask", true);
    xhttp.send();
}

function fillSeverityTaskTable(arr) {
    var htmlString = "";
    var div = document.getElementById("SeverityTaskBody");
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        htmlString += '<tr class="row100" onclick="showSeverityTask('+obj+')">' +
            '<td class="column100 column1" data-column="column1">' + obj.title + '</td>' +
            '<td class="column100 column2" data-column="column2">' + obj.description + '</td>' +
            '<td class="column100 column3" data-column="column3">' + obj.severity + '</td></tr>';
    }
    div.innerHTML = htmlString;
}


function onload() {
    loadTimeTasks();
    loadSeverityTasks();
}

function showSeverityTask(obj) {

    modal.style.display = "block";
}

function showTimeTask(obj) {

    modal.style.display = "block";
}

