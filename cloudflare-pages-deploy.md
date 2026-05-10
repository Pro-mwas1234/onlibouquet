# Cloudflare Pages Deployment Guide

This document provides step-by-step instructions to deploy your Next.js application to Cloudflare Pages.

## Overview

Your application has been configured for **Static Site Generation (SSG)** using `output: 'export'` in `next.config.mjs`. This makes it fully compatible with Cloudflare Pages, which hosts static content.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://dash.cloudflare.com/sign-up)
2. **Git Repository**: Your code should be pushed to GitHub or GitLab
3. **Supabase Backend** (or similar): For dynamic features like saving bouquets

## Step 1: Prepare Environment Variables

### In Cloudflare Pages Dashboard

1. Go to your project in the [Cloudflare Pages dashboard](https://dash.cloudflare.com/?to=/:account/pages)
2. Click on **Settings** → **Environment Variables**
3. Add the following variables:

| Variable Name | Value |
|--------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (e.g., `https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key |

### Getting Supabase Credentials

1. Go to your [Supabase dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the **Project URL** and **anon public** key

## Step 2: Connect to Cloudflare Pages

### Option A: Direct Git Integration (Recommended)

1. In the Cloudflare Pages dashboard, click **Create a project**
2. Select **Connect to Git**
3. Choose your repository (GitHub or GitLab)
4. Select the branch you want to deploy (usually `main` or `master`)
5. Click **Begin setup**

### Configure Build Settings

- **Framework preset**: `Next.js`
- **Build command**: `npm run build` (or `pnpm run build` / `yarn build`)
- **Build output directory**: `out`
- **Root directory**: `/` (default)

6. Click **Save and Deploy**

### Option B: Manual Deployment with Wrangler CLI

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy out --project-name=your-project-name
```

## Step 3: Post-Deployment

### Verify Deployment

1. Cloudflare Pages will build your site (this takes 2-5 minutes)
2. Once complete, you'll get a `.pages.dev` URL
3. Test your site to ensure all features work

### Custom Domain (Optional)

1. Go to **Settings** → **Custom domains**
2. Add your domain
3. Follow the DNS configuration instructions

### Automatic Deployments

Every push to your connected branch will automatically trigger a new deployment. You can view deployment history in the **Deployments** tab.

## Troubleshooting

### Build Fails

- Check the build logs in the Cloudflare Pages dashboard
- Ensure all environment variables are set correctly
- Verify that `next.config.mjs` has `output: 'export'`

### API Calls Fail

- Make sure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in Cloudflare Pages environment variables
- Check that your Supabase RLS (Row Level Security) policies allow public read/write access as needed

### Images Not Loading

- The app is configured with `images.unoptimized: true` for static export compatibility
- All images should be in the `/public` directory

## Additional Configuration

### Preview Deployments

Cloudflare Pages automatically creates preview deployments for pull requests. These have unique URLs for testing before merging.

### Rollback

If something goes wrong, you can rollback to a previous deployment from the **Deployments** tab.

## Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js Static Export](https://nextjs.org/docs/app/api-reference/next-config-js/output)
- [Supabase Documentation](https://supabase.com/docs)
