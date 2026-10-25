# Minigo Holidays admin: setup

The website now has its own admin at **/admin** (for example `https://minigo-holidays.vercel.app/admin`).
It is built with Payload CMS and runs inside the same Next.js site, so there is nothing extra to host.

## What you can manage

| Admin section | What it controls on the website |
| --- | --- |
| **Trips → Tour packages** | Every tour: photos, text, itinerary, what's included, and each **departure date, price (₹) and seats left**. |
| **Trips → Coming soon trips** | Trips without dates yet: travellers needed, rough price, months offered. Each one shows its waitlist sign-ups. |
| **Trips → Waitlist sign-ups** | Everyone who joined a waitlist, with WhatsApp number, travellers, preferred month, and a status (New, Contacted, Booked). |
| **Enquiries** | Messages from the enquiry form, with a status (New, Replied, Booked). |
| **Website content → Reviews** | Testimonials: photo, name, rating and review. |
| **Website content → Travellers' best moments** | The photo gallery on the home page with "Captured by" credits (first 8 shown). |
| **Website content → Gallery** | Photos on the Gallery page. |
| **Website content → Journal** | Blog posts (draft or published). |
| **Admin → Photos** | Every uploaded photo, stored in the Cloudflare R2 bucket. |

Changes show on the website straight away (on the next page visit). Untick **Show on website** to hide something without deleting it.

Until the database is connected, the website keeps showing the built-in sample content, so nothing breaks.

## One-time setup (about 20 minutes)

You need three things: a MongoDB database, a Cloudflare R2 photo bucket and a secret key. All three go into
**Vercel → minigo-holidays → Settings → Environment Variables** (tick Production, Preview and Development).

### 1. Database (MongoDB Atlas, free)

1. Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a **free M0 cluster**, region **Mumbai (ap-south-1)**.
2. **Database Access:** add a database user with a strong password.
3. **Network Access:** add `0.0.0.0/0` (allow from anywhere). Vercel's servers have no fixed address, so this is needed.
4. **Connect → Drivers:** copy the connection string and put your password in it. Add the database name after `.net/`, for example
   `mongodb+srv://minigo:PASSWORD@cluster0.xxxxx.mongodb.net/minigo?retryWrites=true&w=majority`
5. Add it in Vercel as `DATABASE_URL`.

(Vercel → Storage → **MongoDB Atlas** does the same steps for you and sets `MONGODB_URI`, which also works.)

### 2. Photo storage (Cloudflare R2, free up to 10 GB)

R2 has no charge when visitors view photos, so it stays free for a site like this.

1. Sign up at [dash.cloudflare.com](https://dash.cloudflare.com) → **R2 Object Storage** → **Create bucket**, for example `minigo-holidays-media`, location **Asia-Pacific**.
   (R2 asks for a card to activate, but the free allowance is 10 GB storage plus millions of uploads and views a month.)
2. Open the bucket → **Settings** → **Public access** → enable the **r2.dev subdomain**, and copy the address (`https://pub-xxxx.r2.dev`).
   Later you can connect your own domain instead, for example `photos.minigoholidays.com`.
3. R2 overview → **Manage API tokens** → **Create API token**: permission **Object Read & Write**, limited to this bucket.
   Copy the **Access Key ID**, **Secret Access Key** and the **S3 endpoint** (`https://<account-id>.r2.cloudflarestorage.com`).
4. Add these environment variables in Vercel:

   | Name | Value |
   | --- | --- |
   | `S3_BUCKET` | `minigo-holidays-media` |
   | `S3_ENDPOINT` | `https://<account-id>.r2.cloudflarestorage.com` |
   | `S3_REGION` | `auto` |
   | `S3_ACCESS_KEY_ID` | the Access Key ID |
   | `S3_SECRET_ACCESS_KEY` | the Secret Access Key |
   | `S3_PUBLIC_URL` | `https://pub-xxxx.r2.dev` |

### 3. Secret key

Add `PAYLOAD_SECRET` with a long random value (at least 32 characters). It protects admin logins. Never share it.

### 4. Deploy and create the admin login

1. Redeploy the site (Vercel → Deployments → Redeploy, or `npx vercel --prod`).
2. Open `/admin`. The first visit asks you to **create the admin account** (email and password). That is the only login; keep it safe.

### 5. Load the current sample content (optional)

To start with the trips, reviews and photos that are on the site today, run this once on your computer
with the same environment variables (`npx vercel env pull .env.local` copies them):

```bash
npm run seed
```

It only fills sections that are empty, so it is safe to run again. Then edit or replace everything with your real tours.

## Optional extras

- **Email alerts for enquiries and waitlist sign-ups:** set `GMAIL_USER`, `GMAIL_APP_PASSWORD` (a Gmail app password) and `CONTACT_TO_EMAIL`.
- **Real domain:** set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`. This also lets Google index the site.

## For developers

- Admin config: `payload.config.ts`; collections in `cms/collections/`.
- The site reads content with Payload's Local API in `app/(frontend)/lib/content.ts` and `payload.ts`.
- `npm run generate:types` refreshes `cms/payload-types.ts`.
