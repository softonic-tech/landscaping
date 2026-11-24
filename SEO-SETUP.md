# Sunny Star Landscaping SEO & Google Ads Setup

This guide explains the SEO work already implemented in this repository and the remaining account steps you need to complete after publishing.

Website: https://www.sunnystarlandscaping.com/

## 1. What changed and why

### Files added or updated

| File / folder | Why it matters |
| --- | --- |
| `index.html`, `services/index.html`, `projects/index.html`, `areas/index.html`, `about/index.html`, `contact/index.html` | Unique titles, meta descriptions, canonicals, Open Graph/Twitter tags, JSON-LD, and crawlable HTML content for each public page |
| `robots.txt` | Allows crawling and points to the sitemap |
| `sitemap.xml` | Lists only real public pages |
| `404.html` | Honest not-found page for missing URLs |
| `assets/seo-runtime.js` | Keeps meta tags in sync during in-app navigation, prepares tracking hooks, and routes form submissions to WhatsApp because no server backend is connected |
| `assets/seo-fallback.css` | Styles the crawlable HTML content shown before JavaScript mounts |
| `scripts/generate-seo-pages.js` | Regenerates the SEO HTML pages, robots.txt, and sitemap.xml |
| `scripts/patch-app-seo.js` | Updates titles/descriptions in the existing app bundle and removes the fake “Details sent” form state |
| `build-static.js` | Copies SEO pages, robots.txt, and sitemap.xml into `dist/` |
| `vercel.json` | Stops catching `/sitemap.xml` and `/robots.txt` with a homepage rewrite; keeps trailing-slash URLs; redirects `/index.html` to `/` |
| `package.json` | Build now runs SEO page generation before copying files to `dist/` |

### Important honesty notes already handled

- The contact/footer forms do **not** have a connected email/CRM backend.
- Form submit now opens WhatsApp with the entered details so the enquiry can still reach the team.
- The old “Details sent” button label was removed so the site does not claim a submission succeeded on a server.
- Instagram is linked as `https://www.instagram.com/` in the existing UI. That is **not** a verified business profile URL, so it was **not** added to structured data.
- No reviews, prices, certifications, street address, or invented claims were added.

## 2. What to upload / publish

This project is built for Vercel using the `dist/` output.

### Build locally

```bash
npm run build
npm run seo:validate
```

That command:

1. Runs `scripts/generate-seo-pages.js`
2. Copies the site into `dist/`
3. `seo:validate` checks titles, canonicals, JSON-LD, robots.txt, and sitemap.xml

Do **not** run the root `init` file as part of the build. The build script no longer calls it.

### Upload / deploy

Publish the contents of `dist/`, including:

- `index.html`
- `404.html`
- `robots.txt`
- `sitemap.xml`
- `assets/`
- `services/`
- `projects/`
- `areas/`
- `about/`
- `contact/`

If you deploy with Vercel from this repository, keep `vercel.json` as-is so:

- `/sitemap.xml` returns the XML file
- `/robots.txt` returns the text file
- `/index.html` permanently redirects to `/`
- Missing pages can return the 404 page instead of silently rewriting everything to the homepage

## 3. After publishing: check sitemap and robots

Open these exact URLs:

1. https://www.sunnystarlandscaping.com/robots.txt
2. https://www.sunnystarlandscaping.com/sitemap.xml

### Pass conditions

- `robots.txt` should show plain text and include:
  - `Sitemap: https://www.sunnystarlandscaping.com/sitemap.xml`
- `sitemap.xml` should show XML, not the homepage HTML
- Every `<loc>` in the sitemap should open a real page

### Fail conditions

- If either URL shows the homepage HTML, the host is still rewriting unknown/static paths to `index.html`
- Fix hosting so static root files are served before SPA fallback rules

## 4. Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add the property `https://www.sunnystarlandscaping.com/`
3. Verify ownership with one of these methods:
   - HTML tag method: put the real token into each page head where the placeholder comment says `REPLACE_WITH_SEARCH_CONSOLE_TOKEN`
   - Or use the HTML file upload / DNS method in Search Console
4. After verification, open **Sitemaps**
5. Submit:
   - `https://www.sunnystarlandscaping.com/sitemap.xml`
6. Use **URL Inspection** on the homepage and key pages, then request indexing if needed

Do not publish a fake verification token.

## 5. Where to insert real tracking IDs

Tracking is prepared but disabled until you supply real IDs.

### Option A: edit `assets/seo-runtime.js`

Find:

```js
var CONFIG = window.__SS_TRACKING || {
  gtmId: "",
  ga4Id: "",
  adsId: "",
  enabled: false,
};
```

Example when ready:

```js
var CONFIG = {
  gtmId: "GTM-XXXXXXX",
  ga4Id: "G-XXXXXXXXXX",
  adsId: "AW-XXXXXXXXX",
  enabled: true,
};
```

### Option B: set IDs before the script loads

```html
<script>
  window.__SS_TRACKING = {
    gtmId: "GTM-XXXXXXX",
    ga4Id: "G-XXXXXXXXXX",
    adsId: "AW-XXXXXXXXX",
    enabled: true
  };
</script>
```

### Search Console meta tag placeholder

In the generated HTML `<head>` there is a comment:

```html
<!-- <meta name="google-site-verification" content="REPLACE_WITH_SEARCH_CONSOLE_TOKEN" /> -->
```

