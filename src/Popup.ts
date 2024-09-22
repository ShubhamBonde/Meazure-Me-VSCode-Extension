import * as vscode from 'vscode';
import * as path from 'path';

export class PopupView {
  private _panel: vscode.WebviewPanel | undefined;

  constructor(context: vscode.ExtensionContext) {
    this._panel = vscode.window.createWebviewPanel(
      'meazureme.popup',
      'Popup',
      vscode.ViewColumn.Active,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(context.extensionPath, 'media'))
        ]
      }
    );

    this._panel.webview.html = this.getWebviewContent();
    this._panel.onDidDispose(() => this._panel = undefined);
  }

  private getWebviewContent() {
    return `<!DOCTYPE html>
            <html>
            <head>
            <style>
            /* Your CSS styles here */
            </style>
            </head>
            <body>
            <form>
            <label for="name">Name:</label>
            <input type="text" id="name"><br><br>
            <label for="time">Time:</label>
            <input type="text" id="time"><br><br>
            <label for="description">Description:</label>
            <textarea id="description"></textarea><br><br>
            <button type="button" id="startTracking">Start Tracking</button>
            </form>
            <script>
            // Your JavaScript logic here
            </script>
            </body>
            </html>`;
  }

  /**
   * getPopUpObj
   */
  public getPopUpObj() {
    return this._panel;
  }
}
