"use strict";
document.addEventListener('DOMContentLoaded', () => {
    initTerminal();
});
function initTerminal() {
    const terminalContainer = document.querySelector('.terminal-container');
    const terminalInput = document.querySelector('.terminal-input');
    const terminalOutput = document.querySelector('.terminal-body .terminal-output');
    document.addEventListener('keydown', (e) => {
        if (e.key === '`') {
            if (terminalContainer) {
                terminalContainer.style.display = 'flex';
                terminalInput.focus();
            }
        }
    });
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value;
                terminalInput.value = '';
                executeCommand(command);
            }
        });
    }
    function executeCommand(command) {
        if (terminalOutput) {
            const outputLine = document.createElement('p');
            outputLine.innerHTML = `<span class="prompt">></span> ${command}`;
            terminalOutput.appendChild(outputLine);
            // Command logic
            switch (command.toLowerCase()) {
                case 'help':
                    terminalOutput.innerHTML += `
                        <p>Available commands:</p>
                        <ul>
                            <li>help - Show this help message</li>
                            <li>clear - Clear the terminal</li>
                            <li>show skills - Display skills</li>
                            <li>contact - Show contact information</li>
                            <li>play music - Play background music</li>
                            <li>launch ai - Open the AI assistant</li>
                            <li>exit - Close the terminal</li>
                        </ul>
                    `;
                    break;
                case 'clear':
                    terminalOutput.innerHTML = '';
                    break;
                case 'show skills':
                    window.location.hash = 'skills';
                    break;
                case 'contact':
                    window.location.hash = 'contact';
                    break;
                case 'play music':
                    const music = document.getElementById('bg-music');
                    if (music)
                        music.play();
                    break;
                case 'launch ai':
                    const aiAssistant = document.querySelector('.ai-assistant');
                    if (aiAssistant)
                        aiAssistant.classList.add('active');
                    break;
                case 'exit':
                    if (terminalContainer)
                        terminalContainer.style.display = 'none';
                    break;
                default:
                    terminalOutput.innerHTML += `<p>Command not found: ${command}</p>`;
            }
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    }
}
