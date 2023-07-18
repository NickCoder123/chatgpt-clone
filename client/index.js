import bot from './assets/bot.svg';
import user from './assets/user.svg';

const formElement = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

const loader = (element) => {
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}

const typeText = (element, text) => {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

const generateId = () => {
  const timestamp = Date.now();
  const randomNum = Math.random();
  const hexaString = randomNum.toString(16);

  return `id-${timestamp}-${hexaString}`;
}

const chatStripe = (isAi, value, uniqueId) => {
  return (
    `
      <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
          <div class="profile">
            <img
              src="${isAi ? bot : user}"
              alt="${isAi ? 'bot' : 'user'}"
            />
          </div>
          <div class="message" id="${uniqueId}">
            ${value}
          </div>
        </div>
      </div>
    `
  );
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(formElement);

  // user's chat stripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  formElement.reset();

  // chatgpt's chat stripe
  const uniqueId = generateId();

  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
}

formElement.addEventListener('submit', handleSubmit);
formElement.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
