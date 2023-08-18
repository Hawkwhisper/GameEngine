class Editor {
    /**
    * 
    * @param {HTMLElement} parent 
    */
    constructor(parent) {
        this._initialize(parent);
    }

    _initialize(parent) {
        this._container = document.createElement('div');
        this._container.classList.add(`container`, `main`, `editor`);

        this.parent = parent;
        console.log(parent);
        parent.appendChild(this._container);
    }

    rect() {
        return this._container.getBoundingClientRect();
    }

    addChild(child) {
        this._container.appendChild(child._container ?? child);
    }
}

module.exports = Editor;