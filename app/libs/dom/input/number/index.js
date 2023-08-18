class NumberType {
    /**
    * 
    * @param {HTMLElement} parent 
    */
    constructor(parent, events={
        input: [e=>{}]
    }) {
        this._events = events;
        this._initialize(parent);
    }

    _initialize(parent) {
        this._container = document.createElement('input');
        this._container.type = "number";

        for(let evt in this._events) {
            this._events[evt].map(cb=>{
                this._container.addEventListener(evt, e=>{
                    cb(e, this._container);
                });
            });
        }

        if(this._events.create) {
            this._events.create.map(cb=>{
                cb(this._container);
            })
        }

        this.parent = parent;
        parent.appendChild(this._container);
    }

    rect() {
        return this._container.getBoundingClientRect();
    }

    addChild(child) {
        this._container.appendChild(child._container ?? child);
    }

    get() {
        return this._container;
    }
}

module.exports = NumberType;