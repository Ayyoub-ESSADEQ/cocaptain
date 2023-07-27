import * as vscode from 'vscode';
import { WebSocket } from 'ws';

const config = {
    searchPattern: /(\/\/|#|--|<!--)\s?ask\s?(.+?)(\?|-->)$/,
    instraction: ["All the code in one codeblock"]
};

export type ConversationData = {
    conversationId : string,
    messageId : string
};

type Answer = {
    text: string
    messageId: string
    conversationId: string
  };

export  async function retrieveAnswer(question: string) {
    const chatgptAnswer = new Promise((resolve, reject)=>{
        const url = 'ws://localhost:1956';
        const chatgpt = new WebSocket(url);

        chatgpt.onopen = ()=>{
            chatgpt.send(JSON.stringify({clientID : "vscode"}));
            chatgpt.send( 
                JSON.stringify({
                    source : "vscode",
                    destination : "chatGPT",
                    conversation : {
                        question : question+" ["+config.instraction.join(', ')+" ]",
                        conversationId : undefined,
                        parentMessageId : undefined,
                        deleteAfterFinished : true
                    }
            }));
            
            chatgpt.onmessage = (message)=>{
                //@ts-ignore
                const concreteData : any = JSON.parse(message.data);
                if(concreteData.answer.done === true){
                    const completeAnswer = concreteData.answer.conversationData.text;
                    resolve(completeAnswer);
                }
            };

            chatgpt.onerror = (error) => {
                reject(error);
            };
      
            chatgpt.onclose = () => {
                reject(new Error('WebSocket connection closed.'));
            };
        };
    });
    
    return chatgptAnswer;

}

export async function assignTitle(context : vscode.ExtensionContext){

    const title = await vscode.window.showInputBox({
        prompt: 'Enter the title',
        placeHolder: 'give a title to your conversation..',
    });

    const url = 'ws://localhost:1956';
    const chatgpt = new WebSocket(url);
    const conversationData : ConversationData |undefined = context.workspaceState?.get('KeepSameConversation');
    if(conversationData){
    chatgpt.onopen = ()=>{
        try{
            chatgpt.send(JSON.stringify({clientID : "vscode"}));
            chatgpt.send( 
                JSON.stringify({
                    source : "vscode",
                    destination : "chatGPT",
                    conversation : {
                        conversationId : conversationData?.conversationId,
                        title : title
                    }
            }));

            chatgpt.onerror = (error : any) => {
                vscode.window.showErrorMessage(error);
            };
        
            chatgpt.onclose = () => {
                vscode.window.showErrorMessage("The websocket server has been closed");
    
            };

            vscode.window.showInformationMessage('The conversation got a title',"Ok");
 
        }
        catch{
            vscode.window.showErrorMessage("Something went wrong while assigning the title");
        }
    };
    }else{
        vscode.window.showErrorMessage("You didn't start a conversation yet.");
    }
}

export default config;