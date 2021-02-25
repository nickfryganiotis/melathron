const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

function loadIfNotLoaded(currentWindow, page) {
  if (currentWindow.webContents.getURL() !== page) {
    currentWindow.loadURL(page);
  }
}
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  win.webContents.openDevTools();
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : 'file://${path.join(__dirname, "../build/index.html")}'
  );
  //win.removeMenu()
  //console.log(win.webContents)
  const template = [
    {
      label: "Αρχική Σελίδα",
      click: function () {
        loadIfNotLoaded(win, "http://localhost:3000/");
      },
    },
    {
      label: "Εισαγωγή",
      submenu: [
        {
          label: "Εισαγωγή Πελάτη",
          click: function () {
            loadIfNotLoaded(win, "http://localhost:3000/insert_customer");
          },
        },
        {
          label: "Εισαγωγή Πώλησης",
          click: function () {
            loadIfNotLoaded(win, "http://localhost:3000/insert_sale");
          },
        },
      ],
    },
    {
      label: "Αναζήτηση",
      submenu: [
        {
          label: "Αναζήτηση Πελατών",
          click: function () {
            loadIfNotLoaded(win, "http://localhost:3000/cs");
          },
        },
        {
          label: "Αναζήτηση Πωλήσεων",
          click: function () {
            loadIfNotLoaded(win, "http://localhost:3000/search_sale");
          },
        },
      ],
    },
    {
      label: "Εισαγωγή από Αρχείο",
      submenu: [
        {
          label: "Εισαγωγή Πελατών",
          click: function () {
            loadIfNotLoaded(
              win,
              "http://localhost:3000/load_from_file_customers"
            );
          },
        },
        {
          label: "Εισαγωγή Πωλήσεων",
          click: function () {
            loadIfNotLoaded(win, "http://localhost:3000/load_from_file_sales");
          },
        },
      ],
    },
    {
      label: "Development",
      click: function () {
        win.webContents.openDevTools();
      },
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
