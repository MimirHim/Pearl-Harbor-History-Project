// Navigation functionality
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
    hamburger?.classList.toggle('active');
  });
}

// Close menu when clicking on a link
for (const link of navLinks) {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('active');
    hamburger?.classList.remove('active');
  });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }

  // Update active nav link based on scroll position
  updateActiveNavLink();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('.section');
  const scrollPosition = window.scrollY + 200;

  for (const section of sections) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      for (const link of navLinks) {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      }
    }
  }
}

// Smooth scrolling for navigation links
for (const link of navLinks) {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    if (targetId?.startsWith('#')) {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
}

// Catalog filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const catalogItems = document.querySelectorAll('.catalog-item');

for (const button of filterButtons) {
  button.addEventListener('click', () => {
    // Update active button
    for (const btn of filterButtons) {
      btn.classList.remove('active');
    }
    button.classList.add('active');

    // Get selected category
    const category = button.getAttribute('data-category');

    // Filter catalog items
    for (const item of catalogItems) {
      const itemCategory = item.getAttribute('data-category');

      if (category === 'all' || itemCategory === category) {
        item.classList.remove('hidden');
        // Animate in
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 50);
      } else {
        item.classList.add('hidden');
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
      }
    }
  });
}

// Catalog search functionality
const catalogSearch = document.getElementById('catalogSearch');

if (catalogSearch) {
  catalogSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    for (const item of catalogItems) {
      const title = item.querySelector('h3')?.textContent?.toLowerCase() || '';
      const description = item.querySelector('p:last-child')?.textContent?.toLowerCase() || '';

      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        item.classList.remove('hidden');
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      } else {
        item.classList.add('hidden');
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
      }
    }

    // If search is cleared, reset to current filter
    if (searchTerm === '') {
      const activeFilter = document.querySelector('.filter-btn.active');
      const category = activeFilter?.getAttribute('data-category') || 'all';

      for (const item of catalogItems) {
        const itemCategory = item.getAttribute('data-category');

        if (category === 'all' || itemCategory === category) {
          item.classList.remove('hidden');
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.classList.add('hidden');
        }
      }
    }
  });
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
    }
  }
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.library-card, .catalog-item, .database-card, .source-card, .primary-source, .detail-card, .timeline-item');
for (const el of animateElements) {
  observer.observe(el);
}

// Scroll to top functionality
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

// Add transition effects to catalog items
for (const item of catalogItems) {
  item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

console.log('Pearl Harbor Historical Research website loaded successfully');
