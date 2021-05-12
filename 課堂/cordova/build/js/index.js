
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
}
