import {Task} from "./task.js";

export class AdvancedTask extends Task {
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