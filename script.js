// Netlify Function URL - this will forward requests to your Google Apps Script
const SCRIPT_URL = '/.netlify/functions/rsvp';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out'
    });

    // Get form and submit button
    const form = document.getElementById('rsvp-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    const formContainer = document.getElementById('rsvp-form-container');

    // Add form submit event listener
    form.addEventListener('submit', handleSubmit);

    // Handle form submission
    async function handleSubmit(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validate required fields
        if (!data.name || !data.attendance || !data.pax) {
            alert('Sila isi semua maklumat yang diperlukan');
            return;
        }

        // Show loading state
        setLoadingState(true);

        try {
            // Send data to Google Sheets
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Show success message and hide form
                formContainer.classList.add('hidden');
                successMessage.classList.remove('hidden');
                successMessage.scrollIntoView({ behavior: 'smooth' });
            } else {
                throw new Error(`Error: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terdapat ralat semasa menghantar RSVP anda. Sila cuba lagi.');
        } finally {
            // Reset button state
            setLoadingState(false);
        }
    }

    // Function to handle loading state
    function setLoadingState(isLoading) {
        if (isLoading) {
            submitBtn.textContent = 'Menghantar...';
            submitBtn.classList.add('btn-loading');
        } else {
            submitBtn.textContent = 'Hantar RSVP';
            submitBtn.classList.remove('btn-loading');
        }
    }

    // Smooth scrolling for navigation links (if needed)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});