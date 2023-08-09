import * as vscode from 'vscode';
import { retrieveAnswer } from './config';
import extractCodeBlock from './extractCodeBlock';

export default async function actionOnSelection(prompt : string){
    const activeTextEditor = vscode.window.activeTextEditor;

    if (activeTextEditor) {
        const selection = activeTextEditor.selection;
        const selectionRange = new vscode.Range(selection.start,selection.end);
        const selectedText = activeTextEditor.document.getText(selection);
        const answer : any = await retrieveAnswer(prompt + " " + selectedText);
        const codeBlock = extractCodeBlock(answer);
        activeTextEditor.edit((editBuilder)=>{
            editBuilder.replace(selectionRange, codeBlock?codeBlock:selectedText);
        });
    }
    else{
        vscode.window.showErrorMessage('No active text editor or selection found.');
    }
}