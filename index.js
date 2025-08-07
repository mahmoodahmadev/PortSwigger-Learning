window.addEventListener('message', function (e) {
    var iframe = document.createElement('iframe');
    var ACMEplayer = { element: iframe };
    var d;
    document.body.appendChild(iframe);
    try {
        d = JSON.parse(e.data);
    } catch (e) {
        return;
    }
    switch (d.type) {
        case "page-load":
            ACMEplayer.element.scrollIntoView();
            break;
        case "load-channel":
            ACMEplayer.element.src = d.url;
            break;
        case "player-height-changed":
            ACMEplayer.element.style.width = d.width + "px";
            ACMEplayer.element.style.height = d.height + "px";
            break;
    }
}, false);


let iframe = document.querySelector('iframe');

iframe.contentWindow.postMessage({
    "type": "load-channel",
    "url": "javascript:print()"
})