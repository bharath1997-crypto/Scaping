/**
 * AppCortex API Client
 * Comprehensive API functions for all app features
 */

import axios from 'axios';
import { getStoredTokens } from './auth-api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

// Create axios instance with auth interceptor
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const { accessToken } = getStoredTokens();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ============================================================================
// DASHBOARD API
// ============================================================================

export interface DashboardStats {
  appsTracked: number;
  avgDownloads: string;
  sentimentScore: number;
  trendingCategories: number;
}

export interface RecentApp {
  id: string;
  name: string;
  category: string;
  downloads: string;
  trend: 'up' | 'down';
  change: string;
}

export interface Insight {
  id: string;
  type: 'opportunity' | 'alert' | 'trend';
  title: string;
  description: string;
  date: string;
  confidence: number;
}

export interface Activity {
  id: string;
  action: string;
  app: string;
  time: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentApps: RecentApp[];
  insights: Insight[];
  recentActivity: Activity[];
}

/**
 * Get dashboard data
 */
export async function getDashboardData(timeRange: string = '7d'): Promise<DashboardData> {
  try {
    const response = await apiClient.get<{ success: boolean; data: DashboardData }>('/dashboard', {
      params: { timeRange },
    });
    return response.data.data;
  } catch (error: any) {
    // Return mock data if API not available
    if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
      return {
        stats: {
          appsTracked: 0,
          avgDownloads: '0',
          sentimentScore: 0,
          trendingCategories: 0,
        },
        recentApps: [],
        insights: [],
        recentActivity: [],
      };
    }
    throw error;
  }
}

// ============================================================================
// ALERTS API
// ============================================================================

export interface Alert {
  id: string;
  name: string;
  appId: string;
  appName: string;
  appIcon: string;
  metric: 'downloads' | 'rating' | 'reviews' | 'sentiment' | 'ranking' | 'revenue';
  condition: 'above' | 'below' | 'changes' | 'increases' | 'decreases';
  threshold: string;
  frequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  status: 'active' | 'paused' | 'triggered' | 'archived';
  createdAt: string;
  lastTriggered?: string;
  triggerCount: number;
  notifications: string[];
}

export interface CreateAlertInput {
  name: string;
  appId: string;
  metric: Alert['metric'];
  condition: Alert['condition'];
  threshold: string;
  frequency: Alert['frequency'];
  notifications: string[];
}

export interface AlertHistory {
  id: string;
  alertId: string;
  alertName: string;
  triggeredAt: string;
  message: string;
  value: string;
}

/**
 * Get all alerts
 */
