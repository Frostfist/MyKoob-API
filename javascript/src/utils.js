import { Lesson } from './models/lesson.js';
import { NoTokenError } from './exceptions.js';

/**
 * Converts a list of Lesson objects to JSON format.
 * @param {Lesson[]} lessons - The array of Lesson objects.
 * @returns {Object} - The JSON representation of the lessons.
 */
function convertLessonsToJson(lessons) {
    try {
        const lessonsJson = lessons.map(lesson => ({ ...lesson }));
        return { lessons: lessonsJson };
    } catch (error) {
        console.error("Expected a list of lessons, not a single one");
    }
}

/**
 * Removes empty lessons from the list.
 * @param {Lesson[]} lessons - The array of Lesson objects.
 * @returns {Lesson[]} - The filtered array of lessons.
 */
function removeEmptyLessons(lessons) {
    return lessons.filter(lesson => lesson.discipline);
}

/**
 * Logs information with a [+] prefix.
 * @param {string} info - The information to log.
 */
function show(info) {
    console.log(`[+] ${info} \n`);
}

/**
 * Logs a warning with a [!] prefix.
 * @param {string} info - The warning information to log.
 */
function warn(info) {
    console.warn(`[!] ${info} \n`);
}


/**
 * Higher-order function to ensure a token is required for the decorated function.
 * @param {Function} func - The function to decorate.
 * @returns {Function} - The wrapped function that checks for a token.
 */
function tokenRequired(func) {
    return function (context, ...args) {
        if (!context.session.token) {
            throw new NoTokenError("Access token is missing or None.");
        }

        return func.call(context, ...args);
    };
}

export {
    convertLessonsToJson,
    removeEmptyLessons,
    show,
    warn,
    tokenRequired
};
