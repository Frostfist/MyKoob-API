import { SchoolClass } from './schoolClass.js';
import { show } from '../utils.js';

class School {
    /**
     * Initializes the School object.
     * @param {Object} data - The data representing the school.
     */
    constructor(data) {
        this._local_data = data;
        this.region = data.region;
        this.country_code = data.country_code;
        this.id = data.school_id;
        this.name = data.name;
        this.user_id = data.school_user_id;
        this.gate_enabled = data.school_gate_enabled;
        this.school_classes = data.class.map(schoolClass => new SchoolClass(schoolClass));

        show("School was initialized successfully");
    }

    /**
     * Returns the school data in JSON format.
     * @returns {Object} - The school data.
     */
    json() {
        return this._local_data;
    }

    /**
     * Returns a string representation of the School object.
     * @returns {string} - String representation of the school.
     */
    toString() {
        return `School(id=${this.id}, name=${this.name})`;
    }
}

export { School };
