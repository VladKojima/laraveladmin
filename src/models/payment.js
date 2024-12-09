export class Payment {
    id;
    reservation_id;
    amount;
    payment_status;
    payment_date;
    payment_method;

    constructor(model) {
        this.id = model.id;
        this.reservation_id = model.reservation_id;
        this.amount = model.amount;
        this.payment_date = model.payment_date;
    }
}