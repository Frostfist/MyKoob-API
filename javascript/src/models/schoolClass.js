class SchoolClass {
    /**
     * Initializes the SchoolClass object.
     * @param {Object} data - The data representing the school class.
     */
    constructor(data) {
        this.id = data.school_classes_id;
        this.name = data.class_name;
        this.students_id = data.school_classes_students_id;
    }

    /**
     * Returns a string representation of the SchoolClass object.
     * @returns {string} - String representation of the school class.
     */
    toString() {
        return `Class(name=${this.name}, id=${this.id}, students_id=${this.students_id})`;
    }
}

export { SchoolClass };
