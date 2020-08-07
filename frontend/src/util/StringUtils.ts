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
    if(duration < 5) return "Just now"

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