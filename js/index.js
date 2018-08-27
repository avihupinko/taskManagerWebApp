var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var selectedIndex;
var selectedType;
var timeTasks = [];
var severityTasks = [];

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
        htmlString += '<tr class="row100"onclick="showTimeTask(' + i + ')">' +
            '<td class="column100 column1" data-column="column1">'+obj.title+'</td>' +
            '<td class="column100 column2" data-column="column2">' + obj.description + '</td>' +
            '<td class="column100 column3" data-column="column3">' + (obj.startDate != null ? (new Date(obj.startDate)).toLocaleDateString(): "") + '</td>' +
            '<td class="column100 column4" data-column="column4">' + (obj.startDate != null ?(new Date(obj.endDate)).toLocaleDateString(): "" )+'</td></tr>';
    }
    div.innerHTML = htmlString;
    timeTasks = arr;
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
        obj.severity = (obj.severity == 1 ? "Low" : (obj.severity == 2 ? "Meduim" : (obj.severity == 3 ? "High" : "Red")));
        htmlString += '<tr class="row100" onclick="showSeverityTask('+i+')">' +
            '<td class="column100 column1" data-column="column1">' + obj.title + '</td>' +
            '<td class="column100 column2" data-column="column2">' + obj.description + '</td>' +
            '<td class="column100 column3" data-column="column3">' + obj.severity + '</td></tr>';
    }
    div.innerHTML = htmlString;
    severityTasks = arr;
}


function onload() {
    loadTimeTasks();
    loadSeverityTasks();
}

function showSeverityTask(index) {
    document.getElementById("timebox").style.display = "none";
    document.getElementById("severitybox").style.display = "";
    var obj = severityTasks[index];
    document.getElementById("Title").innerText = "Title: " + obj.title;
    document.getElementById("Description").innerText = "Description: " +obj.description;
    document.getElementById("severity").innerText = "Severity: "+ (obj.severity == 1 ? "Low" : (obj.severity == 2 ? "Meduim" : (obj.severity == 3 ? "High" : "Red")))
    modal.style.display = "block";
    selectedIndex = index;
    selectedType = "Severity";
}

function showTimeTask(index) {
    document.getElementById("timebox").style.display = "";
    document.getElementById("severitybox").style.display = "none";
    var obj = timeTasks[index];
    document.getElementById("Title").innerText = "Title: " + obj.title;
    document.getElementById("Description").innerText = "Description: " + obj.description;

    var st = (obj.startDate != null ? (new Date(obj.startDate)).toLocaleDateString() : "");
    var ed = (obj.startDate != null ? (new Date(obj.endDate)).toLocaleDateString() : "");

    document.getElementById("time").innerText = "From Date: " + st + " To Date: " + ed;
    modal.style.display = "block";
    selectedIndex = index;
    selectedType = "Time";
}

function deleteTask() {
    if (selectedType == "Time") {
        $.ajax({
            type: "DELETE",
            url: "https://taskmanagerapi-avihupinko.azurewebsites.net/api/timeTask/" + (timeTasks[selectedIndex]).id,
            success: function (msg) {
                alert("Task deleted");
                loadTimeTasks();
                modal.style.display = "none";
            }
        });
    } else {
        $.ajax({
            type: "DELETE",
            url: "https://taskmanagerapi-avihupinko.azurewebsites.net/api/severityTask/" + (severityTasks[selectedIndex]).id,
            success: function (msg) {
                alert("Task deleted");
                loadSeverityTasks();
                modal.style.display = "none";
            }
        });
    }
    
}

function editTask() {
    
    if (selectedType == "Time") {
        window.location.href = "/editTask.html?Id=" + (timeTasks[selectedIndex]).id + "&Type=Time" ;
    } else {
        window.location.href = "/editTask.html?Id=" + (severityTasks[selectedIndex]).id +"&Type=Severity";
    }
    
}