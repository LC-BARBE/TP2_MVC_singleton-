import {TaskManager} from "../model/task/taskManager.js";
import {AdvancedTask} from "../model/task/advancedTask.js";
import {ViewList} from "../view/viewList.js";
import {SimpleTask} from "../model/task/simpleTask.js";
import {INPUT_CATEGORY, INPUT_DESCRIPTION, INPUT_TITLE} from "../view/task/variable.js";

export class Controller {

    constructor() {
        this._taskList = new TaskManager();
        this._viewList = new ViewList(this);
        this.init();
    }

    addTasksWithDelay(taskList, tasks) {
        tasks.forEach((task, index) => {
            task.dueDate.setTime(new Date().getTime() + (index * 1000));
            taskList.addTask(task);
            if (index === tasks.length - 1) {
                this._taskList.sortListBy("date", false);
                this.showTaskList();
            }
        });
    }

    init() {
        const now = new Date();
        const tasks = [new SimpleTask(null, "Title 1", "description", now), new AdvancedTask(null, "Title 2", "description", now, null, "Divers"), new AdvancedTask(null, "Title 3", "description", now, null, "Travail"), new AdvancedTask(null, "Title 4", "description", now, null, "Maison"),];
        this.addTasksWithDelay(this._taskList, tasks);
    }

    addTask(task) {
        let newTask;
        if (task instanceof AdvancedTask) {
            newTask = new AdvancedTask(null, task.title, task.description, null, null, task.category);
        } else if (task instanceof SimpleTask) {
            newTask = new SimpleTask(null, task.title, task.description);
        }
        this._taskList.addTask(newTask);
        this._taskList.sortListBy("date", false);
        this.showTaskList();
    }

    showTaskList() {
        this._viewList.displayTasks(this._taskList.getTasks());
    }

    updateTask(id, attribute, change) {

        let taskEdit = this._taskList.getById(id);

        if (attribute === INPUT_TITLE) {
            taskEdit.title = change
        }

        if (attribute === INPUT_DESCRIPTION) {
            taskEdit.description = change
        }

        if (attribute === INPUT_CATEGORY) {
            taskEdit.category = change
        }


        if (taskEdit.category) {
            let taskTemp = taskEdit;
            taskEdit = new AdvancedTask();
            taskEdit.id = taskTemp.id;
            taskEdit.title = taskTemp.title;
            taskEdit.description = taskTemp.description;
            taskEdit.dueDate = taskTemp.dueDate;
            taskEdit.category = taskTemp.category;
        }

        this._taskList.deleteTask(taskEdit.id)
        this._taskList.addTask(taskEdit)
        this.showTaskList()
        return taskEdit;
    }

    deleteTask(id) {
        this._taskList.deleteTask(id);
        this.showTaskList();
        return true
    }

    searchByCategory(typeCategory) {
        this._viewList.displayTasks(this._taskList.sortListBy(typeCategory));
        return true
    }
}