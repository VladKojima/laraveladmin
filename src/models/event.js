export class Event {
    id;
    hall_id;
    name;
    description;
    start_time;
    end_time;
    is_public;

    constructor(model) {
        this.id = model.id;
        this.hall_id = model.hall_id;
        this.name = model.name;
        this.description = model.description;
        this.start_time = model.start_time;
        this.end_time = model.end_time;
        this.is_public = model.is_public;
    }
}