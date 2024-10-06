import { School } from './school.js';

class User {
    constructor(data) {
        this._jsonData = data;
        this.isStudent = data.is_student;
        this.isParent = data.is_parent;
        this.plusActive = data.plus_active;
        this.age = data.own_data.age;
        this.gender = data.own_data.sex;
        this.name = data.own_data.user_name;
        this.surname = data.own_data.user_surname;
        this.phone = data.own_data.phone_number;
        this.id = data.own_data.user_id;
        this.locale = data.own_data.locale;
        this.school = new School(data.user[0].school[0]);
    }

    json() {
        return this._jsonData;
    }

    toString() {
        return `User(id=${this.id})`;
    }
}

export { User };
