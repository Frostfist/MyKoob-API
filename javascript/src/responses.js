export class AuthResponse {
    constructor(data = null) {
        if (data !== null && typeof data === 'object') {
            Object.assign(this, data);
            this.error = null;
        } else {
            this.error = "No data provided";
        }
    }

    isSuccessful() {
        return this.access_token !== undefined && this.error === null;
    }

    json() {
        return JSON.stringify(this, null, 4); // Convert the object to JSON with indentation
    }

    toString() {
        return `AuthResponse(${JSON.stringify(this)})`; // Show all attributes in the output
    }
}

