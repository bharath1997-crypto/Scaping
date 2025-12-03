# Cursor AI Prompt for Reviews & Ratings Intelligence

## Main Prompt (Copy-Paste into Cursor Agent)

```
You are building AppCortex (AppBrain-like app store intelligence). 

Create a full "Reviews & Ratings Intelligence" section for the App Details page.

Tech stack:
- Next.js 14 + React + TypeScript
- Tailwind CSS
- shadcn/ui components
- recharts for charts
- API fetch via axios
- Page route: /apps/[store]/[appId]

Goal:
Design a premium dashboard tab that helps developers and visitors understand ratings + review insights.

DATA TO SHOW (from backend):
A) Star Breakdown:
- star1Count, star2Count, star3Count, star4Count, star5Count (BigInt)
- score (average rating)
- ratings (total ratings count)
- reviews (total reviews count)

B) Trends:
- dailyStats[] (last 30 days): score, ratings, reviews, star1Count..star5Count, date

C) Keyword & Topic Insights (AI-produced):
- topKeywords[] (word, count)
- topComplaints[] (topic, count, sentiment)
- topPraises[] (topic, count, sentiment)
- featureRequests[] (feature, count)
- sentimentScore (0–1)
- volatilityScore (0–1)
- developerResponseRate (%)
- developerAvgReplyTimeHours

UI REQUIREMENTS:
1. Tab layout with sections:
   - Overview KPI row
   - Star distribution bar chart (5 bars)
   - Rating trend line chart (score over time)
   - Review volume chart (reviews per day)
   - Keywords cloud / list
   - Complaints vs Praise cards
   - Feature Requests ranked list
   - Trust & Manipulation alerts (review bombing / fake review risk)
   - Country breakdown (if available)

2. Must be responsive.
3. Use a clean Swiss-style layout, lots of whitespace, subtle borders, rounded-2xl.
4. All charts must have hover tooltips and legends.
5. Create reusable components in:
   - src/components/reviews/
6. Main tab component:
   - src/components/reviews/ReviewsRatingsTab.tsx
7. Add data hook:
   - src/hooks/useAppReviewsAnalytics.ts
8. Use mock data fallback if API fails.

API CONTRACT:
GET /api/v1/apps/:store/:appId/reviews-analytics
returns:
{
  app: {
    appId, store, title, score, ratings, reviews,
    star1Count..star5Count
  },
  dailyStats: [
    { date, score, ratings, reviews, star1Count..star5Count }
  ],
  insights: {
    topKeywords: [{ word, count }],
    topComplaints: [{ topic, count, sentiment }],
    topPraises: [{ topic, count, sentiment }],
    featureRequests: [{ feature, count }],
    sentimentScore,
    volatilityScore,
    developerResponseRate,
    developerAvgReplyTimeHours,
    trustFlags: [{ type, severity, message }]
  }
}

Deliver:
- All components
- Hook with axios call + fallback mock
- Page integration showing this tab in App Details page
- Minimal styling + shadcn usage
- No backend code unless needed for types

Do not explain. Just output code files.
```

## Phase-2 AI Insights Upgrade Prompt

```
Upgrade ReviewsRatingsTab to support AI insights from OpenAI pipeline:
- add sentiment-by-topic donut chart
- add volatility heatmap (1★ spikes)
- add country comparison stacked bar chart
- add competitor comparison panel (if API provides competitors[])
Keep same aesthetic and folder structure.
```

## Folder Structure

```
frontend/
  src/
    components/
      reviews/
        ReviewsRatingsTab.tsx
        StarBreakdownChart.tsx
        RatingTrendChart.tsx
        ReviewVolumeChart.tsx
        KeywordCloud.tsx
        InsightsCards.tsx
        FeatureRequestsList.tsx
        TrustAlerts.tsx
    hooks/
      useAppReviewsAnalytics.ts
    pages/ or app/
      apps/[store]/[appId]/page.tsx   (or existing)
```

## API Endpoint (Backend - To Be Implemented)

```
GET /api/v1/apps/:store/:appId/reviews-analytics
```

Returns the structure defined in the prompt above.

