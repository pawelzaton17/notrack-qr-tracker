This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## QR Redirects

To add a new QR code redirect:

1. **Edit the `REDIRECTS` map** in `src/app/scan/page.tsx`:
   ```js
   const REDIRECTS: Record<string, string> = {
     centrumautomatyki: "https://centrumautomatyki.com.pl/",
     nokode: "https://nokode.eu/",
     your_id: "https://twojastrona.pl/",
   };
   ```
2. **Generate a QR code** with a URL in the format:
   ```
   https://notrack-qr-tracker.vercel.app/scan?id=your_id
   ```
   Replace `twoje_id` with the key you added to the `REDIRECTS` map.

After scanning, the user will be redirected to the corresponding address.

---

## QR Statistics

You can view scan statistics for all QR codes at:

```
https://notrack-qr-tracker.vercel.app/
```

This page displays a table with the number of scans for each QR code.
