import Router from "next/router"
const parametrs = require('../parameters.json') 
const statusCodes = require('../pages/static/StatusCodes.json')

export default function checkLogin() {
    fetch(`${parametrs.API_HOST}/checklogin`)
        .then(response => response.json())
        .then(result => {
            if (result.statusCode !== statusCodes.OK) Router.push('/login')
        })
    
}