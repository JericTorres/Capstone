const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');
const quickRepliesDiv = document.getElementById('quick-replies');

let isTagalogMode = false;

function loadLanguageMode() {
  const stored = sessionStorage.getItem('isTagalogMode');
  if (stored) isTagalogMode = stored === 'true';
}

function setLanguageMode() {
  sessionStorage.setItem('isTagalogMode', isTagalogMode);
}

function appendMessage(sender, message) {
  const div = document.createElement('div');
  div.className = sender === 'LIS Bot' ? 'bot-message' : 'user-message';
  div.innerText = message;
  chatbotMessages.appendChild(div);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function displayQuickReplies() {
  quickRepliesDiv.innerHTML = `
    <button data-reply="announcements">Announcements</button>
    <button data-reply="location">Location</button>
    <button data-reply="contact">Contact</button>
    <button data-reply="academic calendar">Academic Calendar</button>
    <button data-reply="tuition">Tuition</button>
    <button data-reply="events">School Events</button>
    <button data-reply="teachers">Teachers</button>
  `;
}

quickRepliesDiv.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    handleQuickReply(e.target.dataset.reply);
  }
});

function handleQuickReply(reply) {
  appendMessage("You", reply);
  let message = "";

  switch (reply) {
    case "announcements":
      message = "Makikita ang mga announcements sa Announcements / News section sa menu.";
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
    case "events":
      message = "I-check ang Events section ng website para sa upcoming school activities.";
      break;
    case "teachers":
      message = "Ang aming mga guro ay may malawak na karanasan at dedikasyon sa pagtuturo. Magtanong sa school office para sa listahan ng faculty.";
      break;
    default:
      message = "Pasensya na, wala akong impormasyon tungkol diyan.";
  }
  appendMessage("LIS Bot", message);
}

function getBotReply(message) {
  const currentHour = new Date().getHours();
  let greeting = "Hello! How can I help you today?";
  if (currentHour < 12) greeting = "Good morning! How can I help you?";
  else if (currentHour < 18) greeting = "Good afternoon! How can I help you?";
  else greeting = "Good evening! How can I help you?";

  const msgLower = message.toLowerCase();

  // Handle "thank you" responses
  if (/(thank\s?you|thanks|salamat)/i.test(msgLower)) {
    return "You're welcome! Nandito lang ako kung kailangan mo pa ng tulong.";
  }

  // Handle greetings
  if (["hi", "hello", "kumusta", "hey", "how are you", "kamusta ka"].some(word => msgLower.includes(word))) {
    return greeting;
  }

  // Regex to check if any keyword matches (with fuzzy matching)
  const keywords = {
    "announcement": ["announcement", "announcment", "notices", "updates", "news", "announcement page", "where can i find news", "find announcements"],
    "tuition": ["tuition", "tution", "fees", "bayarin", "cost", "how much is tuition", "how much for tuition", "fees details"],
    "admission": ["admission", "requirements", "enrollment", "school entry", "entry", "admission details", "how to enroll"],
    "events": ["events", "activities", "event", "school events", "activities", "upcoming events", "school activities"],
    "location": ["location", "address", "where", "saan", "where is", "located", "where's", "school location", "school address"],
    "teachers": ["teachers", "faculty", "staff", "instructors", "teacher info", "who are the teachers", "teachers list"],
    "holidays": ["holidays", "vacation", "break", "school break", "holiday schedule", "list of holidays"],
    "motto": ["motto", "slogan", "school motto", "school mission", "our motto"],
    "contact": ["contact", "email", "phone", "reach us", "contact info", "how to contact", "how to reach the school", "contact details"],
    "academic calendar": ["academic calendar", "school year", "year schedule", "school calendar", "academic schedule", "school timetable", "when does the school year start", "when is the school year"]
  };

  // Check for keywords and respond
  for (let key in keywords) {
    if (keywords[key].some(keyword => msgLower.includes(keyword))) {
      return generateResponse(key);
    }
  }

  return "Pasensya na, hindi ko maintindihan. Maaari kang magtanong tungkol sa announcements, enrollment, tuition, o school events.";
}

function generateResponse(keyword) {
  switch (keyword) {
    case "announcement":
      return "You can check the announcements in the 'Announcements' section of the website or app.";
    case "tuition":
      return "Please coordinate with the registrar for the updated tuition and other fees.";
    case "admission":
      return "For admission, please provide your birth certificate, report card, and a 2x2 photo. Enrollment typically happens from May to June.";
    case "events":
      return "Check the Events section of our website for the latest school activities and events.";
    case "location":
      return "We are located at 2435 Marigold St., Lakeview Homes, Putatan, Muntinlupa City.";
    case "teachers":
      return "For teacher contact info, please check with the school office or faculty directory.";
    case "holidays":
      return "You can check the Announcements section for the list of school holidays and breaks.";
    case "motto":
      return "Our school motto is: 'Education for a brighter future'.";
    case "contact":
      return "You can reach us via email at lakeviewintegratedschool@gmail.com or by calling (02) 8999-0000.";
    case "academic calendar":
      return "The school year typically runs from June to March.";
    default:
      return "Pasensya na, hindi ko maintindihan. Maaari kang magtanong tungkol sa announcements, enrollment, tuition, o school events.";
  }
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
