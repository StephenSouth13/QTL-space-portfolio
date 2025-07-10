"use strict";
let profileData = null;
let aiConfig = null;
const conversationHistory = [];
async function loadData() {
    try {
        const profileResponse = await fetch('data/profile.json');
        profileData = await profileResponse.json();
        const configResponse = await fetch('ai/config.json');
        aiConfig = await configResponse.json();
    }
    catch (error) {
        console.error('Error loading data:', error);
    }
}
const commands = [
    {
        pattern: /hello|hi/i,
        handler: () => (aiConfig === null || aiConfig === void 0 ? void 0 : aiConfig.responses.greeting) || "Hello!"
    },
    {
        pattern: /education/i,
        handler: () => 'Here is the education background:\n' + profileData.education.map(e => `- ${e.degree} at ${e.school} (${e.years})`).join('\n')
    },
    {
        pattern: /skill|skills/i,
        handler: () => 'Here are the skills:\n' + Object.entries(profileData.skills).map(([category, skills]) => `* ${category.charAt(0).toUpperCase() + category.slice(1)}: ${skills.join(', ')}`).join('\n')
    },
    {
        pattern: /experience/i,
        handler: () => 'Here is the work experience:\n' + profileData.experience.map(e => `- ${e.role} at ${e.company} (${e.period})`).join('\n')
    },
    {
        pattern: /project/i,
        handler: () => 'Here are some of the projects:\n' + profileData.projects.map(p => `- ${p.name} (${p.date})`).join('\n')
    },
    {
        pattern: /achievement/i,
        handler: () => 'Here are the achievements:\n' + Object.entries(profileData.achievements).map(([category, achievements]) => `* ${category.charAt(0).toUpperCase() + category.slice(1)}: ${achievements.join(', ')}`).join('\n')
    },
    {
        pattern: /contact|email|phone/i,
        handler: () => `You can reach out via:\n- Email: ${profileData.email}\n- Phone: ${profileData.phone}\n- Website: ${profileData.website}`
    },
    {
        pattern: /about|who are you/i,
        handler: () => `I am an AI assistant for ${profileData.name}, a ${profileData.role}.`
    },
    {
        pattern: /help/i,
        handler: () => {
            const availableCommands = commands
                .filter(c => !/help|clear|theme/i.test(c.pattern.source))
                .map(c => c.pattern.source.replace(/\\i$/, '').replace(/\|/g, ', '))
                .join('\n- ');
            return `You can ask me about:\n- ${availableCommands}\n- theme (light/dark)\n- clear (to clear chat)`;
        }
    },
    {
        pattern: /clear/i,
        handler: () => {
            const historyContainer = document.querySelector('.ai-message-history');
            if (historyContainer) {
                historyContainer.innerHTML = '';
            }
            conversationHistory.length = 0;
            return 'Chat history cleared.';
        }
    },
    {
        pattern: /theme (light|dark)/i,
        handler: (query) => {
            const match = query.match(/theme (light|dark)/i);
            const theme = match === null || match === void 0 ? void 0 : match[1].toLowerCase();
            if (theme === 'light' || theme === 'dark') {
                document.body.classList.remove('light-theme', 'dark-theme');
                document.body.classList.add(`${theme}-theme`);
                return `Theme changed to ${theme}.`;
            }
            return "Invalid theme. Use 'light' or 'dark'.";
        }
    }
];
function getAIResponse(query) {
    if (!profileData || !aiConfig) {
        return 'I am still booting up. Please try again in a moment.';
    }
    const q = query.toLowerCase().trim();
    for (const command of commands) {
        if (command.pattern.test(q)) {
            const response = command.handler(q);
            conversationHistory.push({ user: query, bot: response });
            return response;
        }
    }
    const fallbackResponse = aiConfig.responses.fallback;
    conversationHistory.push({ user: query, bot: fallbackResponse });
    return fallbackResponse;
}
function createAIAssistant() {
    const container = document.querySelector('.ai-assistant-container');
    if (!container)
        return;
    const assistantHTML = `
        <div class="ai-assistant">
            <div class="hologram">
                <img src="assets/images/avatar-astronaut.png" alt="AI Assistant" style="width: 100px; height: 100px;">
            </div>
            <div class="ai-dialog-box">
                <div class="ai-message-history"></div>
                <input type="text" class="ai-input" placeholder="Ask me anything...">
            </div>
        </div>
        <button class="toggle-ai">
            <img src="assets/icons/astronaut.svg" alt="Toggle AI">
        </button>
    `;
    container.innerHTML = assistantHTML;
    const toggleButton = container.querySelector('.toggle-ai');
    const assistant = container.querySelector('.ai-assistant');
    const input = container.querySelector('.ai-input');
    const historyContainer = container.querySelector('.ai-message-history');
    if (toggleButton && assistant) {
        toggleButton.addEventListener('click', () => {
            assistant.classList.toggle('active');
            if (assistant.classList.contains('active') && historyContainer.children.length === 0) {
                const initialMessage = (aiConfig === null || aiConfig === void 0 ? void 0 : aiConfig.responses.greeting) || 'Hello!';
                appendMessage(initialMessage, 'bot', historyContainer);
            }
        });
    }
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = input.value;
                appendMessage(query, 'user', historyContainer);
                input.value = '';
                setTimeout(() => {
                    const response = getAIResponse(query);
                    appendMessage(response, 'bot', historyContainer);
                }, 500);
            }
        });
    }
}
function appendMessage(text, sender, container) {
    const messageElement = document.createElement('p');
    messageElement.classList.add(`ai-message`, `${sender}-message`);
    messageElement.innerText = text;
    container.appendChild(messageElement);
    container.scrollTop = container.scrollHeight;
}
document.addEventListener('DOMContentLoaded', () => {
    loadData().then(() => {
        createAIAssistant();
    });
});
