import {AdvancedTask} from "../model/task/advancedTask.js";
import {SimpleTask} from "../model/task/simpleTask.js";
import {Task} from "../model/task/task.js";

const SELECT_AUCUN = "Aucun";
const SELECT_DIVERS = "Divers";
const SELECT_TRAVAIL = "Travail";
const SELECT_MAISON = "Maison";

const INPUT_TITLE = "title";
const INPUT_DESCRIPTION = "description";
const INPUT_CATEGORY = "category";

export class ViewList {

  todoListView;

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

    this.todoListView = this.createElement('ul', 'todo-list');

    this.createSelectButton()

    this.form.append(this.labelTitle, this.inputTitle, this.labelDescription, this.inputDescription, this.inputSelect, this.submitButton);

    this.app.append(this.title, this.form, this.todoListView);
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

  displayTodos(tasks) {

    while (this.todoListView.firstChild) {
      this.todoListView.removeChild(this.todoListView.firstChild);
    }

    if (tasks.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'Nothing to do.';
      this.todoListView.append(p);
    } else {
      tasks.forEach(task => {
        console.log(task);
        const li = this.createElement('li');

        const id = this.createElement('p');
        id.innerText = task.id

        const checkbox = this.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        const container = this.createElement('div');
        container.id = (task.id);
        container.className = 'container'

        const title = this.createElement('span');
        title.contentEditable = true;
        title.id = INPUT_TITLE + '-' + task.id;
        title.classList.add('editable');
        title.innerText = task.title;
        this.addListeningEditTaskWithInputInList(title);

        const description = this.createElement('span');
        description.contentEditable = true;
        description.id = INPUT_DESCRIPTION + "-" + task.id;
        description.classList.add('editable');
        description.innerText = task.description;
        this.addListeningEditTaskWithInputInList(description);

        if (task instanceof AdvancedTask) {

          const category = this.createElement('span');
          category.id = INPUT_CATEGORY + "-" + task.id;
          category.className = 'category';
          category.contentEditable = true;
          category.textAlign = 'center';
          category.innerText = task.category;
          category.style.background = this.getColorTaskWithCategory(task.category);

          li.style.borderColor = this.getColorTaskWithCategory(task.category);

          this.addListeningEditTaskWithInputInList(category);
          container.append(category, title, description)
        } else {
          container.append(title, description)
        }

        if (task.completed) {
          const strike = this.createElement('s');
          strike.textContent = task.description;
          description.append(strike);
        } else {
          description.textContent = task.description;
        }

        const deleteButton = this.createElement('button', 'delete');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.name = 'delete-' + task.id;
        deleteButton.id = 'delete-' + task.id;
        this.addListeningDeleteTask(deleteButton);

        li.append(id, checkbox, container, deleteButton);

        this.todoListView.append(li);
      });
    }
  }

  getColorTaskWithCategory(category) {
    let color;
    switch (category) {
      case SELECT_TRAVAIL:
        color = "red";
        break;
      case SELECT_MAISON:
        color = "#007bff";
        break;
      case SELECT_DIVERS:
        color = "#58d68d";
        break;
    }

    return color;
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
      console.log(event.target.innerHTML)
      let change = event.target.innerHTML;

      console.log(event.target.parentElement.id);
      let idTask = event.target.parentElement.id;

      console.log(event.target.id.split('-')[0]);
      let attribute = event.target.id.split('-')[0];

      this._controller.updateTask(idTask, attribute, change);

      event.preventDefault();
    });
  }

  addListeningDeleteTask(elementHtml) {
    elementHtml.addEventListener('click', (event) => {
        this._controller.deleteTask(event.target.id.split('-')[1]);
      event.preventDefault();
    });
  }

  createSelectButton() {
    this.inputSelect = document.createElement('select');
    this.inputSelect.className = "selectButton";
    const options = [SELECT_AUCUN, SELECT_TRAVAIL, SELECT_MAISON, SELECT_DIVERS];
    options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.innerText = option;
      this.inputSelect.appendChild(opt);
    });
  }

}