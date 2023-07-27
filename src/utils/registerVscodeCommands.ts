import * as vscode from 'vscode';
import {assignTitle } from "./config";
import { SidebarProvider } from '../SidebarProvider';
import actionOnSelection from './actionOnSelection';

export default function registerVscodeCommand(context : vscode.ExtensionContext, sidebarProvider : SidebarProvider){
    //Command to start new conversation
    const newConversation = vscode.commands.registerCommand(
        "chatgpt.newConversation",
        async ()=>{
            await context.workspaceState.update("KeepSameConversation", undefined);
            vscode.window.showInformationMessage('Now you could start a new conversation',"Ok");
            sidebarProvider.postMessageToWebview(
                {
                    command : "new conversation"
                }
            );
        }
    );
    
    //Command to assign a title to the current converesation
    const assignTitleCommand = vscode.commands.registerCommand(
        "chatgpt.assignTitle",
        async ()=>{
            await assignTitle(context);
        }
    );

    //Command to refresh the webview in case there is a problem
    const refreshExtension = vscode.commands.registerCommand(
        "chatgpt.refresh",
        ()=>{
            sidebarProvider.reloadWebview();
        }
    );
    
    //Add comments to the selected code
    const commentSelection = vscode.commands.registerCommand("chatgpt.commentCode", ()=>{
        const prompt = "comment the following code and return only the codeblock";
        actionOnSelection(prompt);
    });

    //Add comments to the selected code
    const completeCode = vscode.commands.registerCommand("chatgpt.completeCode", ()=>{
        const prompt = "guess what coming next in a way that you complete the following code and return only the codeblock (in markdown language)";
        actionOnSelection(prompt);
    });

    context.subscriptions.push(newConversation);
    context.subscriptions.push(assignTitleCommand);
    context.subscriptions.push(refreshExtension);
    context.subscriptions.push(commentSelection);
    context.subscriptions.push(completeCode);
}