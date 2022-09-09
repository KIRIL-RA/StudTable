const getCurrentDate = () => {
    let date = new Date(), weekDay, month; 

    switch (date.getDay()){
        case 1:
            weekDay = 'Понедельник';
            break;
        case 2:
            weekDay = 'Вторник';
            break;
        case 3: 
            weekDay = 'Среда';
            break;
        case 4:
            weekDay = 'Четверг';
            break;
        case 5:
            weekDay = 'Пятница';
            break;
        case 6:
            weekDay = 'Суббота';
            break;
        case 7:
            weekDay = 'Воскресенье';
            break;
    }

    switch (date.getMonth()){

    }

    return `${weekDay}, ${date.getDay()} `
}

export default getCurrentDate;