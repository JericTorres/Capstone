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
    <button data-reply="programs">Programs</button>
    <button data-reply="location">Location</button>
    <button data-reply="contact">Contact</button>
    <button data-reply="academic calendar">Academic Calendar</button>
    <button data-reply="tuition">Tuition</button>
    <button data-reply="clubs">Clubs</button>
    <button data-reply="resources">Resources</button>
    <button data-reply="admission requirements">Admission</button>
    <button data-reply="enrollment">Enrollment</button>
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

  if (/(thank\s?you|thanks|salamat)/i.test(msgLower)) {
    return "You're welcome! Nandito lang ako kung kailangan mo pa ng tulong.";
  }

  if (["hi", "hello", "kumusta", "hey", "how are you", "kamusta ka"].some(word => msgLower.includes(word))) {
    return greeting;
  }

  if (msgLower.includes("school time") || msgLower.includes("oras ng klase") || msgLower.includes("class schedule")) {
    return "Classes usually start at 8 AM and finish around 4 PM.";
  }

  if (msgLower.includes("academic calendar") || msgLower.includes("school year")) {
    return "School year runs from June to March.";
  }

  if (msgLower.includes("tuition") || msgLower.includes("bayarin") || msgLower.includes("fees")) {
    return "Please coordinate with the registrar for the updated tuition and other fees.";
  }

  if (msgLower.includes("clubs") || msgLower.includes("sports") || msgLower.includes("extracurricular")) {
    return "We have a wide range of clubs: sports, arts, STEM, and others.";
  }

  if (msgLower.includes("admission") || msgLower.includes("enroll")) {
    return "Requirements: birth certificate, report card, and 2x2 picture. Enrollment is usually in May-June.";
  }

  if (msgLower.includes("facilities") || msgLower.includes("clinic") || msgLower.includes("gym")) {
    return "The school has a library, science labs, computer labs, a gymnasium, and a clinic.";
  }

  if (msgLower.includes("location") || msgLower.includes("saan")) {
    return "We are located at 2435 Marigold St., Lakeview Homes, Putatan, Muntinlupa City.";
  }

  if (msgLower.includes("contact") || msgLower.includes("email") || msgLower.includes("phone")) {
    return "Email: lakeviewintegratedschool@gmail.com, Phone: (02) 8999-0000.";
  }

  if (msgLower.includes("resources") || msgLower.includes("modules") || msgLower.includes("learning materials")) {
    return "Visit our Resources page for downloadable modules and class notes.";
  }

  if (msgLower.includes("announcement")) {
    return "Check our Announcements section for updates on events and news.";
  }

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
