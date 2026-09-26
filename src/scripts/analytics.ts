import { createAnalytics } from '../lib/analytics-stack';
import { analyticsConfig } from '../lib/analytics-config';
(window as any).qctTrackEvent = createAnalytics(analyticsConfig).track;
