export const ReservationStates = ["ACTIVE", "CANCELED", "DONE"];

export const ReservationTypes = ["COMMON", "BIRTHDAY"];

export class Reservation {
    id;
    user_id;
    table_id;
    hall_id;
    reservation_date;
    start_time;
    end_time;
    state;
    guests_count;
    special_requests;
    guest_name;
    guest_phone;

    constructor(model) {
        this.id = model.id;
        this.user_id = model.user_id;
        this.table_id = model.table_id;
        this.hall_id = model.hall_id;
        this.reservation_date = model.reservation_date;
        this.start_time = model.start_time;
        this.end_time = model.end_time;
        this.state = model.state;
        this.guests_count = model.guests_count;
        this.special_requests = model.special_requests;
        this.guest_name = model.guest_name;
        this.guest_phone = model.guest_phone;
    }
}