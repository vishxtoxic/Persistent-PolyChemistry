// ============================================
// ISHIKA'S CHEMISTRY ARSENAL - SHARED APP.JS
// ============================================

// Utility Functions
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

// Navigation utility
function navigateTo(url) {
  window.location.href = url;
}

// Set active navigation link based on current page
function setActiveNav(pageName) {
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
  });

  const navMap = {
    'home': 'nav a[href="index.html"]',
    'concepts': 'nav a[href="unit-1.html"]',
    'practice': 'nav a[href="unit-1-practice.html"]'
  };

  const selector = navMap[pageName];
  if (selector) {
    const activeLink = document.querySelector(selector);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}

// Initialize navigation on page load if no other initialization is happening
document.addEventListener('DOMContentLoaded', function() {
  // Check current page and set active nav if not already set by page-specific code
  if (!document.querySelector('nav a.active')) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === 'index.html' || currentPage === '') {
      setActiveNav('home');
    } else if (currentPage === 'unit-1.html') {
      setActiveNav('concepts');
    } else if (currentPage === 'unit-1-practice.html') {
      setActiveNav('practice');
    }
  }
});

// Data loading utility
async function loadUnitData() {
  try {
    const response = await fetch('../data/unit1.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading unit data:', error);
    return null;
  }
}

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    escapeHtml,
    navigateTo,
    setActiveNav,
    loadUnitData
  };
}
