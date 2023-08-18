class Dropdown {
    /**
    * 
    * @param {HTMLElement} parent 
    */
    constructor(parent) {
        this._initialize(parent);
    }

    _initialize(parent) {
        this.parent = parent;
        this.items = [];
        this.isActive = false;
        this.dropdowns = [];
        this._createContainer();
    }

    _createContainer() {
        this._container = document.createElement('ul');
        this._container.classList.add(`ui`, `dropdown`);
        this.parent.appendChild(this._container);
        document.body.addEventListener('mousedown', e => {
            if (e.target.classList.contains("ge_nav")) return;
            this.closeNavDropdowns(false);
        })
    }

    renderList(items = [
        {
            label: "File", // Displayed text for the menu item.
            classList: '', // CSS class list for styling.
            actions: {
                click: [e => {
                    console.log("clicked");
                }]
            }, // Actions to be performed on item click.
            submenu: [{
                label: (li, itm) => {
                    const icon = document.createElement('span');
                    icon.innerHTML = 'Close'; // Displayed text for the submenu item.
                    li.appendChild(icon);
                },
                classList: [''], // CSS class list for styling the submenu.
                actions: {
                    click: [e => {
                        window.close(); // Action to be performed on submenu item click.
                    }]
                }
            }]
        }
    ], current_ul = this._container) {
        for (let itm of items) {
            const li = document.createElement('li');
            li.classList.add('ge_nav');
            current_ul.appendChild(li); // Appends the current item to the current <ul> element.

            // Set label text for the item, whether from a string or a custom function.
            if (typeof itm.label === 'string') li.innerHTML = itm.label;
            if (typeof itm.label === 'function') itm.label(li, itm);

            // Add event listeners for specified actions on the item.
            for (let action in itm.actions) {
                itm.actions?.create?.map(e=>e(li, itm));
                for (let i = 0; i < itm.actions[action].length; i++) {
                    li.addEventListener(action, e => {
                        itm.actions[action][i](e, li, itm); // Calls the action function on item click.
                    });
                }
            }

            // If submenu exists, create a new <ul> and recursively build submenu items.
            if (itm.submenu) {
                const new_ul = document.createElement('ul');
                new_ul.classList.add('ge_nav');
                this.dropdowns.push(new_ul);
                new_ul.style = 'display: none; position: absolute; top: 100%; left: 0px;';
                li.appendChild(new_ul);

                // Add a click event listener to toggle submenu visibility
                li.addEventListener('click', () => {
                    if (new_ul.style.display === 'none') {
                        this.closeNavDropdowns(true);
                        new_ul.style.display = 'block';
                        this.isActive = true;
                    } else {
                        this.closeNavDropdowns(false);
                    }
                });

                li.addEventListener('mouseover', () => {
                    if (this.isActive) {
                        this.closeNavDropdowns(false, new_ul);
                        new_ul.style.display = 'block';
                    }
                })

                this.renderList(itm.submenu, new_ul);
            }
        }
    }

    closeNavDropdowns(activeState) {
        this.dropdowns.map(d => d.style.display = 'none');
        this.isActive = activeState;
    }
}

module.exports = Dropdown;

