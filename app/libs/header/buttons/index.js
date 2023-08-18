module.exports = function () {
    const { ipcRenderer } = require('electron');
    const get = el => document.getElementById(el);
    const tget = el => document.getElementsByTagName(el);

    (() => {

        async function closeWindow() {
            await ipcRenderer.invoke('win-close');
        }

        async function minimizeWindow() {
            await ipcRenderer.invoke('win-minimize');
        }

        async function maximizeWindow() {
            await ipcRenderer.invoke('win-maximize');
        }
        get('minimize').addEventListener('click', minimizeWindow);
        get('maximize').addEventListener('click', maximizeWindow);
        get('close').addEventListener('click', closeWindow);
    })();

    return {
        minimize: get('minimize'),
        maximize: get('maximize'),
        close: get('close')
    }
}