document.addEventListener('deviceready', onDeviceReady, false);

let weatherData = "";
const checkConnection = () => {
    var networkState = navigator.connection.type;
    if (networkState === Connection.NONE) {
        alert("沒有網路連線...");
        navigator.app.exitApp(); // 離開應用程式
    }
}

const updateWeather = () => {
    var minTArray = weatherData[8].time;
    var maxTArray = weatherData[12].time;
    for (var i = 0; i < minTArray.length; i++) {

        var startTime = weatherData[8].time[i].startTime;
        var endTime = weatherData[8].time[i].endTime;
        var li = $("<li>");
        li.append($("<h1>").text(processTime(startTime, endTime)));

        var minT = weatherData[8].time[i].elementValue[0].value;
        var maxT = weatherData[12].time[i].elementValue[0].value
        $("<span>").addClass("ui-li-count").text(minT + " ~ " + maxT).appendTo(li);

        $("#weatherList").append(li);
    }
    $("#weatherList").listview("refresh");
}

const processTime = function (startstr, endstr) {
    var idx1 = startstr.indexOf('-');
    var idx2 = startstr.indexOf(' ');

    if (startstr.substr(idx2 + 1, 2) == "06") {
        return startstr.substring(idx1 + 1, idx2) + " 白天";
    } else if (startstr.substr(idx2 + 1, 2) == "18") {
        return startstr.substring(idx1 + 1, idx2) + " 晚上";
    } else {
        return "現在";
    }
}

function onDeviceReady() {
    checkConnection();
    var url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=rdec-key-123-45678-011121314";
    $.getJSON(url, function (response) {
        weatherData = response.records.locations[0].location[2].weatherElement;
        updateWeather();
        console.log(response);
    })
}