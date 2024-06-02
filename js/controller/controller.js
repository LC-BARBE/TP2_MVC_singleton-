import {TaskManager} from "../model/task/taskManager.js";
import {AdvancedTask} from "../model/task/advancedTask.js";
import {ViewList} from "../view/viewList.js";
import {Task} from "../model/task/task.js";
import {SimpleTask} from "../model/task/simpleTask.js";

const INPUT_TITLE = "title";
const INPUT_DESCRIPTION = "description";
const INPUT_CATEGORY = "category";

export class Controller {

    constructor() {
        this._taskList = new TaskManager();
        this._viewList = new ViewList(this);
        this.init();
    }

    init() {
        this._taskList.addTask(new Task(null, "Title 1", "description"))
        this._taskList.addTask(new AdvancedTask(null, "Title 2", "description", null, null, "Divers"))
        this._taskList.addTask(new AdvancedTask(null, "Title 3", "description", null, null, "Travail"))
        this._taskList.addTask(new AdvancedTask(null, "Title 4", "description", null, null, "Maison"))
        this.showTaskList();
    }

    addTask(task) {
        let newTask;
        if (task instanceof AdvancedTask) {
            newTask = new AdvancedTask(null, task.title, task.description, null, null, task.category);
        }
        if (task instanceof SimpleTask) {
            newTask = new SimpleTask(null, task.title, task.description);
        }
        this._taskList.addTask(newTask);
        this.showTaskList();
    }

    showTaskList() {
        this._viewList.displayTodos(this._taskList.getTasks());
    }

    updateTask(id, attribute, change) {

        console.log(this._taskList.getById(id));
        let taskEdit = this._taskList.getById(id);

        console.log(attribute);

        if (attribute === INPUT_TITLE) {
            taskEdit.title = change
        }

        if (attribute === INPUT_DESCRIPTION) {
            taskEdit.description = change
        }

        if (attribute === INPUT_CATEGORY) {
            taskEdit.category = change
        }

        this.showTaskList()

        return taskEdit;
    }

    deleteTask(id) {
        console.log(id);
        console.log(this._taskList.deleteTask(id));

        this._viewList.displayTodos(this._taskList.getTasks());
        return true
    }
}