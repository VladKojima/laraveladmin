export class AboutPage {
    id;
    title;
    description;
    image_url;

    constructor(model) {
        this.id = model.id;
        this.title = model.title;
        this.description = model.description;
        this.image_url = model.image_url;
    }
}