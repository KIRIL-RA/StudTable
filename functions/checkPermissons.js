import Router from "next/router"
const parameters = require('../parameters.json');

function checkPermissons(){
    fetch(`${parameters.API_HOST}/getspecificpermissions`).then(response => response.json()).then(response => {
        response.data?.includes('updtt') ? null : Router.push('/timetable')
    })

}

export default checkPermissons;