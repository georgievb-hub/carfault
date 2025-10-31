// main.js — shared across all pages
(function(){
  // ---------- Helpers ----------
  function isMobile() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iphone|ipad|ipod|windows phone/i.test(ua);
  }

  function getMode() {
    return new URLSearchParams(window.location.search).get('mode');
  }

  // ---------- Document mode ----------
  document.addEventListener('DOMContentLoaded', function() {
    if(getMode() === '1'){
      // hide navbar and footer links
      const navbar = document.querySelector('nav.navbar');
      if(navbar) navbar.style.display='none';
      const footerLinks = document.querySelectorAll('footer a');
      footerLinks.forEach(el => el.style.display='none');
    }

    // Install modal for mobile users
    if(isMobile()){
      let showModal = true;
      if(navigator.standalone || window.matchMedia('(display-mode: standalone)').matches){
        showModal = false;
      }
      if(showModal){
        const el = document.getElementById('cf-install-modal');
        if(el) new bootstrap.Modal(el).show();
      }
    }
  });
})();
