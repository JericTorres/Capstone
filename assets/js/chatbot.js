const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');
const quickRepliesDiv = document.getElementById('quick-replies');

let isTagalogMode = false;
let userName = "";

// Load language mode
function loadLanguageMode() {
  const stored = sessionStorage.getItem('isTagalogMode');
  if (stored) isTagalogMode = stored === 'true';
}

// Set language mode
function setLanguageMode() {
  sessionStorage.setItem('isTagalogMode', isTagalogMode);
}

// Append message to chat
function appendMessage(sender, message) {
  const div = document.createElement('div');
  div.className = sender === 'LIS Bot' ? 'bot-message' : 'user-message';
  div.innerText = message;
  chatbotMessages.appendChild(div);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Display quick replies
function displayQuickReplies() {
  quickRepliesDiv.innerHTML = `
    <button data-reply="announcements">Announcements</button>
    <button data-reply="programs">Programs</button>
    <button data-reply="location">Location</button>
    <button data-reply="contact">Contact</button>
    <button data-reply="academic calendar">Academic Calendar</button>
    <button data-reply="tuition">Tuition</button>
    <button data-reply="clubs">Clubs</button>
    <button data-reply="resources">Resources</button>
    <button data-reply="admission requirements">Admission</button>
    <button data-reply="enrollment">Enrollment</button>
    <button data-reply="events">School Events</button>
    <button data-reply="teachers">Teachers</button>
    <button data-reply="holidays">Holidays</button>
    <button data-reply="motto">School Motto</button>
    <button data-reply="name">What's your name?</button>
    <button data-reply="how are you">How are you?</button>
  `;
}

quickRepliesDiv.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    handleQuickReply(e.target.dataset.reply);
  }
});

// Handle quick reply
function handleQuickReply(reply) {
  appendMessage("You", reply);
  let message = "";

  switch (reply) {
    case "announcements":
      message = "Makikita ang mga announcements sa Announcements / News section sa menu.";
      break;
    case "programs":
      message = "Nag-aalok kami ng programs mula Kindergarten hanggang Senior High School.";
      break;
    case "location":
      message = "2435 Marigold St., Lakeview Homes Subd., Putatan, Muntinlupa City.";
      break;
    case "contact":
      message = "Email: lakeviewintegratedschool@gmail.com o tumawag sa (02) 8999-0000.";
      break;
    case "academic calendar":
      message = "Ang school year ay nagsisimula tuwing Hunyo at nagtatapos ng Marso.";
      break;
    case "tuition":
      message = "Ang tuition fees ay depende sa grade level. Makipag-ugnayan sa registrar para sa details.";
      break;
    case "clubs":
      message = "May sports club, science club, art club, at marami pang iba. Magtanong sa guidance office.";
      break;
    case "resources":
      message = "Learning materials ay nasa Resources section ng website.";
      break;
    case "admission requirements":
      message = "Magdala ng birth certificate, report card, at 2x2 picture para sa admission.";
      break;
    case "enrollment":
      message = "Ang enrollment period ay kadalasang Mayo hanggang Hunyo. I-check ang announcements para sa petsa.";
      break;
    case "events":
      message = "I-check ang Events section ng website para sa upcoming school activities.";
      break;
    case "teachers":
      message = "Ang aming mga guro ay may malawak na karanasan at dedikasyon sa pagtuturo. Magtanong sa school office para sa listahan ng faculty.";
      break;
    case "holidays":
      message = "I-check ang Announcements section para sa listahan ng mga holidays at school breaks.";
      break;
    case "motto":
      message = "Ang aming motto: 'Education for a brighter future'.";
      break;
    case "name":
      message = "Ang pangalan ko ay LIS Bot! Ano ang pangalan mo?";
      break;
    case "how are you":
      message = "I'm doing great, thank you for asking! How about you? Kamusta ka?";
      break;
    default:
      message = "Pasensya na, wala akong impormasyon tungkol diyan.";
  }
  appendMessage("LIS Bot", message);
}

// Get bot reply
function getBotReply(message) {
  const currentHour = new Date().getHours();
  let greeting = "Hello! How can I help you today?";
  if (currentHour < 12) greeting = "Good morning! How can I help you?";
  else if (currentHour < 18) greeting = "Good afternoon! How can I help you?";
  else greeting = "Good evening! How can I help you?";

  const msgLower = message.toLowerCase();

  // Handle greetings
  if (["hi", "hello", "kumusta", "hey", "how are you", "kamusta ka", "how's it going", "what's up"].some(word => msgLower.includes(word))) {
    if (msgLower.includes("how are you") || msgLower.includes("kamusta")) {
      return "I'm doing great, thank you for asking! How about you? Kamusta ka?";
    }
    return greeting;
  }

  // Handle name question
  if (msgLower.includes("what's your name") || msgLower.includes("who are you")) {
    return "My name is LIS Bot! How can I assist you today?";
  }

  // Handle casual conversation
  if (msgLower.includes("what's up") || msgLower.includes("how's it going")) {
    return "I'm here to help you with anything you need. What would you like to know today?";
  }

  // Handle small talk
  if (msgLower.includes("good morning") || msgLower.includes("good afternoon") || msgLower.includes("good evening")) {
    return `Good day to you too! How can I assist you?`;
  }

  // Handle "thank you" responses
  if (/(thank\s?you|thanks|salamat)/i.test(msgLower)) {
    return "You're welcome! Nandito lang ako kung kailangan mo pa ng tulong.";
  }

  // Handle admission or related queries
  if (/(admission|enrollment|requirements|school entry|pagpasok)/i.test(msgLower)) {
    return "For admission, please provide your birth certificate, report card, and a 2x2 photo. Enrollment typically happens from May to June.";
  }

  // Handle "school events" queries
  if (msgLower.includes("events") || msgLower.includes("activities") || msgLower.includes("school events")) {
    return "Check the Events section of our website for the latest school activities and events.";
  }

  // Handle unknown queries
  return "Pasensya na, hindi ko maintindihan. Maaari kang magtanong tungkol sa enrollment, tuition, programs, o facilities.";
}

// Toggle open
chatbotToggleBtn.addEventListener('click', () => {
  chatbotContainer.style.display = 'flex';
  setTimeout(() => chatbotContainer.classList.add("active"), 10);
  chatbotContainer.setAttribute("aria-hidden", "false");
  chatbotInput.focus();

  appendMessage("LIS Bot", "Kamusta! Piliin mo ang gusto mong malaman sa mga button sa ibaba.");
  displayQuickReplies();
});

// Toggle close
chatbotCloseBtn.addEventListener('click', () => {
  chatbotContainer.classList.remove("active");
  setTimeout(() => chatbotContainer.style.display = 'none', 300);
  chatbotContainer.setAttribute("aria-hidden", "true");
});

// Submit
chatbotForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = chatbotInput.value.trim();
  if (!message) return;

  appendMessage("You", message);
  chatbotInput.value = "";
  const botReply = getBotReply(message);
  appendMessage("LIS Bot", botReply);
});

loadLanguageMode();
