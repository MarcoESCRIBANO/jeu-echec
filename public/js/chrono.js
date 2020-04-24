let startTime = 0
let start = 0
let end = 0
let diff = 0
let timerID = 0
function chrono(){
    end = new Date()
    diff = end - start
    diff = new Date(diff)
    let sec = diff.getSeconds()
    let min = diff.getMinutes()
    let hr = diff.getHours()-1
    if (min < 10){
        min = "0" + min
    }
    if (sec < 10){
        sec = "0" + sec
    }
    document.getElementById("chronotime").innerHTML = hr + " : " + min + " : " + sec
    timerID = setTimeout("chrono()", 10)
}
function chronoStart(){
    start = new Date()
    chrono()
}
function chronoContinue(){
    start = new Date()-diff
    start = new Date(start)
    chrono()
}
function chronoReset(){
    document.getElementById("chronotime").innerHTML = "0:00:00"
    start = new Date()
}
function chronoStopReset(){
    document.getElementById("chronotime").innerHTML = "0:00:00"
    document.chronoForm.startstop.onclick = chronoStart
}
function chronoStop(){
    clearTimeout(timerID)
    let sec = diff.getSeconds()
    let min = diff.getMinutes()
    let hr = diff.getHours()-1
    return hr*3600+min*60+sec;
}
