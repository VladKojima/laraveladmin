export class BonusPoints {
    id;
    user_id;
    points;
    expiration_date;

    constructor(model) {
        this.id = model.id;
        this.user_id = model.user_id;
        this.points = model.points;
        this.expiration_date = model.expiration_date;
    }
}