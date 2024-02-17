import {UserModel } from '../model/UserModel.js'
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config/config.js";
import  bcrypt from "bcrypt";

export const getUsers=()=>{

}



/**
 * @swagger
 * path:
 *   /us/register:
 *     post:
 *       summary: Register a new user
 *       description: Create a new user account.
 *       tags: [Authentication]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 typeusers_id:
 *                   type: integer
 *       responses:
 *         '201':
 *           description: User successfully registered
 *           content:
 *             application/json:
 *               example:
 *                 user:
 *                   id: 1
 *                   name: John Doe
 *                   email: john@example.com
 *                   typeusers_id: 1
 *                 message: create successful
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (token value)
 *         '401':
 *           description: Invalid input or email already exists
 *           content:
 *             application/json:
 *               example:
 *                 message: not input invalid
 *                 -or-
 *                 message: email is already exist.
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 message: Internal Server Error
 */
export const register = async (req, res) => {
    const { name, email, password, typeusers_id } = req.body;
    try {
      if (!name || !email || !password || !typeusers_id ) {
        return res.status(401).json({ message: "not input invalid" });
      }
      const verfiEmail = await UserModel.findOne({ where: { email: email }});
      if (verfiEmail) {
        return res.status(401).json({ message: "email is already exist." });
      }
      //Encrypt user password
      const encryptedPassword = await bcrypt.hash(password.toString(),10);
      const user = await UserModel.create({
        name,
        email,
        password:encryptedPassword,
        typeusers_id
      });
      // Create token
      const token = jwt.sign({ user_id: user.id, email }, TOKEN_KEY, {
        expiresIn: "1h",
      });
      return res
        .status(201)
        .json({ user: user, message: "create succesfull", token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  

};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
    if(!email || !password ){
        return res.status(401).json({message: "not input invalid"});
    }
    const verfiEmail = await UserModel.findOne({ where: { email: email }});
    if (!verfiEmail) {
        return res.status(401).json({ message: "not  found this account" });
    }
      // Validate password
    const isPasswordValid = await bcrypt.compare(password, verfiEmail.password)
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    // Create token
    const token = jwt.sign({ user_id: verfiEmail.id, email }, TOKEN_KEY, {
        expiresIn: "1h",
    });
    return res
    .status(200)
    .json({ user: verfiEmail.name, message: "login succesfull", token: token });
     }catch (error) {
        res.status(500).json({ message: error.message });
    }
};







