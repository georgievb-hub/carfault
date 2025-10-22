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

  // ---------- Feedback form handler ----------
  window.submitFeedback = async function(event){
    if(event.preventDefault) event.preventDefault();
    const form = event.target.closest('form') || document.getElementById('feedback-form');
    if(!form) return;
    
    const btn = form.querySelector('button[type=submit]');
    if(btn) btn.disabled = true;

    const name = document.getElementById('name')?.value || 'Anonymous';
    const email = document.getElementById('email')?.value || '';
    const message = document.getElementById('message')?.value || '';

    try {
      await fetch('https://your-firebase-function-endpoint/submitFeedback', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ name, email, message })
      });
      alert('Thanks, ' + name + '! Your feedback has been received.');
      form.reset();
    } catch(e) {
      console.error('Submission failed:', e);
      alert('Failed to send feedback. Please try again later.');
    } finally {
      if(btn) btn.disabled = false;
    }
    return false;
  };
})();
