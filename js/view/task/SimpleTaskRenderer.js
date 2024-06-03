import {TaskRenderer} from "./TaskRenderer.js";
import {
    BUTTON_DELETE,
    BUTTON_SELECT,
    INPUT_DESCRIPTION,
    INPUT_TITLE,
    SELECT_AUCUN,
    SELECT_DIVERS,
    SELECT_MAISON,
    SELECT_TRAVAIL
} from "./variable.js";

export class SimpleTaskRenderer extends TaskRenderer {

    constructor(task) {
        super(task);

    }

    displayTodo() {
        this.initElement();

        this.container.append(this.getButtonAddCategory(), this.title, this.description)

        this.completeElement()

        return this.li;
    }

    initElement() {
        this.li = this.createElement('li');
        this.li.id = this.task.id;
        this.li.style.borderLeft = "1em solid #dedede";

        this.container = this.createElement('div');
        this.container.id = (this.task.id);
        this.container.className = 'container'

        this.title = this.createElement('span');
        this.title.contentEditable = true;
        this.title.id = INPUT_TITLE + '-' + this.task.id;
        this.title.classList.add('editable');
        this.title.innerText = this.task.title;

        this.description = this.createElement('span');
        this.description.contentEditable = true;
        this.description.id = INPUT_DESCRIPTION + "-" + this.task.id;
        this.description.classList.add('editable');
        this.description.innerText = this.task.description;
    }

    getButtonAddCategory() {
        this.inputSelectLi = document.createElement('select');
        this.inputSelectLi.id = BUTTON_SELECT + "-" + this.task.id;
        this.inputSelectLi.className = "selectButton";

        const options = [SELECT_AUCUN, SELECT_TRAVAIL, SELECT_MAISON, SELECT_DIVERS];
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.innerText = option;

            if (option === SELECT_AUCUN) {
                opt.label = "Add category";
            }

            this.inputSelectLi.appendChild(opt);
        });

        this.inputSelectLi.value = SELECT_AUCUN;
        return this.inputSelectLi;
    }

    completeElement() {
        this.deleteButton = this.createElement('button');
        this.deleteButton.className = 'delete';
        this.deleteButton.textContent = 'Delete';
        this.deleteButton.id = BUTTON_DELETE + '-' + this.task.id;

        this.li.append(this.container, this.deleteButton);
    }

}