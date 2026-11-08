/* =====================================================================
   EDIT THIS FILE for your own details. Nothing else needs touching.
   ===================================================================== */
window.VYNTRA = {
  // Your business email. If set, it shows in the contact section and in footer.
  email: "",

  // Calendly / Cal.com / GoHighLevel calendar link.
  // If set, every "Book a discovery call" button opens it in a new tab.
  // After the form is sent, the visitor can pick a time right there (inline calendar).
  bookingUrl: "",

  // Google Analytics 4 Measurement ID (optional), e.g. "G-ABC123XYZ9".
  // Vercel Web Analytics needs no ID: just enable it in the Vercel dashboard.
  ga4Id: "",

  // Where the contact form sends its data.
  //   "/api/contact"  -> the Vercel function in /api/contact.js (forwards to your n8n webhook)
  //   or paste a Formspree URL, e.g. "https://formspree.io/f/xxxxxxx"
  // WhatsApp number, digits only with country code (no + or spaces). +92 342 6881848
  whatsapp: "923426881848",
  whatsappMessage: "Hi Vyntra, I run a dental practice and would like to know more about your automation systems.",

  formEndpoint: "/api/contact"
};
