import { SchoolClass } from './schoolClass.js';
import { show } from '../utils.js';

class School {
    /**
     * Initializes the School object.
     * @param {Object} data - The data representing the school.
     */
    constructor(data) {
        this.region = data.region;
        this.countryCode = data.country_code;
        this.id = data.school_id;
        this.name = data.name;
        this.userId = data.school_user_id;
        this.gateEnabled = data.school_gate_enabled;
        this.schoolClasses = data.class.map(schoolClass => new SchoolClass(schoolClass));
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
