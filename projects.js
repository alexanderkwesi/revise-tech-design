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
    }
  ];

  // ---- Config ----
  const PAYPAL_CLIENT_ID = "BAAH-MwZpyci773ZkqlhjG4b9ANOgioXck1Mdq5zeGXOIFVsUtX6aBILoMQjlKDCy0frWLrpl3hxzYfigE";

  // ---- Multi-currency config ----
  const ALLOWED = ['GBP', 'USD', 'EUR'];
  const CURRENCY_SYMBOLS = { GBP: '£', USD: '$', EUR: '€' };
  const DEFAULT_CURRENCY = 'GBP';
  const MIN_AMOUNT_BY_CURRENCY = { GBP: 1, USD: 1, EUR: 1 };

  // ---- State ----
  let activeProject = null;
  let donationAmount = 10;
  let donationCurrency = DEFAULT_CURRENCY;

  let paypalSDKPromise = null;
  let paypalSDKLoadingCurrency = null;   // currency currently being loaded
  let paypalLoadedCurrency = null;       // currency the SDK is loaded for
  let paypalButtonsInstance = null;

  // ---- Projects rendering ----
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
              <button class="project-card-donate-btn" data-index="${originalIndex}">Fund</button>
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

  // ---- Filters ----
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

  // ---- Counters ----
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

        if (target >= 100) {
          counter.textContent = `${prefix}${currentValue.toLocaleString()}${suffix}`;
        } else {
          counter.textContent = `${prefix}${currentValue}${suffix}`;
        }

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

  // ---- Mobile nav ----
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

  // ---- Donation helpers ----
  function getDonationAmount() { return donationAmount; }
  function getDonationCurrency() { return donationCurrency; }

  function formatAmount(value) {
    const n = Number(value);
    return (isNaN(n) ? 0 : n).toFixed(2);
  }

  function updatePresetLabels() {
    const symbol = CURRENCY_SYMBOLS[donationCurrency] || '£';
    document.querySelectorAll('.preset-btn').forEach(btn => {
      const amt = btn.getAttribute('data-amount');
      btn.textContent = `${symbol}${amt}`;
    });
  }

  // ---- PayPal SDK loader (per-currency, in-flight locked, stale-safe) ----
  function loadPayPalSDK(currency) {
    if (!ALLOWED.includes(currency)) {
      return Promise.reject(new Error(`Currency ${currency} not allowed`));
    }

    // Cache hit: SDK already loaded for THIS exact currency code
    if (window.paypal && paypalLoadedCurrency === currency) {
      return Promise.resolve(window.paypal);
    }

    // In-flight: same currency already loading → reuse
    if (paypalSDKLoadingCurrency === currency && paypalSDKPromise) {
      return paypalSDKPromise;
    }

    // In-flight for a DIFFERENT currency → abandon and start fresh
    if (paypalSDKLoadingCurrency && paypalSDKLoadingCurrency !== currency) {
      document.querySelectorAll('script[src*="paypal.com/sdk/js"]').forEach(s => s.remove());
      try { delete window.paypal; } catch (e) { window.paypal = undefined; }
      paypalLoadedCurrency = null;
      paypalSDKLoadingCurrency = null;
      paypalSDKPromise = null;
    }

    // Clean slate before loading
    document.querySelectorAll('script[src*="paypal.com/sdk/js"]').forEach(s => s.remove());
    try { delete window.paypal; } catch (e) { window.paypal = undefined; }
    paypalLoadedCurrency = null;

    paypalSDKLoadingCurrency = currency;

    // &currency= MUST match createOrder's currency_code
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
          reject(new Error(
            `PayPal SDK loaded for ${currency}, but window.paypal is missing. ` +
            `Check Client ID, ad blockers, and CSP.`
          ));
          return;
        }

        paypalLoadedCurrency = currency;

        // Ignore stale loads: user may have switched currency mid-flight
        if (currency !== donationCurrency) {
          reject(new Error(`Stale SDK load for ${currency} ignored`));
          return;
        }

        resolve(window.paypal);
      };

      s.onerror = () => {
        paypalSDKLoadingCurrency = null;
        paypalLoadedCurrency = null;
        reject(new Error(
          `Failed to load PayPal SDK for ${currency}. ` +
          `Common causes: invalid/live-mismatched Client ID, ad blocker, ` +
          `CSP blocking *.paypal.com, or offline.`
        ));
      };

      document.head.appendChild(s);
    });

    return paypalSDKPromise;
  }

  // ---- Shared PayPal button config factory ----
  function buildPayPalButtons(paypal, amount, currency) {
    return paypal.Buttons({
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

  // ---- PayPal button rendering ----
    // ---- Secure checkout status helper ----
  function setCheckoutStatus(text, isError = false) {
    const el = document.getElementById('secure-checkout-status');
    if (!el) return;
    el.textContent = text;
    el.style.color = isError ? '#c00' : '#555';
  }

  // ---- PayPal button rendering (fast + slow path, status-aware) ----
  function renderPayPalButtons() {
    const container = document.getElementById('paypal-button-container');
    const section = document.getElementById('secure-checkout-section');
    if (!container || !section) return;

    const modal = document.getElementById('donationModal');
    if (!modal || !modal.classList.contains('active')) return;

    // Validate currency
    if (!ALLOWED.includes(donationCurrency)) {
      donationCurrency = DEFAULT_CURRENCY;
    }

    const amount = formatAmount(getDonationAmount());
    const currency = getDonationCurrency();

    // Enforce per-currency minimum
    const min = MIN_AMOUNT_BY_CURRENCY[currency] || 1;
    if (Number(amount) < min) {
      setCheckoutStatus(
        `Minimum ${CURRENCY_SYMBOLS[currency]}${min} for ${currency}.`,
        true
      );
      container.innerHTML = '';
      return;
    }

    // Fast path: SDK already loaded for this currency → re-render immediately
    if (window.paypal && paypalLoadedCurrency === currency) {
      try {
        if (paypalButtonsInstance && typeof paypalButtonsInstance.close === 'function') {
          try { paypalButtonsInstance.close(); } catch (e) { /* ignore */ }
        }
        container.innerHTML = '';
        setCheckoutStatus(`Pay in ${currency}`);

        paypalButtonsInstance = buildPayPalButtons(window.paypal, amount, currency);
        paypalButtonsInstance.render('#paypal-button-container');

        // Re-measure in case the container was display:none at render time
        requestAnimationFrame(() => {
          if (container.offsetHeight === 0 && section.offsetHeight > 0) {
            // Force a reflow then re-render once
            container.style.display = 'block';
            container.style.minHeight = '45px';
          }
        });
        return;
      } catch (e) {
        console.warn('Fast-path render failed, falling back to SDK reload:', e);
        // Fall through to slow path
      }
    }

    // Slow path: (re)load SDK for this currency
    setCheckoutStatus(`Loading PayPal for ${currency}…`);
    container.innerHTML = '';

    loadPayPalSDK(currency)
      .then((paypal) => {
        if (!paypal) throw new Error('PayPal SDK unavailable');

        container.innerHTML = '';
        setCheckoutStatus(`Pay in ${currency}`);

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

        const retry = document.createElement('button');
        retry.type = 'button';
        retry.textContent = 'Retry';
        retry.style.marginTop = '0.5rem';
        retry.style.fontSize = '0.8rem';
        retry.addEventListener('click', () => renderPayPalButtons());
        container.appendChild(retry);
      });
  }

  // ---- Modal open / close ----
  function openDonationModal(projectIndex) {
    const project = projects[projectIndex];
    if (!project) return;

    activeProject = project;
    donationAmount = 10;
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
    const curr = document.getElementById('currency');

    if (titleEl) titleEl.textContent = `Fund ${project.title}`;
    if (descEl) descEl.textContent = project.desc;
    if (symbolEl) symbolEl.textContent = CURRENCY_SYMBOLS[donationCurrency];
    if (curr) curr.textContent = donationCurrency;
    if (customAmountEl) {
      customAmountEl.value = '';
      customAmountEl.min = MIN_AMOUNT_BY_CURRENCY[donationCurrency];
    }
    if (backerNameEl) backerNameEl.value = '';
    if (backerMessageEl) backerMessageEl.value = '';
    if (currencyEl) currencyEl.value = donationCurrency;
    if (successScreen) successScreen.classList.remove('active');

    const presetButtons = document.querySelectorAll('.preset-btn');
    presetButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-amount') === '10') btn.classList.add('active');
    });

    updatePresetLabels();

    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(renderPayPalButtons, 0);
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

  // ---- Modal listeners ----
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

    const currencySelect = document.getElementById('donationCurrency');

    if (currencySelect) {
      currencySelect.addEventListener('change', function() {
        // 1. Normalise + persist
        donationCurrency = ALLOWED.includes(this.value) ? this.value : DEFAULT_CURRENCY;
        this.value = donationCurrency;

        // 2. Update currency indicators
        const symbolEl = document.getElementById('modalCurrencySymbol');
        if (symbolEl) symbolEl.textContent = CURRENCY_SYMBOLS[donationCurrency];

        const curr = document.getElementById('currency');
        if (curr) curr.textContent = donationCurrency;

        if (customAmountInput) customAmountInput.min = MIN_AMOUNT_BY_CURRENCY[donationCurrency];

        updatePresetLabels();

        // 3. Force PayPal to reload for the new currency and re-render.
        //    requestAnimationFrame ensures the DOM has painted the new
        //    labels/symbol before we tear down and re-render the container.
        requestAnimationFrame(() => {
          renderPayPalButtons();
        });
      });
    }
  }

  // ---- Google Form focus helper ----
  function focusGoogleForm() {
    const iframe = document.getElementById('google-form-iframe');
    if (!iframe) return;
    setTimeout(() => {
      try { iframe.focus(); } catch (e) {
        console.warn('Unable to programmatically focus Google Form iframe: ', e);
      }
    }, 600);
  }

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', () => {
    renderProjects('all');
    initFilters();
    initCounters();
    initMobileNav();
    initDonationModalListeners();
    focusGoogleForm();
    updatePresetLabels();
  });

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#contact') focusGoogleForm();
  });
})();
