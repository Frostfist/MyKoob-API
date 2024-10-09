// Import the necessary classes
import { show } from './utils.js';
import { User } from './models/user.js';

class Session {
    /**
     * Session class for MyKoob API
     * @param {string} email - User's email
     * @param {string} password - User's password
     */
    constructor(email, password) {
        this._email = email;
        this._password = password;
        this.accessToken = undefined;
        this.user = undefined;

        show("Session constructed");
    }
    
    getCredentials() {
        return {
            email: this._email,
            password: this._password,
        }
    }
    
    getSchool() {
        if(this.user) {
            return this.user.getSchool();
        }
    }
}

export { Session };
