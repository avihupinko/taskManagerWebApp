function loadTimeTasks() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 ) {
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
        htmlString += '<tr class="row100">' +
            '<td class="column100 column1" data-column="column1">'+obj.Title+'</td>' +
            '<td class="column100 column2" data-column="column2">'+obj.Description+'</td>' +
            '<td class="column100 column3" data-column="column3">'+obj.Severity+'</td></tr>';
    }
    div.innerHTML = htmlString;
}

function onload() {
    loadTimeTasks();
}