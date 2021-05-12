
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

    $('#add').on('click', createStorage);
    $('#get').on('click', getStorage);
    $('#del').on('click', removeStorage);
}

function createStorage() {
    var myName = document.getElementById("name").value;
    localStorage.setItem("name", myName);
    alert("姓名已經儲存...");
}

function getStorage() {
    $('#result').html("姓名: " + localStorage.getItem("name") +
        "<br/>Hello! " + localStorage.name);
}

function removeStorage() {
    localStorage.removeItem("name");
    alert("姓名已經刪除...");
}

localStorage.setItem('user',
    JSON.stringify({ id: 100, name: '陳會安' }));

var data = localStorage.getItem('user');
if (data) {
    data = JSON.parse(data);
    $('#result').html("編號: " + data.id +
        "<br/>姓名: " + data.name);
}

var db =
    window.openDatabase("Database", "1.0", "Cordova", 2 * 1000 * 1000);

db.transaction(createDB, errorDB);
db.transaction(insertDB, errorDB, successDB);
db.transaction(queryDB, errorDB);

function createDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS USER');
    tx.executeSql('CREATE TABLE IF NOT ' +
        'EXISTS USER (id unique, name, age)');
    tx.executeSql('INSERT INTO USER (id, name, age) ' + 'VALUES (1, "Joe Chen", "20")');
    tx.executeSql('INSERT INTO USER (id, name, age) VALUES (?, ?, ?)', [1, "Joe Chen", "20"]);
}

function queryDB(tx) {
    tx.executeSql('SELECT * FROM USER', [], querySuccess, errorDB);
}

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
}