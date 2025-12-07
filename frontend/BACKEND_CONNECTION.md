# 🔌 Backend Connection Guide

## Issue: Frontend Can't Connect to Backend

If you see errors like `ECONNREFUSED` on port 3001, it means the backend API server is not running.

## ✅ Solution: Start the Backend Server

### **Step 1: Open a new terminal window**

Keep the frontend running in one terminal, open another terminal for the backend.

### **Step 2: Navigate to project root**

```bash
cd C:\Users\bhara\Projects\Scraping
```

### **Step 3: Start the backend API server**

```bash
npm run api
```

You should see:
```
╔════════════════════════════════════════════════════════════╗
║           AppCortex API Server Started                     ║
╠════════════════════════════════════════════════════════════╣
║  URL: http://localhost:3001                                 ║
║  Health: http://localhost:3001/health                       ║
```

### **Step 4: Verify Backend is Running**

Open http://localhost:3001/health in your browser. You should see:
```json
{"ok":true,"status":"healthy"}
```

### **Step 5: Refresh Frontend**

Go back to http://localhost:3000 and refresh the page. The frontend should now connect successfully!

---

## 🎯 Quick Reference

**Frontend:** http://localhost:3000 (runs on port 3000)  
**Backend API:** http://localhost:3001 (runs on port 3001)

**To run both:**

**Terminal 1 (Backend):**
```bash
cd C:\Users\bhara\Projects\Scraping
npm run api
```

**Terminal 2 (Frontend):**
```bash
cd C:\Users\bhara\Projects\Scraping\frontend
npm run dev
```

---

## ✅ Error Handling

The frontend now includes error handling:
- ✅ Shows a warning banner if backend is not connected
- ✅ Displays "No data available" instead of crashing
- ✅ Pages still load and work (just without data)

You can browse all pages even without the backend running!

