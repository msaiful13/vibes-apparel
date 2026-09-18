document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
       1. DYNAMIC CURRENCY SWITCHER LOGIC
       ========================================================== */
    const currencySelect = document.getElementById('currency-select');

    // Centralized exchange rates configuration relative to base currency MYR
    const currencyConfig = {
        MYR: { symbol: 'RM ', rate: 1.0, position: 'prefix' },
        USD: { symbol: '$ ', rate: 0.22, position: 'prefix' },
        SGD: { symbol: 'S$ ', rate: 0.29, position: 'prefix' }
    };

    /**
     * Updates every single element on the page containing the `data-price-myr` attribute
     * without relying on individual IDs.
     */
    function updatePagePrices(targetCurrency) {
        const selectedConfig = currencyConfig[targetCurrency];
        if (!selectedConfig) return;

        // Query all price elements dynamically in the DOM
        const priceElements = document.querySelectorAll('[data-price-myr]');

        priceElements.forEach((el) => {
            const basePriceMYR = parseFloat(el.getAttribute('data-price-myr'));
            
            if (!isNaN(basePriceMYR)) {
                // Calculate new price based on exchange rate
                const convertedPrice = (basePriceMYR * selectedConfig.rate).toFixed(2);
                
                // Format price string with selected currency symbol
                el.textContent = `${selectedConfig.symbol}${convertedPrice}`;
            }
        });
    }

    // Event Listener for Header Currency Dropdown Selector
    if (currencySelect) {
        currencySelect.addEventListener('change', (e) => {
            updatePagePrices(e.target.value);
        });
    }

    /* ==========================================================
       2. MOBILE NAVIGATION MENU TOGGLE
       ========================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Auto-close mobile menu when clicking any link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    /* ==========================================================
       3. INTERSECTION OBSERVER (SCROLL ANIMATIONS)
       ========================================================== */
    const observerOptions = {
        root: null,
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target); // Reveal animation once
            }
        });
    }, observerOptions);

    // Apply observer to all elements with class .fade-in
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
});