const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');
const quickRepliesDiv = document.getElementById('quick-replies');

let isTagalogMode = false;
let isEnglishMode = true;  // Default mode is English

function loadLanguageMode() {
  const stored = sessionStorage.getItem('isTagalogMode');
  if (stored) {
    isTagalogMode = stored === 'true';
    isEnglishMode = !isTagalogMode;  // Switch to English mode if Tagalog is false
  }
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
      message = isEnglishMode ? "You can find the announcements in the Announcements/News section in the menu." : "Makikita ang mga announcements sa Announcements / News section sa menu.";
      break;
    case "location":
      message = isEnglishMode ? "2435 Marigold St., Lakeview Homes Subd., Putatan, Muntinlupa City." : "2435 Marigold St., Lakeview Homes Subd., Putatan, Muntinlupa City.";
      break;
    case "contact":
      message = isEnglishMode ? "Email: lakeviewintegratedschool@gmail.com or call (02) 8999-0000." : "Email: lakeviewintegratedschool@gmail.com o tumawag sa (02) 8999-0000.";
      break;
    case "academic calendar":
      message = isEnglishMode ? "The school year starts in June and ends in March." : "Ang school year ay nagsisimula tuwing Hunyo at nagtatapos ng Marso.";
      break;
    case "tuition":
      message = isEnglishMode ? "Tuition fees vary by grade level. Contact the registrar for details." : "Ang tuition fees ay depende sa grade level. Makipag-ugnayan sa registrar para sa details.";
      break;
    case "events":
      message = isEnglishMode ? "Check the Events section on the website for upcoming school activities." : "I-check ang Events section ng website para sa upcoming school activities.";
      break;
    case "teachers":
      message = isEnglishMode ? "Our teachers are highly experienced and dedicated. Please contact the school office for the faculty list." : "Ang aming mga guro ay may malawak na karanasan at dedikasyon sa pagtuturo. Magtanong sa school office para sa listahan ng faculty.";
      break;
    default:
      message = isEnglishMode ? "Sorry, I don't have information about that." : "Pasensya na, wala akong impormasyon tungkol diyan.";
  }
  appendMessage("LIS Bot", message);
}

function getBotReply(message) {
  const currentHour = new Date().getHours();
  let greeting = isEnglishMode ? "Hello! How can I help you today?" : "Kamusta! Ano ang maitutulong ko sa iyo?";
  if (currentHour < 12) greeting = isEnglishMode ? "Good morning! How can I help you?" : "Magandang umaga! Ano ang maitutulong ko sa iyo?";
  else if (currentHour < 18) greeting = isEnglishMode ? "Good afternoon! How can I help you?" : "Magandang hapon! Ano ang maitutulong ko sa iyo?";
  else greeting = isEnglishMode ? "Good evening! How can I help you?" : "Magandang gabi! Ano ang maitutulong ko sa iyo?";

  const msgLower = message.toLowerCase();

  // Handle "thank you" responses
  if (/(thank\s?you|thanks|salamat)/i.test(msgLower)) {
    return isEnglishMode ? "You're welcome! Let me know if you need anything else." : "Walang anuman! Nandito lang ako kung kailangan mo pa ng tulong.";
  }

  // Handle greetings
  if (["hi", "hello", "how are you", "hey"].some(word => msgLower.includes(word))) {
    return greeting;
  }

  // Keywords mapping to categories
  const keywords = {
    "announcement": ["announcement", "notices", "news", "updates", "events"],
    "tuition": ["tuition", "fees", "cost", "how much", "payment", "charges"],
    "admission": ["admission", "requirements", "enrollment", "apply", "process"],
    "events": ["events", "activities", "upcoming", "school events"],
    "location": ["location", "address", "where", "where's", "located"],
    "teachers": ["teachers", "faculty", "staff", "instructors"],
    "holidays": ["holidays", "vacation", "school breaks"],
    "motto": ["motto", "school mission", "slogan"],
    "contact": ["contact", "email", "phone", "reach us"],
    "academic calendar": ["academic calendar", "school year", "year schedule", "school timetable"],
    "programs": ["programs", "courses", "subjects", "curriculum"],
    "clubs": ["clubs", "student organizations", "extracurricular", "sports"],
    "facilities": ["facilities", "library", "gym", "classrooms", "labs"],
    "resources": ["resources", "learning materials", "textbooks", "modules"],
    "schedule": ["schedule", "class schedule", "school hours"],
    "reminders": ["reminders", "alerts", "notifications"],
    "registration": ["registration", "sign up", "register", "how to register"],
    "fees": ["fees", "tuition fees", "cost breakdown"],
    "transport": ["transport", "school bus", "commute"]
  };

  // Match the keyword and respond accordingly
  for (let [category, keywordsArray] of Object.entries(keywords)) {
    for (let keyword of keywordsArray) {
      if (msgLower.includes(keyword)) {
        return getResponseForCategory(category);
      }
    }
  }

  return isEnglishMode ? "Sorry, I didn't understand that. You can ask about admission, tuition, programs, or facilities." : "Pasensya na, hindi ko maintindihan. Maaari kang magtanong tungkol sa enrollment, tuition, programs, o facilities.";
}

