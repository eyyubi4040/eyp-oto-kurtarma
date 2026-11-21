/**
 * EYP OTO KURTARMA - KIRŞEHİR 7/24 ÇEKİCİ & YOL YARDIM
 * Interactive Application Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileDrawer();
  initFaqAccordion();
  initPriceCalculator();
  initLiveLocationButtons();
});

/* --------------------------------------------------------------------------
   STICKY HEADER SCROLL EFFECT
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('header.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   MOBILE DRAWER NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const burgerBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-links a');

  if (!burgerBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  burgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   PRICE & DISTANCE CALCULATOR
   -------------------------------------------------------------------------- */
function initPriceCalculator() {
  const calcForm = document.getElementById('priceCalculatorForm');
  const fromSelect = document.getElementById('calcFrom');
  const toSelect = document.getElementById('calcTo');
  const vehicleTypeInputs = document.querySelectorAll('input[name="vehicleType"]');
  const serviceTypeSelect = document.getElementById('calcServiceType');

  // Result displays
  const distanceDisplay = document.getElementById('displayDistance');
  const durationDisplay = document.getElementById('displayDuration');
  const priceDisplay = document.getElementById('displayPrice');
  const ctaBtn = document.getElementById('calcCtaBtn');

  if (!fromSelect || !priceDisplay) return;

  // District database relative to Kırşehir Center (km approx)
  const locationDistances = {
    'kirsehir-merkez': { km: 5, duration: '10-15 dk', basePrice: 1200 },
    'sanayi-sitesi': { km: 4, duration: '10 dk', basePrice: 1000 },
    'ahi-evran-bagbasi': { km: 6, duration: '12-15 dk', basePrice: 1200 },
    'petlas-cevre-yolu': { km: 8, duration: '12-15 dk', basePrice: 1400 },
    'ozbag': { km: 12, duration: '15-20 dk', basePrice: 1600 },
    'mucur': { km: 25, duration: '20-25 dk', basePrice: 2200 },
    'kaman': { km: 55, duration: '35-45 dk', basePrice: 3500 },
    'akpinar': { km: 40, duration: '30-35 dk', basePrice: 3000 },
    'cicekdagi': { km: 65, duration: '45-55 dk', basePrice: 4200 },
    'boztepe': { km: 20, duration: '20-25 dk', basePrice: 2000 },
    'akcakent': { km: 68, duration: '50-60 dk', basePrice: 4400 },
    'd260-karayolu': { km: 35, duration: '25-30 dk', basePrice: 2800 },
    'd715-karayolu': { km: 30, duration: '20-30 dk', basePrice: 2600 },
    'ankara': { km: 185, duration: '2-2.5 saat', basePrice: 9500 },
    'kayseri': { km: 135, duration: '1.5-2 saat', basePrice: 7500 },
    'nevsehir': { km: 90, duration: '1-1.5 saat', basePrice: 5200 },
    'kirikkale': { km: 110, duration: '1-1.5 saat', basePrice: 6200 },
    'aksaray': { km: 110, duration: '1-1.5 saat', basePrice: 6200 }
  };

  const vehicleMultipliers = {
    'sedan': 1.0,
    'suv': 1.2,
    'commercial': 1.4,
    'moto': 0.8,
    'heavy': 1.8,
    'damaged': 1.6
  };

  function updateCalculation() {
    const fromVal = fromSelect.value || 'kirsehir-merkez';
    const toVal = toSelect ? toSelect.value : 'sanayi-sitesi';
    
    let vehicleVal = 'sedan';
    vehicleTypeInputs.forEach(input => {
      if (input.checked) vehicleVal = input.value;
      const label = input.closest('.calc-radio-label');
      if (label) {
        if (input.checked) label.classList.add('selected');
        else label.classList.remove('selected');
      }
    });

    const serviceMultiplier = serviceTypeSelect && serviceTypeSelect.value === 'vinc' ? 1.6 : 1.0;

    const locData = locationDistances[fromVal] || locationDistances['kirsehir-merkez'];
    const vehicleMult = vehicleMultipliers[vehicleVal] || 1.0;

    let totalEstimate = Math.round((locData.basePrice * vehicleMult * serviceMultiplier) / 50) * 50;
    let minPrice = Math.round(totalEstimate * 0.95);
    let maxPrice = Math.round(totalEstimate * 1.15);

    if (distanceDisplay) distanceDisplay.textContent = `~${locData.km} km`;
    if (durationDisplay) durationDisplay.textContent = locData.duration;
    if (priceDisplay) {
      priceDisplay.textContent = `${minPrice.toLocaleString('tr-TR')} - ${maxPrice.toLocaleString('tr-TR')} ₺`;
    }

    if (ctaBtn) {
      const fromText = fromSelect.options[fromSelect.selectedIndex].text;
      const msg = encodeURIComponent(`Merhaba EYP Oto Kurtarma, ${fromText} bölgesinde ${vehicleVal} tipi aracım için çekici fiyatı almak ve çağırmak istiyorum.`);
      ctaBtn.href = `https://wa.me/905550000000?text=${msg}`;
    }
  }

  fromSelect.addEventListener('change', updateCalculation);
  if (toSelect) toSelect.addEventListener('change', updateCalculation);
  if (serviceTypeSelect) serviceTypeSelect.addEventListener('change', updateCalculation);
  vehicleTypeInputs.forEach(input => input.addEventListener('change', updateCalculation));

  // Initial calculation
  updateCalculation();
}

/* --------------------------------------------------------------------------
   LIVE LOCATION WHATSAPP SHARE
   -------------------------------------------------------------------------- */
function initLiveLocationButtons() {
  const locationButtons = document.querySelectorAll('[data-action="send-live-location"]');
  if (!locationButtons.length) return;

  locationButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      if ('geolocation' in navigator) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Konum Alınıyor...';

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
            const message = encodeURIComponent(
              `Merhaba EYP Oto Kurtarma, Kırşehir'de yolda kaldım, acil çekiciye ihtiyacım var! Canlı Harita Konumum: ${mapsUrl}`
            );
            btn.innerHTML = originalText;
            window.open(`https://wa.me/905550000000?text=${message}`, '_blank');
          },
          (error) => {
            btn.innerHTML = originalText;
            const fallbackMsg = encodeURIComponent(
              `Merhaba EYP Oto Kurtarma, Kırşehir'de yolda kaldım, acil çekiciye ihtiyacım var. Konumumu bu mesajın ardından iletiyorum.`
            );
            window.open(`https://wa.me/905550000000?text=${fallbackMsg}`, '_blank');
          },
          { timeout: 7000, enableHighAccuracy: true }
        );
      } else {
        const fallbackMsg = encodeURIComponent(
          `Merhaba EYP Oto Kurtarma, Kırşehir'de yolda kaldım, acil çekiciye ihtiyacım var.`
        );
        window.open(`https://wa.me/905550000000?text=${fallbackMsg}`, '_blank');
      }
    });
  });
}
