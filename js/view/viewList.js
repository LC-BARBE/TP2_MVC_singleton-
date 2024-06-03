import {AdvancedTask} from "../model/task/advancedTask.js";
import {SimpleTask} from "../model/task/simpleTask.js";
import {TaskRenderer} from "./task/TaskRenderer.js";
import {SimpleTaskRenderer} from "./task/SimpleTaskRenderer.js";
import {AdvancedTaskRenderer} from "./task/AdvancedTaskRenderer.js";
import {
    BUTTON_DELETE,
    BUTTON_SELECT,
    INPUT_DESCRIPTION,
    INPUT_TITLE,
    SELECT_AUCUN,
    SELECT_DIVERS,
    SELECT_MAISON,
    SELECT_TRAVAIL
} from "./task/variable.js";

export class ViewList {

    taskListView;

    constructor(controller) {
        this._controller = controller;
        this.initView();
        this.temporaryTodoText;
    }

    initView() {
        this.app = this.getElement('#app');

        this.title = this.createElement('h1');
        this.title.textContent = 'Todo List';

        this.form = this.createElement('form');
        this.form.setAttribute('autoComplete', 'off');

        this.labelTitle = this.createElement('label');
        this.labelTitle.for = "inputTitle";
        this.labelTitle.textContent = "Title";

        this.inputTitle = this.createElement('input');
        this.inputTitle.id = 'inputTitle';
        this.inputTitle.type = 'text';
        this.inputTitle.placeholder = 'Add a Title';

        this.labelDescription = this.createElement('label');
        this.labelDescription.for = "inputDescription";
        this.labelDescription.textContent = "Description";

        this.inputDescription = this.createElement('input');
        this.inputDescription.id = 'inputDescription';
        this.inputDescription.type = 'text';
        this.inputDescription.placeholder = 'Add a description';

        this.submitButton = this.createElement('button');
        this.submitButton.id = 'addTodo';
        this.submitButton.textContent = 'Add';
        this.addListeningAddTaskWithInputInList(this.submitButton);

        this.taskListView = this.createElement('ul', 'todo-list');

        this.createSelectButton()

        this.form.append(this.labelTitle, this.inputTitle, this.labelDescription, this.inputDescription, this.labelCategory, this.inputSelect, this.submitButton);

        this.createSelectSearchButton();
        this.addListeningSearchByCategory(this.searchSelect);

        this.app.append(this.title, this.form, this.labelSerchCategory, this.searchSelect, this.taskListView);
    }

    get descriptionUser() {
        return this.inputDescription.value;
    }

    get titleUser() {
        return this.inputTitle.value;
    }

    get optionUser() {
        return this.inputSelect.value;
    }

    resetInput() {
        this.inputDescription.value = '';
        this.inputTitle.value = '';
        this.inputSelect.value = SELECT_AUCUN;
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);

        return element;
    }

    getElement(selector) {
        return document.querySelector(selector);
    }

    getElementById(id) {
        return document.getElementById(id);
    }

    displayTasks(tasks) {
        TaskRenderer.clearList(this.taskListView);

        tasks.forEach(task => {
            let taskRenderer;
            if (task instanceof AdvancedTask) {
                taskRenderer = new AdvancedTaskRenderer(task);
            } else if (task instanceof SimpleTask) {
                taskRenderer = new SimpleTaskRenderer(task);
            }

            this.taskListView.appendChild(taskRenderer.displayTodo());

            this.addListeningEditTaskWithInputInList(this.getElementById(`${INPUT_TITLE}-${task.id}`))
            this.addListeningEditTaskWithInputInList(this.getElementById(`${INPUT_DESCRIPTION}-${task.id}`));

            this.addListeningEditTaskWithSelectInList(this.getElementById(`${BUTTON_SELECT}-${task.id}`));

            this.addListeningDeleteTask(this.getElementById(`${BUTTON_DELETE}-${task.id}`))
        });
    }

    addListeningAddTaskWithInputInList(elementHtml) {
        elementHtml.addEventListener('click', (event) => {
            let description = this.descriptionUser ?? undefined;
            let title = this.titleUser ?? undefined;
            let category = this.optionUser ?? undefined;

            if (this.optionUser === SELECT_AUCUN && description) {
                let simpleTask = new SimpleTask();
                simpleTask.id = null;
                simpleTask.title = title;
                simpleTask.description = description;
                this._controller.addTask(simpleTask);
                this.resetInput();
            }

            if (this.optionUser !== SELECT_AUCUN && description) {
                let advTask = new AdvancedTask();
                advTask.id = null;
                advTask.title = title;
                advTask.description = description;
                advTask.category = category;
                this._controller.addTask(advTask)
                this.resetInput();
            }

            event.preventDefault();
        });
    }

    addListeningEditTaskWithInputInList(elementHtml) {
        elementHtml.addEventListener('focusout', (event) => {
            let change = event.target.innerHTML.split('<')[0];
            let idTask = event.target.parentElement.id;
            let attribute = event.target.id.split('-')[0];
            this._controller.updateTask(idTask, attribute, change);
            event.preventDefault();
        });
    }

    addListeningEditTaskWithSelectInList(elementHtml) {
        elementHtml.addEventListener('change', (event) => {
            let change = event.target.value;
            let idTask = event.target.parentElement.parentElement.id;
            this._controller.updateTask(idTask, "category", change);
            event.preventDefault();
        });
    }

    addListeningDeleteTask(elementHtml) {
        elementHtml.addEventListener('click', (event) => {
            this._controller.deleteTask(event.target.id.split('-')[1]);
            event.preventDefault();
        });
    }

    addListeningSearchByCategory(elementHtml) {
        elementHtml.addEventListener('click', (event) => {
            let filter = event.target.value;
            this._controller.searchByCategory(filter);
            event.preventDefault();
        });
    }

    createSelectButton() {

        this.labelCategory = this.createElement('label');
        this.labelCategory.for = "inputCategory";
        this.labelCategory.textContent = "Category";

        this.inputSelect = document.createElement('select');
        this.inputSelect.id = "inputCategory";
        this.inputSelect.className = "selectHeaderButton";

        const options = [SELECT_AUCUN, SELECT_TRAVAIL, SELECT_MAISON, SELECT_DIVERS];
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            if (option === SELECT_AUCUN) {
                opt.label = "Add category";
            }
            opt.innerText = option;
            this.inputSelect.appendChild(opt);
        });
    }

    createSelectSearchButton() {

        this.labelSerchCategory = this.createElement('label');
        this.labelSerchCategory.for = "inputSearchCategory";
        this.labelSerchCategory.textContent = "Search :";

        this.searchSelect = document.createElement('select');
        this.searchSelect.id = "inputSearchCategory";
        this.searchSelect.className = "selectHeaderButton";

        const options = ["Search...", SELECT_AUCUN, SELECT_TRAVAIL, SELECT_MAISON, SELECT_DIVERS];
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            if (option === SELECT_AUCUN) {
                opt.label = SELECT_AUCUN;
            }
            opt.innerText = option;
            this.searchSelect.appendChild(opt);
        });
    }
}