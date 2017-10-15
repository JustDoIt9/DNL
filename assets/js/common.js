function formatDate(date){
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    hours = hours < 10 ? '0'+hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    
    var strTime = hours + ':' + minutes + ':' + seconds;
    return strTime;
}

function setTimeFormat(strTime){
    var date = new Date(),
        parts = strTime.match(/(\d+)\:(\d+):(\d+)/),
        hours = parseInt(parts[1], 10),
        minutes = parseInt(parts[2], 10),
        seconds = parseInt(parts[3], 10);

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date;
}
