export class Promotion {
    id;
    name;
    description;
    discount_percentage;
    start_date;
    end_date;
    hall_id;
    is_active;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.description = model.description;
        this.discount_percentage = model.discount_percentage;
        this.start_date = model.start_date;
        this.end_date = model.end_date;
        this.hall_id = model.hall_id;
        this.is_active = model.is_active;
    }
}