import { NotAuthenticatedError } from "./exceptions.js";
import { User } from "./models/user.js";
import { Lesson } from "./models/lesson.js";
import { Url } from "./models/urls.js";
import { post } from "./requests.js";
import { show } from "./utils.js";
import { Session } from "./auth.js";

import axios from "axios";
import qs from "qs";

export class Mykoob {
    constructor(session) {
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
        this._ensureToken();

        const data = {
            access_token: this.session.token
        };

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }, // Set the correct header
            body: JSON.stringify(data)
        });

        return response.json();
    }

    async _post(api) {
        const data = {
            api: api,
            access_token: this.session.token
        };

        const response = await fetch(Url.RESOURCE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // Set the correct header
            body: JSON.stringify(data)
        });

        return response.json();
    }

    async getUserData() {
        if (this.session.user) {
            return this.session.user;
        }

        const response = await post(Url.RESOURCE, {
            api: 'user_data',
            access_token: this.session.accessToken,
        });

        this.session.user = new User(await response.data.user_data);
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

        const schoolClass = this.session.user.school.schoolClasses.find(cls => cls.name === className);

        if (!schoolClass) {
            throw new Error(`Class '${className}' not found.`);
        }

        return this._fetchLessonsPlan(dateFrom, dateTo, schoolClass.id);
    }

    async getAccessToken() {
        /**
         * Public method to get token in the MyKoob API for requesting.
         */
        try {
            const response = await post(Url.AUTHORIZATION, {
                use_oauth_proxy: 1,
                client: "MykoobMobile",
                username: this.session.getCredentials()['email'],
                password: this.session.getCredentials()['password'],
            });
            if (response?.data?.error?.message === "Invalid login data") {
                throw new NotAuthenticatedError();
            }

            if (response) {
                this.session.accessToken = await response.data.access_token;

                show("Authorise successfully.");
            }
        } catch (error) {
            console.error('Authorization error:', error);
            throw error;
        }
    }
    async authorize() {
        /*
        * Public method to authorize on MyKoob API.
         */
        await this.getAccessToken();
        await this.getUserData();
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
            const lessons = {};
            const response = await post(Url.RESOURCE, {
                api: 'user_lessonsplan',
                access_token: this.session?.accessToken,
                date_from: dateFrom,
                date_to: dateTo,
                school_classes_id: classId,
                school_user_id: this.session.user.school.userId,
            });
            if (response?.data?.error?.message === "Invalid login data") {
                throw new NotAuthenticatedError();
            }
                
            if (response.data) {
                for (const date of response.data.lessonsplan?.dates) {
                    if (!lessons[date.date]) {
                        lessons[date.date] = [];
                    }
                    for (const lesson of date.lessons) {
                        lessons[date.date].push(new Lesson(lesson));
                    }
                }
            }
            else {
                throw new Error("Lessons plan couldn't be caught.");
            }

            
            return lessons;
            
        } catch (error) {
            if (error.message === 'You are not authenticated.') {
                throw new Error('You are not authenticated.');
            }
            throw error;
        }
    }

}
