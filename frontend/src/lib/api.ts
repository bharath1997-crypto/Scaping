import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

const apiClient = axios.create({
  baseURL: API_URL.includes('/api/v1') ? API_URL : `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface App {
  id: string;
  store: string;
  appId: string;
  title?: string;
  name?: string; // Backend uses 'name' sometimes
  developer?: string;
  developerName?: string; // Backend uses 'developerName' sometimes
  developerId?: string;
  icon?: string;
  iconUrl?: string; // Backend uses 'iconUrl' sometimes
  score?: number;
  ratings?: number;
  ratingsCount?: number; // Backend uses 'ratingsCount' sometimes
  reviews?: number;
  minInstalls?: number;
  maxInstalls?: number;
  free: boolean;
  price?: number;
  currency?: string;
  category?: string;
  primaryCategory?: string; // Backend uses 'primaryCategory' sometimes
  country?: string;
  rank?: number;
  currentRank?: number; // Backend uses 'currentRank' sometimes
  description?: string;
  summary?: string;
  screenshots?: string[];
  updatedAt?: string;
  lastSeenAt?: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AppsResponse {
  ok: boolean;
  data: App[];
  pagination: PaginationInfo;
}

export interface ReviewsAnalytics {
  totalReviews: number;
  avgRating: number;
  ratingDistribution: {
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
  };
  trends?: {
    date: string;
    rating: number;
    reviewCount: number;
  }[];
}

export interface AppDetailResponse {
  ok: boolean;
  data: App;
}

export interface ReviewsAnalyticsResponse {
  ok: boolean;
  data: ReviewsAnalytics;
}

export interface ListAppsParams {
  store?: string;
  country?: string;
  category?: string;
  search?: string;
  q?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

/**
 * List apps with filtering, pagination, and sorting
 */
export async function listApps(params: ListAppsParams = {}): Promise<AppsResponse> {
  try {
    const response = await apiClient.get<AppsResponse>('/apps', { params });
    return response.data;
  } catch (error: any) {
    // Return empty response if backend is not available
    if (error.code === 'ECONNREFUSED' || error.message?.includes('ECONNREFUSED')) {
      return {
        ok: false,
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pageSize: 25,
          totalPages: 0,
        },
      };
    }
    throw error;
  }
}

/**
 * Get detailed app information
 */
export async function getAppDetail(store: string, appId: string): Promise<App> {
  try {
    const response = await apiClient.get<AppDetailResponse>(`/apps/${store}/${appId}`);
    if (!response.data.ok || !response.data.data) {
      throw new Error('App not found');
    }
    return response.data.data;
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED' || error.message?.includes('ECONNREFUSED')) {
      throw new Error('Backend API not available');
    }
    throw error;
  }
}

/**
 * Get app reviews analytics
 */
export async function getAppReviewsAnalytics(
  store: string,
  appId: string,
  country?: string
): Promise<ReviewsAnalytics> {
  try {
    const response = await apiClient.get<ReviewsAnalyticsResponse>(
      `/apps/${store}/${appId}/reviews-analytics`,
      { params: country ? { country } : {} }
    );
    if (!response.data.ok || !response.data.data) {
      throw new Error('Reviews analytics not found');
    }
    return response.data.data;
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED' || error.message?.includes('ECONNREFUSED')) {
      throw new Error('Backend API not available');
    }
    throw error;
  }
}

/**
 * Health check
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data.ok === true;
  } catch {
    return false;
  }
}

