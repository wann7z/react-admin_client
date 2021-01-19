import ajax from './ajax'

const BASE = ''

export const reqLogin = (username,password) => ajax(BASE + '/account/login/', {username, password}, 'POST')