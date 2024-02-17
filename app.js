import  express  from 'express';
import cors from 'cors';
import bcrypt from "bcrypt";
import { sequelize } from './db/conexion.js';
import { routertypeuser } from './router/typeuserroute.js';
import { routeruser } from './router/userroute.js';
import bodyParser from 'body-parser';
import { swaggerUi, swaggerSpec } from './swagger.js';




const app = express()
const port = 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/', routertypeuser)
app.use('/user', routeruser);
// Documentación Swagger
app.use('/user-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const conexion = async()=>{
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
conexion()

