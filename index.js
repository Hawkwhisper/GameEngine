const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
app.commandLine.appendSwitch("force-color-profile=srgb");

const path = require("path");

ipcMain.handle("app-reload", async (event, ...args) => {
  Windows["default"].webContents.reloadIgnoringCache();
});

ipcMain.handle("open-playtest", async (event, ...args) => {
  createNewWindow("playtest", "PlayTest/index.html", {
    width: 896 + 8,
    height: 480 + 8,
    modal: true,
    parent: Windows["default"],
  });
  Windows["playtest"].webContents.send('ping', ...args);
});

ipcMain.handle("open-playtest-editor", async (event, ...args) => {
  createNewWindow("playtest-editor", "PlayTest/config.html", {
    width: 640,
    height: 360,
    modal: true,
    transparent: true,
    parent: Windows["default"],
  });
  Windows["playtest-editor"].setMenu(new Menu(null));
  Windows["playtest-editor"].webContents.openDevTools();
});

ipcMain.handle("open-animation-editor", async (event, ...args) => {
  createNewWindow("animation-editor", "animEditor/_app/index.html", {
    width: 1280,
    height: 720,
    frame: true,
    modal: true,
    parent: Windows["default"],
  });
  Windows["animation-editor"].setMenu(new Menu(null));
});

ipcMain.handle("win-minimize", async (event, ...args) => {
  var win = null;
  BrowserWindow.getAllWindows().map((w) => {
    if (w.webContents.id == event.sender.id) win = w;
  });
  win.minimize();
  return null;
});

ipcMain.handle("win-maximize", async (event, ...args) => {
  var win = null;
  BrowserWindow.getAllWindows().map((w) => {
    if (w.webContents.id == event.sender.id) win = w;
  });
  win.isMaximized() ? win.unmaximize() : win.maximize();
  return null;
});

ipcMain.handle("win-close", async (event, ...args) => {
  var win = null;
  BrowserWindow.getAllWindows().map((w) => {
    if (w.webContents.id == event.sender.id) win = w;
  });
  win.close();
  return null;
});
ipcMain.handle("open-proj", async (event, ...args) => {
  var win = null;
  BrowserWindow.getAllWindows().map((w) => {
    if (w.webContents.id == event.sender.id) win = w;
  });
  dialog
    .showOpenDialog(win, {
      properties: ["openDirectory"],
    })
    .then((d) => {
      win.webContents.send(`proj`, d);
    });
  return null;
});

ipcMain.handle("modal", async (event, options) => {
  var win = null;
  BrowserWindow.getAllWindows().map((w) => {
    if (w.webContents.id == event.sender.id) win = w;
  });
});

var Windows = {
  default: null,
};

function createNewWindow(name, src, settings) {
  // Create the browser window.
  const _defaults = {
    width: 800,
    height: 600,
    webPreferences: {
      allowRunningInsecureContent: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  };
  for (let i in settings) _defaults[i] = settings[i];

  Windows[name] = new BrowserWindow(_defaults);
  Windows[name].loadFile(src);
}

const createDefaultWindow = () => {
  createNewWindow("default", "_app/index.html", {
    width: 1280,
    height: 720,
    transparent: true,
    frame: false,
  });
  createNewWindow("splash", "_app/splash.html", {
    width: 896 + 8,
    height: 480 + 8,
    transparent: true,
    frame: false,
    modal: true,
    parent: Windows["default"],
  });
};

app.whenReady().then(() => {
  console.clear();
  createDefaultWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createDefaultWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
