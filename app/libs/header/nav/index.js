class Nav {
    /**
     * Creates a navigation menu.
     * @param items - An array of items for the navigation menu.
     * @param {HTMLElement} parent - The parent element to which the navigation menu will be appended.
     */
    constructor(items = [
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
    ], parent) {
        this.items = items;
        this.isActive = false;
        this.dropdowns = [];
        this._container = document.createElement('ul');
        parent.appendChild(this._container); // Appends the navigation menu._container to the parent element.
        this.buildItems(items);
        document.body.addEventListener('mousedown', e => {
            if (e.target.classList.contains("ge_nav")) return;
            this.closeNavDropdowns(false);
        })
    }

    /**
     * Recursively builds navigation menu items and submenus.
     * @param {Array} items - An array of items for the navigation menu.
     * @param {HTMLElement} current_ul - The current <ul> element to which items are being appended.
     */
    buildItems(items, current_ul = this._container) {
        for (let itm of items) {
            const li = document.createElement('li');
            li.classList.add('ge_nav');
            current_ul.appendChild(li); // Appends the current item to the current <ul> element.

            // Set label text for the item, whether from a string or a custom function.
            if (typeof itm.label === 'string') li.innerHTML = itm.label;
            if (typeof itm.label === 'function') itm.label(li, itm);

            // Add event listeners for specified actions on the item.
            for (let action in itm.actions) {
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

                this.buildItems(itm.submenu, new_ul);
            }
        }
    }

    closeNavDropdowns(activeState) {
        this.dropdowns.map(d => d.style.display = 'none');
        this.isActive = activeState;
    }

    rect() {
        return this._container.getBoundingClientRect();
    }
}
module.exports = Nav; // Export the Nav class for use in other modules.