const TileSelector = require('./tileselector');
const MapSelector = require('./mapselector');

class Sidebar {
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
        this._createTileSelector();
        this._createMapSelector();
    }

    _createContainer() {
        this._container = document.createElement('div');
        this._container.classList.add(`container`, `main`, `sidebar`);
        this.parent.appendChild(this._container);
    }

    _createTileSelector() {
        this._tileSelector = new TileSelector(this._container);
    }

    _createMapSelector() {
        this._mapSelector = new MapSelector(this._container);
    }

    rect() {
        return this._container.getBoundingClientRect();
    }

    addChild(child) {
        this._container.appendChild(child._container ?? child);
    }
}

module.exports = Sidebar;