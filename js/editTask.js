var Task;
var taskType;



function updateFormType() {
    var type = document.getElementById("TaskType").value;
    if (type == 1) {
        document.getElementById("severitydiv").style.display = "";
        document.getElementById("date1").style.display = "none";
        document.getElementById("date2").style.display = "none";
    } else {
        document.getElementById("severitydiv").style.display = "none";
        document.getElementById("date1").style.display = "";
        document.getElementById("date2").style.display = "";
    }
}

function submitUpdateForm() {
    var title = document.getElementById("Title").value;
    var desc = document.getElementById("description").value;
    var type = document.getElementById("TaskType").value;
    if (title == "") {
        alert("Missing task Title");
        
    } else if (desc == "") {
        alert("Missing task description");
        
    } else {
        var url = "Id=" + taskId + "&Title=" + title + "&Description=" + desc;
        if (type == 1) {
            var severity = document.getElementById("Severity").value;
            url += "&Severity=" + severity;
        } else {
            var sd = document.getElementById("startDate").value;
            var ed = document.getElementById("endDate").value;
            url += "&StartDate=" + sd + "&EndDate=" + ed;
        }
        SubmitTask(type, url);
    }
}


function SubmitTask( type , url ) {
    var xhr = new XMLHttpRequest();
    if (type == 1) {
        xhr.open("PUT", 'https://taskmanagerapi-avihupinko.azurewebsites.net/api/severityTask/' + url, true);
    } else {
        xhr.open("PUT", 'https://taskmanagerapi-avihupinko.azurewebsites.net/api/timeTask/' + url, true);
    }
    
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        // do something to response
        window.location.href = "/index.html";
    };
    xhr.send();

}

function onLoad() {
    var query = window.location.search;
    if (query == "") {
        alertAndReturn("Error: Task Id and Type weren't provided");
    }
    var obj = queryParams(query);
    taskType = obj.Type;
    getTaskInfo(obj);
}

function alertAndReturn(message){
    alert(message);
    window.location.href = "/index.html";
}

function queryParams(str) {
    var obj = {};
    var arr = ((str.split('?'))[1]).split('&');
    if (arr.length < 2) {
        alertAndReturn("Error: Task Id or Type weren't provided");
    }
    for (var i = 0; i < arr.length; i++) {
        var params = arr[i].split('=');
        if (params[0] == "Id") {
            obj.Id = params[1];
        } else if (params[0] == "Type") {
            obj.Type = params[1];
        } else {
            alertAndReturn("Error: unrecognized param was provided in query string provided");
        }
    }
    return obj;
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function getTaskInfo(obj) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(this.responseText);
            if (!isEmpty(resp)) {
                fillForm(resp);
            }
        }
    };

    if (obj.Type == "Time") {
        xhttp.open("GET", "https://taskmanagerapi-avihupinko.azurewebsites.net/api/timeTask/" + obj.Id, true);
    } else {
        xhttp.open("GET", "https://taskmanagerapi-avihupinko.azurewebsites.net/api/severityTask/" + obj.Id, true);
    }
    xhttp.send();
}

function fillForm(task) {
    document.getElementById("Title").value = task.title;
    document.getElementById("Description").value = task.description;

    if (taskType == "Time") {
        document.getElementById("TaskType").value = 2;
        updateFormType();
        document.getElementById("startDate").value = getDateFormat(task.startDate);
        document.getElementById("endDate").value = getDateFormat(task.endDate);
    } else {
        // severity is defualt and becuase of that it has less actions
        document.getElementById("Severity").value = task.severity;
    }
    var Task = task;
}

function getDateFormat(date) {
    var now = new Date(date);
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    return now.getFullYear() + "-" + (month) + "-" + (day);
}