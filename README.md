# Vyntra Automations website: guide

Ye ek static website hai. Koi build step, framework ya npm install nahi chahiye. Har page ki apni file hai, to jo change karna ho sirf wahi file kholo.

## 1. Folder mein kya kahan hai

| File | Kya hai | Kab edit karoge |
|---|---|---|
| `index.html` | Home page (hero, solutions, 10 systems ke cards, how we work, about, FAQ, contact form) | Home ka text, cards, FAQ badalna ho |
| `systems/voice-receptionist.html` | 01 AI Voice Receptionist ka case study | Is system ka text ya demo video |
| `systems/website-chatbot.html` | 02 AI Website Chatbot | same |
| `systems/missed-call-recovery.html` | 03 Missed Call Recovery | same |
| `systems/appointment-management.html` | 04 Appointment Management | same |
| `systems/appointment-reminders.html` | 05 Appointment Reminder & Confirmation | same |
| `systems/patient-followup.html` | 06 Patient Follow-up Automation | same |
| `systems/patient-recall.html` | 07 Patient Recall Automation | same |
| `systems/lead-qualification-crm.html` | 08 AI Lead Qualification & CRM | same |
| `systems/appointment-waitlist.html` | 09 Appointment Waitlist Automation | same |
| `systems/feedback-reviews.html` | 10 Patient Feedback & Review Automation | same |
| `assets/js/config.js` | Tumhara email, Calendly link, form ka endpoint | Pehli baar zaroor |
| `assets/js/layout.js` | Menu (navbar) aur footer, sab pages ke liye | Menu ya footer links badalne hon |
| `assets/js/main.js` | Demo video, booking button aur form ka code | Kam hi |
| `assets/css/style.css` | Saare colours, fonts aur design | Colour ya spacing badalni ho |
| `assets/img/` | Logo (SVG), favicon, og-image, aur 2 screenshots | Logo ya image badalni ho |
| `assets/video/` | AI receptionist demo video aur poster | Naye demo videos rakhne ho |
| `api/contact.js` | Contact form ka server code (Vercel function) | Sirf zaroorat par |
| `vercel.json` | Vercel settings | Kam hi |

## 2. Vercel par deploy

Vercel par seedha folder drag and drop nahi hota. Do aasaan tareeqe hain.

**Tareeqa A: GitHub se (recommended, baad mein update bhi asaan)**
1. GitHub par naya repository banao aur is folder ki saari files upload karo (`index.html` repository ke root mein ho).
2. vercel.com -> Add New -> Project -> apni repository import karo.
3. Framework Preset: **Other**. Build Command aur Output Directory khali chhod do. Deploy dabao.
4. Aage ki har change: GitHub par file edit karo, Commit karo. Vercel khud dobara deploy kar dega.

**Tareeqa B: Vercel CLI se**
1. Terminal mein: `npm i -g vercel`
2. Is folder ke andar: `vercel` (pehli baar login karna hoga), phir live karne ke liye `vercel --prod`.

Domain: Vercel -> Project -> Settings -> Domains -> apna domain add karo aur jo DNS records dikhein wo domain provider par daal do.

## 3. Contact form ko leads kahan bhejna hai (zaroori)

Vercel par Netlify jaisa built-in form nahi hota, isliye form `api/contact.js` ko call karta hai, jo lead ko tumhare **n8n webhook** par bhej deta hai.

1. n8n mein naya workflow banao, pehla node **Webhook** (Method: POST). Production URL copy karo.
2. Vercel -> Project -> Settings -> Environment Variables:
   - Name: `LEAD_WEBHOOK_URL`
   - Value: n8n ka Production webhook URL
3. Project ko ek dafa **Redeploy** karo.
4. n8n mein Webhook ke baad Google Sheets / GoHighLevel / Gmail ke nodes lagao. Webhook ko ye fields milengi: `name`, `practice`, `email`, `phone`, `locations`, `interest`, `message`, `page`, `receivedAt`.
5. Live site par apni hi test entry bhejo aur n8n Executions mein check karo.

Agar n8n nahi use karna: formspree.io par form banao aur `assets/js/config.js` mein `formEndpoint` mein uska URL daal do.
Jab tak `LEAD_WEBHOOK_URL` set nahi hota, form visitor ko error dikhayega aur lead save nahi hogi. Isliye ye step launch se pehle zaroor karo.

