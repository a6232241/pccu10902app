
$(document).ready(() => {
    document.addEventListener('deviceready', onDeviceReady, false);
    onDeviceReady();
})

function checkConnection() {
    var networkState = navigator.connection.type;
    if (networkState === Connection.NONE) {
        alert("沒有網路連線...");
        navigator.app.exitApp();
    }
}

function onDeviceReady() {
    // checkConnection()

    var db = window.openDatabase("Database", "1.0", "Cordova", 200000);
    db.transaction(createDB, errorDB);
    $("#insert").click(function () {
        db.transaction(insertDB, errorDB, successDB);
    });
    $("#query").click(function () {
        db.transaction(queryDB, errorDB);
    });
}

function createDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS USER (id unique, name, age)');
};

function insertDB(tx) {
    var setName = $("#name");
    var setID = $("#ID");
    var setAge = $("#age");
    var str = "INSERT INTO USER (id, name, age) VALUES (?, ?, ?)"
    tx.executeSql(str, [setID.val(), setName.val(), setAge.val()]);
};

function queryDB(tx) {
    tx.executeSql('SELECT * FROM USER', [], querySuccess, errorDB);
};

function querySuccess(tx, results) {
    var len = results.rows.length;
    $("#recordList").empty();
    for (var i = 0; i < len; i++) {
        var str = "<li>" + results.rows.item(i).id;
        str += " - " + results.rows.item(i).name;
        str += " - " + results.rows.item(i).age;
        str += "</li>";
        $("#recordList").append(str);
    }
    $("#recordList").listview("refresh");
};

function successDB() {
    alert("新增一筆記錄!");
};

function errorDB(err) {
    alert("錯誤!執行SQL錯誤: " + err.code);
};