function getResponseForCategory(category) {
  const responses = {
    "announcement": isEnglishMode ? "You can find the announcements in the Announcements/News section in the menu." : "Makikita ang mga announcements sa Announcements / News section sa menu.",
    "tuition": isEnglishMode ? "Tuition fees vary by grade level. Contact the registrar for details." : "Ang tuition fees ay depende sa grade level. Makipag-ugnayan sa registrar para sa details.",
    "admission": isEnglishMode ? "For admission, bring your birth certificate, report card, and two 2x2 photos." : "Para sa admission, magdala ng birth certificate, report card, at 2x2 na larawan.",
    "events": isEnglishMode ? "Check the Events section on the website for upcoming school activities." : "I-check ang Events section ng website para sa upcoming school activities.",
    "location": isEnglishMode ? "The school is located at 2435 Marigold St., Lakeview Homes Subd., Putatan, Muntinlupa City." : "Nasa 2435 Marigold St., Lakeview Homes Subd., Putatan, Muntinlupa City kami.",
    "teachers": isEnglishMode ? "Our teachers are highly experienced and dedicated. Please contact the school office for the faculty list." : "Ang aming mga guro ay may malawak na karanasan at dedikasyon sa pagtuturo. Magtanong sa school office para sa listahan ng faculty.",
    "holidays": isEnglishMode ? "Check the Announcements section for a list of holidays and school breaks." : "I-check ang Announcements section para sa listahan ng mga holidays at school breaks.",
    "motto": isEnglishMode ? "Our motto: 'Education for a brighter future.'" : "Ang aming motto: 'Education for a brighter future'.",
    "contact": isEnglishMode ? "Email: lakeviewintegratedschool@gmail.com, Phone: (02) 8999-0000." : "Email: lakeviewintegratedschool@gmail.com, Phone: (02) 8999-0000.",
    "academic calendar": isEnglishMode ? "The school year starts in June and ends in March." : "Ang school year ay nagsisimula tuwing Hunyo at nagtatapos ng Marso.",
    "programs": isEnglishMode ? "We offer programs from Kindergarten to Senior High School." : "Nag-aalok kami ng programs mula Kindergarten hanggang Senior High School.",
    "clubs": isEnglishMode ? "We have sports clubs, science clubs, art clubs, and more. Please ask the guidance office for details." : "May mga sports club, science club, art club, at marami pang iba. Magtanong sa guidance office.",
    "facilities": isEnglishMode ? "Our school facilities include a library, science labs, computer labs, gym, and a clinic." : "Ang aming school facilities ay may library, science labs, computer labs, gym, at clinic.",
    "resources": isEnglishMode ? "Learning materials are available in the Resources section of the website." : "Ang mga learning materials ay matatagpuan sa Resources section ng website.",
    "schedule": isEnglishMode ? "Classes usually start at 8 AM and end at 4 PM." : "Ang classes ay kadalasang nagsisimula ng 8 AM at natatapos ng 4 PM.",
    "reminders": isEnglishMode ? "Don't forget to check the Announcements for any important reminders." : "Don't forget to check the Announcements for any important reminders.",
    "registration": isEnglishMode ? "To register, visit the Registration section on the website or contact the registrar." : "Para mag-register, pumunta sa Registration section ng website o makipag-ugnayan sa registrar.",
    "fees": isEnglishMode ? "For tuition fees, contact the registrar for a full breakdown." : "Para sa tuition fees, makipag-ugnayan sa registrar para sa kumpletong detalye.",
    "transport": isEnglishMode ? "We have a school shuttle service and public transportation options available. Check the Transport section for more details." : "We have a school shuttle service and public transportation options available. Check the Transport section for more details."
  };

  return responses[category] || (isEnglishMode ? "Sorry, I didn't understand that. You can ask about admission, tuition, programs, or facilities." : "Pasensya na, hindi ko maintindihan. Maaari kang magtanong tungkol sa enrollment, tuition, programs, o facilities.");
}

// Toggle open
chatbotToggleBtn.addEventListener('click', () => {
  chatbotContainer.style.display = 'flex';
  setTimeout(() => chatbotContainer.classList.add("active"), 10);
  chatbotContainer.setAttribute("aria-hidden", "false");
  chatbotInput.focus();

  appendMessage("LIS Bot", isEnglishMode ? "Hello! What would you like to know? Choose from the buttons below." : "Kamusta! Piliin mo ang gusto mong malaman sa mga button sa ibaba.");
  displayQuickReplies();
});

chatbotCloseBtn.addEventListener('click', () => {
  chatbotContainer.classList.remove("active");
  setTimeout(() => chatbotContainer.style.display = 'none', 300);
  chatbotContainer.setAttribute("aria-hidden", "true");
});

chatbotForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = chatbotInput.value.trim();
  if (message === '') return;

  appendMessage("You", message);
  const botReply = getBotReply(message);
  appendMessage("LIS Bot", botReply);
  chatbotInput.value = '';
  chatbotInput.focus();
});

loadLanguageMode();
