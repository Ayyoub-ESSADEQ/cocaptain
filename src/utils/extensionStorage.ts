import fs from "fs";
import * as vscode from "vscode";

export default function createExtensionStorage(filePath : string, chatgptFolder : string){
    // Check if the file already exists
    if (!fs.existsSync(filePath)) {
      const data: any= [];
      fs.writeFile(filePath, JSON.stringify(data), err => {
        if (err) {
          vscode.window.showErrorMessage(`Error writing JSON file:${err}`);
        }
      });
    }

    if(!fs.existsSync(chatgptFolder)){
        fs.mkdirSync(chatgptFolder);
    }
}