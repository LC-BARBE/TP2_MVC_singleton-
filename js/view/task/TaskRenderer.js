export class TaskRenderer {

    constructor(task) {
        if (new.target === TaskRenderer) {
            throw new TypeError("not create TaskRenderer instance");
        }
        this.task = task;
    }

    displayTodo() {
        throw new Error("method displaytodo must be implemented.");

    }

    static clearList(taskListView) {
        while (taskListView.firstChild) {
            taskListView.removeChild(taskListView.firstChild);
        }
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);

        return element;
    }
}