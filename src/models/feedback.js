export class Feedback {
    id;
    user_id;
    cafe_id;
    rating;
    comment;
    created_at;

    constructor(model) {
        this.id = model.id;
        this.user_id = model.user_id;
        this.cafe_id = model.cafe_id;
        this.rating = model.rating;
        this.comment = model.comment;
        this.created_at = model.created_at;
    }
}