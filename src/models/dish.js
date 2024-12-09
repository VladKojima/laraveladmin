export const DishTypes = ["Salads", "Snacks", "Hot", "Desserts", "Drinks"];

export const DishTypeLabels = {
    Salads: "Салаты",
    Snacks: "Закуски",
    Hot: "Горячие блюда",
    Desserts: "Десерт",
    Drinks: "Напитки"
};

export class Dish {
    id;
    image;
    title;
    weight;
    cost;
    type;

    constructor(model) {
        this.id = model.id;
        this.image = model.image;
        this.title = model.title;
        this.weight = model.weight;
        this.cost = model.cost;
        this.type = model.type;
    }
}