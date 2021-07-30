export function getCurrentDateAndTime(dateSeperator='-', timeseperator=':', dateTimeSeperator='T'){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    

    return `${year}${dateSeperator}${month<10?`0${month}`:`${month}`}${dateSeperator}${date<10?`0${date}`:`${date}`}${dateTimeSeperator}${hours<10?`0${hours}`:`${hours}`}${timeseperator}${minutes<10?`0${minutes}`:`${minutes}`}`

    }