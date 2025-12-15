// Portfolio data with project information
const portfolioProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern online shopping experience with seamless checkout and inventory management",
    image: "https://placehold.co/400x300?text=Modern+ecommerce+website+with+product+grid+and+shopping+cart+interface",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Brand Identity Design",
    description: "Complete brand redesign including logo, color palette, and visual guidelines",
    image: "https://placehold.co/400x300?text=Professional+brand+identity+design+showcase+with+logo+and+color+swatches",
    tags: ["Branding", "Design", "Illustrator"],
  },
  {
    id: 3,
    title: "Mobile Banking App",
    description: "Secure and intuitive mobile banking interface with real-time transactions",
    image: "https://placehold.co/400x300?text=Sleek+mobile+banking+app+interface+with+dashboard+and+transaction+cards",
    tags: ["Mobile", "UI/UX", "Fintech"],
  },
  {
    id: 4,
    title: "Restaurant Website",
    description: "Appetizing restaurant website with online ordering and reservation system",
    image: "https://placehold.co/400x300?text=Elegant+restaurant+website+with+food+photography+and+menu+layout",
    tags: ["Web Design", "WordPress", "SEO"],
  },
  {
    id: 5,
    title: "Fitness Tracking App",
    description: "Comprehensive fitness app with workout plans and progress tracking",
    image: "https://placehold.co/400x300?text=Dynamic+fitness+tracking+app+with+workout+statistics+and+progress+charts",
    tags: ["Mobile", "React Native", "Health"],
  },
  {
    id: 6,
    title: "Real Estate Platform",
    description: "Property listing platform with advanced search and virtual tours",
    image: "https://placehold.co/400x300?text=Professional+real+estate+website+with+property+listings+and+map+view",
    tags: ["React", "Maps API", "Database"],
  },
  {
    id: 7,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media management and content scheduling",
    image: "https://placehold.co/400x300?text=Clean+social+media+analytics+dashboard+with+graphs+and+metrics",
    tags: ["Dashboard", "Analytics", "API"],
  },
  {
    id: 8,
    title: "Educational Platform",
    description: "Online learning platform with interactive courses and progress tracking",
    image: "https://placehold.co/400x300?text=Modern+educational+platform+with+course+cards+and+learning+interface",
    tags: ["Education", "Video", "LMS"],
  },
  {
    id: 9,
    title: "Travel Booking Site",
    description: "Comprehensive travel booking platform with flight and hotel search",
    image:
      "https://placehold.co/400x300?text=Vibrant+travel+booking+website+with+destination+photos+and+search+filters",
    tags: ["Travel", "Booking", "API"],
  },
  {
    id: 10,
    title: "Portfolio Website",
    description: "Minimalist portfolio design showcasing creative work and case studies",
    image:
      "https://placehold.co/400x300?text=Minimalist+portfolio+website+with+project+showcase+grid+and+clean+typography",
    tags: ["Portfolio", "Design", "Animation"],
  },
]

// DOM Elements
const viewPortfolioBtn = document.getElementById("viewPortfolioBtn")
const portfolioModal = document.getElementById("portfolioModal")
const closeModalBtn = document.getElementById("closeModal")
const modalOverlay = document.querySelector(".modal-overlay")
const portfolioCarousel = document.getElementById("portfolioCarousel")
const portfolioGrid = document.getElementById("portfolioGrid")
const scrollLeftBtn = document.getElementById("scrollLeft")
const scrollRightBtn = document.getElementById("scrollRight")

// Lazy loading observer
const lazyLoadObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.add("loaded")
        observer.unobserve(img)
      }
    })
  },
  {
    rootMargin: "50px",
  },
)

// Create carousel item HTML
function createCarouselItem(project) {
  return `
    <div class="carousel-item" data-project-id="${project.id}">
      <img 
        data-src="${project.image}" 
        alt="${project.description}"
        class="lazy"
        loading="lazy"
      >
      <div class="carousel-item-content">
        <h3 class="carousel-item-title">${project.title}</h3>
        <p class="carousel-item-desc">${project.description}</p>
        <div class="carousel-item-tags">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </div>
    </div>
  `
}

// Create grid item HTML
function createGridItem(project) {
  return `
    <div class="grid-item" data-project-id="${project.id}">
      <img 
        data-src="${project.image}" 
        alt="${project.description}"
        class="lazy"
        loading="lazy"
      >
      <div class="grid-item-content">
        <h3 class="grid-item-title">${project.title}</h3>
        <p class="grid-item-desc">${project.description}</p>
        <div class="carousel-item-tags">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </div>
    </div>
  `
}

// Initialize portfolio content
function initializePortfolio() {
  // Populate carousel
  portfolioCarousel.innerHTML = portfolioProjects.map((project) => createCarouselItem(project)).join("")

  // Populate grid
  portfolioGrid.innerHTML = portfolioProjects.map((project) => createGridItem(project)).join("")

  // Setup lazy loading
  const lazyImages = document.querySelectorAll(".lazy")
  lazyImages.forEach((img) => lazyLoadObserver.observe(img))
}

// Open modal
function openModal() {
  portfolioModal.classList.add("active")
  document.body.style.overflow = "hidden"

  // Initialize portfolio if not already done
  if (portfolioCarousel.children.length === 0) {
    initializePortfolio()
  }
}

// Close modal
function closeModal() {
  portfolioModal.classList.remove("active")
  document.body.style.overflow = ""
}

// Carousel navigation
function scrollCarousel(direction) {
  const scrollAmount = 340 // Item width + gap
  const currentScroll = portfolioCarousel.scrollLeft

  if (direction === "left") {
    portfolioCarousel.scrollTo({
      left: currentScroll - scrollAmount,
      behavior: "smooth",
    })
  } else {
    portfolioCarousel.scrollTo({
      left: currentScroll + scrollAmount,
      behavior: "smooth",
    })
  }
}

// Event Listeners
viewPortfolioBtn.addEventListener("click", openModal)
closeModalBtn.addEventListener("click", closeModal)
modalOverlay.addEventListener("click", closeModal)
scrollLeftBtn.addEventListener("click", () => scrollCarousel("left"))
scrollRightBtn.addEventListener("click", () => scrollCarousel("right"))

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && portfolioModal.classList.contains("active")) {
    closeModal()
  }
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll reveal animation for skill cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "0"
      entry.target.style.transform = "translateY(20px)"

      setTimeout(() => {
        entry.target.style.transition = "all 0.6s ease"
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }, 100)

      scrollObserver.unobserve(entry.target)
    }
  })
}, observerOptions)

document.querySelectorAll(".skill-card").forEach((card) => {
  scrollObserver.observe(card)
})

// Performance: Preload critical images
window.addEventListener("load", () => {
  const profileImg = document.querySelector(".profile-image")
  if (profileImg && !profileImg.complete) {
    profileImg.loading = "eager"
  }
})
