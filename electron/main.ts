import { app, BrowserWindow, Menu,globalShortcut } from "electron";
import path from "node:path";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

const isDev = process.env.NODE_ENV === "development";

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
    height: 623,
    useContentSize: true,
    width: 1000
  });

  Menu.setApplicationMenu(null);

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }

  if (isDev) {
    // 加载Vue Devtools扩展
    const { session } = win.webContents;
    const extensionPath = path.join(__dirname, "../extensions/vue-devtools");
    session.loadExtension(extensionPath);
    globalShortcut.register("F12", () => {
      win.isFocused() && win.webContents.toggleDevTools();
    });
  }
}

app.on("window-all-closed", () => {
  app.quit();
});

// app.whenReady().then(createWindow);
app.on("ready", async () => {
  // ...
  createWindow();
});
