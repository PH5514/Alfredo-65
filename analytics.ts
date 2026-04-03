
/**
 * Click Money Flow Analytics Utility with Hourly Tracking
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

interface DailyMetric {
  date: string;
  views: number;
  leads: number;
  sales: number;
}

interface HourlyMetric {
  hour: string; // Formato YYYY-MM-DD HH:00
  views: number;
}

interface Metrics {
  views: number;
  leads: number;
  checkouts: number;
  feedback: any[];
  history: DailyMetric[];
  hourlyHistory: HourlyMetric[];
}

const getTodayStr = () => new Date().toISOString().split('T')[0];
const getCurrentHourStr = () => {
  const d = new Date();
  return `${d.toISOString().split('T')[0]} ${d.getHours()}:00`;
};

const getStoredMetrics = (): Metrics => {
  const data = localStorage.getItem('ce_metrics');
  const defaultMetrics: Metrics = { 
    views: 0, 
    leads: 0, 
    checkouts: 0, 
    feedback: [], 
    history: [],
    hourlyHistory: [] 
  };
  
  if (!data) return defaultMetrics;
  
  const parsed = JSON.parse(data);
  if (!parsed.history) parsed.history = [];
  if (!parsed.hourlyHistory) parsed.hourlyHistory = [];
  return parsed;
};

const updateMetrics = (updater: (prev: Metrics) => Metrics) => {
  const current = getStoredMetrics();
  const next = updater(current);
  
  const today = getTodayStr();
  const currentHour = getCurrentHourStr();

  // Update Daily History
  const historyIndex = next.history.findIndex(h => h.date === today);
  if (historyIndex === -1) {
    next.history.push({
      date: today,
      views: next.views - (current.views || 0),
      leads: next.leads - (current.leads || 0),
      sales: next.checkouts - (current.checkouts || 0)
    });
  } else {
    const dayEntry = next.history[historyIndex];
    dayEntry.views += (next.views - current.views);
    dayEntry.leads += (next.leads - current.leads);
    dayEntry.sales += (next.checkouts - current.checkouts);
  }

  // Update Hourly History (for the last 24h graph)
  const hourIndex = next.hourlyHistory.findIndex(h => h.hour === currentHour);
  if (hourIndex === -1) {
    next.hourlyHistory.push({ hour: currentHour, views: 1 });
  } else {
    next.hourlyHistory[hourIndex].views += (next.views - current.views);
  }

  // Retention Policies
  if (next.history.length > 14) next.history = next.history.slice(-14);
  if (next.hourlyHistory.length > 48) next.hourlyHistory = next.hourlyHistory.slice(-48);

  localStorage.setItem('ce_metrics', JSON.stringify(next));
};

export const Analytics = {
  pageView: (url: string) => {
    updateMetrics(m => ({ ...m, views: m.views + 1 }));
    if (window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', { page_path: url });
    }
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  },

  trackLead: () => {
    updateMetrics(m => ({ ...m, leads: m.leads + 1 }));
    if (window.gtag) {
      window.gtag('event', 'generate_lead', { method: 'Formulário de Captura' });
    }
    if (window.fbq) {
      window.fbq('track', 'Lead');
    }
  },

  trackInitiateCheckout: (value: number = 297.00) => {
    updateMetrics(m => ({ ...m, checkouts: m.checkouts + 1 }));
    if (window.gtag) {
      window.gtag('event', 'begin_checkout', { value, currency: 'BRL' });
    }
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', { value, currency: 'BRL' });
    }
  },

  trackFeedback: (rating: number, comment: string) => {
    const current = getStoredMetrics();
    const next = { 
      ...current, 
      feedback: [...(current.feedback || []), { rating, comment, date: new Date().toISOString() }] 
    };
    localStorage.setItem('ce_metrics', JSON.stringify(next));
  },

  getMetrics: () => getStoredMetrics(),

  trackButtonClick: (buttonName: string) => {
    if (window.gtag) {
      window.gtag('event', 'click', { event_category: 'button', event_label: buttonName });
    }
  },

  trackContact: () => {
    if (window.gtag) {
      window.gtag('event', 'contact', { method: 'Formulário de Contato' });
    }
    if (window.fbq) {
      window.fbq('track', 'Contact');
    }
  },

  getUTMs: () => {
    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get('utm_source'),
      medium: params.get('utm_medium'),
      campaign: params.get('utm_campaign')
    };
  }
};
