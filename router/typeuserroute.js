import {getTypesUser ,store, update, delet} from '../controller/typeuserController.js'
import { verifyToken } from '../middleware/auth.js'
import { Router } from 'express'

const routerty= Router()

routerty.get('/', verifyToken,getTypesUser);
routerty.post('/',verifyToken, store);
routerty.put('/:id', verifyToken ,update )
routerty.delete('/:id',verifyToken, delet)

export const routertypeuser=routerty