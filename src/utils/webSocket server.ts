import WebSocket from 'ws';

function runServer() {
  //1956 : Morocco got its independence

  const bridge = new WebSocket.Server({ port: 1956 });
  const members: { [key: string]: WebSocket } = {};

  bridge.on('connection', (client: WebSocket) => {
    client.on('message', (message: WebSocket.Data) => {
      const messageAsText = message.toString();
      const data = JSON.parse(messageAsText);

      // Here we retrieve the identifier of the client
      const clientID: string = data.clientID;

      // Those are the data related to the question
      const source: string = data.source;
      const destination: string = data.destination;
      const conversation : string = data.conversation;

      // Those are the data related to the answer
      const conversationData: any = data.conversationData;
      const error: any = data.error;
      const done: boolean = data.done;

      // The form of the answer
      const answer = {
        conversationData: conversationData,
        error: error,
        done: done,
      };

      // When the client connects to the server, we add it to the members object in order
      // to direct the messages that correspond to it.

      if (clientID) {
        members[clientID] = client;
      } else {
        const target = members[destination];

        try{
          if (target.readyState === WebSocket.OPEN) {
            const messageBody = {
              source: source,
              conversation : conversation,
              answer: answer,
            };
  
            target.send(JSON.stringify(messageBody));
          }
        }
        catch{
          const error = {error : "Make sure to run chatgpt-connect"};
          members[source].send(JSON.stringify(error));
        }
      }

      isChatgptConnected();
    });
  });

  function isChatgptConnected(){
    const chatgpt = members["chatGPT"];
    const blocker = members['blocker'];
    
    if (blocker){
        if(chatgpt){
            blocker.send(JSON.stringify({command : "hide"}));
            chatgpt.onclose = ()=>{
                blocker.send(JSON.stringify({command : "show"}));
            };
        }
    
        else{
            blocker.send(JSON.stringify({command : "show"}));
        }
    }
  
  }


}



export default runServer;