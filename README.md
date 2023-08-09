# ChatGPT Integration for Visual Studio Code

## Description:

- **Cocaptain** extension allows you to connect to ChatGPT directly from within your Visual Studio Code editor, enabling you to leverage its advanced natural language processing capabilities without leaving your coding environment.

![chatpanel](https://github.com/Ayyoub-ESSADEQ/cocaptain/blob/main/screenshots/chat-panel-demo.gif?raw=true)

## Key Features:

1. **Interactive Chat** : Engage in interactive conversations with ChatGPT right from your editor. Get instant responses and receive intelligent suggestions for code, documentation, and more.

2. **Code Assistance** : Harness the power of ChatGPT to assist you with code-related queries. Ask questions about specific programming languages, libraries, frameworks, or coding concepts, and receive helpful responses tailored to your needs.

3. **Contextual Code Generation** : Generate code snippets, function prototypes, and boilerplate code based on your conversation with ChatGPT. Quickly scaffold your projects and streamline your development workflow.

4. **Code execution** : you could execute the code suggested by chatgpt right from the chatpanel.

5. **Whole New Developement experience** : the power of bringing chatgpt to vscode is that chatgpt will have access to the power of vscode, allowing you to create command to generate databases, directories, servers, installing dependencies, code generation .. 

7. **Secure and Private** : The extension prioritizes privacy and data security. The power of our extension is it doesn't rely on any third party beside chatgpt webapp, which means that you are literally using chatgpt in vscode.

# Instructions
- install the **chatgpt-connect** in Chrome.
- install the **Cocaptain** vscode extension (make sure to click on the chat icon to start the conversation and to be able to connect with **chatgpt-connect**).
- Make sure that the chatgpt-connect is connected.

# Vscode Commands 
- To assign a title to the coversation you having with chatgpt using the vscode command : `assign title to conversation` and enter the title you want to assign.
- If you want to start a new conversation with chatgpt use vscode extension : `new conversation` and then you have to start asking chatgpt in the new context.
- To ask chatgpt from the active text editor respect this syntax : `OpeningComment + ask + question + ? +closingComent` then click `tab`. It autodetects the programming language you currently using. Here is an example : 

!["demo"](https://github.com/Ayyoub-ESSADEQ/cocaptain/blob/main/screenshots/python-demo.gif?raw=true)
- Code Complation : if you just started coding but you didn't know how to finish the rest of the code, just go to the context menu, under chatgpt you will find an option called complete code and voila you're done.
- Comments generation : are you struggling to find the accurate words to comment your code ? We get you covered !! just open the context menu, under the option chatgpt you will find an option : `comment the selected code` and you're done.

!["Cocaptain new features"](https://github.com/Ayyoub-ESSADEQ/cocaptain/blob/main/screenshots/cocaptain%20new%20features.gif?raw=true)

# Tips & Tricks 
- If you want to create a directory and you don't have time to do so, create a new powershell file, and there write something like : 

!["demo"](https://github.com/Ayyoub-ESSADEQ/cocaptain/blob/main/screenshots/powershell-demo.gif?raw=true)


- If there many dependencies that you want to install, do the same in powershell.
- When using chatgpt in the active text editor make sure to ask he to bring only the script in one codeblock.
- If you want to run a script right from the chat panel, you should make sure that the required dependencies and requirement are met (for example to run javascript you need to have Node js installed).
- To clear the conversation you just delete the content of chatGPT.json file.
