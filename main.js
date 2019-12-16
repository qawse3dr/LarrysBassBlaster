/*
Author: Lawrence Milne
gitHandle: qawse3dr
*/


const electron = require('electron');
const shell = electron.shell;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const dialog = electron.dialog;

var win = null;


function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.setResizable(false);
  win.webContents.openDevTools();
  // and load the index.html of the app.
  win.loadFile('src/index.html')

}

/*
  MenuBar for the program
    contains {File(save and loading),Editing,Help(link to github and info)}
*/
var menu = electron.Menu.buildFromTemplate([
  { //File menu
    label: "File",
    submenu: [
      {
        label: "Save",
        click: save
      },
      {
        label: "Load",
        click: load
      },
      {
        type: "separator"
      },
      {
        label: "Exit",
        click: () => win.close()
      }
    ]
  },
  { //Edit menu
    label: "Edit",
    submenu: [
      { //undoes last command
        label: "Undo",
        click: undo
      },
      { //redoes last command if one exists
        label: "Redo",
        click: redo
      },
      {
        type: "separator"
      },
      { //Opens BPM Window
        label: "Change BPM",
        click: BPMWindow
      },
      {
        type: "separator"
      },
      {
        label: "Preferences",
        click: preferences
      }
    ]
  },
  { //Help menu
    label: "Help",
    submenu: [
      { //undoes last command
        label: "Documentation",
        click: () => {
          shell.openExternal("https:/www.github.com/qawse3dr");
        }
      },
      { //redoes last command if one exists
        label: "qawse3dr git page",
        click: () => {
          shell.openExternal("https:/www.github.com/qawse3dr");
        }
      }
    ]
  }
]);

/**************** MENU FUNCTIONS *****************************/
/*saves to a midi file.*/
function save(){
  console.log(dialog.showSaveDialog({
    title: "Save Song",
    filters: [
      {
        name: "Midi Files", extensions: ["midi","mid","MIDI","MID"]
      },
      {
        name: "All Files", extensions: ["*"]
      }
    ]
  }
  )
)
}

/*Opens another window to load a midi file.*/
function load(){
  console.log(dialog.showOpenDialog({
    title: "Load Song",
    properties: ["openFile"],
    filters: [
      {
        name: "Midi Files", extensions: ["midi","mid","MIDI","MID"]
      },
      {
        name: "All Files", extensions: ["*"]
      }
    ]
  }
  )
)
}

/*undos last command if it can.*/
function undo(){

}

/*redoes last command if it can.*/
function redo(){

}

/*Opens save bpm window*/
function BPMWindow(){
  // Create the browser window.
  var BPMwin = new BrowserWindow({
    width: 200,
    height: 150,
    titleBarStyle: "hidden",
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,

    }
  })
  BPMwin.setMenuBarVisibility(false);
  BPMwin.setResizable(false);



  // and load the index.html of the app.
  BPMwin.loadFile('src/BPM.html')
  BPMwin.show();
}

/*Opens Prefernces window*/
function preferences(){

}


Menu.setApplicationMenu(menu)

/****************MENU FUCNTIONS END*****************************/

//Starts the app when its ready.
app.on("ready",createWindow);

//Runs when app closes(clean up)
app.on("close", () => {
  win = null;
})
