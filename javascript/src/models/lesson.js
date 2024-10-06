class Lesson {
    constructor(data) {
        this.number = data.lesson_number || null;
        this.timetableId = data.timetableid || null;
        this.timeFrom = data.time_from || null;
        this.timeTo = data.time_to || null;
        this.discipline = data.discipline || null;
        this.teacher = data.teacher || null;
        this.notes = data.notes || null;
        this.theme = data.theme === "" ? null : data.theme || null;
        this.lastChanges = data.last_changes || null;
        this.classroom = data.classroom || null;
    }

    toString() {
        return `Lesson(number=${this.number}, discipline=${this.discipline}, teacher=${this.teacher}, classroom=${this.classroom}, theme=${this.theme}, last_changes=${this.lastChanges})`;
    }
}

export { Lesson };
