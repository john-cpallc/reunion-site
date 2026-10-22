# Go Big Red 2027

Huntsville High School Class of 2017 reunion hub — Next.js on Vercel, alum registrations to Google Sheets.

Target domain: [gobigred2027.com](https://gobigred2027.com)

## Local development

```bash
npm install
cp .env.example .env.local
# fill in Google Sheets credentials (optional until you test /register)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Google Sheets setup

1. Create a Google Cloud project and enable **Google Sheets API**.
2. Create a **service account**, download a JSON key.
3. Copy `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `private_key` → `GOOGLE_PRIVATE_KEY` (keep `\n` escapes or paste with real newlines in Vercel).
4. Create a spreadsheet; rename the first tab to **`emails`**.
5. Optional header row:

   | timestamp | first | last | preferred | email | phone | city_state | grad_note | hear_about | source |

6. Share the spreadsheet with the service account email as **Editor**.
7. Set `GOOGLE_SHEET_ID` to the ID in the Sheet URL (`/d/<ID>/edit`).

Without these env vars, the form UI still works but `/api/register` returns **503**.

## Vercel deploy

1. Log in locally: `npx vercel login`
2. From this folder: `npx vercel` (link or create the project), then `npx vercel --prod` for production.
   - Or push to GitHub/GitLab and import at [vercel.com/new](https://vercel.com/new) (framework: Next.js).
3. In Vercel → Project → Settings → Environment Variables, add all keys from `.env.example` (Production + Preview). Redeploy after saving.
4. Smoke-test registration:
   - With the site running: `npm run smoke:register` (or `npm run smoke:register -- https://your-deployment.vercel.app`)
   - Without Sheets env: expect **503** (route is live, config missing).
   - With Sheets env: expect **200** and a new row on the `emails` tab.
5. Domain: buy **gobigred2027.com**, then Vercel → Settings → Domains → add it and set DNS (`A` / `CNAME` per Vercel’s instructions).

## Site map

| Route | Purpose |
|-------|---------|
| `/` | Hero + what’s next |
| `/register` | Alum mailing-list form |
| `/people` | Committee placeholders and registered classmates |
| `/faq` | Accordion FAQs |
| `/api/register` | Appends a row to Google Sheets |

## Editing content

- Committee placeholders and the help email: `src/data/committee.ts`
- FAQs: `src/data/faqs.ts`
