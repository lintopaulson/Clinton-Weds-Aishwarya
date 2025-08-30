//toggle background active
const slideNavigator = name => {
  let slides = document.querySelectorAll('.bg-slide');
  slides.forEach(slide => {
    slide.classList.remove('active');
  if(slide.classList.contains(name)) {
    slide.classList.add('active');
   }
 });
}


//share button function

document.addEventListener("DOMContentLoaded", function () {
    const shareBtn = document.querySelector(".share a");

    shareBtn.addEventListener("click", async function (e) {
      e.preventDefault();

      if (navigator.share) {
        try {
          await navigator.share({
            title: document.title,
            text: "Check out this wedding website!",
            url: window.location.href
          });
          console.log("Thanks for sharing!");
        } catch (err) {
          console.log("Sharing failed:", err);
        }
      } else {
        // Fallback (if Web Share API not supported)
        alert("Sharing not supported on this device. Copy this link:\n" + window.location.href);
      }
    });
  });



//switch background
window.addEventListener('load', () => {
  document.querySelectorAll('.slide-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('data-target');

      document.querySelectorAll('.bg-slide').forEach(slide => {
        slide.classList.remove('active');

        // reset animation safely
        const img = slide.querySelector('.slide-img');
        if (img) {
          img.style.animation = 'none';
          img.offsetHeight; // reflow
          img.style.animation = null;
        }
      });

      document.querySelectorAll('.slide-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const activeSlide = document.querySelector(`.${target}`);
      if (activeSlide) {
        activeSlide.classList.add('active');

        // NEW: re-apply focal to the newly active image
        const activeImg = activeSlide.querySelector('.slide-img');
        if (activeImg) {
          const focal = activeImg.dataset.focal || '58% 38%';
          activeImg.style.objectPosition = focal;
          activeImg.style.transformOrigin = focal;
        }
      }
    });
  });
});

//activate sections
const sectionNavigator = name => {
    let sections = document.querySelectorAll('section');
  let header = document.querySelector('header');
    sections.forEach(section => {
        section.classList.remove('section-show');
      if(section.classList.contains(name)) {
        section.classList.add('section-show');
        header.classList.add('active');
       }  
     });
};

//navigation to sections
window.addEventListener('load', () => {
    const navList = document.querySelectorAll('.nav-btn');
  navList.forEach(nav => {
    nav.addEventListener('click', function(e) {
        e.preventDefault();
        navList.forEach(el => {
            el.classList.remove('active');
        });
        this.classList.add('active');
        sectionNavigator(this.getAttribute('data-target'));
        screen.width <768 && toggleMenu();
     });
   });
});

//reset header to initial state
const resetHeader = () => {
    let header = document.querySelector('header');
    header.classList.remove('active');
};

//initial navigation
const initNavigation = () => {
    const navList = document.querySelectorAll('.nav-btn');
    navList.forEach(el => {
        el.classList.remove('active');

        if(el.getAttribute('data-target') === 'about') {
            el.classList.add('active');
        
        }
    });
    sectionNavigator('about');
};


//hamburger toggle menu
const toggleMenu = () => {
  const menu = document.querySelector('.menu');
  const navMobile = document.querySelector('.nav-mobile');
  menu.classList.toggle('active');
  navMobile.classList.toggle('active');
};


// COUNTDOWN with flip animation
const eventDate = new Date("2025-12-26T17:30:00").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance < 0) {
    document.getElementById("flip-countdown").innerHTML = "The Wedding is Live!";
    return;
  }

  const days = String(Math.floor(distance / (1000*60*60*24))).padStart(2,'0');
  const hours = String(Math.floor((distance % (1000*60*60*24))/(1000*60*60))).padStart(2,'0');
  const minutes = String(Math.floor((distance % (1000*60*60))/(1000*60))).padStart(2,'0');
  const seconds = String(Math.floor((distance % (1000*60))/1000)).padStart(2,'0');

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  // trigger flip animation
  document.querySelectorAll('#flip-countdown span').forEach(span => {
    span.style.animation = "none";
    span.offsetHeight; // reset animation
    span.style.animation = null;
  });
}
setInterval(updateCountdown, 1000);
updateCountdown();



//initialising image gallery for venue page

const track = document.getElementById("slideTrack");
const slides = document.querySelectorAll(".slide-track img");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let index = 0;

function showSlide(n) {
  index = (n + slides.length) % slides.length; // wrap around
  track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  showSlide(index + 1);
});

prevBtn.addEventListener("click", () => {
  showSlide(index - 1);
});

// Auto play infinite loop
setInterval(() => {
  showSlide(index + 1);
}, 3000);




(function(){
  document.querySelectorAll('.slide-img').forEach(img=>{
    const focal = img.dataset.focal || '58% 38%';
    img.style.objectPosition = focal;
    img.style.transformOrigin = focal;
  });

  // Dev helper: hold Alt + Arrow keys to fine-tune focal on the active slide
  document.addEventListener('keydown', e=>{
    if(!e.altKey) return;
    const active = document.querySelector('.bg-slide.active .slide-img');
    if(!active) return;
    const [xStr,yStr]=(active.style.objectPosition || '50% 50%').split(' ');
    let x=parseFloat(xStr), y=parseFloat(yStr);
    if(e.key==='ArrowLeft')  x-=1;
    if(e.key==='ArrowRight') x+=1;
    if(e.key==='ArrowUp')    y-=1;
    if(e.key==='ArrowDown')  y+=1;
    x=Math.max(0,Math.min(100,x));
    y=Math.max(0,Math.min(100,y));
    const val=`${x}% ${y}%`;
    active.style.objectPosition = val;
    active.style.transformOrigin = val;
    active.dataset.focal = val;
    console.log('Focal:', val);
    e.preventDefault();
  });
})();



//send wishes confirmation 

  document.getElementById("wishForm").addEventListener("submit", function(e) {
    e.preventDefault(); // prevent page reload
    
    // Show confirmation
    const confirmMsg = document.getElementById("wishConfirm");
    confirmMsg.style.display = "block";

    // Clear inputs
    this.reset();

    // Hide message automatically after 3 seconds
    setTimeout(() => {
      confirmMsg.style.display = "none";
    }, 3000);
  });



// Show popup after 15 seconds
setTimeout(() => {
  document.getElementById("rsvpPopup").style.display = "flex";
}, 10000); // changed to 15s

// Close function
function closePopup() {
  document.getElementById("rsvpPopup").style.display = "none";
}

// Submit RSVP form via AJAX
document.getElementById("rsvpForm").addEventListener("submit", function(e) {
  e.preventDefault(); // stop default form submission

  const confirmBtn = document.getElementById("confirmBtn");
  confirmBtn.disabled = true;
  confirmBtn.textContent = "Submitting...";

  const formData = new FormData(this);

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  })
  .then(async (response) => {
    if (response.ok) {
      document.querySelector("#rsvpPopup .popup-content").innerHTML = 
        "<h2>Thank you for confirming!</h2>";
      setTimeout(() => {
        closePopup();
      }, 3000); // auto close after 3s
    } else {
      confirmBtn.disabled = false;
      confirmBtn.textContent = "Confirm";
      alert("Something went wrong. Please try again.");
    }
  })
  .catch(() => {
    confirmBtn.disabled = false;
    confirmBtn.textContent = "Confirm";
    alert("Network error. Please try again.");
  });
});

