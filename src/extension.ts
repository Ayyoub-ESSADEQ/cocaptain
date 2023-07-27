import { SidebarProvider } from "./SidebarProvider";
import * as vscode from 'vscode';
import runServer from './utils/webSocket server';
import path from 'path';
import { retrieveQuestion } from "./utils/retrieveQuestion";
import insertAnswer from "./utils/insertAnswer";
import createExtensionStorage from "./utils/extensionStorage";
import registerVscodeCommand from "./utils/registerVscodeCommands";


export function activate(context: vscode.ExtensionContext) {
	const workspaceFolder = vscode?.workspace?.workspaceFolders?.[0]?.uri?.fsPath;
	const filePath = workspaceFolder ?path.join(workspaceFolder, 'chatGPT.json') : '';
	const chatgptFolder = workspaceFolder ?path.join(workspaceFolder, '.chatgpt') : '';

	if(workspaceFolder){
		runServer();
		createExtensionStorage(filePath, chatgptFolder);
	
		const sidebarProvider = new SidebarProvider(context.extensionUri,context);
		context.subscriptions.push(
			vscode.window.registerWebviewViewProvider("chatgpt-sidebar", sidebarProvider,{
				webviewOptions: { retainContextWhenHidden: true }
			}),
			vscode.commands.registerCommand(
				"chatgptAnswer",
				(position, question)=>{insertAnswer(position,question);})
		);
	
		registerVscodeCommand(context, sidebarProvider);

		//Here is the way to implement text compelition
		const provider: vscode.CompletionItemProvider = {
			// @ts-ignore
			provideInlineCompletionItems: async (document, position, context, token) => {
	
				const textBeforeCursor = document.getText(
					new vscode.Range(position.with(undefined, 0), position)
				);
	
				const match = retrieveQuestion(textBeforeCursor);
	
				if (match) {
					const completionItem = new vscode.CompletionItem('Choose Option', vscode.CompletionItemKind.Text);
					completionItem.command = {
						title : "",
						command : "chatgptAnswer",
						arguments : [position, match.searchPhrase]
					};
	
					const startAnswer = "\n"+match.commentSyntax+"thinking.."+match.commentSyntaxEnd.slice(0,-1);
	
					completionItem.insertText = startAnswer;
					completionItem.range = new vscode.Range(position, position);
	
					return [completionItem];
				}
		
				return [];
			},
		};
	
		// @ts-ignore
		vscode.languages.registerInlineCompletionItemProvider({pattern: "**"}, provider);

	}

	else{
		vscode.window.showInformationMessage('Cocaptain could only work when you are opening a folder inside vscode');
	}
}

// This method is called when your extension is deactivated
export function deactivate() {
	vscode.window.showInformationMessage('Cocaptain is deativated');
}
