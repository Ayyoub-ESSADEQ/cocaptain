import * as vscode from 'vscode';
import { retrieveAnswer } from "./config";
import extractCodeBlock from './extractCodeBlock';



export default async function insertAnswer(position: vscode.Position, question : string) {
    const activeTextEditor = vscode.window.activeTextEditor;
    const answer : any = await retrieveAnswer(question);
    const codeBlock = extractCodeBlock(answer);

    if (activeTextEditor) {
        const textEdit = new vscode.TextEdit(new vscode.Range(position.with(undefined, 0), position), `\n${codeBlock}`);
        activeTextEditor.edit((editBuilder:vscode.TextEditorEdit) => {
            const line = activeTextEditor.document.lineAt(position.line+1);
            const range = line.range;
            const currentCursorPosition = new vscode.Position(position.line,position.character);
            editBuilder.delete(range);
            editBuilder.insert(currentCursorPosition, textEdit.newText);
        });
    }
    };