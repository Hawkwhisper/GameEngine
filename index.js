const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
app.commandLine.appendSwitch("force-color-profile=srgb");

/**
 * Create IPC handlers to handle messages sent from the 
 * rendering dom
 */

/**
 * Reloads the dom
 */
ipcMain.handle("app-reload", async (event, ...args) => {
  Windows["default"].webContents.reloadIgnoringCache();
});

/**
 * Minimizes the window
 */
ipcMain.handle("win-minimize", async (event, ...args) => {
  var win = null;
  console.log(event.sender.id);
  BrowserWindow.getAllWindows().map((w) => {
    console.log(w.webContents.id);
    if (w.webContents.id == event.sender.id) win = w;
  });
  win.minimize();
  console.log(win)
  return null;
});

/**
 * Maximizes the window
 */
ipcMain.handle("win-maximize", async (event, ...args) => {
  var win = null;
  BrowserWindow.getAllWindows().map((w) => {
    if (w.webContents.id == event.sender.id) win = w;
  });
  win.isMaximized() ? win.unmaximize() : win.maximize();
  return null;
});

/**
 * Closes the window
 */
ipcMain.handle("win-close", async (event, ...args) => {
  var win = null;
  BrowserWindow.getAllWindows().map((w) => {
    if (w.webContents.id == event.sender.id) win = w;
  });
  win.close();
  return null;
});


/**
 * Global window variable for accessing other windows from
 * ... well, other windows, I guess
 */
var Windows = {
  default: null,
};

/**
 * 
 * @param {string} name 
 * @param {string} index_file 
 * @param {ElementCreationOptions} settings 
 */
function createNewWindow(name, index_file, settings) {
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
  Windows[name].loadFile(index_file);
}

/**
 * Creates the default window
 */
function createDefaultWindow() {
  createNewWindow("main", "app/index.html", {
    width: 896 + 8,
    height: 480 + 8,
    transparent: true,
    frame: false,
    parent: Windows["default"],
  });

  Windows['main'].openDevTools();
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
