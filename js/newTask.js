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

function submitForm() {
    var title = document.getElementById("Title").value;
    var desc = document.getElementById("description").value;
    var type = document.getElementById("TaskType").value;
    if (title == "") {
        alert("Missing task Title");
        
    } else if (desc == "") {
        alert("Missing task description");
        
    } else {
        var url = "Title=" + title + "&Description=" + desc ;
        if (type == 1) {
            var severity = document.getElementById("Severity").value;
            url += "&Severity=" + severity;
        } else {
            var sd = document.getElementById("StartDate").value;
            var ed = document.getElementById("EndDate").value;
            url += "&Startdate=" + sd + "&EndDate=" + ed;
        }
        SubmitTask(type, url);
    }
}


function SubmitTask( type , url ) {
    var xhr = new XMLHttpRequest();
    if (type == 1) {
        xhr.open("POST", 'https://taskmanagerapi-avihupinko.azurewebsites.net/api/severityTask/' + url, true);
    } else {
        xhr.open("POST", 'https://taskmanagerapi-avihupinko.azurewebsites.net/api/timeTask/' + url, true);
    }
    
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        // do something to response
        window.location.href = "/index.html";
    };
    xhr.send();

    //xhttp.onreadystatechange = function () {
    //    if (this.readyState == 4 && this.status == 200) {
    //        // TODO redirect
    //    }
    //};
    //if (type == 1) {
    //    xhttp.open("POST", "https://taskmanagerapi-avihupinko.azurewebsites.net/api/severityTask/" + url, true);
    //} else {
    //    xhttp.open("POST", "https://taskmanagerapi-avihupinko.azurewebsites.net/api/timeTask/" + url, true);
    //}
    //xhttp.send();
}