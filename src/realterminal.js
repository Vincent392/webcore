document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('command-input');
    const outputDiv = document.getElementById('output');

    const commands = {
        help: 'Available commands: help, ver, echo [message], clear',
        echo: (args) => args.join(' '),
        clear: () => {
            outputDiv.innerHTML = '';
            return '';
        }
        ver: 'webcore 0.1.0\nCodename: Ride the Lightning\nGPL v3 Licensed\nDevelopment Start (webcore): Fri 26th July\n';
    };

    commandInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            processInput();
        }
    });

    commandInput.addEventListener('blur', () => {
        setTimeout(() => commandInput.focus(), 0); // Ensure the input stays in focus
    });

    function processInput() {
        const inputText = commandInput.value.trim();
        if (inputText) {
            processCommand(inputText);
        }
        commandInput.value = '';
    }

    function processCommand(input) {
        const parts = input.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        let output = '';
        if (commands[command]) {
            output = typeof commands[command] === 'function' ? commands[command](args) : commands[command];
        } else {
            output = `Command not found: ${command}`;
        }

        if (output) {
            appendOutput(input, output);
        }
    }

    function appendOutput(input, output) {
        const inputLine = document.createElement('div');
        inputLine.textContent = `> ${input}`;
        outputDiv.appendChild(inputLine);

        const outputLine = document.createElement('div');
        outputLine.textContent = output;
        outputDiv.appendChild(outputLine);

        outputDiv.scrollTop = outputDiv.scrollHeight;
    }

    // Ensure the input is focused when the page loads
    commandInput.focus();
});
