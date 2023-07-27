window.vscode = acquireVsCodeApi();

window.addEventListener('message', (event) => {
    const message = event.data;
    
    if (message.command === 'loadConversationData') {
      window.conversationId = message.data.conversationId;
      window.messageId = message.data.messageId;
    }
    else if (message.command === "new conversation"){
      window.conversationId = undefined;
    }
  });





