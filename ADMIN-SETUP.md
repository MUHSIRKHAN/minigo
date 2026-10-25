# Minigo Holidays: admin, database, photos and domain

The website has its own admin at **/admin** (for example `https://minigoholidays.com/admin` once the domain is
connected). It runs inside the same website on Vercel, so there is nothing extra to host or pay for.

Use the **new Minigo email** for every account below, so the business owns all of them.

---

## What the admin manages

| Admin section | What it controls on the website |
| --- | --- |
| **Trips → Tour packages** | Each tour, in four tabs: **Overview** (photo, text, highlights, length, group), **Prices** (from price, price options such as group / couple, or a price table like Vietnam's), **Dates** (each date with seats left, or "Booking closed"; or tick "No fixed dates"), **Itinerary & inclusions** (day by day, included, not included, hotels, good to know). |
| **Trips → Coming soon trips** | Trips without dates yet, with their waitlist sign-ups. |
| **Trips → Waitlist sign-ups** | Everyone who joined a waitlist, with a status (New, Contacted, Booked). |
| **Enquiries** | Messages from the enquiry form, with a status. |
| **Website content** | Reviews, Travellers' best moments, Gallery, Journal (blog). |
| **Admin → Photos** | Every uploaded photo (stored in Cloudflare R2). |

- Saving updates the website straight away.
- Untick **Show on website** to hide something without deleting it.
- Leave a section empty if it isn't confirmed: the website then shows "Contact us for …" instead of guessing.
- Until the database is connected, the website keeps showing its built-in tours, so nothing breaks.

---

## Step 1: MongoDB Atlas (database, free)

1. Sign up at **mongodb.com/atlas** with the Minigo email.
2. Create a **free M0 cluster**, provider AWS, region **Mumbai (ap-south-1)**.
3. **Database Access** → Add new database user → username `minigo`, choose **Autogenerate password**, copy it somewhere safe.
4. **Network Access** → Add IP address → **Allow access from anywhere** (`0.0.0.0/0`). Vercel has no fixed address, so this is needed; the password protects the database.
5. **Connect** → Drivers → copy the connection string. Put your password in it and add `minigo` after `.net/`:
   `mongodb+srv://minigo:YOUR-PASSWORD@cluster0.xxxxx.mongodb.net/minigo?retryWrites=true&w=majority`

Keep this string private. It goes into Vercel in Step 4 as `DATABASE_URL`.

## Step 2: Cloudflare R2 (photo storage, free up to 10 GB)

1. Sign up at **dash.cloudflare.com** with the Minigo email. Open **R2 Object Storage** and activate it (a card is asked for; the free allowance covers this site).
2. **Create bucket** → name `minigo-holidays-media`, location **Asia-Pacific**.
3. Open the bucket → **Settings** → **Public Development URL** (r2.dev) → **Enable**. Copy the address, like `https://pub-xxxxxxxx.r2.dev`.
4. Back on the R2 overview → **Manage API tokens** → **Create API token** → permission **Object Read & Write**, **apply to specific bucket** `minigo-holidays-media` → Create.
   Copy the **Access Key ID**, the **Secret Access Key** and the **S3 endpoint** (`https://<account-id>.r2.cloudflarestorage.com`). The secret is shown only once.

## Step 3: Gmail app password (emails for enquiries, waitlist and admin password reset)

1. Sign in to the Minigo Gmail account → **Google Account** → **Security** → turn on **2-Step Verification**.
2. Search for **App passwords** → create one called `Minigo website` → copy the 16-letter password.

## Step 4: Put the values into Vercel

Vercel → **minigo-holidays** project → **Settings** → **Environment Variables**. Add each one for **Production** and **Preview**:

| Name | Value |
| --- | --- |
| `DATABASE_URL` | the MongoDB connection string from Step 1 |
| `PAYLOAD_SECRET` | a long random value, at least 32 characters (protects admin logins; never share it) |
| `S3_BUCKET` | `minigo-holidays-media` |
| `S3_ENDPOINT` | the R2 S3 endpoint from Step 2 |
| `S3_REGION` | `auto` |
| `S3_ACCESS_KEY_ID` | the R2 Access Key ID |
| `S3_SECRET_ACCESS_KEY` | the R2 Secret Access Key |
| `S3_PUBLIC_URL` | the `https://pub-….r2.dev` address |
| `GMAIL_USER` | the Minigo Gmail address |
| `GMAIL_APP_PASSWORD` | the 16-letter app password from Step 3 |
| `CONTACT_TO_EMAIL` | the address that should receive enquiries and waitlist sign-ups |

## Step 5: Deploy, load the tours, create the admin login

1. Deploy the admin version of the site (Claude does this).
2. Load the current tours, reviews and photos into the new database. The values from Steps 1, 2 and 4 are added to
   the local `.env.local` file on this computer, then `npm run dev` and open `http://localhost:3003/api/seed`.
   This only fills empty sections, so it is safe to run again.
3. Open **/admin** on the live site. The first visit asks you to **create the admin account**: use the Minigo email
   and a strong password. That is the admin login; keep it safe. "Forgot password?" emails work once Step 3 is set.

## Step 6: Connect the domain

1. **Buy the domain** if you haven't yet (for example `minigoholidays.com`). Cloudflare Registrar sells domains at cost,
   and you already have the Cloudflare account from Step 2.
2. Vercel → project → **Settings** → **Domains** → add `minigoholidays.com` and `www.minigoholidays.com`.
3. Vercel shows the DNS records to add (usually an **A** record for the main domain and a **CNAME** for `www`).
   Add exactly those at the domain's DNS (Cloudflare → your domain → DNS). Set the Cloudflare proxy to **DNS only** (grey cloud).
4. When Vercel shows the domain as **Valid**, add the environment variable `NEXT_PUBLIC_SITE_URL` = `https://minigoholidays.com`
   and redeploy. This makes the site's links, sitemap and admin use the real domain, **and lets Google index the site**.
5. From then on, use the admin at `https://minigoholidays.com/admin`.

## Before Google indexes the site (Step 6.4)

- **Reviews and Travellers' best moments are samples** (stock photos and made-up names). Replace them with real
  travellers' reviews and photos, used with permission, or untick **Show on website**. Never publish invented reviews as genuine.
- **Coming soon trips:** set **Extra count shown** to `0` so only real sign-ups are counted.
- Check every tour's dates, prices and inclusions one last time.

---

## For developers

- Admin config: `payload.config.ts`; collections in `cms/collections/`; admin branding in `cms/admin/`.
- The site reads content through `app/(frontend)/lib/content.ts` (and `payload.ts` for journal and gallery), falling back to
  the built-in data in `app/(frontend)/lib/*.ts` when `DATABASE_URL` / `PAYLOAD_SECRET` are not set.
- After changing a collection run `npm run generate:types` (bundles the config with esbuild; Payload's own CLI fails on
  some Node versions). The admin import map regenerates itself when `npm run dev` starts.
- `GET /api/seed` (development only) fills empty collections from the built-in data, uploading photos to R2 when configured.
