# Wedding Invitation Website

## Project Overview
This is a static, mobile-first wedding invitation website with Google Sheets integration for RSVP management. The site features an elegant design with parallax background effects, smooth animations, and a responsive layout optimized for mobile devices.

### Key Features
- Mobile-responsive design with elegant typography
- Parallax background effect with semi-transparent content cards
- Animated scroll effects using AOS (Animate On Scroll) library
- RSVP form with Google Sheets integration
- Form validation and user feedback states
- Beautiful typography using Great Vibes (headings) and Lato (body) fonts

### Technologies Used
- HTML5
- CSS3 (with Tailwind CSS via CDN)
- JavaScript (ES6+)
- Google Fonts (Great Vibes, Lato)
- AOS (Animate On Scroll) library
- Google Apps Script (for form submission to Google Sheets)

## Project Structure
```
jemputan-perkahwinan/
├── index.html          # Main HTML file with all sections
├── styles.css          # Custom CSS styling
├── script.js           # JavaScript functionality
└── QWEN.md             # This documentation file
```

## File Descriptions

### index.html
Main HTML file containing:
- Complete page structure with Hero, Event Details, and RSVP sections
- CDN links for Tailwind CSS, Google Fonts, and AOS library
- Responsive design with Tailwind CSS classes
- RSVP form with Name, Attendance (Yes/No), Number of Guests (Pax), and Message fields
- Semantic HTML structure with proper accessibility attributes

### styles.css
Custom CSS with:
- Elegant typography styling for Great Vibes and Lato fonts
- Mobile-first responsive design
- Parallax background effects
- Custom form element styling
- AOS animation classes
- Custom scrollbar styling
- Focus states for accessibility

### script.js
JavaScript functionality including:
- Google Sheets integration via fetch API
- Form validation and submission handling
- Loading state (button text changes to "Sending...")
- Success state (form hides, thank you message appears)
- Error handling for failed submissions
- AOS animation initialization
- Smooth scrolling for navigation links

## Functionality

### RSVP Form
The RSVP form includes four fields:
1. **Name**: Text input for guest name
2. **Attendance**: Radio buttons for "Yes, I will attend" or "No, I cannot attend"
3. **Number of Guests (Pax)**: Dropdown with options 1-8 guests
4. **Message**: Optional textarea for additional messages

### Form Submission Process
1. The form intercepts the submit event (prevents default page reload)
2. Validates required fields (name, attendance, pax)
3. Shows loading state with "Sending..." button text
4. Sends form data to Google Sheets via fetch API
5. On success: Hides form and shows thank you message
6. On error: Alerts user with error message
7. Always resets button state after submission

### Google Sheets Integration
To enable Google Sheets integration:
1. Deploy a Google Apps Script web app that accepts POST requests
2. Update the `SCRIPT_URL` variable in `script.js` with your deployment URL
3. The script expects JSON data with fields: name, attendance, pax, message

## Design Elements
- Elegant pink/rose color scheme
- Parallax background with semi-transparent white cards
- Smooth animations for scroll effects
- Mobile-optimized layout with responsive typography
- Accessible form elements with proper focus states
- Clean, modern aesthetic with appropriate spacing

## Development Notes
- The site uses Tailwind CSS via CDN for rapid styling
- All custom CSS is in the styles.css file
- JavaScript includes error handling and user feedback
- Form includes client-side validation before submission
- The design follows mobile-first responsive principles

## Building and Running
1. Open `index.html` in a web browser (no build step required)
2. For local development, serve the files via a local HTTP server
3. To enable RSVP functionality, deploy a Google Apps Script and update the SCRIPT_URL

## Customization
To customize the invitation:
- Update the couple names, date, and time in the hero section
- Modify event location details in the event details section
- Update the background image URL if desired
- Adjust color scheme by modifying the CSS variables in styles.css
- Update the Google Sheets integration URL in script.js

## Testing
1. Verify responsive behavior on different screen sizes
2. Test form validation and submission states
3. Confirm AOS animations work correctly
4. Check that all links function properly
5. Verify accessibility features (focus states, semantic HTML)

This wedding invitation website provides an elegant, modern solution for couples who want to share their special day with guests and collect RSVPs efficiently through Google Sheets integration.