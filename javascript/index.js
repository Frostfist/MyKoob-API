import { Mykoob } from './src/api.js'
import { Session } from './src/auth.js';
const session = new Session("SECRET", "SECRET");

const mykoob = new Mykoob(session)

const response = await mykoob.authorize()

await console.log(response)
