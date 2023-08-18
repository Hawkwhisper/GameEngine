const { readdirSync, statSync } = require('fs');
const Dropdown= require(`../../../../../dropdown/`);
const Dom = require(`../../../../../../libs/dom`);
const TSelCanvas= require(`../tilesel_canvas`);
function recursiveAddToList(dir = `${process.cwd()}/app/resources/Tilesets`, previous = '') {
    var items = [];
    readdirSync(dir).map(file => {
        const isDir = statSync(`${dir}/${file}`).isDirectory();
        if (isDir) {
            items.push({
                label: `${previous}/${file}`,
                
                submenu: recursiveAddToList.call(this, `${dir}/${file}`, `${previous}/${file}`)
            });
        } else {
            const img = new Image();
            img.src = `${dir}/${file}`;
            let _index = items.length;
            items.push({
                label: `${previous}/${file}`,
                img,
                actions: {
                    click: [e => {
                        this.render(img);
                    }],

                    create: [(label, item) => {
                        
                    }]
                },
            });
            img.onerror = function() {
                items = items.splice(_index, 1);
            }
        }
    });
    return items;
}

class TileSelector {

    _grid = [
        16,16
    ]
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
        this._createTilesetList();
        this._createTileSelector();
        this._createGridConfig();
    }

    _createContainer() {
        this._container = document.createElement('div');
        this._container.classList.add(`container`, `main`, `tileSelector`);

        this.parent.appendChild(this._container);
    }

    _createTilesetList() {
        this.tileset_dropdown = new Dropdown(this._container);
        this._createTilesetDropdownContents();
    }

    _createTilesetDropdownContents() {
        const list = recursiveAddToList.call(this);
        this.tileset_dropdown.renderList(list);
    }

    // Actual tile selecting part
    _createTileSelector() {
        this._canvas_container = document.createElement('div');
        this._canvas_container.style = `width: 100% !important; height: 100% !important;`;
        this.tsel = new TSelCanvas(this._canvas_container);
        this._container.appendChild(this._canvas_container);
    }

    _createGridConfig() {
       this.gridConfigContainer = document.createElement('div');
       this.gridConfigContainer.classList.add('container', 'main', 'grid', 'c2');
       const grid_width = new Dom.Input.Number(this.gridConfigContainer, {
        create: [self=>{
            self.value = this.tsel.grid.width;
        }],
        input: [(e, self)=>{
            this.tsel.grid.width = self.value;
            this.tsel.updateGridBackground()
        }]
       });
       const grid_height = new Dom.Input.Number(this.gridConfigContainer, {
        create: [self=>{
            self.value = this.tsel.grid.height;
        }],
        input: [(e, self)=>{
            this.tsel.grid.height = self.value;
            this.tsel.updateGridBackground()
        }]
       });

       this._container.appendChild(this.gridConfigContainer);
       this.tsel.updateGridBackground()
    }

    render(img) {
        this.tsel.img = img;
        this.tsel.render();
    }
}
module.exports = TileSelector;