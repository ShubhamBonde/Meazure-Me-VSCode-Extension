import * as vscode from 'vscode';

export class TrackDialogPanel {
    public static currentPanel: TrackDialogPanel | undefined;
    private static readonly _viewType = 'meazureme-trackdialogpanel';
    private static readonly _title = "Activity Tracker";
    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
    private readonly _disposables: vscode.Disposable[] = [];

    public static create(context: vscode.ExtensionContext) {
        if (this.currentPanel) {
            return this.currentPanel;
        }

        const trackingDialogPanel = this.createTrackDialogPanel(context.extensionUri);
        this.currentPanel = new TrackDialogPanel(trackingDialogPanel, context.extensionUri);
    }

    public dispose() {
        TrackDialogPanel.currentPanel = undefined;

        // Dispose the webview panel.
        this._panel.dispose();

        while (this._disposables.length) {
            const disposable = this._disposables.pop();

            if (disposable) {
                disposable.dispose();
            }
        }
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._extensionUri = extensionUri;

        this._panel.webview.html = this.getTrackingDialogContent();

        // Dispose the view once everything is disposed.
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }

    private static createTrackDialogPanel(uri: vscode.Uri) {
        return vscode.window.createWebviewPanel(
            this._viewType,
            this._title,
            vscode.ViewColumn.One,
            this.getDialogOptions(uri)
        );
    }

    private static getDialogOptions(uri: vscode.Uri): Object {
        return {
            enableScripts: true
        };
    }

    private getTrackingDialogContent() {
        const scriptsPathUri = vscode.Uri.joinPath(this._extensionUri, "statics/scripts", "script.js"),
            stylesPathUri = vscode.Uri.joinPath(this._extensionUri, "statics", "style.css"),
            mediaFolderPathUri = vscode.Uri.joinPath(this._extensionUri, "media"),
            webViewScriptUri = this._panel.webview.asWebviewUri(scriptsPathUri),
            webViewStylesUri = this._panel.webview.asWebviewUri(stylesPathUri),
            startIconUri = this._panel.webview.asWebviewUri(vscode.Uri.joinPath(mediaFolderPathUri, 'svg/play_icon.svg')),
            pauseIconUri = this._panel.webview.asWebviewUri(vscode.Uri.joinPath(mediaFolderPathUri, 'svg/pause_icon.svg')),
            stopIconUri = this._panel.webview.asWebviewUri(vscode.Uri.joinPath(mediaFolderPathUri, 'svg/stop_icon.svg'));
        return `<!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <link rel="stylesheet" href="${webViewStylesUri}">
                    <script nonce=${getNonce()} src="${webViewScriptUri}" defer></script>
                </head>
                <body>
                    <div id="project-details-display-cntr" class="project-display-cntr no-display">
                        <div class="project-name-dipslay">
                            <h1 class="project-name-dipslay-header">Active Project</h1>
                            <table class="project-details-display">
                                <tbody>
                                    <tr class="project-name-diplay-row">
                                        <td class="project-details-table-header">Project Name</td>
                                        <td id="project-name-display-cell">Creating VSCode extension</td>
                                    </tr>
                                    <tr class="project-task-diplay-row">
                                        <td class="project-details-table-header">Task</td>
                                        <td id="project-task-display-cell"></td>
                                    </tr>
                                    <tr class="project-task-diplay-row">
                                        <td class="project-details-table-header">Task Description</td>
                                        <td id="project-task-description-display-cell"></td>
                                    </tr>
                                    <tr class="project-ellapsed-time-display-row">
                                        <td class="project-details-table-header">Ellapsed Time</td>
                                        <td id="project-ellapsed-time-display-cell">00:00:00</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="display-button-options">
                                <button class="tracking-trigger-button pause-button" id="puase-tracking-button" onclick="handlePauseClick()" title="Pause Project">
                                    <img src="${pauseIconUri}" width="32px" height="32px">
                                </button>
                                <button class="tracking-trigger-button resume-button no-display" id="resume-tracking-button" onclick="handleResumeClick()" title="Start Project">
                                    <img src="${startIconUri}" width="32px" height="32px">
                                </button>
                                <button class="tracking-trigger-button stop-button" id="stop-tracking-button" onclick="handleStopClick()" title="Stop Project">
                                    <img src="${stopIconUri}" width="32px" height="32px">
                                </button>
                            </div>
                            <div class="extender"></div>
                        </div>
                    </div>
                    <div id="project-details-form" class="main-container">
                        <span class="form-name-header">
                            <center>
                                <h1>Activity Tracker</h1>
                            </center>
                        </span>
                        <form method="dialog">
                            <div class="tracker-form-container">
                                <!-- Project name input control -->
                                <div class="input-control project-name-input-control">
                                    <label for="project-name">Project Name</label><br>
                                    <input type="text" id="project-name" maxlength="50" placeholder="Enter Project Name" autofocus required></input>
                                </div>

                                <!-- Project task input control -->
                                <div class="input-control project-task-input-control">
                                    <label for="project-task">Task</label><br>
                                    <input type="text" id="project-task" maxlength="100" placeholder="Enter Task" required></input>
                                </div>

                                <!-- Project description input control -->
                                <div class="input-control project-task-description-input-control">
                                    <label for="task-description">Description</label><br>
                                    <textarea id="task-description" maxlength="250" placeholder="Enter Description (Optional)"></textarea>
                                </div>

                                <div class="input-control tracker-button-group">
                                    <button class="tracking-trigger-button start-button" id="start-tracking-button"
                                        onclick="handleProjectStart()">Start</button>
                                </div>
                                <span class="tracking-timer" id="tracking-ellapsed-time-display"></span>
                            </div>
                        </form>
                    </main>
                </body>
            </html>`;
    }
}

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}