export async function getAlerts(status?: Alert['status']): Promise<Alert[]> {
  try {
    const response = await apiClient.get<{ success: boolean; data: Alert[] }>('/alerts', {
      params: status ? { status } : {},
    });
    return response.data.data;
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}

/**
 * Create new alert
 */
export async function createAlert(input: CreateAlertInput): Promise<Alert> {
  const response = await apiClient.post<{ success: boolean; data: Alert }>('/alerts', input);
  return response.data.data;
}

/**
 * Update alert
 */
export async function updateAlert(id: string, updates: Partial<Alert>): Promise<Alert> {
  const response = await apiClient.put<{ success: boolean; data: Alert }>(`/alerts/${id}`, updates);
  return response.data.data;
}

/**
 * Delete alert
 */
export async function deleteAlert(id: string): Promise<void> {
  await apiClient.delete(`/alerts/${id}`);
}

/**
 * Pause/Resume alert
 */
export async function toggleAlertStatus(id: string, status: 'active' | 'paused'): Promise<Alert> {
  const response = await apiClient.patch<{ success: boolean; data: Alert }>(`/alerts/${id}/status`, { status });
  return response.data.data;
}

/**
 * Get alert history
 */
export async function getAlertHistory(alertId?: string): Promise<AlertHistory[]> {
  try {
    const response = await apiClient.get<{ success: boolean; data: AlertHistory[] }>('/alerts/history', {
      params: alertId ? { alertId } : {},
    });
    return response.data.data;
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}

// ============================================================================
// REPORTS API
// ============================================================================

export interface Report {
  id: string;
  name: string;
  description: string;
  format: 'pdf' | 'excel' | 'pptx' | 'csv';
  status: 'ready' | 'generating' | 'failed' | 'scheduled';
  createdAt: string;
  completedAt?: string;
  downloadUrl?: string;
  fileSize?: string;
  modules: string[];
  apps: string[];
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  nextRun?: string;
}

export interface CreateReportInput {
  name: string;
  description?: string;
  format: Report['format'];
  modules: string[];
  appIds: string[];
  frequency?: Report['frequency'];
  scheduleDate?: string;
}

/**
 * Get all reports
 */
export async function getReports(frequency?: Report['frequency']): Promise<Report[]> {
  try {
    const response = await apiClient.get<{ success: boolean; data: Report[] }>('/reports', {
      params: frequency ? { frequency } : {},
    });
    return response.data.data;
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}

/**
 * Create new report
 */
export async function createReport(input: CreateReportInput): Promise<Report> {
  const response = await apiClient.post<{ success: boolean; data: Report }>('/reports', input);
  return response.data.data;
}

/**
 * Download report
 */
export async function downloadReport(id: string): Promise<Blob> {
  const response = await apiClient.get(`/reports/${id}/download`, {
    responseType: 'blob',
  });
  return response.data;
}

/**
 * Delete report
 */
export async function deleteReport(id: string): Promise<void> {
  await apiClient.delete(`/reports/${id}`);
}

/**
 * Update report schedule
 */
export async function updateReportSchedule(id: string, schedule: { frequency: Report['frequency']; nextRun?: string }): Promise<Report> {
  const response = await apiClient.patch<{ success: boolean; data: Report }>(`/reports/${id}/schedule`, schedule);
  return response.data.data;
}

// ============================================================================
// SETTINGS API
// ============================================================================

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  company?: string;
  role?: string;
  timezone?: string;
  language?: string;
}

export interface UpdateProfileInput {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  timezone?: string;
  language?: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  calls: number;
}

export interface NotificationPreferences {
  emailAlerts: boolean;
  emailWeeklyDigest: boolean;
  emailReportReady: boolean;
  emailMarketing: boolean;
  pushBrowser: boolean;
  pushMobile: boolean;
}

/**
 * Get user profile
 */
export async function getUserProfile(): Promise<UserProfile> {
  const response = await apiClient.get<{ success: boolean; data: UserProfile }>('/user/profile');
  return response.data.data;
}

/**
 * Update user profile
 */
export async function updateUserProfile(input: UpdateProfileInput): Promise<UserProfile> {
  const response = await apiClient.put<{ success: boolean; data: UserProfile }>('/user/profile', input);
  return response.data.data;
}

/**
 * Change password
 */
export async function changePassword(input: ChangePasswordInput): Promise<{ success: boolean; message: string }> {
  const response = await apiClient.post<{ success: boolean; message: string }>('/user/change-password', input);
  return response.data;
}

/**
 * Get API keys
 */
export async function getAPIKeys(): Promise<APIKey[]> {
  try {
    const response = await apiClient.get<{ success: boolean; data: APIKey[] }>('/user/api-keys');
    return response.data.data;
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}

/**
 * Create API key
 */
export async function createAPIKey(name: string): Promise<APIKey> {
  const response = await apiClient.post<{ success: boolean; data: APIKey }>('/user/api-keys', { name });
  return response.data.data;
}

/**
 * Delete API key
 */
export async function deleteAPIKey(id: string): Promise<void> {
  await apiClient.delete(`/user/api-keys/${id}`);
}

/**
 * Get notification preferences
 */
export async function getNotificationPreferences(): Promise<NotificationPreferences> {
  try {
    const response = await apiClient.get<{ success: boolean; data: NotificationPreferences }>('/user/notifications');
    return response.data.data;
  } catch (error: any) {
    // Return defaults if not available
    if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
      return {
        emailAlerts: true,
        emailWeeklyDigest: true,
        emailReportReady: true,
        emailMarketing: false,
        pushBrowser: false,
        pushMobile: false,
      };
    }
    throw error;
  }
}

/**
 * Update notification preferences
 */
export async function updateNotificationPreferences(prefs: NotificationPreferences): Promise<NotificationPreferences> {
  const response = await apiClient.put<{ success: boolean; data: NotificationPreferences }>('/user/notifications', prefs);
  return response.data.data;
}

// ============================================================================
// CONTACT API
// ============================================================================

export interface ContactFormInput {
  name: string;
  email: string;
  company?: string;
  subject: 'general' | 'sales' | 'support' | 'partnership' | 'press' | 'other';
  message: string;
}

/**
 * Submit contact form
 */
export async function submitContactForm(input: ContactFormInput): Promise<{ success: boolean; message: string }> {
  const response = await apiClient.post<{ success: boolean; message: string }>('/contact', input);
  return response.data;
}

// ============================================================================
// SEARCH API
// ============================================================================

export interface SearchFilters {
  category?: string;
  stores?: string[];
  minDownloads?: string;
  maxDownloads?: string;
  minRating?: string;
  region?: string;
  dateRange?: string;
}

export interface SearchApp {
  id: string;
  name: string;
  developer: string;
  icon: string;
  category: string;
  downloads: string;
  rating: number;
  reviews: number;
  store: string;
  trend: 'up' | 'down';
  change: string;
  price: string;
}

export interface SearchResult {
  apps: SearchApp[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Search apps
 */
export async function searchApps(query: string, filters: SearchFilters = {}, page: number = 1, pageSize: number = 20): Promise<SearchResult> {
  try {
    const response = await apiClient.get<{ success: boolean; data: SearchResult }>('/search', {
      params: {
        q: query,
        ...filters,
        page,
        pageSize,
      },
    });
    return response.data.data;
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
      return {
        apps: [],
        total: 0,
        page: 1,
        pageSize: 20,
        totalPages: 0,
      };
    }
    throw error;
  }
}

