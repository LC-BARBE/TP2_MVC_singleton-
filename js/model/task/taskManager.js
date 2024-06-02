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
        console.log(task);
        console.log(this.tasks);
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
}