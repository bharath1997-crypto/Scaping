# Vercel Deployment Guide for AppCortex

## 🚀 Quick Fix for 404 Errors

If you're getting a 404 error on Vercel, it's likely because Vercel is trying to deploy from the root directory instead of the `frontend` directory where the Next.js app is located.

## ✅ Solution

The `vercel.json` file has been created in the root directory to configure Vercel to use the `frontend` directory as the root.

### Configuration

The `vercel.json` file contains:
```json
{
  "buildCommand": "npm install && npm run build",
  "outputDirectory": "frontend/.next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "rootDirectory": "frontend"
}
```

**Important**: The `outputDirectory` is `frontend/.next` (relative to repository root), not just `.next`. This is because when `rootDirectory` is set, Vercel needs the output path relative to the repository root, not the rootDirectory.

This tells Vercel:
- **rootDirectory**: Use the `frontend` directory as the project root
- **buildCommand**: Run `npm install && npm run build` from the frontend directory
- **outputDirectory**: The `frontend/.next` folder (relative to repository root - this is where Next.js creates the build output)
- **framework**: Next.js (for automatic optimizations)

## 📋 Steps to Deploy

### 1. Push the Configuration

```bash
git add vercel.json
git commit -m "fix: Add Vercel configuration for frontend directory"
git push
```

### 2. Configure in Vercel Dashboard

1. Go to your Vercel project settings
2. Navigate to **Settings** → **General**
3. Under **Root Directory**, make sure it's set to `frontend` (or leave it empty if using vercel.json)
4. Save changes

### 3. Set Environment Variables

In Vercel Dashboard → **Settings** → **Environment Variables**, add:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com/api/v1
NEXT_PUBLIC_DOMAIN=scaping-lake.vercel.app
NEXT_PUBLIC_SITE_URL=https://scaping-lake.vercel.app
```

**Important**: Replace `your-api-url.com` with your actual backend API URL.

### 4. Redeploy

After pushing `vercel.json` and setting environment variables:

1. Go to **Deployments** tab in Vercel
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger automatic deployment

## 🔍 Troubleshooting

### Still Getting 404?

1. **Check Build Logs**: Go to Vercel Dashboard → Deployments → Click on the deployment → View build logs
   - Look for errors during build
   - Check if `npm install` succeeded
   - Verify `npm run build` completed

2. **Verify Root Directory**: 
   - In Vercel Dashboard → Settings → General
   - Root Directory should be `frontend` or empty (if using vercel.json)

3. **Check Environment Variables**:
   - Make sure all `NEXT_PUBLIC_*` variables are set
   - These are needed at build time

4. **Verify Build Output**:
   - Check if `.next` folder exists after build
   - Verify `package.json` exists in `frontend` directory

### Build Errors?

**Common Issues:**

1. **Missing Dependencies**: 
   - Check `frontend/package.json` has all dependencies
   - Run `npm install` locally to verify

2. **TypeScript Errors**:
   - Fix any TypeScript errors before deploying
   - Run `npm run build` locally first

3. **Environment Variables Missing**:
   - All `NEXT_PUBLIC_*` variables must be set in Vercel
   - These are embedded at build time

### Alternative: Deploy from Frontend Directory

If the above doesn't work, you can:

1. Create a separate Vercel project
2. Point it directly to the `frontend` directory
3. Or use Vercel CLI from the frontend directory:

```bash
cd frontend
vercel
```

## 📝 Next Steps

After successful deployment:

1. **Configure Custom Domain** (if needed):
   - Go to Vercel Dashboard → Settings → Domains
   - Add your custom domain (e.g., `appcortex.pro`)

2. **Set Up API Backend**:
   - Deploy backend API separately (not on Vercel if it needs persistent connections)
   - Update `NEXT_PUBLIC_API_URL` in Vercel environment variables

3. **Enable Analytics** (optional):
   - Vercel Analytics provides performance insights
   - Enable in Vercel Dashboard → Analytics

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Last Updated**: December 2025

