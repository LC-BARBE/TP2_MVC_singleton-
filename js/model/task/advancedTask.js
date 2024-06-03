import {SimpleTask} from "./simpleTask.js";

export class AdvancedTask extends SimpleTask {
    constructor(id, title, description, dueDate, completed, category) {
        super(id, title, description, dueDate, completed);
        this.category = category;
    }

    getCategory() {
        return this.category;
    }

    setCategory(category) {
        this.category = category;
    }
}