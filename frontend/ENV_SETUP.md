# Frontend Environment Setup

## Required Environment Variable

Create a file named `.env.local` in the `frontend` directory with:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

## Steps

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Create `.env.local` file:
   ```bash
   # On Windows PowerShell:
   echo "NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1" > .env.local
   
   # On Linux/Mac:
   echo "NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1" > .env.local
   ```

3. Restart the Next.js dev server:
   ```bash
   npm run dev
   ```

## Verify

After restarting, check the browser console when clicking "Continue with Google" - you should see:
```
Redirecting to Google OAuth: http://localhost:4000/api/v1/auth/google
```

If you see `localhost:3001` or `localhost:3000` instead, the environment variable isn't being read correctly.

## Troubleshooting

- **Port mismatch**: Make sure backend is running on port 4000 (`npm run api` in root directory)
- **Environment not loaded**: Restart Next.js dev server after creating `.env.local`
- **Wrong URL**: Check browser console for the actual redirect URL

