
//  DATA 

const skillsData = [
  { name: "HTML5",       icon: "🌐", level: 95 },
  { name: "CSS3",        icon: "🎨", level: 90 },
  { name: "JavaScript",  icon: "⚡", level: 88 },
  { name: "MySQL",       icon: "🗄️", level: 78 },
  { name: "Git",         icon: "🔀", level: 85 },
  { name: "C++",         icon: "💻", level: 70 },
  { name: "database",    icon: "🖌️", level: 82 },
  { name: "Python",      icon: "🐍", level: 70 },
];

const projectsData = [
  {
    id: 1,
    title: "Book Shop Management System",
    desc: "A desktop-based application built with C# and Microsoft SQL Server. Features multi-role access for Owner, Employee, Author, and Customer with full CRUD operations, inventory management, order approval, billing, and report handling.",
    img: "images/project1.jpg",
    emoji: "📚",
    tag: "web",
    techs: ["C#", "Microsoft SQL Server", "Windows Forms", "OOP"],
    link: "https://github.com/dTs-FatSo/Book_Shop_Management_System",
  },
  {
    id: 2,
    title: "Hospital Management System",
    desc: "A software application to manage all hospital operations digitally — including patient registration, appointments, doctor schedules, medical records, billing, pharmacy stock, and reports in one centralized system.",
    img: "images/project2.jpg",
    emoji: "🏥",
    tag: "web",
    techs: ["C#", "SQL Server", "Windows Forms", "OOP"],
    link: "#",
  },
  {
  id: 3,
    title: "Blood Management System",
    desc: "A database-based project that stores and manages blood donor information, blood groups, and available blood stock. Helps blood banks and hospitals quickly find required blood types and ensure timely blood supply during emergencies.",
    img: "images/project3.jpg",
    emoji: "🩸",
    tag: "web",
    techs: ["SQL Server", "Database Design", "C#"],
    link: "#",
  },
 
];

//  THEME TOGGLE 

const root          = document.documentElement;
const themeToggle   = document.getElementById("themeToggle");

// Load saved preference
const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
root.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next    = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("portfolio-theme", next);
});

// ═ HAMBURGER MENU ═

const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close nav on link click
navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

//  TYPING ANIMATION 


let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById("typingText");

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typingEl.textContent = current.slice(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
  }
  setTimeout(type, isDeleting ? 60 : 100);
}
type();

//  SKILLS RENDER (Dynamic) 

function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = "";
  skillsData.forEach((skill, i) => {
    const card = document.createElement("div");
    card.className = "skill-card";
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="skill-icon">${skill.icon}</div>
      <div class="skill-name">${skill.name}</div>
      <div class="skill-bar-bg">
        <div class="skill-bar" data-level="${skill.level}"></div>
      </div>
      <div class="skill-level">${skill.level}%</div>
    `;
    grid.appendChild(card);
  });
  // Animate bars on scroll into view
  animateSkillBars();
}

function animateSkillBars() {
  const bars = document.querySelectorAll(".skill-bar");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const bar = e.target;
        bar.style.width = bar.dataset.level + "%";
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => observer.observe(b));
}

//  PROJECTS RENDER (Dynamic + Filter) 

function renderProjects(filter = "all") {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "";
  const filtered = filter === "all"
    ? projectsData
    : projectsData.filter(p => p.tag === filter);

  filtered.forEach((proj, i) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.style.animationDelay = `${i * 0.1}s`;

    const techsHTML = proj.techs.map(t => `<span class="project-tech">${t}</span>`).join("");

    card.innerHTML = `
      <div class="project-img">
        <img src="${proj.img}"
             alt="${proj.title}"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
        />
        <div class="img-placeholder" style="display:none">${proj.emoji}</div>
      </div>
      <div class="project-body">
        <div class="project-tag">${proj.tag}</div>
        <div class="project-title">${proj.title}</div>
        <div class="project-desc">${proj.desc}</div>
        <div class="project-techs">${techsHTML}</div>
        <a href="${proj.link}" class="project-link">View Project →</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Filter buttons
document.getElementById("filterBar").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderProjects(btn.dataset.filter);
});

// FORM VALIDATION 

const form = document.getElementById("contactForm");

function showError(id, msg) {
  const el = document.getElementById(id + "Error");
  const input = document.getElementById(id);
  el.textContent = msg;
  input.classList.add("invalid");
}
function clearError(id) {
  document.getElementById(id + "Error").textContent = "";
  document.getElementById(id).classList.remove("invalid");
}
function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// Live clearing
["name","email","subject","message"].forEach(id => {
  document.getElementById(id).addEventListener("input", () => clearError(id));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  const name    = document.getElementById("name").value.trim();
  const email   = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name)              { showError("name",    "Name is required."); valid = false; }
  if (!email)             { showError("email",   "Email is required."); valid = false; }
  else if (!isValidEmail(email)) { showError("email", "Enter a valid email address."); valid = false; }
  if (!subject)           { showError("subject", "Subject is required."); valid = false; }
  if (!message)           { showError("message", "Message cannot be empty."); valid = false; }

  if (valid) {
    const success = document.getElementById("formSuccess");
    form.reset();
    success.classList.add("show");
    setTimeout(() => success.classList.remove("show"), 5000);
  }
});

//  SCROLL TO TO

const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) scrollTopBtn.classList.add("show");
  else scrollTopBtn.classList.remove("show");
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

//  ACTIVE NAV HIGHLIGHT 

const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute("id");
  });
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.style.color = a.getAttribute("href") === `#${current}`
      ? "var(--accent)"
      : "";
  });
});

// INIT 
renderSkills();
renderProjects();
