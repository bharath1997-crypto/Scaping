# API Integration Guide

## ✅ Completed Integrations

### 1. Dashboard Page (`/dashboard`)
- ✅ Connected to `getDashboardData()` API
- ✅ Real-time stats loading
- ✅ Recent apps from API
- ✅ AI insights from API
- ✅ Recent activity feed
- ✅ Loading states and error handling
- ✅ Quick action buttons (Track App, Generate Report) connected

### 2. Contact Page (`/contact`)
- ✅ Connected to `submitContactForm()` API
- ✅ Form validation
- ✅ Success/error handling
- ✅ Loading states

## 📋 API Client Created

**File:** `frontend/src/lib/app-api.ts`

### Available Functions:

#### Dashboard
- `getDashboardData(timeRange)` - Get dashboard stats, apps, insights, activity

#### Alerts
- `getAlerts(status?)` - Get all alerts
- `createAlert(input)` - Create new alert
- `updateAlert(id, updates)` - Update alert
- `deleteAlert(id)` - Delete alert
- `toggleAlertStatus(id, status)` - Pause/resume alert
- `getAlertHistory(alertId?)` - Get alert trigger history

#### Reports
- `getReports(frequency?)` - Get all reports
- `createReport(input)` - Create new report
- `downloadReport(id)` - Download report file
- `deleteReport(id)` - Delete report
- `updateReportSchedule(id, schedule)` - Update report schedule

#### Settings
- `getUserProfile()` - Get user profile
- `updateUserProfile(input)` - Update profile
- `changePassword(input)` - Change password
- `getAPIKeys()` - Get API keys
- `createAPIKey(name)` - Create API key
- `deleteAPIKey(id)` - Delete API key
- `getNotificationPreferences()` - Get notification prefs
- `updateNotificationPreferences(prefs)` - Update notification prefs

#### Contact
- `submitContactForm(input)` - Submit contact form

#### Search
- `searchApps(query, filters, page, pageSize)` - Search apps with filters

## 🔄 Next Steps - Pages to Connect

### 1. Search Page (`/search`)
**Status:** Needs API integration
**Functions to use:** `searchApps()`
**What to connect:**
- Search input → `searchApps()`
- Filters → Pass to `searchApps()`
- Pagination → Use page/pageSize params
- Sort dropdown → Add to API call

### 2. Alerts Page (`/alerts`)
**Status:** Needs API integration
**Functions to use:** `getAlerts()`, `createAlert()`, `updateAlert()`, `deleteAlert()`, `toggleAlertStatus()`, `getAlertHistory()`
**What to connect:**
- Alert list → `getAlerts()`
- Create modal → `createAlert()`
- Edit button → `updateAlert()`
- Delete button → `deleteAlert()`
- Pause button → `toggleAlertStatus()`
- History tab → `getAlertHistory()`

### 3. Reports Page (`/reports`)
**Status:** Needs API integration
**Functions to use:** `getReports()`, `createReport()`, `downloadReport()`, `deleteReport()`, `updateReportSchedule()`
**What to connect:**
- Reports list → `getReports()`
- Create modal → `createReport()`
- Download button → `downloadReport()`
- Delete button → `deleteReport()`
- Schedule edit → `updateReportSchedule()`

### 4. Settings Page (`/settings`)
**Status:** Needs API integration
**Functions to use:** `getUserProfile()`, `updateUserProfile()`, `changePassword()`, `getAPIKeys()`, `createAPIKey()`, `deleteAPIKey()`, `getNotificationPreferences()`, `updateNotificationPreferences()`
**What to connect:**
- Profile tab → `getUserProfile()`, `updateUserProfile()`
- Password change → `changePassword()`
- API Keys tab → `getAPIKeys()`, `createAPIKey()`, `deleteAPIKey()`
- Notifications tab → `getNotificationPreferences()`, `updateNotificationPreferences()`

## 🔧 How to Connect a Page

### Step 1: Import API functions
```typescript
import { getAlerts, createAlert } from '@/lib/app-api';
```

### Step 2: Add state management
```typescript
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState([]);
```

### Step 3: Fetch data on mount
```typescript
useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true);
      const result = await getAlerts();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, []);
```

### Step 4: Connect buttons/forms
```typescript
const handleCreate = async (input) => {
  try {
    const newItem = await createAlert(input);
    setData([...data, newItem]);
  } catch (err) {
    setError(err.message);
  }
};
```

### Step 5: Add loading/error states
```typescript
{loading && <LoadingSpinner />}
{error && <ErrorMessage message={error} />}
{!loading && !error && <DataList data={data} />}
```

## 📝 Example: Connecting Alerts Page

```typescript
'use client';

import { useState, useEffect } from 'react';
import { getAlerts, createAlert, deleteAlert } from '@/lib/app-api';
import type { Alert, CreateAlertInput } from '@/lib/app-api';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAlerts();
  }, []);

  async function fetchAlerts() {
    try {
      setLoading(true);
      const data = await getAlerts();
      setAlerts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(input: CreateAlertInput) {
    try {
      const newAlert = await createAlert(input);
      setAlerts([...alerts, newAlert]);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteAlert(id);
      setAlerts(alerts.filter(a => a.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  }

  // ... rest of component
}
```

## 🚀 Backend Endpoints Needed

Make sure your backend has these endpoints:

### Dashboard
- `GET /api/v1/dashboard?timeRange=7d`

### Alerts
- `GET /api/v1/alerts?status=active`
- `POST /api/v1/alerts`
- `PUT /api/v1/alerts/:id`
- `DELETE /api/v1/alerts/:id`
- `PATCH /api/v1/alerts/:id/status`
- `GET /api/v1/alerts/history?alertId=xxx`

### Reports
- `GET /api/v1/reports?frequency=weekly`
- `POST /api/v1/reports`
- `GET /api/v1/reports/:id/download`
- `DELETE /api/v1/reports/:id`
- `PATCH /api/v1/reports/:id/schedule`

### Settings
- `GET /api/v1/user/profile`
- `PUT /api/v1/user/profile`
- `POST /api/v1/user/change-password`
- `GET /api/v1/user/api-keys`
- `POST /api/v1/user/api-keys`
- `DELETE /api/v1/user/api-keys/:id`
- `GET /api/v1/user/notifications`
- `PUT /api/v1/user/notifications`

### Contact
- `POST /api/v1/contact`

### Search
- `GET /api/v1/search?q=query&category=xxx&page=1&pageSize=20`

## ✅ Testing Checklist

For each page:
- [ ] Data loads on page mount
- [ ] Loading state shows while fetching
- [ ] Error state shows on failure
- [ ] Empty state shows when no data
- [ ] Create/Update/Delete operations work
- [ ] Forms validate before submission
- [ ] Success messages show after actions
- [ ] Buttons are disabled during loading
- [ ] API errors are displayed to user

## 🔐 Authentication

All API calls automatically include the auth token from `localStorage` via the axios interceptor in `app-api.ts`.

If a user is not authenticated, the backend should return `401 Unauthorized`, and you can redirect to login:

```typescript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

**Next:** Continue connecting Search, Alerts, Reports, and Settings pages using the patterns above.

