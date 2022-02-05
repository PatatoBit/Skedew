const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'mainWindow.html'));
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
})
};

const createAddWindow = () => {
  console.log("Create Add Window");
  let addWindow = new BrowserWindow({
    width: 600,
    height: 450
  })

  addWindow.loadFile(path.join(__dirname, 'addWindow.html'));
  addWindow.on('closed', function() {
    addWindow = null;
})
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  createWindow();
  // Build meny from Template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  // Insert Menu
  Menu.setApplicationMenu(mainMenu);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const mainMenuTemplate =[
  {
      label: "File",
      submenu: [{
          label: "Add item",
          accelerator: process.platform == 'darwin' ? 'Command+Shift+A' :"Ctrl+Shift+A",

          click(){
              createAddWindow();
          }
      },
      {
          label: "Clear Items",
          click(){
            console.log("Clear Items")
          }
      },
      {
          label: "Quit",
          accelerator: process.platform == 'darwin' ? 'Command+Q' :
          "Ctrl+Q",
          click(){
              app.quit();
          }
      }
  ]
  }
];


// Add developers tools item if not in production
if(process.env.NODE_ENV !== "production"){
  mainMenuTemplate.push({
      label: "Developer Tools",
      submenu:[
          {
              label: "Toggle DevTools",
              accelerator: process.platform == 'darwin' ? 'Command+I' :
              "Ctrl+I",
              click(item, focusedWindow){
                  focusedWindow.toggleDevTools();
              }
          },
          {
              role:"reload"
          }
      ]
  });
}