export class Hall {
    id;
    name;
    capacity;
    description;
    img;
    schemeImg;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.capacity = model.capacity;
        this.description = model.description;
        this.img = model.img
        this.schemeImg = model.schemeImg;
    }
}

export const hallSchema = {
    id: 'number',
    name: 'text',
    capacity: 'number',
    description: 'text',
    img: 'text',
    schemeImg: 'text',
    base_price: 'number',
}