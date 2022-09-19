const getCurrentDate = (date) => {
    let weekDay, month; 

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
        case 0:
            weekDay = 'Воскресенье';
            break;
    }

    /* console.log(date)
    console.log(date.getMonth()) */

    switch (date.getMonth()){
        case 0:
            month = 'Января'
            break;
        case 1:
            month = 'Февраля'
            break;
        case 2:
            month = 'Марта'
            break;
        case 3:
            month = 'Апреля'
            break;
        case 4:
            month = 'Мая'
            break;
        case 5:
            month = 'Июня'
            break;
        case 6:
            month = 'Июля'
            break;
        case 7:
            month = 'Августа'
            break;
        case 8:
            month = 'Сентября'
            break;
        case 9:
            month = 'Октября'
            break;
        case 10:
            month = 'Ноября'
            break;
        case 11:
            month = 'Декабря'
            break;
    }

    return `${weekDay}, ${date.getDate()} ${month}`;
}

export default getCurrentDate;