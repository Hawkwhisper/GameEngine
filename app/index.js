const { Header, Main } = require('./libs/')
const BodyContainer = document.getElementById('main');

const HeaderNav = new Header.Nav([
    {
        label: "File",
        submenu: [
            {
                label: "New",
                icon: "file_open",
                actions: {
                    click: [e => {
                        
                    }]
                }
            },
            {
                label: "Open",
                icon: "file_open",
                actions: {
                    click: [e => {
                        
                    }]
                }
            },
            {
                label: "Open",
                icon: "file_open",
                actions: {
                    click: [e => {
                        
                    }]
                }
            },
            {
                label: "Open",
                icon: "file_open",
                actions: {
                    click: [e => {
                        
                    }]
                }
            },
            {spacer:true},
            {
                label: "Export",
                icon: "file_open",
                actions: {
                    click: [e => {
                        
                    }]
                }
            },
            {
                label: "Close",
                icon: "file_open",
                actions: {
                    click: [e => {
                        window.close();
                    }]
                }
            }
        ]
    },

    {
        label: "Edit",
        submenu: [{
            label: (li, itm) => {
                const icon = document.createElement('span');
                icon.innerHTML = 'Close';
                li.appendChild(icon);
            },
            actions: {
                click: [e => {
                    window.close();
                }]
            }
        }]
    }
], document.getElementById('menu'));

// Assign header nav to window for global access
window.HeaderNav = HeaderNav;

//Resize to fit nav size
(()=>{
    const {height} = HeaderNav.rect();
    BodyContainer.style.height = `calc(100% - ${height}px)`;
    BodyContainer.style.marginTop = `${height}px`;
})();

// Main pages
const MainPages = {
    MapEditor: new Main.Modules.MapEditor(BodyContainer),
}