export const Roles = ["ADMIN", "EMPLOYEE", "CLIENT"];

export class User {
    id;
    username;
    email;
    password;
    role;
    phone_number;
    date_joined;

    constructor(model) {
        this.id = model.id;
        this.username = model.username;
        this.email = model.email;
        this.password = model.password;
        this.role = model.role;
        this.phone_number = model.phone_number;
        this.date_joined = model.date_joined;
    }
}