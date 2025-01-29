ws.addEventListener('message', function (event) {
    const json = JSON.parse(event.data)
    if (json.type == "layout/event") {
        renderLayout(json.data, document.getElementById("events__content"))
    }
})