const parceDate = (stringDay) => {
    let dateArray = String(stringDay).split('-') //parse date to array 
    dateArray[1] = +dateArray[1] - 1; //minus 1 mounth, because of dumb count
    let date = new Date(...dateArray)
    return date
}

export default parceDate;