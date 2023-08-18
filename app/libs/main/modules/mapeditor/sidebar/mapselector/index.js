class MapSelector {
    /**
 * 
 * @param {HTMLElement} parent 
 */
    constructor(parent) {
        this._initialize(parent);
    }

    _initialize(parent) {
        this.parent = parent;

        this._createContainer();
    }

    _createContainer() {
        this._container = document.createElement('div');
        this._container.classList.add(`container`, `main`, `mapSelector`);
        this.parent.appendChild(this._container);
    }
}
module.exports = MapSelector;