import {NotAuthenticatedError} from "./exceptions.js";
import {User} from "./models/user.js";
import {Lesson} from "./models/lesson.js";
import {Url} from "./models/urls.js";
import {AuthResponse} from "./responses.js";
import { post } from "./requests.js"

import axios from "axios";
import qs from "qs";

export class Mykoob{
    constructor(session){
        if (!session) {
            throw new Error("No session is provided.");
        } 
        this.session = session;
    }

    _ensureToken() {
        if (!this.session.token) {
            throw new NotAuthenticatedError("You are not authenticated.");
        }
    }
    
    async _get(url) {
        this._ensureToken()
        
        const data = {
            access_token: this.session.token
        };
        
        const response = await fetch(url, {
            'method': 'GET',
            body: JSON.stringify(data)
        })
        
        return await response.json()
    }
    
    
    async _post(api){
        const data = {
            api: api,
            access_token: this.session.token
        }
        
        const response = await fetch(Url.RESOURCE, {
            method: 'POST',
            body: JSON.stringify(data)
        })

        return await response.json()
    }
    async getUserData() {
        const data = {
            api: 'user_data',
            access_token: this.session.token
        };

        const response = await fetch(Url.RESOURCE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            timeout: 10000
        });

        const jsonResponse = await response.json();
        console.log(jsonResponse)
    }

    async getLessonsPlan(dateFrom, dateTo) {
        /**
         * Fetch lessons plan for all classes within the given date range.
         * @param {string} dateFrom - Start date in YYYY-MM-DD format.
         * @param {string} dateTo - End date in YYYY-MM-DD format.
         * @return {Promise<Array<Array<Lesson>>>} - List of lessons for each class.
         */

        const output = [];

        for (const schoolClass of this.session.user.school.school_classes) {
            console.log(`Working with ${schoolClass.name}`);
            const lessons = await this._fetchLessonsPlan(dateFrom, dateTo, schoolClass.id);
            output.push(lessons);
        }

        return output;
    }

    async getLessonsPlanInClass(dateFrom, dateTo, className) {
        /**
         * Fetch lessons plan for a specific class within the given date range.
         * @param {string} dateFrom - Start date in YYYY-MM-DD format.
         * @param {string} dateTo - End date in YYYY-MM-DD format.
         * @param {string} className - The name of the class for which the lessons plan is fetched.
         * @return {Promise<Array<Lesson>>} - List of lessons for the specific class.
         */

        const schoolClass = this.session.user.school.school_classes.find(cls => cls.name === className);

        if (!schoolClass) {
            throw new Error(`Class '${className}' not found.`);
        }

        return await this._fetchLessonsPlan(dateFrom, dateTo, schoolClass.id);
    }

    async authorize() {
        try {
            // TODO: Write "post" function in requests.js and change axios.post on this one.
            const response = await axios.post(Url.AUTHORIZATION, qs.stringify({
                use_oauth_proxy: 1,
                client: "MykoobMobile",
                username: this.session.email,
                password: this.session.password,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                timeout: 10000
            });
            
            this.session.access_token = await response.data.access_token;
            
            console.log("Authorized successfully.");
            
            // this.session.user = await this.getUserData();

            return await new AuthResponse(await response.data);
            
        }
        catch (error) {
            this.session.access_token = null;
        }
        
        
    }

    async _fetchLessonsPlan(dateFrom, dateTo, classId) {
        /**
         * Private method to handle the API request and lesson fetching logic.
         * @param {string} dateFrom - Start date in YYYY-MM-DD format.
         * @param {string} dateTo - End date in YYYY-MM-DD format.
         * @param {number} classId - The ID of the class for which the lessons plan is fetched.
         * @return {Promise<Array<Lesson>>} - List of lessons for the specific class.
         */
        try {
            const response = await fetch(Url.RESOURCE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    api: 'user_lessonsplan',
                    access_token: this.session.token,
                    date_from: dateFrom,
                    date_to: dateTo,
                    school_classes_id: classId,
                    school_user_id: this.session.user.school.user_id
                }),
                timeout: 10000
            });

            const jsonResponse = await response.json();
            const modifiedResponse = jsonResponse?.lessonsplan?.dates || [];

            if (!modifiedResponse.length) {
                throw new Error("Lessons plan couldn't be caught.");
            }

            const lessons = [];
            for (const date of modifiedResponse) {
                for (const lesson of date.lessons || []) {
                    lessons.push(new Lesson(lesson));
                }
            }

            if (!lessons.length) {
                throw new Error('No lessons available.');
            }

            console.log("Lessons plan successfully fetched from MyKoob API");
            return lessons;

        } catch (error) {
            if (error.message === 'You are not authenticated.') {
                throw new Error('You are not authenticated.');
            }
            throw error;
        }
    }

}
