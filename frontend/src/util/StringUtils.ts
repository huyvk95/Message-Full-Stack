// Default format is "hh:mm:ss:ms"
export function milisecondsToDigital(duration: number, format: string = "hh:mm:ss:ms") {
    var milliseconds = (duration % 1000) / 100,
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    format = format.replace("hh", `${(hours < 10) ? "0" + hours : hours}`)
    format = format.replace("mm", `${(minutes < 10) ? "0" + minutes : minutes}`)
    format = format.replace("ss", `${(seconds < 10) ? "0" + seconds : seconds}`)
    format = format.replace("ms", `${milliseconds}`)

    return format
}

export function milisecondsToTimeString(duration: number, format: string = "hh:mm:ss:ms") {
    if (duration < 500) return "Just now"

    var milliseconds = (duration % 1000) / 100,
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    format = format.replace(/:/g, " ")
    format = format.replace("hh", `${hours > 0 ? `${hours} ${hours <= 1 ? "hour" : "hours"}` : ""}`)
    format = format.replace("mm", `${seconds > 0 ? `${seconds} ${seconds <= 1 ? "second" : "seconds"}` : ""}`)
    format = format.replace("ss", `${minutes > 0 ? `${minutes} ${minutes <= 1 ? "minute" : "minutes"}` : ""}`)
    format = format.replace("ms", `${milliseconds > 0 ? `${milliseconds} ${milliseconds <= 1 ? "millisecond" : "milliseconds"}` : ""}`)

    return format.trim()
}

export function roundTime(duration: number, unit: boolean = false) {
    let day = Math.floor(duration / (1000 * 60 * 60 * 24));
    if (day) return `${day}${unit ? day > 1 ? " days" : " day" : "d"}`
    let hour = Math.floor(duration / (1000 * 60 * 60));
    if (hour) return `${hour}${unit ? day > 1 ? " hours" : " hour" : "h"}`
    let minute = Math.floor(duration / (1000 * 60));
    if (minute) return `${minute}${unit ? day > 1 ? " minutes" : " minute" : "m"}`
    let second = Math.floor(duration / (1000));
    if (second) return `${second}${unit ? day > 1 ? " seconds" : " second" : "s"}`
    return `0s`
}

export function capitalize(text: string, lower: boolean = false) {
    return text.split(' ').map(string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()).join(' ')
}

export function zeroPad(number: number, width: number, z: string = "") {
    z = z || '0';
    let n = number.toString();
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}