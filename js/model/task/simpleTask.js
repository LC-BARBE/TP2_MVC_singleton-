import {Task} from "./task.js";

export class SimpleTask extends Task {

    constructor(id, title, description, completed = false) {
        super(id, title, description, null, completed)
    }
}