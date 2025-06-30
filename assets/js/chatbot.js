const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

let isTagalogMode = false;

function containsTagalog(text) {
  const tagalogKeywords = [
    "ano", "paano", "kailan", "saan", "gusto ko ng tagalog", "nasaang", "paaralan", "eskwela", "mag-enroll", "halaga",
    "salamat", "pasensya"
  ];
  return tagalogKeywords.some(keyword => text.includes(keyword));
}

function getBotReply(message) {
  message = message.toLowerCase().trim();

  // Greetings
  const greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "kumusta"];
  if (greetings.some(greet => message.includes(greet))) {
    return isTagalogMode ? "Kumusta! Paano kita matutulungan?" : "Hello! How can I assist you today?";
  }

  // Thanks
  const thanks = ["thank you", "thanks", "salamat"];
  if (thanks.some(word => message.includes(word))) {
    return isTagalogMode ? "Walang anuman!" : "You're welcome!";
  }

  // Please handling
  if (message.includes("please") || message.includes("paki")) {
    return isTagalogMode ? "Siyempre! Ano ang maitutulong ko?" : "Of course! How can I help you?";
  }

  // Mode switching
  if (message.includes("gusto ko ng tagalog") || message.includes("tagalog mode")) {
    isTagalogMode = true;
    return "Naka-Tagalog mode na. Maaari kang magtanong tungkol sa paaralan.";
  }
  if (message.includes("english mode") || message.includes("gusto ko ng english")) {
    isTagalogMode = false;
    return "Switched to English mode. Ask me anything about the school!";
  }

  // Automatically switch to Tagalog mode if Tagalog keywords detected
  if (containsTagalog(message)) isTagalogMode = true;

  // Tagalog responses
  if (isTagalogMode) {
    if (/mission|misyon/.test(message)) {
      return "Ang aming misyon ay magbigay ng dekalidad, pantay, at kulturang nakabatay sa edukasyon.";
    }
    if (/vision|bisyon/.test(message)) {
      return "Bisyon naming maabot ng bawat mag-aaral ang kanilang buong potensyal.";
    }
    if (/announcement|anunsyo/.test(message)) {
      return "Makikita ang mga anunsyo sa homepage sa seksyong Announcements.";
    }
    if (/news|balita/.test(message)) {
      return "I-click ang News section para sa mga update.";
    }
    if (/student|estudyante/.test(message)) {
      return "May higit sa 2,500 estudyante ang nakatala.";
    }
    if (/faculty|guro|teachers|teachers/.test(message)) {
      return "Mayroon kaming higit sa 125 na mga guro at kawani.";
    }
    if (/principal|punong guro/.test(message)) {
      return "Ang punong-guro namin ay si G. Louie Valdez.";
    }
    if (/event|kaganapan/.test(message)) {
      return "Tingnan ang Event Ticker para sa mga paparating na kaganapan.";
    }
    if (/open house/.test(message)) {
      return "Ang Open House ay sa Nobyembre 15.";
    }
    if (/orientation/.test(message)) {
      return "Ang Orientation para sa internasyonal na estudyante ay sa Enero 10.";
    }
    if (/history|kasaysayan/.test(message)) {
      return "Makikita ang kasaysayan ng paaralan sa pahinang About > History.";
    }
    if (/resources|learning|module/.test(message)) {
      return "Pumunta sa 'Resources' para sa mga module at learning materials.";
    }
    if (/program|kurso/.test(message)) {
      return "Nag-aalok kami ng Kindergarten hanggang Senior High School.";
    }
    if (/contact|email/.test(message)) {
      return "Makipag-ugnayan sa amin sa lakeviewintegratedschool@gmail.com.";
    }
    if (/location|saan/.test(message)) {
      return "Matatagpuan kami sa 2435 Marigold St., Lakeview Homes, Putatan, Muntinlupa.";
    }
    if (/enroll|mag-enroll/.test(message)) {
      return "Para mag-enroll, punan lamang ang enrollment form sa website. Kailangan mo rin ng mga dokumento tulad ng report card at birth certificate.";
    }
    return "Paki-ulit ang tanong. Maaari mong itanong ang tungkol sa paaralan, programa, o anunsyo.";
  }

  // English responses
  if (/mission/.test(message)) {
    return "Our mission is to provide quality, equitable, culture-based education.";
  }
  if (/vision/.test(message)) {
    return "Our vision is for every learner to achieve their full potential in a safe, nurturing environment.";
  }
  if (/announcement/.test(message)) {
    return "Announcements are posted on the homepage under the Announcements section.";
  }
  if (/news/.test(message)) {
    return "Visit the News section for updates on recent school events.";
  }
  if (/student/.test(message)) {
    return "We currently have over 2,500 enrolled students.";
  }
  if (/faculty|teacher/.test(message)) {
    return "Our faculty and staff include over 125 educators.";
  }
  if (/principal/.test(message)) {
    return "Our school principal is Mr. Louie Valdez.";
  }
  if (/event/.test(message)) {
    return "Check the Event Ticker section for upcoming school events.";
  }
  if (/open house/.test(message)) {
    return "Open House Day is on November 15. Feel free to visit!";
  }
  if (/orientation/.test(message)) {
    return "The International Student Orientation is on January 10.";
  }
  if (/history/.test(message)) {
    return "You can read about the school’s history on the About page.";
  }
  if (/resources|material/.test(message)) {
    return "Learning resources and modules are available under the Resources section.";
  }
  if (/program/.test(message)) {
    return "We offer programs from Kindergarten to Senior High School.";
  }
  if (/contact|email/.test(message)) {
    return "You can contact us at lakeviewintegratedschool@gmail.com.";
  }
  if (/location|where/.test(message)) {
    return "We're located at 2435 Marigold St., Lakeview Homes Subd., Putatan, Muntinlupa.";
  }
  if (/enroll/.test(message)) {
    return "To enroll, please fill out the enrollment form on our website. You will also need documents like your report card and birth certificate.";
  }

  // Fallback / help suggestion
  return isTagalogMode
    ? "Pasensya na, hindi ko naintindihan. Maaari kang magtanong tungkol sa misyon, programa, anunsyo, o lokasyon."
    : "Sorry, I didn't understand that. You can ask me about mission, programs, announcements, or location.";
}

