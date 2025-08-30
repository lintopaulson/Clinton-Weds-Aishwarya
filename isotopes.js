/* Easy Selector helper function */
const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

/* Easy event listener function */
const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all);
  if (selectEl) {
    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  }
};

//Portfolio isotope and filter
window.addEventListener('load', () => {
  let portfolioContainer = select('.portfolio-container');
  if (portfolioContainer) {
    let isotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item'
    });

    let portfolioFilters = select('#portfolio-filters li', true);

    on('click', '#portfolio-filters li', function(e) {
      e.preventDefault();
      portfolioFilters.forEach(function(el) {
        el.classList.remove('filter-active');
      });
      this.classList.add('filter-active');

      isotope.arrange({
        filter: this.getAttribute('data-filter')
      });
      isotope.on('arrangeComplete', function() {
        AOS.refresh();
      });
    }, true);
  }
});

let isotope = new Isotope(portfolioContainer, {
  itemSelector: '.portfolio-item',
  percentPosition: true,
  masonry: {
    columnWidth: '.portfolio-item', // makes grid consistent
    gutter: 20 // gap between items (px)
  }
});

imagesLoaded(portfolioContainer, function() {
  isotope.layout();
});

 AOS.init({
    duration: 800,  // animation duration
    easing: 'ease-in-out', 
    once: true      // animate only once
  });

