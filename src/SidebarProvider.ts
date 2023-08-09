import * as vscode from "vscode";
import programmingLanguages from "./utils/commands";
import path from "path";
import fs from 'fs';
import { assignTitle } from "./utils/config";

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;
  private _webview?: vscode.Webview;
  context: vscode.ExtensionContext;

  constructor(private readonly _extensionUri: vscode.Uri, context: vscode.ExtensionContext) {
    this.context = context;
  }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;
    this._webview = webviewView.webview; // Store a reference to the Webview object

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    //Here where you will receive all messages comming from the webview
    webviewView.webview.onDidReceiveMessage((message) => {
      const workspaceFolder = vscode?.workspace?.workspaceFolders?.[0]?.uri?.fsPath;
      const filePath = workspaceFolder ? path.join(workspaceFolder, 'chatGPT.json') : '';

      switch (message.command) {

        case 'executeCode':
          const code = message.data.code;
          const language = message.data.language;

          const command = programmingLanguages[language].command;
          const extension = programmingLanguages[language].extension;
          const chatgptFolder = workspaceFolder ? path.join(workspaceFolder, '.chatgpt') : '';

          if (!fs.existsSync(chatgptFolder)) {
            fs.mkdirSync(chatgptFolder);
          }

          const tempFilePath = path.join(chatgptFolder, `chatGPT${extension}`);
          // Write the code to the temporary file
          fs.writeFileSync(tempFilePath, code);
          const terminal = vscode.window.createTerminal('ChatGPT');
          terminal.sendText(`${command} "${tempFilePath}"`, true);
          // Show and focus the terminal
          terminal.show(true);

          break;

        case 'storeConversationData':
          this.context.workspaceState.update("KeepSameConversation", message.data);
          this.postMessageToWebview({
            command: 'loadConversationData',
            data: this.context.workspaceState.get('KeepSameConversation')
          });
          break;

        case 'loadConversationData':
          this.postMessageToWebview({
            command: 'loadConversationData',
            data: this.context.workspaceState.get('KeepSameConversation')
          });
          break;

        case 'storeAnswersData':
          const previousdata: any = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));

          if (message.data !== undefined) {
            previousdata.push(message.data);
            fs.writeFile(filePath, JSON.stringify(previousdata), err => {
              if (err) {
                vscode.window.showErrorMessage(`Error writing JSON file:${err}`);
              }
            });
          };

          break;

        case 'loadAnswersData':
          const data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
          this.postMessageToWebview({
            command: 'loadAnswersData',
            data: data
          });

          break;

        case 'reload':
          vscode.commands.executeCommand("chatgpt.refresh");
          break;

        case 'new-chat':
          vscode.commands.executeCommand("chatgpt.newConversation");
          break;

        case 'assign-title':
          vscode.commands.executeCommand("chatgpt.assignTitle");
          break;

        case "clear-messages":
          fs.writeFile(filePath, "[]", err => {
            if (err) {
              vscode.window.showErrorMessage(`Error writing JSON file:${err}`);
            }
          });
          break;
      }

    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  public postMessageToWebview(message: any) {
    if (this._webview) {
      this._webview.postMessage(message);
    }
  }

  public reloadWebview() {
    if (this._view !== undefined) {
      const cocaptainWebView = this._getHtmlForWebview(this._view.webview);
      this._view.webview.html = '';
      this._view.webview.html = cocaptainWebView;
    }
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "assets/index.css")
    );

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "assets/index.js")
    );

    const script2Uri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "assets/listeners.js")
    );

    const script3Uri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "assets/windowListeners.js")
    );

    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="module" crossorigin src="${script3Uri}"></script>
        <script type="module" src="${scriptUri}"></script>
        <script defer type="module" crossorigin src="${script2Uri}"></script>
        <link rel="stylesheet" href="${styleUri}">
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>`;
  }
}