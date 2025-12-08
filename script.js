// Netlify Function URL - this will forward requests to your Google Apps Script
const SCRIPT_URL = '/.netlify/functions/rsvp';

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animations
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-in-out',
    disable: 'mobile'
  });

  // 1. Door Animation & Body Unlock
  const door = document.getElementById("door");
  const openBtn = document.getElementById("open-btn");
  const bodyLock = document.getElementById("body-lock");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      door.classList.add("animate-fade-out-up");

      // Allow scrolling on body/frame after door opens
      if (bodyLock) bodyLock.classList.remove("overflow-hidden");

      // Remove from DOM after animation
      setTimeout(() => {
        door.style.display = "none";
      }, 1000);
    });
  }

  // 2. Countdown Timer
  // Target: Dec 25, 2025, 11:30 AM
  const targetDate = new Date("2025-12-25T11:30:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      ["days", "hours", "minutes", "seconds"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.innerText = "00";
      });
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.innerText = val.toString().padStart(2, "0");
    };

    setVal("days", days);
    setVal("hours", hours);
    setVal("minutes", minutes);
    setVal("seconds", seconds);
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // 3. RSVP Logic
  const form = document.getElementById("rsvp-form");
  const successMessage = document.getElementById("success-message");
  const submitBtn = document.getElementById("submit-btn");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      if (!data.name || !data.attendance || !data.pax) {
        alert("Sila isi penuh");
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = "Sending...";

      try {
        if (!SCRIPT_URL) {
          console.log("Simulating success (No URL set)");
          await new Promise((r) => setTimeout(r, 1000));
        } else {
          const response = await fetch(SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }

          const responseData = await response.json();
          console.log('Success:', responseData);
        }
        form.classList.add("hidden");
        if (successMessage) successMessage.classList.remove("hidden");
      } catch (error) {
        console.error(error);
        alert("Error submitting form");
      } finally {
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  // 4. Smooth Scroll for Bottom Nav
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});