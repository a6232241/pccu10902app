const stockArray = [
    ["1101", "台泥"],
    ["1102", "亞泥"],
    ["1216", "統一"],
    ["1301", "台塑"],
    ["1303", "南亞"],
    ["1326", "台化"],
    ["1402", "遠東新"],
    ["2002", "中鋼"],
    ["2105", "正新"],
    ["2207", "和泰車"],
    ["2301", "光寶科"],
    ["2303", "聯電"],
    ["2308", "台達電"],
    ["2317", "鴻海"],
    ["2327", "國巨"],
    ["2330", "台積電"],
    ["2357", "華碩"],
    ["2382", "廣達"],
    ["2395", "研華"],
    ["2408", "南亞科"],
    ["2412", "中華電"],
    ["2454", "聯發科"],
    ["2474", "可成"],
    ["2633", "台灣高鐵"],
    ["2801", "彰銀"],
    ["2823", "中壽"],
    ["2881", "富邦金"],
    ["2882", "國泰金"],
    ["2883", "開發金"],
    ["2884", "玉山金"],
    ["2885", "元大金"],
    ["2886", "兆豐金"],
    ["2887", "台新金"],
    ["2888", "新光金"],
    ["2890", "永豐金"],
    ["2891", "中信金"],
    ["2892", "第一金"],
    ["2912", "統一超"],
    ["3008", "大立光"],
    ["3045", "台灣大"],
    ["3711", "日月光投控"],
    ["4904", "遠傳"],
    ["4938", "和碩"],
    ["5871", "中租-KY"],
    ["5876", "上海商銀"],
    ["5880", "合庫金"],
    ["6505", "台塑化"],
    ["9904", "寶成"],
    ["9910", "豐泰"]
];

function insertStockName() {
    stockArray.forEach((item, index) => {
        var attrs = {
            'value': item[0],
            'text': item[0] + " " + item[1]
        };
        $('<option/>', attrs).appendTo('#stocks');
    })
    $("#stocks").selectmenu("refresh", true);
}

function nativeGet(stocknumber) {
    var url = 'https://kgieworld.moneydj.com/z/bcd/GetStkRTDataJSON.djjson?B=' + stocknumber + '&xyz=86400';
    cordova.plugin.http.sendRequest(url, {
            method: 'get'
        },
        function (response) {
            result = JSON.parse(response.data);
            $("#resultList").empty();
            $("#resultList").append("<li>公司名稱: " + result["Name"] + "</li>");
            $("#resultList").append("<li>股票代碼: " + result["ID"] + "</li>");
            $("#resultList").append("<li>今日開盤價: " + result["O"] + "</li>");
            $("#resultList").append("<li>昨日收盤價: " + result["PC"] + "</li>");
            $("#resultList").append("<li>目前成交價: " + result["P"] + "</li>");
            $("#resultList").listview("refresh"); // 更新  
        },
        function (response) {
            alert(JSON.stringify(response));
        });
}

function checkConnection() {
    var networkState = navigator.connection.type;
    if (networkState === Connection.NONE) {
        alert("沒有網路連線...");
        navigator.app.exitApp();
    }
}

function onDeviceReady() {
    checkConnection()
    insertStockName();

    $('#search').on('click', function () {
        var stock = $('#stocks').val()
        checkConnection(); // 檢查網路連線
        $.mobile.loading("show");
        nativeGet(stock);
        $.mobile.loading("hide");
    });
}


document.addEventListener('deviceready', onDeviceReady, false);

// setTimeout(() => onDeviceReady(), 1000);