
import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Users, 
  MousePointer2, 
  Target, 
  ArrowUpRight, 
  MessageSquare,
  RefreshCcw,
  Smile,
  Frown,
  Star,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  Filter,
  ArrowDown,
  Zap,
  Activity,
  Thermometer,
  Sparkles,
  Search,
  Globe,
  Share2,
  Loader2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Analytics } from '../analytics';
import { GoogleGenAI } from "@google/genai";
import { SITE_CONFIG } from '../config';

const TrafficGrowthLab = () => {
  const [trends, setTrends] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState<any[]>([]);

  const getTrafficInsights = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Quais são as 5 tendências mais quentes e palavras-chave de busca hoje (2024/2025) para atrair tráfego para um site de marketing de afiliados e ganhar dinheiro online no Brasil? Liste também uma ideia de anúncio para Facebook Ads que esteja performando bem.",
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      
      setTrends(response.text || '');
      setSources(response.candidates?.[0]?.groundingMetadata?.groundingChunks || []);
    } catch (error) {
      setTrends("Não foi possível carregar as tendências em tempo real. Foque em: 'Renda Extra 2024', 'Afiliado Shopee' e 'Tráfego Pago para Iniciantes'.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black heading-font flex items-center gap-3">
            <Sparkles className="text-orange-500" /> Laboratório de Crescimento (IA)
          </h2>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Estratégias de Tráfego em Tempo Real</p>
        </div>
        <button 
          onClick={getTrafficInsights}
          disabled={loading}
          className="bg-orange-500 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-orange-600 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          BUSCAR TENDÊNCIAS HOJE
        </button>
      </div>

      {trends ? (
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
          <div className="prose prose-orange max-w-none text-gray-700 font-medium">
            <div className="whitespace-pre-line">{trends}</div>
          </div>
          
          {sources.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs font-black text-gray-400 uppercase mb-4 flex items-center gap-2">
                <Globe className="h-3 w-3" /> Fontes de Pesquisa:
              </p>
              <div className="flex flex-wrap gap-2">
                {sources.map((chunk, i) => chunk.web && (
                  <a 
                    key={i} 
                    href={chunk.web.uri} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[10px] bg-white px-3 py-1.5 rounded-full border border-gray-200 text-orange-500 font-bold hover:border-orange-500 transition-all"
                  >
                    {chunk.web.title || 'Ver Fonte'}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-orange-50/50 rounded-3xl border-2 border-dashed border-orange-100">
          <Globe className="h-12 w-12 text-orange-200 mx-auto mb-4" />
          <p className="text-orange-900/60 font-bold">Clique no botão acima para que a IA analise as melhores fontes de tráfego para hoje.</p>
        </div>
      )}
    </div>
  );
};

const TrafficHeatGauge = ({ views24h }: { views24h: number }) => {
  let status = "BAIXO";
  let colorClass = "bg-blue-500";
  let textColorClass = "text-blue-500";
  let progress = Math.min((views24h / 500) * 100, 100);

  if (views24h >= 200) {
    status = "ALTO 🔥";
    colorClass = "bg-orange-500";
    textColorClass = "text-orange-500";
  } else if (views24h >= 50) {
    status = "NORMAL";
    colorClass = "bg-yellow-500";
    textColorClass = "text-yellow-600";
  }

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
      <div className="bg-gray-50 p-4 rounded-full mb-4">
        <Thermometer className={`h-8 w-8 ${textColorClass}`} />
      </div>
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Intensidade de Tráfego</p>
      <h3 className={`text-2xl font-black ${textColorClass} mb-4`}>{status}</h3>
      
      <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden mb-2">
        <div 
          className={`h-full ${colorClass} transition-all duration-1000`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-[10px] font-bold text-gray-400 uppercase">
        {views24h} visitas nas últimas 24h
      </p>
    </div>
  );
};

const HourlyPerformance = ({ hourlyData }: { hourlyData: any[] }) => {
  const last24h = hourlyData.slice(-24);
  const maxViews = Math.max(...last24h.map(h => h.views), 10);

  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black heading-font flex items-center gap-2">
            <Activity className="text-orange-500" /> Tráfego por Hora
          </h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Últimas 24 Horas</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full">
           <Zap className="h-3 w-3 text-orange-500 animate-pulse" />
           <span className="text-[10px] font-black text-orange-600">Tempo Real</span>
        </div>
      </div>

      {last24h.length === 0 ? (
        <div className="h-48 flex items-center justify-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
           <p className="text-gray-400 font-bold">Iniciando monitoramento horário...</p>
        </div>
      ) : (
        <div className="flex items-end justify-between h-48 gap-1.5">
          {last24h.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative h-full">
              <div className="w-full flex items-end h-full bg-gray-50 rounded-lg overflow-hidden">
                <div 
                  style={{ height: `${(h.views / maxViews) * 100}%` }} 
                  className="w-full bg-orange-500 group-hover:bg-orange-600 transition-all rounded-t-sm"
                ></div>
              </div>
              <span className="text-[8px] font-black text-gray-300 uppercase rotate-45 mt-2">
                {h.hour.split(' ')[1]}
              </span>
              
              <div className="absolute bottom-full mb-2 bg-gray-900 text-white text-[10px] p-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 whitespace-nowrap shadow-xl">
                 {h.views} visitas às {h.hour.split(' ')[1]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ConversionFunnel = ({ metrics }: { metrics: any }) => {
  const vToL = metrics.views > 0 ? ((metrics.leads / metrics.views) * 100).toFixed(1) : '0';
  const lToS = metrics.leads > 0 ? ((metrics.checkouts / metrics.leads) * 100).toFixed(1) : '0';

  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 h-full">
      <h2 className="text-2xl font-black heading-font mb-8">Funil de Conversão</h2>
      <div className="space-y-4">
        <div className="relative">
          <div className="w-full bg-blue-500 text-white p-4 rounded-t-3xl font-black text-center relative z-10">
            VISITANTES: {metrics.views}
          </div>
          <div className="h-8 bg-gradient-to-b from-blue-500/20 to-orange-500/20 mx-auto w-4/5 flex items-center justify-center">
            <span className="text-[10px] font-black text-blue-600 bg-white px-2 py-0.5 rounded-full shadow-sm">{vToL}% Conv.</span>
          </div>
        </div>
        <div className="relative">
          <div className="w-4/5 mx-auto bg-orange-500 text-white p-4 font-black text-center relative z-10">
            LEADS: {metrics.leads}
          </div>
          <div className="h-8 bg-gradient-to-b from-orange-500/20 to-green-500/20 mx-auto w-3/5 flex items-center justify-center">
             <span className="text-[10px] font-black text-orange-600 bg-white px-2 py-0.5 rounded-full shadow-sm">{lToS}% Conv.</span>
          </div>
        </div>
        <div className="w-3/5 mx-auto bg-green-500 text-white p-4 rounded-b-3xl font-black text-center">
          VENDAS: {metrics.checkouts}
        </div>
      </div>
      <p className="mt-8 text-xs text-gray-400 font-medium text-center italic">
        * Dados acumulados localmente.
      </p>
    </div>
  );
};

const AdminInsightsPage: React.FC = () => {
  const [metrics, setMetrics] = useState(Analytics.getMetrics());
  const [onlineNow, setOnlineNow] = useState(0);

  const refresh = () => {
    const m = Analytics.getMetrics();
    setMetrics(m);
    const lastHourViews = m.hourlyHistory?.slice(-1)[0]?.views || 0;
    setOnlineNow(Math.max(1, Math.floor(lastHourViews / 2) + Math.floor(Math.random() * 3)));
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(() => refresh(), 5000);
    return () => clearInterval(interval);
  }, []);

  const views24h = metrics.hourlyHistory?.slice(-24).reduce((acc, h) => acc + h.views, 0) || 0;
  const leadConversion = metrics.views > 0 ? ((metrics.leads / metrics.views) * 100).toFixed(1) : '0';
  const averageRating = metrics.feedback.length > 0 
    ? (metrics.feedback.reduce((acc: number, f: any) => acc + f.rating, 0) / metrics.feedback.length).toFixed(1)
    : '5.0';

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-black heading-font text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-500">Gestão de tráfego e inteligência de mercado.</p>
          </div>
          <div className="flex gap-4">
            <a 
              href={`https://dnschecker.org/#A/${SITE_CONFIG.domain}`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-2xl shadow-sm hover:bg-blue-600 transition-colors font-bold text-sm"
            >
              <ShieldCheck className="h-4 w-4" />
              Status do Domínio
            </a>
            <button 
              onClick={refresh}
              className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors font-bold text-gray-700"
            >
              <RefreshCcw className="h-4 w-4" />
              Sincronizar
            </button>
          </div>
        </div>

        {/* Real-time Status */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-3 bg-orange-500 text-white rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-orange-100">
            <div className="flex items-center gap-6">
              <div className="relative">
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-300"></span>
                </span>
                <div className="bg-white/20 p-4 rounded-2xl">
                  <Users className="h-8 w-8" />
                </div>
              </div>
              <div>
                <p className="text-orange-100 font-bold uppercase text-xs tracking-widest mb-1">Acessos Ativos</p>
                <h2 className="text-4xl font-black">{onlineNow} <span className="text-xl opacity-70">online</span></h2>
              </div>
            </div>
            <div className="h-px w-full md:h-16 md:w-px bg-white/20"></div>
            <div className="text-center md:text-left">
              <p className="text-orange-100 font-bold uppercase text-xs tracking-widest mb-1">Satisfação</p>
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-black">{averageRating}</h2>
                <div className="flex text-yellow-300">
                  <Star className="h-6 w-6 fill-current" />
                </div>
              </div>
            </div>
          </div>
          <TrafficHeatGauge views24h={views24h} />
        </div>

        {/* Growth Lab Section */}
        <TrafficGrowthLab />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
           <HourlyPerformance hourlyData={metrics.hourlyHistory || []} />
           <ConversionFunnel metrics={metrics} />
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <MetricCard 
            icon={<BarChart className="text-blue-500" />} 
            label="Volume Total" 
            value={metrics.views.toLocaleString()} 
            sub="Views Acumuladas"
          />
          <MetricCard 
            icon={<Target className="text-orange-500" />} 
            label="Leads (CPL)" 
            value={metrics.leads.toLocaleString()} 
            sub={`${leadConversion}% Conv.`}
          />
          <MetricCard 
            icon={<MousePointer2 className="text-green-500" />} 
            label="Checkouts" 
            value={metrics.checkouts.toLocaleString()} 
            sub="Vendas Iniciadas"
          />
          <MetricCard 
            icon={<MessageSquare className="text-purple-500" />} 
            label="Feedbacks" 
            value={metrics.feedback.length.toLocaleString()} 
            sub="Opiniões do Público"
          />
        </div>

        {/* Feedback List */}
        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-black heading-font mb-8 flex items-center gap-3">
             <Smile className="text-orange-500" />
             Voz do Cliente
          </h2>
          
          {metrics.feedback.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
               <p className="text-gray-400 font-bold italic">Nenhum feedback coletado.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {[...metrics.feedback].reverse().slice(0, 5).map((f: any, i: number) => (
                <div key={i} className="flex gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className={`p-4 rounded-2xl h-fit ${f.rating >= 4 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {f.rating >= 4 ? <ThumbsUp className="h-5 w-5" /> : <ThumbsDown className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-black text-gray-900 uppercase text-sm tracking-widest">
                        {f.rating >= 4 ? 'Positivo' : 'Melhoria'}
                      </span>
                      <span className="text-gray-400 text-xs">{new Date(f.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600 italic">"{f.comment || 'Nenhum comentário.'}"</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub?: string }) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
    <div className="bg-gray-50 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-3xl font-black text-gray-900 mb-2">{value}</h3>
    <p className="text-xs font-bold text-orange-500 flex items-center gap-1">
      {sub} <ArrowUpRight className="h-3 w-3" />
    </p>
  </div>
);

export default AdminInsightsPage;
