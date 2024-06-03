import {SELECT_AUCUN, SELECT_DIVERS, SELECT_MAISON, SELECT_TRAVAIL} from "../../view/task/variable.js";
import {AdvancedTask} from "./advancedTask.js";

export class TaskManager {

    constructor() {
        if (TaskManager.instance) {
            return TaskManager.instance;
        }

        this.tasks = [];
        TaskManager.instance = this;
    }

    addTask(task) {
        task.id = this.generateUniqueId();
        this.tasks.push(task);
        this.tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        return task.id;
    }

    getTasks() {
        return this.tasks;
    }

    setTasks(taskList) {
        this.tasks = taskList;
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id.toString() !== id);
    }

    getById(id) {
        return this.tasks.find(task => task.id.toString() === id);
    }

    static getInstance() {
        if (!TaskManager.instance) {
            TaskManager.instance = new TaskManager();
        }
        return TaskManager.instance;
    }

    generateUniqueId(length = 12) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }

    sortListBy(typeSort, asc = true) {
        switch (typeSort) {
            case "date":
                if (asc) {
                    this.tasks.sort((b, a) => new Date(b.dueDate) - new Date(a.dueDate));
                } else {
                    this.tasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
                }
                break;
            case SELECT_MAISON:
                return this.tasks.filter(task => task.category === typeSort);

            case SELECT_TRAVAIL:
                return this.tasks.filter(task => task.category === typeSort);

            case SELECT_DIVERS:
                return this.tasks.filter(task => task.category === typeSort);

            case SELECT_AUCUN:
                return this.tasks.filter(task => !(task instanceof AdvancedTask));

            case "Search...":
                return this.tasks;
        }
    }
}