## 4. Demo video kaise lagayein

Har system page par ye block hota hai:

```html
<div class="demo" data-src="" data-poster="" data-title="..."></div>
```

`data-src` mein video daal do:
- YouTube link: `data-src="https://www.youtube.com/watch?v=XXXX"`
- Loom link: `data-src="https://www.loom.com/share/XXXX"`
- Apni mp4: file ko `assets/video/` mein rakho aur `data-src="../assets/video/meri-video.mp4"` likho

Khali chhodoge to visitors ko "Demo video coming soon" aur "Ask for a live demo" button dikhega. Bari videos (10 MB se zyada) YouTube (Unlisted) ya Loom par daalna behtar hai, site tez rehti hai.

AI Voice Receptionist ki video pehle se laga di hai (`assets/video/ai-receptionist-demo.mp4`, 7.6 MB tak compress ki hui). Wo phone ki screen ki andhere mein bani recording hai, isliye dikhne mein dhundli hai. Jab mumkin ho to screen recording ya Retell ka call recording wala dobara record karke wahi file replace kar do (naam wahi rakho).

## 5. Pehli baar ye cheezein badlo

`assets/js/config.js` kholo:
- `email`: tumhara business email
- `bookingUrl`: Calendly ya GoHighLevel calendar link. Bharte hi sab "Book a discovery call" buttons calendar kholenge.

`index.html` mein `<!-- After you connect your domain ... og:image ... -->` wali line dhoondo. Domain lagne ke baad wo line uncomment karke `YOUR-DOMAIN.com` ki jagah apna domain likho. LinkedIn par link share karne par isi se preview image dikhegi.

## 6. Aam changes

- **Kisi system ka text** (problem, solution, features, workflow): us system ki HTML file kholo. Text seedha parhne wali HTML mein hai.
- **Home page par card ka text**: `index.html` mein us system ka naam dhoondo.
- **Naya system (11th)**: kisi system ki HTML file copy karo, naya naam do, text badlo. Phir `index.html` mein ek card, aur `assets/js/layout.js` ki `SYSTEMS` list mein ek line add karo.
- **Menu / footer**: `assets/js/layout.js`.
- **Colours**: `assets/css/style.css` ke shuru mein `:root` ke andar.
- **Har system ka workflow 5 steps ka rakho**, warna design ka layout bigad jata hai.

## 7. Launch se pehle check

- Jo system abhi tak bana nahi, uska demo ban jane tak "Demo project" label rehne do. Fake clients, testimonials ya revenue results mat daalna.
- Case study pages par jo conversations hain wo **sample** hain (made-up names). Unke neeche "Sample from our demo build" likha hai, ise mat hatana.
- FAQ mein likha hai ke HIPAA requirements aur vendor agreements client ke saath review hote hain, aur texting mein consent aur opt-out handle hota hai. Ye wade tabhi rakho jab tum sach mein ye process follow karo.
- US numbers par SMS ke liye A2P 10DLC registration chahiye hoti hai (missed call text-back, reminders, recall).
- Review automation (system 10): Google ki policy ke mutabiq review link **har patient ko** bhejo, sirf khush patients ko nahi. Isi liye page par yahi likha hai.
- Form ki test entry bhejo (section 3) aur mobile par bhi site dekh lo.

## 8. Naye changes (is version mein)

- **WhatsApp floating button**: har page par neeche right mein float karta hai. Number `assets/js/config.js` mein `whatsapp` aur pehla message `whatsappMessage` mein hai. Number badalna ho to sirf wahi file edit karo (digits only, country code ke saath, + ke bagair).
- **Home page par Loom video**: `index.html` mein `id="demo"` wale section mein wahi Loom link hai jo Lead Qualification & CRM page par hai. Link badalna ho to dono jagah `data-src` badlo.
- **4 naye n8n workflow screenshots**: Appointment Management, Patient Follow-up, Patient Recall aur Appointment Waitlist ke pages par "Behind the scenes" mein, aur home page ke cards par thumbnail ke taur par (`assets/img/wf-*.png`).
- **Poori website ki copy** dental practice owner ki tone mein dobara likhi gayi hai (home aur saare 10 system pages). Copy mein koi banawati number ya result ka wada nahi hai. Aage bhi yehi rakho.
- Review automation page ki workflow screenshot mein rating router sirf khush patients ko Google review invite karta dikhta hai, jabke page ka text kehta hai ke link **har patient** ko jata hai. Ya to workflow ko text ke mutabiq badlo, ya text ko workflow ke mutabiq, warna dono mein farq rahega.

