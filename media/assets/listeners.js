
window.addEventListener('DOMContentLoaded', () => {
    if (document.readyState === "complete") {
      window.vscode.postMessage({command : 'loadConversationData'});
      window.vscode.postMessage({command : 'loadAnswersData'});
    }
  });