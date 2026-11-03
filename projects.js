(function() {
  // ---- Ventures ----
  const projects = [
    {
      category: "AI · EdTech",
      filterCategory: "ai",
      title: "Learners AI · Intelligent Learning Platform",
      desc: "Real-time adaptive curricula for schools, universities, and corporate training—reimagining how learners and educators engage with content.",
      status: "Active development · Global education market",
      tags: ["AI-native", "High scalability"],
      link: "https://try-pay-learn.lovable.app"
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
      link: "https://agent-team-studio.lovable.app"
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
      link: "https://stockhouse-start.lovable.app"
    },
    {
      category: "AI · Document Processing",
      filterCategory: "ai",
      title: "Intelligent Document Processor",
      desc: "Advanced NLP and OCR to extract, classify, and process complex documents at scale for legal, insurance, and healthcare.",
      status: "Enterprise ready · Compliance-focused",
      tags: ["Reduced manual review", "Legal & healthcare"],
      link: "https://idp-abkf.vercel.app/"
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
    },
    // ---- Brands ----
    {
      category: "Data Storage · Innovation",
      filterCategory: "brands",
      title: "Scourge · High-Performance Data Storage",
      desc: "A high-performance data storage device engineered to take storage to the next level—advanced components, high-grade formulations, and consumer-led design.",
      status: "Pre-seed · Data storage innovation",
      tags: ["Data storage", "Consumer hardware"],
      link: "#scourge"
    },
    {
      category: "Eyecare · Restorative",
      filterCategory: "brands",
      title: "Restoracin · Restorative Eyecare",
      desc: "A restorative eyecare range focused on repair and layer penetration through a non-surgical procedure—formulated for sensitive and compromised eye health.",
      status: "Pre-seed · Eyecare & wellness",
      tags: ["Eyecare", "Non-surgical"],
      link: "#restoracin"
    },
    {
      category: "Derma · Clinical",
      filterCategory: "brands",
      title: "RadFrac Derma · Clinical Derma Brand",
      desc: "A clinical derma-fractional skincare brand combining professional-grade treatments with at-home regimens for advanced skin resurfacing and renewal.",
      status: "Pre-seed · Derma aesthetics",
      tags: ["Derma aesthetics", "Clinical skincare"],
      link: "#radfrac-derma"
    }
  ];

  // ---- Config ----
  const PAYPAL_CLIENT_ID = "BAAH-MwZpyci773ZkqlhjG4b9ANOgioXck1Mdq5zeGXOIFVsUtX6aBILoMQjlKDCy0frWLrpl3hxzYfigE";

  // ---- Multi-currency ----
  const ALLOWED = ['GBP', 'USD', 'EUR'];
  const CURRENCY_SYMBOLS = { GBP: '£', USD: '$', EUR: '€' };
  const DEFAULT_CURRENCY = 'GBP';
  const DEFAULT_AMOUNT = 10;
  const MIN_AMOUNT = 1;

  // ---- State ----
  let activeProject = null;
  let donationAmount = DEFAULT_AMOUNT;
  let donationCurrency = DEFAULT_CURRENCY;

  let paypalSDKPromise = null;
  let paypalSDKLoadingCurrency = null;
  let paypalLoadedCurrency = null;
  let paypalButtonsInstance = null;

  // ============================================================
  // PROJECTS
  // ============================================================
  function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectGrid');
    if (!grid) return;

    const filtered = filter === 'all'
      ? projects.map((p, i) => ({ project: p, originalIndex: i }))
      : projects
          .map((p, i) => ({ project: p, originalIndex: i }))
          .filter(({ project }) => project.filterCategory === filter);

    grid.innerHTML = filtered.map(({ project: p, originalIndex }) => {
      let headerClass = 'header-default';
      if (p.filterCategory === 'ai') headerClass = 'header-ai';
      else if (p.filterCategory === 'fintech') headerClass = 'header-fintech';
      else if (p.filterCategory === 'saas') headerClass = 'header-saas';
      else if (p.filterCategory === 'brands') headerClass = 'header-brands';

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
              <button class="project-card-donate-btn" type="button" data-index="${originalIndex}">Fund</button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    const cards = grid.querySelectorAll('.project-neo-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 40);
    });

    grid.querySelectorAll('.project-card-donate-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'), 10);
        openDonationModal(index);
      });
    });
  }

  // ============================================================
  // FILTERS
  // ============================================================
  function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderProjects(this.getAttribute('data-filter'));
      });
    });
  }

  // ============================================================
  // COUNTERS
  // ============================================================
  function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    const countUp = (counter) => {
      const target = +counter.getAttribute('data-target');
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1500;
      const startTime = performance.now();
      const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress * (2 - progress);
        const currentValue = Math.floor(ease * target);
        counter.textContent = (target >= 100)
          ? `${prefix}${currentValue.toLocaleString()}${suffix}`
          : `${prefix}${currentValue}${suffix}`;
        if (progress < 1) requestAnimationFrame(update);
        else counter.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
      };
      requestAnimationFrame(update);
    };
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

  // ============================================================
  // MOBILE NAV
  // ============================================================
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const links = document.querySelectorAll('.mobile-nav-link');
    if (!toggle || !overlay) return;

    toggle.addEventListener('click', function() {
      toggle.classList.toggle('active');
      overlay.classList.toggle('active');
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
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        overlay.classList.remove('active');
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ============================================================
  // DONATION HELPERS
  // ============================================================
  function formatAmount(value) {
    const n = Number(value);
    return (isNaN(n) ? 0 : n).toFixed(2);
  }

  function setCheckoutStatus(text, isError = false) {
    const el = document.getElementById('secure-checkout-status');
    if (!el) return;
    el.textContent = text;
    el.style.color = isError ? '#c00' : '#555';
  }

  // ============================================================
  // PAYPAL SDK LOADER
  // ============================================================
  function loadPayPalSDK(currency) {
    if (!ALLOWED.includes(currency)) {
      return Promise.reject(new Error(`Currency ${currency} not allowed`));
    }
    if (window.paypal && paypalLoadedCurrency === currency) {
      return Promise.resolve(window.paypal);
    }
    if (paypalSDKLoadingCurrency === currency && paypalSDKPromise) {
      return paypalSDKPromise;
    }
    if (paypalSDKLoadingCurrency && paypalSDKLoadingCurrency !== currency) {
      document.querySelectorAll('script[src*="paypal.com/sdk/js"]').forEach(s => s.remove());
      try { delete window.paypal; } catch (e) { window.paypal = undefined; }
      paypalLoadedCurrency = null;
      paypalSDKLoadingCurrency = null;
      paypalSDKPromise = null;
    }
    document.querySelectorAll('script[src*="paypal.com/sdk/js"]').forEach(s => s.remove());
    try { delete window.paypal; } catch (e) { window.paypal = undefined; }
    paypalLoadedCurrency = null;

    paypalSDKLoadingCurrency = currency;

    const url = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(PAYPAL_CLIENT_ID)}` +
                `&currency=${encodeURIComponent(currency)}` +
                `&intent=capture` +
                `&components=buttons`;

    paypalSDKPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = url;
      s.async = true;
      s.onload = () => {
        paypalSDKLoadingCurrency = null;
        if (!window.paypal) {
          reject(new Error(`PayPal SDK loaded for ${currency}, but window.paypal is missing.`));
          return;
        }
        paypalLoadedCurrency = currency;
        if (currency !== donationCurrency) {
          reject(new Error(`Stale SDK load for ${currency} ignored`));
          return;
        }
        resolve(window.paypal);
      };
      s.onerror = () => {
        paypalSDKLoadingCurrency = null;
        paypalLoadedCurrency = null;
        reject(new Error(`Failed to load PayPal SDK for ${currency}.`));
      };
      document.head.appendChild(s);
    });

    return paypalSDKPromise;
  }

  // ============================================================
  // PAYPAL BUTTON FACTORY
  // ============================================================
  function buildPayPalButtons(paypal, amount, currency) {
    return paypal.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
      createOrder: (data, actions) =>
        actions.order.create({
          purchase_units: [{
            amount: { value: amount, currency_code: currency }
          }]
        }),
      onApprove: (data, actions) =>
        actions.order.capture().then((details) => {
          console.log('Transaction completed by',
            details.payer && details.payer.name && details.payer.name.given_name);
          triggerDonationSuccess();
        }),
      onError: (err) => {
        const container = document.getElementById('paypal-button-container');
        if (container) showPayPalError(container, err);
      },
      onCancel: () => console.log('PayPal checkout cancelled')
    });
  }

  function showPayPalError(container, err) {
    console.error('PayPal button error:', err);
    const msg = (err && err.message) ? err.message : String(err);
    container.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = 'PayPal checkout failed: ' + msg;
    p.style.color = '#c00';
    p.style.fontSize = '0.85rem';
    container.appendChild(p);
  }

  // ============================================================
  // PAYPAL BUTTON RENDERING
  // ============================================================
  function renderPayPalButtons() {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;

    const modal = document.getElementById('donationModal');
    if (!modal || !modal.classList.contains('active')) return;

    if (!ALLOWED.includes(donationCurrency)) donationCurrency = DEFAULT_CURRENCY;

    const amount = formatAmount(donationAmount);
    const currency = donationCurrency;

    if (Number(amount) < MIN_AMOUNT) {
      setCheckoutStatus(`Minimum ${CURRENCY_SYMBOLS[currency]}${MIN_AMOUNT} for ${currency}.`, true);
      container.innerHTML =
        `<p style="font-size:0.85rem;color:#c00;">Minimum ${CURRENCY_SYMBOLS[currency]}${MIN_AMOUNT} for ${currency}.</p>`;
      return;
    }

    // Fast path
    if (window.paypal && paypalLoadedCurrency === currency) {
      try {
        if (paypalButtonsInstance && typeof paypalButtonsInstance.close === 'function') {
          try { paypalButtonsInstance.close(); } catch (e) { /* ignore */ }
        }
        container.innerHTML = '';
        setCheckoutStatus(`Pay ${CURRENCY_SYMBOLS[currency]}${amount} in ${currency}`);
        paypalButtonsInstance = buildPayPalButtons(window.paypal, amount, currency);
        paypalButtonsInstance.render('#paypal-button-container');
        return;
      } catch (e) {
        console.warn('Fast-path render failed:', e);
      }
    }

    // Slow path
    setCheckoutStatus(`Loading PayPal for ${currency}…`);
    container.innerHTML = '<p style="font-size:0.85rem;color:#555;">Loading PayPal…</p>';

    loadPayPalSDK(currency)
      .then((paypal) => {
        if (!paypal) throw new Error('PayPal SDK unavailable');
        container.innerHTML = '';
        setCheckoutStatus(`Pay ${CURRENCY_SYMBOLS[currency]}${amount} in ${currency}`);

        if (paypalButtonsInstance && typeof paypalButtonsInstance.close === 'function') {
          try { paypalButtonsInstance.close(); } catch (e) { /* ignore */ }
        }

        paypalButtonsInstance = buildPayPalButtons(paypal, amount, currency);
        return paypalButtonsInstance.render('#paypal-button-container');
      })
      .catch((err) => {
        console.error('Failed to load PayPal SDK:', err);
        container.innerHTML = '';
        setCheckoutStatus('Unable to load PayPal. Please try again.', true);

        const p = document.createElement('p');
        p.textContent = 'Unable to load PayPal. Please try again.';
        p.style.color = '#c00';
        p.style.fontSize = '0.85rem';
        container.appendChild(p);

        const retry = document.createElement('button');
        retry.type = 'button';
        retry.textContent = 'Retry';
        retry.style.marginTop = '0.5rem';
        retry.style.fontSize = '0.8rem';
        retry.addEventListener('click', () => renderPayPalButtons());
        container.appendChild(retry);
      });
  }

  // ============================================================
  // MODAL OPEN / CLOSE
  // ============================================================
  function openDonationModal(projectIndex) {
    const project = projects[projectIndex];
    if (!project) return;

    activeProject = project;
    donationAmount = DEFAULT_AMOUNT;
    donationCurrency = DEFAULT_CURRENCY;

    const titleEl = document.getElementById('modalProjectTitle');
    const descEl = document.getElementById('modalProjectDesc');
    const symbolEl = document.getElementById('modalCurrencySymbol');
    const customAmountEl = document.getElementById('customAmount');
    const backerNameEl = document.getElementById('backerName');
    const backerMessageEl = document.getElementById('backerMessage');
    const currencyEl = document.getElementById('donationCurrency');
    const successScreen = document.getElementById('modalSuccessScreen');
    const modal = document.getElementById('donationModal');

    if (titleEl) titleEl.textContent = `Fund ${project.title}`;
    if (descEl) descEl.textContent = project.desc;
    if (symbolEl) symbolEl.textContent = CURRENCY_SYMBOLS[donationCurrency];
    if (customAmountEl) { customAmountEl.value = ''; customAmountEl.min = MIN_AMOUNT; }
    if (backerNameEl) backerNameEl.value = '';
    if (backerMessageEl) backerMessageEl.value = '';
    if (currencyEl) currencyEl.value = donationCurrency;
    if (successScreen) successScreen.classList.remove('active');
    setCheckoutStatus('Loading PayPal…');

    const presetButtons = document.querySelectorAll('.preset-btn');
    presetButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-amount') === String(DEFAULT_AMOUNT)) btn.classList.add('active');
    });

    updatePresetLabels();

    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        renderPayPalButtons();
      });
    });
  }

  function closeDonationModal() {
    const modal = document.getElementById('donationModal');
    const successScreen = document.getElementById('modalSuccessScreen');
    if (modal) modal.classList.remove('active');
    if (successScreen) successScreen.classList.remove('active');
    document.body.style.overflow = '';

    if (paypalButtonsInstance && typeof paypalButtonsInstance.close === 'function') {
      try { paypalButtonsInstance.close(); } catch (e) { /* ignore */ }
    }
    paypalButtonsInstance = null;

    const container = document.getElementById('paypal-button-container');
    if (container) container.innerHTML = '';
  }

  function triggerDonationSuccess() {
    const successScreen = document.getElementById('modalSuccessScreen');
    const successProjectName = document.getElementById('successProjectName');
    if (successProjectName && activeProject) {
      successProjectName.textContent = activeProject.title;
    }
    if (successScreen) successScreen.classList.add('active');
  }

  // ============================================================
  // PRESET LABEL SYNC
  // ============================================================
  function updatePresetLabels() {
    const symbol = CURRENCY_SYMBOLS[donationCurrency] || '£';
    document.querySelectorAll('.preset-btn').forEach(btn => {
      const amt = btn.getAttribute('data-amount');
      btn.textContent = `${symbol}${amt}`;
    });
  }

  // ============================================================
  // MODAL LISTENERS
  // ============================================================
  function initDonationModalListeners() {
    const closeBtn = document.getElementById('closeDonationModal');
    const successCloseBtn = document.getElementById('successCloseBtn');
    const modalOverlay = document.getElementById('donationModal');

    if (closeBtn) closeBtn.addEventListener('click', closeDonationModal);
    if (successCloseBtn) successCloseBtn.addEventListener('click', closeDonationModal);
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function(e) {
        if (e.target === this) closeDonationModal();
      });
    }

    const presets = document.querySelectorAll('.preset-btn');
    const customAmountInput = document.getElementById('customAmount');
    const currencySelect = document.getElementById('donationCurrency');

    presets.forEach(btn => {
      btn.addEventListener('click', function() {
        presets.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        donationAmount = parseFloat(this.getAttribute('data-amount')) || 0;
        if (customAmountInput) customAmountInput.value = '';
        renderPayPalButtons();
      });
    });

    if (customAmountInput) {
      customAmountInput.addEventListener('input', function() {
        presets.forEach(b => b.classList.remove('active'));
        const val = parseFloat(this.value);
        donationAmount = isNaN(val) ? 0 : val;
        renderPayPalButtons();
      });
    }

    if (currencySelect) {
      currencySelect.addEventListener('change', function() {
        donationCurrency = ALLOWED.includes(this.value) ? this.value : DEFAULT_CURRENCY;
        this.value = donationCurrency;

        const symbolEl = document.getElementById('modalCurrencySymbol');
        if (symbolEl) symbolEl.textContent = CURRENCY_SYMBOLS[donationCurrency];

        updatePresetLabels();

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            renderPayPalButtons();
          });
        });
      });
    }
  }

  // ============================================================
  // BRAND FUND BUTTONS
  // ============================================================
  function initBrandFundButtons() {
    const brandMap = {
      "scourge": "Scourge · High-Performance Data Storage",
      "restoracin": "Restoracin · Restorative Eyecare",
      "radfrac-derma": "RadFrac Derma · Clinical Derma Brand"
    };

    document.querySelectorAll('.brand-neo-block .project-card-donate-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const brand = this.getAttribute('data-brand');
        const title = brandMap[brand];
        if (!title) return;
        const idx = projects.findIndex(p => p.title === title);
        if (idx >= 0) openDonationModal(idx);
      });
    });
  }

  // ============================================================
  // GOOGLE FORM FOCUS
  // ============================================================
  function focusGoogleForm() {
    const iframe = document.getElementById('google-form-iframe');
    if (!iframe) return;
    setTimeout(() => {
      try { iframe.focus(); } catch (e) {
        console.warn('Unable to programmatically focus Google Form iframe: ', e);
      }
    }, 600);
  }

  // ============================================================
  // INIT
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    renderProjects('all');
    initFilters();
    initCounters();
    initMobileNav();
    initDonationModalListeners();
    initBrandFundButtons();
    focusGoogleForm();
    updatePresetLabels();
  });

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#contact') focusGoogleForm();
  });
})();
