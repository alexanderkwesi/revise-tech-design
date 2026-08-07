(function() {
  // Updated list of 12 ventures
  const projects = [
    {
      category: "AI · EdTech",
      filterCategory: "ai",
      title: "EduAI · Intelligent Learning Platform",
      desc: "Real-time adaptive curricula for schools, universities, and corporate training—reimagining how learners and educators engage with content.",
      status: "Active development · Global education market",
      tags: ["AI-native", "High scalability"],
      link: "https://eduai-9hvo.vercel.app"
    },
    {
      category: "AI · Content",
      filterCategory: "ai",
      title: "Inkwell AI · Writing & Content Engine",
      desc: "Deep language models fused with brand-voice intelligence for creators, marketers, and teams needing high-fidelity content.",
      status: "Live beta · B2C & B2B",
      tags: ["Subscription & enterprise", "Content & marketing"],
      link: "https://inkwell-ten-beige.vercel.app/"
    },
    {
      category: "Edutech · Jobtech",
      filterCategory: "edutech",
      title: "Internship Finder - for students and undergraduates",
      desc: "Connecting ambitious students with premium internships at world-leading firms in London, Berlin, Singapore and beyond.",
      status: "Live Internships for students and undergraduates",
      tags: ["Internship Jobs", "Jobtech"],
      link: "https://career-compass-ukie.lovable.app"
    },
    {
      category: "AI · Creative",
      filterCategory: "ai",
      title: "StoryVerse · Interactive Storytelling",
      desc: "Immersive AI-driven storytelling where users co-create narratives, worlds, and characters for entertainment and gaming.",
      status: "In development · Entertainment tech",
      tags: ["Creator economy", "Entertainment"],
      link: "https://co-create-worlds.lovable.app"
    },
    {
      category: "SaaS · No-code",
      filterCategory: "saas",
      title: "Aleyo · Website Builder",
      desc: "No-code/low-code website builder with AI-assisted design and copywriting for non-technical entrepreneurs and SMEs.",
      status: "MVP live · SME market",
      tags: ["Recurring SaaS revenue", "Web & SME"],
      link: "https://build-and-design-art.lovable.app"
    },
    {
      category: "OCR · Fintech",
      filterCategory: "fintech",
      title: "Cheque Processor using OCR",
      desc: "Enterprise-grade OCR that automates extraction, verification, and processing of physical cheque data for banks.",
      status: "Pilot stage · Financial sector",
      tags: ["Operational cost reduction", "Banking"],
      link: "https://cheque-front-end-eight.vercel.app"
    },
    {
      category: "AgriTech · AI",
      filterCategory: "emerging",
      title: "Drone Camera Biomass Prediction",
      desc: "AI-powered drone imaging that predicts crop biomass, health, and yield for data-driven agricultural decisions.",
      status: "Field trials · AgriTech",
      tags: ["Precision agriculture", "AgriTech"],
      link: "https://drone-grow-vision.lovable.app"
    },
    {
      category: "SaaS · Operations",
      filterCategory: "saas",
      title: "Inventory Studio",
      desc: "Smart inventory management with AI-driven demand forecasting, multi-warehouse sync, and supplier intelligence.",
      status: "Beta users · Supply chain",
      tags: ["Retail & distribution", "Operations"],
      link: "https://its-rose.vercel.app/"
    },
    {
      category: "AI · Document Processing",
      filterCategory: "ai",
      title: "Intelligent Document Processor",
      desc: "Advanced NLP and OCR to extract, classify, and process complex documents at scale for legal, insurance, and healthcare.",
      status: "Enterprise ready · Compliance-focused",
      tags: ["Reduced manual review", "Legal & healthcare"],
      link: "https://idp.vercel.app/"
    },
    {
      category: "AI · Productivity",
      filterCategory: "saas",
      title: "AI Kanban · Intelligent Project Board",
      desc: "Smart AI-powered Kanban board with automated task prioritisation, intelligent suggestions, and real-time project intelligence.",
      status: "Live · Productivity & project management",
      tags: ["Teams & enterprise", "SaaS · AI"],
      link: "https://intelligent-board-ai.lovable.app"
    },
    {
      category: "Location Based Coke Finder",
      filterCategory: "saas",
      title: "Find A Coke Any Where You Have One",
      desc: "Location Based Coke Finder using your default location or your post code",
      status: "Live · Retailer Coke Sourcing",
      tags: ["Location & Search", "SaaS ·Finder"],
      link: "https://coke-finder-anywhere.lovable.app"
    },
    {
      category: "Location Based Anything Finder",
      filterCategory: "saas",
      title: "See if you can find almost anything",
      desc: "Location Based Anything Finder using your default location or your post code",
      status: "Live · World finder for almost anything",
      tags: ["Location & Search", "SaaS ·Finder"],
      link: "https://find-whatsit.lovable.app"
    }
  ];

  // Global variables to track state
  let activeProject = null;
  let donationAmount = 10;
  let donationCurrency = 'GBP';

  // Render projects function
  function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectGrid');
    if (!grid) return;

    // Filter projects
    const filteredProjects = filter === 'all' 
      ? projects 
      : projects.filter(p => p.filterCategory === filter);

    // Map projects to HTML
    grid.innerHTML = filteredProjects.map(p => {
      // Find index in original list to handle funding triggers
      const origIndex = projects.findIndex(orig => orig.title === p.title);
      
      // Determine color scheme class based on category
      let headerClass = 'header-default';
      if (p.filterCategory === 'ai') headerClass = 'header-ai';
      else if (p.filterCategory === 'fintech') headerClass = 'header-fintech';
      else if (p.filterCategory === 'saas') headerClass = 'header-saas';

      return `
        <article class="project-neo-card" style="opacity: 0; transform: translateY(15px); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
          <div class="project-card-header ${headerClass}">
            <span>${p.category}</span>
            <span>●</span>
          </div>
          <div class="project-card-body">
            <h3>${p.title}</h3>
            <p class="project-card-desc">${p.desc}</p>
            <p class="project-card-status">${p.status}</p>
          </div>
          <div class="project-card-footer">
            <div class="project-card-tags">
              <span class="project-card-tag">${p.tags[0] || ''}</span>
              <span class="project-card-tag">${p.tags[1] || ''}</span>
            </div>
            <div class="project-actions" style="display: flex; gap: 0.5rem; align-items: center;">
              ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="project-card-action-link">Visit →</a>` : ''}
              <button class="project-card-donate-btn" data-index="${origIndex}">Fund</button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Trigger progressive fade-in animation
    const cards = grid.querySelectorAll('.project-neo-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 40);
    });

    // Wire up funding triggers
    grid.querySelectorAll('.project-card-donate-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'), 10);
        openDonationModal(index);
      });
    });
  }

  // Initialize filters
  function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        // Render projects
        const category = this.getAttribute('data-filter');
        renderProjects(category);
      });
    });
  }

  // Count up animation for stats
  function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const countUp = (counter) => {
      const target = +counter.getAttribute('data-target');
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1500; // ms
      const startTime = performance.now();
      
      const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutQuad)
        const ease = progress * (2 - progress);
        
        const currentValue = Math.floor(ease * target);
        
        if (target >= 100) {
          // Format stats with plus sign if appropriate
          counter.textContent = `${prefix}${currentValue.toLocaleString()}${suffix}`;
        } else {
          counter.textContent = `${prefix}${currentValue}${suffix}`;
        }
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
        }
      };
      
      requestAnimationFrame(update);
    };
    
    // Use IntersectionObserver to animate when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    counters.forEach(counter => observer.observe(counter));
  }


  // Mobile nav toggler
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const links = document.querySelectorAll('.mobile-nav-link');
    
    if (toggle && overlay) {
      toggle.addEventListener('click', function() {
        toggle.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Animate the hamburger button
        const spans = toggle.querySelectorAll('span');
        if (toggle.classList.contains('active')) {
          spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
      
      links.forEach(link => {
        link.addEventListener('click', function() {
          toggle.classList.remove('active');
          overlay.classList.remove('active');
          const spans = toggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        });
      });
    }
  }

  /* PayPal Donation Functions */

  let paypalButtonsInstance = null;

  function getDonationAmount() {
    return donationAmount;
  }

  function getDonationCurrency() {
    return donationCurrency;
  }

  function openDonationModal(projectIndex) {
    activeProject = projects[projectIndex];
    if (!activeProject) return;

    donationAmount = 10;
    donationCurrency = 'GBP';

    document.getElementById('modalProjectTitle').textContent = `Fund ${activeProject.title}`;
    document.getElementById('modalProjectDesc').textContent = activeProject.desc;
    document.getElementById('modalCurrencySymbol').textContent = '£';
    document.getElementById('customAmount').value = '';
    document.getElementById('backerName').value = '';
    document.getElementById('backerMessage').value = '';
    document.getElementById('donationCurrency').value = 'GBP';

    const presetButtons = document.querySelectorAll('.preset-btn');
    presetButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-amount') === '10') {
        btn.classList.add('active');
      }
    });

    document.getElementById('modalSuccessScreen').classList.remove('active');
    document.getElementById('donationModal').classList.add('active');
    document.body.style.overflow = 'hidden';

    renderPayPalButtons();
  }

  function closeDonationModal() {
    document.getElementById('donationModal').classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderPayPalButtons() {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;

    container.innerHTML = `<div style="text-align:center; font-weight:700; text-transform:uppercase; font-size:0.85rem; padding:0.5rem 0;">Loading PayPal...</div>`;

    const currency = getDonationCurrency();
    const scriptId = 'paypal-sdk-script';
    const oldScript = document.getElementById(scriptId);
    
    if (oldScript) {
      oldScript.remove();
    }

    if (window.paypal) {
      delete window.paypal;
    }

    if (paypalButtonsInstance) {
      paypalButtonsInstance = null;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://www.paypal.com/sdk/js?client-id=BAAH-MwZpyci773ZkqlhjG4b9ANOgioXck1Mdq5zeGXOIFVsUtX6aBILoMQjlKDCy0frWLrpl3hxzYfigE&currency=${currency}&disable-funding=credit,card`;
    script.async = true;

    script.onload = function() {
      container.innerHTML = '';
      if (!window.paypal) {
        renderMockPayPalButton();
        return;
      }

      try {
        paypalButtonsInstance = window.paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'donate'
          },
          createOrder: function(data, actions) {
            const amount = getDonationAmount();
            const curr = getDonationCurrency();
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount.toFixed(2),
                  currency_code: curr
                },
                description: `Funding Support for ${activeProject.title}`
              }]
            });
          },
          onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
              triggerDonationSuccess();
            });
          },
          onError: function(err) {
            console.warn("PayPal Smart Buttons error, falling back to simulated checkout flow:", err);
            renderMockPayPalButton();
          }
        });
        paypalButtonsInstance.render('#paypal-button-container');
      } catch (err) {
        console.warn("Error rendering PayPal SDK buttons, rendering mock button:", err);
        renderMockPayPalButton();
      }
    };

    script.onerror = function() {
      console.warn("Could not load PayPal SDK. Operating in Simulated Mock Checkout mode.");
      renderMockPayPalButton();
    };

    document.head.appendChild(script);
  }

  function renderMockPayPalButton() {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;

    container.innerHTML = `
      <button id="simulatedPaypalBtn" class="project-card-donate-btn" style="width:100%; justify-content:center; padding:0.9rem; font-weight:700; margin: 0.5rem 0;">
        Simulate PayPal Checkout →
      </button>
      <p style="font-size:0.7rem; font-weight:700; text-transform:uppercase; text-align:center; color:#71717a; margin-top:0.4rem;">
        Simulated checkout active (payment will not be billed).
      </p>
    `;

    document.getElementById('simulatedPaypalBtn').addEventListener('click', () => {
      const btn = document.getElementById('simulatedPaypalBtn');
      btn.textContent = "Processing Transaction...";
      btn.disabled = true;
      btn.style.opacity = '0.7';

      setTimeout(() => {
        triggerDonationSuccess();
      }, 1000);
    });
  }

  function triggerDonationSuccess() {
    const successScreen = document.getElementById('modalSuccessScreen');
    const successProjectName = document.getElementById('successProjectName');
    
    if (successProjectName) {
      successProjectName.textContent = activeProject.title;
    }
    
    if (successScreen) {
      successScreen.classList.add('active');
    }
  }

  function initDonationModalListeners() {
    const closeBtn = document.getElementById('closeDonationModal');
    const successCloseBtn = document.getElementById('successCloseBtn');
    const modalOverlay = document.getElementById('donationModal');

    if (closeBtn) closeBtn.addEventListener('click', closeDonationModal);
    if (successCloseBtn) successCloseBtn.addEventListener('click', closeDonationModal);
    
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
          closeDonationModal();
        }
      });
    }

    const presets = document.querySelectorAll('.preset-btn');
    const customAmountInput = document.getElementById('customAmount');

    presets.forEach(btn => {
      btn.addEventListener('click', function() {
        presets.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        donationAmount = parseFloat(this.getAttribute('data-amount'));
        if (customAmountInput) customAmountInput.value = '';
      });
    });

    if (customAmountInput) {
      customAmountInput.addEventListener('input', function() {
        presets.forEach(b => b.classList.remove('active'));
        const val = parseFloat(this.value);
        donationAmount = isNaN(val) ? 0 : val;
      });
    }

    const currencySelect = document.getElementById('donationCurrency');
    const currencySymbols = {
      'GBP': '£',
      'USD': '$',
      'EUR': '€'
    };

    if (currencySelect) {
      currencySelect.addEventListener('change', function() {
        donationCurrency = this.value;
        const symbol = currencySymbols[donationCurrency] || '£';
        document.getElementById('modalCurrencySymbol').textContent = symbol;
        renderPayPalButtons();
      });
    }
  }

  // Focus helper for Google Form iframe
  function focusGoogleForm() {
    const iframe = document.getElementById('google-form-iframe');
    if (iframe) {
      // Focus the iframe window to allow instant keyboard interaction
      setTimeout(() => {
        try {
          iframe.focus();
        } catch (e) {
          console.warn("Unable to programmatically focus Google Form iframe: ", e);
        }
      }, 600);
    }
  }

  // Dom ready initialization
  document.addEventListener('DOMContentLoaded', () => {
    renderProjects('all');
    initFilters();
    initCounters();
    initMobileNav();
    initDonationModalListeners();
    focusGoogleForm();
  });

  // Re-focus on hash navigation
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#contact') {
      focusGoogleForm();
    }
  });
})();
