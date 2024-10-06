class BadCredentialsException extends Error {
    /**
     * Exception raised when a user is not authenticated due to bad credentials.
     * @param {string} message - The error message.
     */
    constructor(message = "Credentials invalid.") {
        super(message);
        this.name = "BadCredentialsException";
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }
}

export class NoSessionError extends Error {
    /**
     * Exception raised when no session is provided.
     * @param {string} message - The error message.
     */

    constructor(message = "No session is provided") {
        super(message);
        this.name = "NoSessionError";
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }
}

export class NotAuthenticatedError extends Error {
    /**
     * Exception raised when a user is not authenticated.
     * @param {string} message - The error message.
     */
    constructor(message = "User is not authenticated") {
        super(message);
        this.name = "NotAuthenticatedError";
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }
}

class NoAccessTokenError extends Error {
    /**
     * Exception raised when no access token is available.
     * @param {string} message - The error message.
     */
    constructor(message = "No access token available") {
        super(message);
        this.name = "NoAccessTokenError";
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }
}

class NoLessonsError extends Error {
    /**
     * Exception raised when no lessons are retrieved by request.
     * @param {string} message - The error message.
     */
    constructor(message = "No lessons in request json!") {
        super(message);
        this.name = "NoLessonsError";
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }
}

class BadResponseError extends Error {
    /**
     * Exception raised when a bad response is retrieved.
     * @param {string} message - The error message.
     */
    constructor(message = "Bad response. Maybe, some errors.") {
        super(message);
        this.name = "BadResponseError";
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }
}

export class NoTokenError extends Error {
    /**
     * Exception raised when no access token is available.
     * @param {string} message - The error message.
     */
    constructor(message = "Access token is missing or None") {
        super(message);
        this.name = "NoTokenError";
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }
}

class NoUserError extends Error {
    /**
     * Exception raised when no user is available.
     * @param {string} message - The error message.
     */
    constructor(message = "No user available") {
        super(message);
        this.name = "NoUserError";
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }
}

class ClassNotFoundError extends Error {
    /**
     * Exception raised when class is not found.
     * @param {string} message - The error message.
     */
    constructor(message = "Class not found") {
        super(message);
        this.name = "ClassNotFoundError";
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }
}

