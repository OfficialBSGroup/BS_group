function AnalogClockOption(width, foreColor, bgColor, timezone) {
    this.foreColor = foreColor ? foreColor : "#000";
    this.bgColor = bgColor ? bgColor : "#eee";
    this.width = width ? width : 400;
    this.timezone = timezone || 0
}

function AnalogClock(id, option) {
    var that = this;
    if (this === window) {
        return new AnalogClock(id, option)
    }
    that.option = option;
    var dateTimeFormat = function(time) {
        var str = "";
        str += time.getYear() + (time.getYear() > 1900 ? 0 : 1900) + "-";
        str += time.getMonth() + 1 + "-";
        str += time.getDate() + "<br/> ";
        str += time.getHours() + ":";
        str += time.getMinutes() + ":";
        str += time.getSeconds();
        return str
    };
    if (!option) option = {};
    that.foreColor = option.foreColor ? option.foreColor : "#000";
    that.bgColor = option.bgColor ? option.bgColor : "#eee";
    that.width = option.width ? option.width : 400;
    that.container = document.getElementById(id);
    if (!that.container) return;
    that.container.style.fontcolor = that.foreColor;
    that.panel = document.createElement("div");
    that.panel.style.borderRadius = "50%";
    that.panel.style.backgroundColor = that.bgColor;
    that.panel.style.border = "solid 1px #ccc";
    that.panel.style.width = that.width + "px";
    that.panel.style.height = that.width + "px";
    that.panel.style.margin = "0 auto";
    that.panel.style.position = "relative";
    that.container.appendChild(that.panel);
    var label = document.createElement("h4");
    label.style.width = "100%";
    label.style.textAlign = "center";
    label.style.fontWeight = "normal";
    label.style.fontSize = that.width / 15 + "px";
    label.style.marginTop = that.width * .6 + "px";
    label.style.color = that.foreColor;
    label.innerHTML = dateTimeFormat(new Date);
    if (that.width >= 150) that.panel.appendChild(label);
    var ul = document.createElement("ul");
    ul.style.height = "100%";
    ul.style.padding = "0";
    ul.style.margin = "0";
    ul.style.listStyle = "none";
    ul.style.position = "absolute";
    ul.style.width = 40 + "px";
    ul.style.top = 0;
    ul.style.left = that.width / 2 - 20 + "px";
    ul.style.color = that.foreColor;
    that.panel.appendChild(ul);
    for (var i = 0; i <= 5; i++) {
        if (!localStorage) break;
        var list = document.createElement("li");
        list.style.padding = "0";
        list.style.margin = "0";
        list.style.position = "absolute";
        list.style.textAlign = "center";
        list.style.width = "40px";
        list.style.height = that.width + "px";
        list.style.fontSize = that.width / 10 + "px";
        ul.appendChild(list);
        list.style.transform = "rotate(" + 360 / 12 * (i + 1) + "deg)";
        var numTop = document.createElement("div");
        numTop.style.width = "100%";
        numTop.style.position = "absolute";
        numTop.style.textAlign = "center";
        numTop.innerHTML = i + 1;
        if (that.width < 100) numTop.innerHTML = "●";
        list.appendChild(numTop);
        numTop.style.transform = "rotate(" + -360 / 12 * (i + 1) + "deg)";
        var numBottom = document.createElement("div");
        numBottom.style.width = "100%";
        numBottom.style.position = "absolute";
        numBottom.style.textAlign = "center";
        numBottom.style.bottom = "0";
        numBottom.innerHTML = i + 7;
        if (that.width < 100) numBottom.innerHTML = "●";
        list.appendChild(numBottom);
        numBottom.style.transform = "rotate(" + -360 / 12 * (i + 1) + "deg)"
    }
    var hour = document.createElement("div");
    var hourWidth = that.width * .02;
    var hourTop = that.width * .25 - hourWidth * .5;
    var hourleft = that.width * .5 - hourWidth * .5;
    hour.style.width = hourWidth + "px";
    hour.style.height = hourWidth + "px";
    hour.style.position = "absolute";
    hour.style.border = "solid 0px transparent";
    hour.style.left = hourleft + "px";
    hour.style.top = hourTop + "px";
    hour.style.borderTop = "solid " + (that.width * .5 - hourTop) + "px #f60";
    hour.style.borderBottomWidth = that.width * .5 - hourTop + "px";
    if (localStorage) that.panel.appendChild(hour);
    var min = document.createElement("div");
    var minWidth = that.width * .01;
    var minTop = that.width * .1 - minWidth * .5;
    var minleft = that.width * .5 - minWidth * .5;
    min.style.width = minWidth + "px";
    min.style.height = minWidth + "px";
    min.style.position = "absolute";
    min.style.border = "solid 0px transparent";
    min.style.left = minleft + "px";
    min.style.top = minTop + "px";
    min.style.borderTop = "solid " + (that.width * .5 - minTop) + "px #09f";
    min.style.borderBottomWidth = that.width * .5 - minTop + "px";
    if (localStorage) that.panel.appendChild(min);
    var sec = document.createElement("div");
    var secWidth = 1;
    var secTop = that.width * .05;
    sec.style.width = secWidth + "px";
    sec.style.height = secWidth + "px";
    sec.style.position = "absolute";
    sec.style.border = "solid 0px transparent";
    sec.style.left = that.width * .5 - secWidth + "px";
    sec.style.top = secTop + "px";
    sec.style.borderTop = "solid " + (that.width * .5 - secTop) + "px " + that.foreColor;
    sec.style.borderBottomWidth = that.width * .5 - secTop + "px";
    if (localStorage) that.panel.appendChild(sec);
    var point = document.createElement("div");
    var pointWidth = that.width * .05;
    point.style.width = pointWidth + "px";
    point.style.height = pointWidth + "px";
    point.style.position = "absolute";
    point.style.backgroundColor = that.foreColor;
    point.style.left = that.width * .5 - pointWidth * .5 + "px";
    point.style.top = that.width * .5 - pointWidth * .5 + "px";
    point.style.borderRadius = "50%";
    if (localStorage) that.panel.appendChild(point);
    that.loop = setInterval(function() {
        var now = new Date;
        if (that.option && that.option.timezone) {
            var utc = now.getTime() + now.getTimezoneOffset() * 6e4;
            now = new Date(utc + 36e5 * that.option.timezone)
        }
        label.innerHTML = dateTimeFormat(now);
        var roS = 1 * 360 / 60 * now.getSeconds();
        var roM = 1 * 360 / 60 * now.getMinutes();
        var roH = 1 * 360 / 12 * (now.getHours() % 12) + 1 * 360 / 12 * (now.getMinutes() / 60);
        sec.style.transform = "rotate(" + roS + "deg)";
        min.style.transform = "rotate(" + roM + "deg)";
        hour.style.transform = "rotate(" + roH + "deg)"
    }, 1e3)
}