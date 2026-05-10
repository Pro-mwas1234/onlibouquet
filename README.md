# Onlibouquet - Digital Flower Bouquet Creator

A Next.js application that lets users create and share digital flower bouquets.

## Deploy to Cloudflare Pages

### Prerequisites

1. A [Cloudflare account](https://dash.cloudflare.com/sign-up)
2. A [Supabase project](https://supabase.com) (or your preferred backend)

### Setup Instructions

#### 1. Configure Environment Variables

In your Cloudflare Pages dashboard, go to **Settings** → **Environment Variables** and add:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

#### 2. Connect to Git

1. Go to the [Cloudflare Pages dashboard](https://dash.cloudflare.com/?to=/:account/pages)
2. Click **Create a project**
3. Select **Connect to Git**
4. Choose your repository
5. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `pnpm run build` (or `npm run build` / `yarn build`)
   - **Build output directory**: `out`

#### 3. Deploy

Cloudflare Pages will automatically build and deploy your site on every push to the connected branch.

### Local Development

```bash
# Install dependencies
pnpm install

# Copy environment variables template
cp .env.local.example .env.local

# Edit .env.local with your Supabase credentials

# Run development server
pnpm dev
```

### Build for Production

```bash
pnpm build
```

The static files will be generated in the `out` directory.

## Project Structure

- `/app` - Next.js App Router pages
- `/components` - React components
- `/context` - React context providers
- `/lib` - Utility functions and Supabase client
- `/public` - Static assets

## Technologies

- Next.js 15 (Static Export mode)
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase (Backend)
- Cloudflare Pages (Hosting)

## License

MIT