chatbotToggleBtn.addEventListener('click', () => {
  chatbotContainer.style.display = 'flex';
  setTimeout(() => chatbotContainer.style.opacity = '1', 10);
  chatbotContainer.setAttribute("aria-hidden", "false");
  chatbotInput.focus();
});

chatbotCloseBtn.addEventListener('click', () => {
  chatbotContainer.style.opacity = '0';
  setTimeout(() => chatbotContainer.style.display = 'none', 300);
  chatbotContainer.setAttribute("aria-hidden", "true");
});

chatbotForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userMessage = chatbotInput.value.trim();
  if (!userMessage) return;

  appendMessage("You", userMessage);
  chatbotInput.value = '';
  chatbotInput.disabled = true;

  const botReply = getBotReply(userMessage);
  setTimeout(() => {
    appendMessage("LIS Bot", botReply);
    chatbotInput.disabled = false;
    chatbotInput.focus();
  }, 600);
});

function appendMessage(sender, message) {
  const msgDiv = document.createElement('div');
  msgDiv.style.margin = "8px 0";
  msgDiv.style.padding = "6px 10px";
  msgDiv.style.borderRadius = "12px";
  msgDiv.style.maxWidth = "80%";
  msgDiv.style.wordWrap = "break-word";
  msgDiv.style.display = "inline-block";
  msgDiv.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

  if(sender === "You") {
    msgDiv.style.backgroundColor = "#007bff";
    msgDiv.style.color = "white";
    msgDiv.style.alignSelf = "flex-end";
    msgDiv.style.textAlign = "right";
    msgDiv.style.marginLeft = "20%";
  } else {
    msgDiv.style.backgroundColor = "#e0e0e0";
    msgDiv.style.color = "#000";
    msgDiv.style.alignSelf = "flex-start";
    msgDiv.style.textAlign = "left";
    msgDiv.style.marginRight = "20%";
  }

  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatbotMessages.appendChild(msgDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}