## 9. Discovery call booking: kaise chalta hai aur tumhe kaise pata lagta hai

Flow: visitor form bharta hai -> form `/api/contact` se tumhare n8n webhook par jata hai -> usi waqt website par Calendly ka calendar khul jata hai -> visitor time chun leta hai -> Calendly tumhe aur visitor ko email bhejta hai.

**Setup (ek dafa, 15 minute):**
1. calendly.com par free account banao, ek event "Discovery call" (20-30 min) banao, aur Google Calendar connect karo (taake tumhare calendar mein khud entry aaye aur double-booking na ho).
2. `assets/js/config.js` mein `bookingUrl` mein apna Calendly link daalo. Is se saare "Book a discovery call" buttons Calendly kholenge aur form ke baad calendar embed hoga.
3. n8n mein `n8n/vyntra-discovery-call-alerts.json` import karo (Workflows -> Import from file).
4. Google Sheet banao, tab ka naam `Leads`, pehli row: Received, Name, Practice, Email, Phone, Locations, Interest, Message, Source, Referrer, Status, Call time. Sheet ID workflow mein dono Sheets nodes mein paste karo.
5. `YOUR_EMAIL@gmail.com` ko apni email se badlo, Google Sheets, Gmail aur Calendly credentials connect karo, workflow **Activate** karo.
6. Webhook node ka **Production URL** copy karke Vercel mein `LEAD_WEBHOOK_URL` banao (section 3), phir Redeploy.

**Tumhe pata kaise lagega:** (a) Calendly ki email "New event", (b) tumhare Google Calendar mein event, (c) n8n se email "Discovery call: Call booked - Name", (d) Leads sheet mein us lead ki row ka Status "Call booked" ho jata hai aur call ka time aa jata hai. Cancel ho to Status "Call cancelled". Phone par Gmail aur Calendly app ke notifications on rakho.

## 10. Traffic tracking

- **Vercel Web Analytics** (visitors, pages, country, kahan se aaye): Vercel -> Project -> Analytics -> Enable. Code pehle se site mein hai (`assets/js/analytics.js`). Deploy ke baad dashboard mein data aana shuru ho jata hai.
- **Google Analytics 4** (optional, events ke liye): analytics.google.com par property banao, Measurement ID (`G-...`) `config.js` ke `ga4Id` mein daalo. Ye events khud track hote hain: `book_call_click`, `whatsapp_click`, `email_click`, `generate_lead` (form submit).
- **Ads/posts ka source track karna:** apne links ke aakhir mein `?utm_source=linkedin&utm_medium=post&utm_campaign=nov` lagao. Form wale lead ke saath source tumhari sheet mein save hota hai.

## 11. Vercel deploy (short)

1. GitHub par repo banao, is folder ki files upload karo (`index.html` root mein).
2. vercel.com -> Add New -> Project -> repo import, Framework: **Other**, Deploy.
3. Environment Variables mein `LEAD_WEBHOOK_URL` daalo, Redeploy. Domain Settings -> Domains mein jodo.
4. Analytics enable karo (section 10), phir apni live site par test form bhejo aur Calendly se test booking karo.

## 10. Final launch checklist (sirf tum kar sakte ho)

- [ ] `assets/js/config.js`: `email`, `bookingUrl` (Calendly), `ga4Id` bharo
- [ ] Vercel -> Environment Variables: `LEAD_WEBHOOK_URL`, phir Redeploy, phir test entry
- [ ] Custom domain lagao, phir `index.html` mein og:image ka URL naye domain par badlo
- [ ] Review automation workflow ko page ke text ke mutabiq badlo (har patient ko link)
- [ ] AI receptionist ki demo video saaf recording se replace karo (`assets/video/ai-receptionist-demo.mp4`)
- [ ] US SMS ke liye A2P 10DLC register karo
- [ ] HIPAA/consent ke wade tabhi rakho jab process sach mein follow karo
