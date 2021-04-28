$(function () {
    document.addEventListener("deviceready", onDeviceReady, false);
    onDeviceReady()
});

const checkConnection = () => {
    var networkState = navigator.connection.type;
    if (networkState === Connection.NONE) {
        alert("沒有網路連線...");
        navigator.app.exitApp(); // 離開應用程式
    }
}

const updateWeather = (data) => {
    var minT = data[8];
    var maxT = data[12];
    let wx = data[10]

    // 每隔 12hr 取得一份資料，共計 1周
    for (var i = 0; i < minT.time.length; i++) {

        var {
            startTime
        } = data[8].time[i];
        var {
            endTime
        } = data[8].time[i];

        var li = $('<li>');
        li.append($("<h1>").text(processTime(startTime, endTime)));

        var minTvalue = minT.time[i].elementValue[0].value;
        var maxTvalue = maxT.time[i].elementValue[0].value
        $("<p>").text(`描述： ${wx.time[i].elementValue[0].value}`).appendTo(li);
        $("<span>").addClass("ui-li-count").text(`${minTvalue}℃ ~ ${maxTvalue}℃`).appendTo(li);

        $("#weatherList").append(li);
    }
    $("#weatherList").listview("refresh");
}

const processTime = function (startstr, endstr) {
    var idx1 = startstr.indexOf('-');
    var idx2 = startstr.indexOf(' ');

    if (startstr.substr(idx2 + 1, 2) == "06") {
        return startstr.substring(idx1 + 1, idx2) + " 上午";
    } else if (startstr.substr(idx2 + 1, 2) == "18") {
        return startstr.substring(idx1 + 1, idx2) + " 下午";
    } else {
        return "現在";
    }
}

function onDeviceReady() {
    // checkConnection();
    var url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=rdec-key-123-45678-011121314";
    $.getJSON(url, function (response) {
        let weatherData = response.records.locations[0].location[2].weatherElement;
        updateWeather(weatherData);
    })
}