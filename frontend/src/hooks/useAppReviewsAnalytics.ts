import { useEffect, useState } from "react";
import axios from "axios";

export type ReviewsAnalytics = {
  app: any;
  dailyStats: any[];
  insights: any;
};

const mock: ReviewsAnalytics = {
  app: {
    appId: "com.instagram.android",
    store: "GOOGLE_PLAY",
    title: "Instagram",
    score: 4.4,
    ratings: 212629284n,
    reviews: 1983759n,
    star1Count: 18730232n,
    star2Count: 5278201n,
    star3Count: 12400123n,
    star4Count: 54001234n,
    star5Count: 125000000n,
  },
  dailyStats: Array.from({ length: 30 }).map((_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86400000).toISOString(),
    score: 4.3 + Math.random() * 0.2,
    ratings: 1000000 + i * 5000,
    reviews: 60000 + i * 300,
    star1Count: 10000 + i * 20,
    star2Count: 7000 + i * 15,
    star3Count: 9000 + i * 18,
    star4Count: 15000 + i * 25,
    star5Count: 40000 + i * 60,
  })),
  insights: {
    topKeywords: [
      { word: "crash", count: 1240 },
      { word: "ads", count: 950 },
      { word: "slow", count: 720 },
      { word: "love", count: 680 },
    ],
    topComplaints: [
      { topic: "Crashes after update", count: 420, sentiment: -0.8 },
      { topic: "Too many ads", count: 310, sentiment: -0.6 },
    ],
    topPraises: [
      { topic: "Easy to use", count: 510, sentiment: 0.7 },
      { topic: "Great UI", count: 390, sentiment: 0.6 },
    ],
    featureRequests: [
      { feature: "Dark mode", count: 220 },
      { feature: "Offline mode", count: 180 },
    ],
    sentimentScore: 0.62,
    volatilityScore: 0.28,
    developerResponseRate: 0.14,
    developerAvgReplyTimeHours: 36,
    trustFlags: [
      { type: "review_bombing", severity: "medium", message: "1★ spike last 3 days" }
    ]
  }
};

export function useAppReviewsAnalytics(store: string, appId: string) {
  const [data, setData] = useState<ReviewsAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await axios.get(`/api/v1/apps/${store}/${appId}/reviews-analytics`);
        if (mounted) setData(res.data);
      } catch {
        if (mounted) setData(mock);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, [store, appId]);

  return { data, loading };
}