Uncomment it and replace the placeholder with your real token, then regenerate pages with `npm run seo:pages` or edit the generator and rebuild.

## 6. Event tracking prepared in the site

`assets/seo-runtime.js` pushes these events into `dataLayer` and, when enabled, to `gtag`:

| Event name | When it fires | Meaning |
| --- | --- | --- |
| `phone_click` | User clicks a `tel:` link | Contact intent, not a confirmed enquiry |
| `whatsapp_click` | User clicks WhatsApp or the form opens WhatsApp | Contact intent / form handoff |
| `form_submission_success` | Reserved | Only fire this after a real backend confirms success |

### Important

- Phone and WhatsApp clicks are **not** confirmed booked jobs.
- Because the website has no working form backend, successful form tracking should currently map to the WhatsApp handoff, or wait until a real form endpoint exists.
- Do not mark a phone click as a converted lead unless your sales process can verify that call outcome.

### How to test

1. Open the browser developer tools Network / Console
2. Click a phone number and confirm `phone_click` appears in `window.dataLayer`
3. Click WhatsApp and confirm `whatsapp_click`
4. Submit the contact form and confirm WhatsApp opens with the enquiry text
5. After enabling GTM/GA4/Ads IDs, verify the same events in Tag Assistant / DebugView

## 7. Suggested Google Search Ads setup

Based on current Google Ads documentation:

- Create a **Search** campaign
- Target the actual Dubai service area
- Use location option **Presence: People in or regularly in your targeted locations** for local service control
- During campaign creation, leave **Include Google search partners** unchecked initially
- Leave **Display Network** unchecked initially
- Choose an affordable daily budget you can monitor weekly
- Turn on conversion tracking only after phone/WhatsApp/form events are verified

Official references:

- [Create a Search campaign](https://support.google.com/google-ads/answer/9510373)
- [Advanced location options](https://support.google.com/google-ads/answer/1722038)
- [Search Network / search partners](https://support.google.com/google-ads/answer/1722047)

### Ad groups and keywords

Use phrase and exact match first.

#### Ad group: Gardening Dubai

Landing page: `https://www.sunnystarlandscaping.com/` or `/services/`

Keywords:

- "gardening services dubai"
- "gardening dubai"
- "garden maintenance dubai"
- [gardening services dubai]
- [garden care dubai]

#### Ad group: Landscaping Dubai

Landing page: `https://www.sunnystarlandscaping.com/services/`

Keywords:

- "landscaping dubai"
- "landscaping services dubai"
- "landscape maintenance dubai"
- [landscaping company dubai]
- [villa landscaping dubai]

#### Ad group: Irrigation & Lawn

Landing page: `https://www.sunnystarlandscaping.com/services/`

Keywords:

- "irrigation system dubai"
- "lawn care dubai"
- "artificial grass dubai"
- [garden irrigation dubai]
- [lawn maintenance dubai]

### Negative keywords to add early

- jobs
- salary
- course
- courses
- training
- diy
- free pdf
- meaning
- wikipedia
- near me india
- near me pakistan

### Suggested Responsive Search Ad copy

Headlines up to 30 characters:

1. Gardening Services Dubai
2. Sunny Star Landscaping
3. Garden Care Across Dubai
4. Irrigation & Lawn Care
5. Request a Free Site Visit
6. Call Sunny Star Today
7. Villa Garden Maintenance
8. Landscaping for Dubai Homes

Descriptions up to 90 characters:

1. Practical gardening and landscaping services in Dubai. Call or WhatsApp Sunny Star for a quote.
2. Maintenance, irrigation, planting and garden improvements. Request a free site visit today.
3. Serving Dubai communities with clear communication and careful outdoor finishing.

### Final Ads reminder

- Do not launch until conversion tracking is verified
- Start with Search only
- Review search terms weekly and add negatives
- This repository does not create Google Ads accounts, spend budget, or claim ads are live

## 8. Local checks already possible vs live checks

### Local checks you can run now

```bash
npm run build
```

Then open the `dist/` folder with a local static server and confirm:

- Each page has a unique `<title>` and meta description
- Canonical URLs use `https://www.sunnystarlandscaping.com/...`
- JSON-LD is present
- Internal links to `/services/`, `/projects/`, `/areas/`, `/about/`, `/contact/` work
- Phone and WhatsApp links use the verified numbers already in the project
- Form submit opens WhatsApp instead of showing a fake success state

### Live checks only after deploy

- `/robots.txt` and `/sitemap.xml` content-type and body
- Search Console verification
- Indexing requests
- Google Ads conversion diagnostics
- Real mobile usability in Google tools

## 9. Missing business details / IDs still needed from you

Provide these when available:

- Google Search Console verification token
- Google Tag Manager ID and/or GA4 ID
- Google Ads conversion ID / conversion labels
- A real Instagram business profile URL, if you want it in structured data
- Full street address, if you want richer local business markup
- A real form backend/email endpoint, if you want server-confirmed form conversions

### Performance note

No local image optimizer (Sharp/ImageMagick) was available in this environment. Large PNG assets such as `assets/garden.png`, `assets/hero.png`, and `assets/pool.png` are still heavy. Compressing them before publish will help Ads landing-page speed and mobile usability.

## 10. Regenerating SEO pages later

After content edits:

```bash
node scripts/patch-app-seo.js
npm run build
```

Then deploy the updated `dist/` output.
