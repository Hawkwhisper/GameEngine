const { ipcRenderer } = require('electron');
const get = el=>document.getElementById(el);

(()=>{

    async function closeWindow() {
        const result = await ipcRenderer.invoke('win-close');
    }

    async function minimizeWindow() {
        const result = await ipcRenderer.invoke('win-minimize');
    }

    async function maximizeWindow() {
        const result = await ipcRenderer.invoke('win-maximize');
    }
    get('minimize').addEventListener('click', minimizeWindow);
})();

