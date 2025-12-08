# Backend API Requirements Based on Frontend

## Required Endpoints

### 1. Dashboard API
- `GET /api/v1/dashboard?timeRange=7d`
  - Returns: DashboardData (stats, recentApps, insights, recentActivity)

### 2. Contact API
- `POST /api/v1/contact`
  - Body: { name, email, company?, subject, message }
  - Returns: { success: boolean, message: string }

### 3. Search API
- `GET /api/v1/search?q=query&category=xxx&stores[]=xxx&page=1&pageSize=20`
  - Returns: SearchResult (apps, total, page, pageSize, totalPages)

### 4. Alerts API
- `GET /api/v1/alerts?status=active`
- `POST /api/v1/alerts`
- `PUT /api/v1/alerts/:id`
- `DELETE /api/v1/alerts/:id`
- `PATCH /api/v1/alerts/:id/status`
- `GET /api/v1/alerts/history?alertId=xxx`

### 5. Reports API
- `GET /api/v1/reports?frequency=weekly`
- `POST /api/v1/reports`
- `GET /api/v1/reports/:id/download`
- `DELETE /api/v1/reports/:id`
- `PATCH /api/v1/reports/:id/schedule`

### 6. User Settings API
- `GET /api/v1/user/profile`
- `PUT /api/v1/user/profile`
- `POST /api/v1/user/change-password`
- `GET /api/v1/user/api-keys`
- `POST /api/v1/user/api-keys`
- `DELETE /api/v1/user/api-keys/:id`
- `GET /api/v1/user/notifications`
- `PUT /api/v1/user/notifications`
- `GET /api/v1/user/tracked-apps`

## Database Models Needed

Based on Prisma schema, we need to add:
1. Alert model
2. Report model
3. APIKey model
4. NotificationPreferences model
5. ContactSubmission model
6. TrackedApp relation (WatchlistApp already exists)

