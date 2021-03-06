const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

function loadIfNotLoaded(currentWindow, page) {
  currentWindow.loadURL(page);
}

let win;

global.contexts = {
  isAdmin: false,
  areaChoice: {}
};

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
  });
  win.webContents.openDevTools();
  win.loadURL(
    isDev
      ? "http://localhost:3000/login"
      : 'file://${path.join(__dirname, "../build/index.html")}'
  );

  win.menuBarVisible = false
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
            loadIfNotLoaded(win, "http://localhost:3000/search_customer");
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
      label: "Παράμετροι",
      submenu: [
        {
          label: "Τοποθεσίες",
          click: function () {
            loadIfNotLoaded(win, "http://localhost:3000/locations_page");
          },
        },
        {
          label: "Επαγγέλματα",
          click: function () {
            loadIfNotLoaded(win, "http://localhost:3000/jobs_page");
          },
        },
        {
          label: "Αποτελέσματα",
          click: function () {
            loadIfNotLoaded(win, "http://localhost:3000/apotelesmata_page");
          },
        },
        {
          label: "Συνδρομές",
          click: function () {
            loadIfNotLoaded(win, "http://localhost:3000/subscriptions_page");
          },
        },
        {
          label: "Τρόποι Παράδοσης",
          click: function () {
            loadIfNotLoaded(win, "http://localhost:3000/shipping_methods_page");
          },
        },
        {
          label: "Πωλητές",
          click: function () {
            loadIfNotLoaded(win, "http://localhost:3000/salesman_page");
          },
        },
        {
          label: "Βιογραφίες",
          click: function () {
            loadIfNotLoaded(win, "http://localhost:3000/biographies_page");
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

ipcMain.on('authenticated', (event, arg) => {
  if (arg)
    win.menuBarVisible = true
  else
    win.menuBarVisible = false
})