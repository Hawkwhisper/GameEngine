class TSelCanvas {
    cursor = {x:0,y:0};
    grid = {
        width: 32,
        height: 32
    };
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
    }

    _createContainer() {
        this._container = document.createElement('div');
        this._container.classList.add(`container`, `main`, `tselcanvas`);
        this._container.style = `width: 100% !important; height: 100% !important;`;
        this._container.addEventListener('mousemove', e=>{
            this.cursor = {
                x: e.layerX-(this.grid.width/2),
                y: e.layerY-(this.grid.height/2)
            }
        });
        this.parent.appendChild(this._container);

        const _draw = () => {
            requestAnimationFrame(_draw);
            this.render();
        }
        requestAnimationFrame(_draw);
    }

    // Actual tile selecting part
    _createTileSelector() {
        const {width, height} = this._container.getBoundingClientRect();
        this._overlay = document.createElement('div');
        this._overlay.classList.add('overlay');
        this._canvas = document.createElement("canvas");
        this._ctx = this._canvas.getContext('2d');
        this._canvas.width = width;
        this._canvas.height = height;
        this._container.appendChild(this._canvas);
        this._container.appendChild(this._overlay);
    }

    render() {
        const {img} = this;
        if(!img) return;

        const {width, height} = this._container.getBoundingClientRect();
        const canvas = this._canvas;

        canvas.width = width;
        canvas.height = height;

        const ctx = this._ctx;

        ctx.drawImage(img, 0, 0);
        
        this.drawMouse();
    }

    drawMouse() {
        const {width, height} = this.grid;
        const ctx = this._ctx;
        var {x, y} = this.cursor;
        x = Math.round(x/width)*width;
        y = Math.round(y/height)*height;
        ctx.strokeStyle = `#ffffff50`;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
    }

    updateGridBackground() {
        this._overlay.style.backgroundSize = `${this.grid.width}px ${this.grid.height}px`;
    }
}
module.exports = TSelCanvas;