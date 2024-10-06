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
        this.email = email;
        this.password = password;
        this.accessToken = null;
        this.user = null;

        show("Session constructed");
    }

    /**
     * Get the access token
     * @returns {string|null} - The access token or null if not available
     */
    get token() {
        return this.accessToken;
    }
}

export { Session };
