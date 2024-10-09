import { Mykoob } from './src/api.js'
import {removeEmptyLessons} from "./src/utils.js";
import { Session } from './src/auth.js';
const session = new Session("xxxxxxxxxx@edu.riga.lv", "xxxxxx");

const mykoob = new Mykoob(session);
await mykoob.authorize();

const dateFrom = "2024-10-08";
const dateTo = "2024-10-09";

console.log(await mykoob.getLessonsPlanInClass(dateFrom, dateTo, "9.cl"));
