export class Table {
    id;
    hall_id;
    table_number;
    capacity;
    is_available;
    x;
    y;

    constructor(model) {
        this.id = model.id;
        this.hall_id = model.hall_id;
        this.table_number = model.table_number;
        this.capacity = model.capacity;
        this.is_available = model.is_available;
        this.x = model.x;
        this.y = model.y;
    }
}