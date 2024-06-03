import {SimpleTaskRenderer} from "./SimpleTaskRenderer.js";
import {BUTTON_SELECT, SELECT_AUCUN, SELECT_DIVERS, SELECT_MAISON, SELECT_TRAVAIL} from "./variable.js";

export class AdvancedTaskRenderer extends SimpleTaskRenderer {
    constructor(task) {
        super(task);
    }

    displayTodo() {
        this.initElement();
        this.li.style.borderColor = this.getColorTaskWithCategory(this.task.category);
        this.container.append(this.getCategory(), this.title, this.description)
        this.completeElement()
        return this.li;
    }

    getCategory() {
        this.inputSelectLi = document.createElement('select');
        this.inputSelectLi.id = BUTTON_SELECT + "-" + this.task.id;
        this.inputSelectLi.className = "selectButton";
        this.inputSelectLi.ariaPlaceholder = "Add category";


        const options = [SELECT_AUCUN, SELECT_TRAVAIL, SELECT_MAISON, SELECT_DIVERS];
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.innerText = option;
            this.inputSelectLi.appendChild(opt);
        });

        this.inputSelectLi.value = this.task.category;
        this.inputSelectLi.style.background = this.getColorTaskWithCategory(this.task.category);
        this.li.style.borderLeft = `1em solid ${this.getColorTaskWithCategory(this.task.category)}`;


        return this.inputSelectLi;
    }

    getColorTaskWithCategory(category) {
        let color;
        switch (category) {
            case SELECT_TRAVAIL:
                color = "red";
                break;
            case SELECT_MAISON:
                color = "#56b0ff";
                break;
            case SELECT_DIVERS:
                color = "#78fda8";
                break;
        }

        return color;
    }
}