import { Router } from 'express'
import { getUsers, login, register } from '../controller/userController.js'
const routerU= Router()

routerU.get('/',getUsers)
routerU.post('/us',register)
routerU.post('/login',login)

export const routeruser=routerU