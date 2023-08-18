const Sidebar = require('./sidebar');
const Editor = require('./editor');

class MapEditor {
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
        this._createSidebar();
        this._createMapEditor();
        this._createCanvas();
    }

    _createContainer() {
        this._container = document.createElement('div');
        this._container.classList.add(`container`, `main`, `mapEditor`);

        this.parent.appendChild(this._container);
    }

    _createSidebar() {
        this._sidebar = new Sidebar(this._container);
    }

    _createMapEditor() {
        this._editor = new Editor(this._container);
    }

    _createCanvas() {
        this._canvas = document.createElement('canvas');
        this._ctx = this._canvas.getContext('2d');

        window.addEventListener('resize', e=>{
            
        });

        this._editor.addChild(this._canvas);
    }

    render(width, height) {
        const canvas = this._canvas;
        const ctx = this._ctx;
        if(width && height) {
            canvas.width = width;
            canvas.height = height;
        } else {
            canvas.width = canvas.width;
        }


    }

    rect() {
        return this._container.getBoundingClientRect();
    }
}

module.exports = MapEditor;