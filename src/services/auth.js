// import bcrypt from 'bcrypt';

// export const createHashPassword = async (password) => {
//     const result = await bcrypt.hash(password, 10);
//     const compareResult = await bcrypt.compare(password, result);
// };


// import jwt from "jsonwebtoken";
// import { env } from "../utils/env.js";

// const SECRET_KEY = env('SECRET_KEY');

// const payload = {
//     id: '6664ade94493587f92e779f8',
// };

// const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
// const decodeToken = jwt.decode(token);
// try {
//     const { id } = jwt.verify(token, SECRET_KEY);
//     console.log(id);
// } catch (error) {
//     console.log(error);
// }
