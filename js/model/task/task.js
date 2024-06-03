export class Task {

    constructor(id, title, description, dueDate, completed) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate ? new Date(dueDate) : new Date();
        this.completed = false;
    }

    complete() {
        this.completed = true;
    }

    isCompleted() {
        return this.completed;
    }
}