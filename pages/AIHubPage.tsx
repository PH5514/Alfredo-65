
import React, { useState } from 'react';
import { 
  Wand2, 
  MessageSquare, 
  Search, 
  Zap, 
  ArrowRight, 
  Loader2, 
  Sparkles, 
  ShoppingBag,
  Target,
  FileText,
  Link as LinkIcon,
  Share2,
  Copy,
  // Added missing ChevronRight import
  ChevronRight
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { SITE_CONFIG } from '../config';
import { Analytics } from '../analytics';

const AIHubPage: React.FC = () => {
  const [nicheInput, setNicheInput] = useState('');
  const [nicheResult, setNicheResult] = useState<any>(null);
  const [scriptInput, setScriptInput] = useState('');
  const [scriptResult, setScriptResult] = useState('');
  const [linkInput, setLinkInput] = useState({ url: '', name: '', benefit: '' });
  const [generatedBridgeLink, setGeneratedBridgeLink] = useState('');
  const [loading, setLoading] = useState<'niche' | 'script' | 'link' | null>(null);

  const generateBridgeLink = () => {
    if (!linkInput.url || !linkInput.name) return;
    setLoading('link');
    
    // Simular processamento
    setTimeout(() => {
      const baseUrl = window.location.origin + window.location.pathname;
      const params = new URLSearchParams();
      params.append('dest', linkInput.url);
      params.append('p', linkInput.name);
      if (linkInput.benefit) params.append('b', linkInput.benefit);
      
      const finalLink = `${baseUrl}#/ponte?${params.toString()}`;
      setGeneratedBridgeLink(finalLink);
      setLoading(null);
      Analytics.trackButtonClick('IA - Gerador de Link de Ponte');
    }, 800);
  };

  const getAIOfferRecommendation = async () => {
    if (!nicheInput.trim()) return;
    setLoading('niche');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analise este perfil: "${nicheInput}". Com base nos produtos que eu promovo: ${JSON.stringify(SITE_CONFIG.products)}, qual o ÚNICO melhor produto para este usuário e por quê? Retorne em JSON com campos: product_name, reasons (array), and call_to_action.`,
        config: { responseMimeType: "application/json" }
      });
      const data = JSON.parse(response.text || '{}');
      const product = SITE_CONFIG.products.find(p => p.name === data.product_name) || SITE_CONFIG.products[0];
      setNicheResult({ ...data, productLink: product.link });
      Analytics.trackButtonClick('IA - Recomendador de Nicho');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  const generateSalesScript = async () => {
    if (!scriptInput.trim()) return;
    setLoading('script');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Crie um roteiro de vendas persuasivo para WhatsApp de alta conversão para este produto: "${scriptInput}". Use gatilhos de urgência e escassez.`,
      });
      setScriptResult(response.text || '');
      Analytics.trackButtonClick('IA - Gerador de Scripts');
    } catch (e) {
      setScriptResult("Tivemos um problema com a IA. Tente descrever o produto de outra forma.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-black uppercase mb-6 tracking-widest">
            <Zap className="h-4 w-4 fill-current" />
            Ferramentas Gratuitas para Afiliados
          </div>
          <h1 className="text-4xl md:text-6xl font-black heading-font text-gray-900 mb-6">Laboratório <span className="text-orange-500">Inteligente</span></h1>
          <p className="text-xl text-gray-500">Use o poder da IA para acelerar seus resultados. Nossas ferramentas analisam tendências e geram scripts que vendem.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Tool 1: Product Recommender */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-orange-500/5 group-hover:scale-110 transition-transform">
              <Target className="h-40 w-40" />
            </div>
            
            <div className="relative z-10">
              <div className="bg-orange-50 p-4 rounded-2xl w-fit mb-6 text-orange-500">
                <Search className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-black heading-font mb-4">Recomendador de Nicho</h2>
              <p className="text-gray-500 mb-8">Diga o que você gosta ou sabe fazer, e nossa IA dirá qual produto você deve promover para lucrar mais.</p>
              
              <div className="space-y-4 mb-8">
                <textarea 
                  placeholder="Ex: Eu gosto de cozinhar, tenho 5 mil seguidores e gosto de falar sobre emagrecimento..."
                  value={nicheInput}
                  onChange={(e) => setNicheInput(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-6 text-sm outline-none focus:ring-2 focus:ring-orange-500 min-h-[120px]"
                />
                <button 
                  onClick={getAIOfferRecommendation}
                  disabled={loading === 'niche'}
                  className="w-full bg-orange-500 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-orange-600 transition-all disabled:opacity-50"
                >
                  {loading === 'niche' ? <Loader2 className="animate-spin h-5 w-5" /> : <><Sparkles className="h-4 w-4" /> RECOMENDAR AGORA</>}
                </button>
              </div>

              {nicheResult && (
                <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100 animate-in fade-in zoom-in-95 duration-500">
                  <h4 className="text-orange-900 font-black text-xl mb-4">VOCÊ DEVE PROMOVER: {nicheResult.product_name}</h4>
                  <ul className="space-y-2 mb-6">
                    {nicheResult.reasons?.map((r: string, i: number) => (
                      <li key={i} className="text-orange-800 text-sm flex gap-2">
                        <span className="text-orange-500">•</span> {r}
                      </li>
                    ))}
                  </ul>
                  <a 
                    href={nicheResult.productLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full bg-white text-orange-600 border-2 border-orange-500 py-3 rounded-xl font-black text-center block hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                  >
                    VER PRODUTO INDICADO
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Tool 2: Script Generator */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-blue-500/5 group-hover:scale-110 transition-transform">
              <FileText className="h-40 w-40" />
            </div>
            
            <div className="relative z-10">
              <div className="bg-blue-50 p-4 rounded-2xl w-fit mb-6 text-blue-500">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-black heading-font mb-4">Gerador de Script</h2>
              <p className="text-gray-500 mb-8">Crie roteiros persuasivos para o WhatsApp que fazem o cliente fechar a compra na hora.</p>
              
              <div className="space-y-4 mb-8">
                <input 
                  placeholder="Nome do produto (ex: Mestre do Ads)..."
                  value={scriptInput}
                  onChange={(e) => setScriptInput(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={generateSalesScript}
                  disabled={loading === 'script'}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {loading === 'script' ? <Loader2 className="animate-spin h-5 w-5" /> : <><Sparkles className="h-4 w-4" /> GERAR ROTEIRO VIP</>}
                </button>
              </div>

              {scriptResult && (
                <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-blue-400 font-black text-xs uppercase tracking-widest">Script Gerado:</span>
                    <button 
                      onClick={() => { navigator.clipboard.writeText(scriptResult); alert('Copiado!'); }}
                      className="text-[10px] bg-white/10 text-white px-3 py-1 rounded-full font-bold"
                    >
                      COPIAR TEXTO
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed italic mb-8">
                    {scriptResult}
                  </p>
                  
                  {/* Affiliate Upsell */}
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-2xl text-white">
                    <h5 className="font-black mb-2">DICA PRO: Quer Scripts Prontos?</h5>
                    <p className="text-xs opacity-90 mb-4">Acesse nossa biblioteca com mais de 500 scripts validados que geraram mais de R$ 1MM em vendas.</p>
                    <a 
                      href={SITE_CONFIG.affiliateLinks.copywriting} 
                      className="bg-white text-orange-600 px-4 py-2 rounded-lg font-black text-[10px] uppercase flex items-center justify-center gap-2"
                    >
                      LIBERAR BIBLIOTECA <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tool 3: Link & Lead Promoter */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col h-full relative overflow-hidden group lg:col-span-2">
            <div className="absolute top-0 right-0 p-8 text-green-500/5 group-hover:scale-110 transition-transform">
              <LinkIcon className="h-40 w-40" />
            </div>
            
            <div className="relative z-10">
              <div className="bg-green-50 p-4 rounded-2xl w-fit mb-6 text-green-600">
                <Share2 className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-black heading-font mb-4">Promotor de Links & Leads</h2>
              <p className="text-gray-500 mb-8">Transforme qualquer link de afiliado em uma página de captura profissional para gerar seus próprios leads antes de vender.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Seu Link de Afiliado</label>
                  <input 
                    placeholder="https://hotmart.com/..."
                    value={linkInput.url}
                    onChange={(e) => setLinkInput({...linkInput, url: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Nome do Produto</label>
                  <input 
                    placeholder="Ex: Método Click Money"
                    value={linkInput.name}
                    onChange={(e) => setLinkInput({...linkInput, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Principal Benefício</label>
                  <input 
                    placeholder="Ex: Ganhe R$ 100 por dia"
                    value={linkInput.benefit}
                    onChange={(e) => setLinkInput({...linkInput, benefit: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <button 
                onClick={generateBridgeLink}
                disabled={loading === 'link' || !linkInput.url || !linkInput.name}
                className="w-full bg-green-600 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-green-700 transition-all disabled:opacity-50 text-lg shadow-lg shadow-green-900/10"
              >
                {loading === 'link' ? <Loader2 className="animate-spin h-6 w-6" /> : <><Zap className="h-5 w-5 fill-current" /> GERAR MINHA PÁGINA DE CAPTURA</>}
              </button>

              {generatedBridgeLink && (
                <div className="mt-8 p-8 bg-green-50 rounded-[2rem] border-2 border-dashed border-green-200 animate-in fade-in zoom-in-95">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1">
                      <h4 className="text-green-900 font-black text-xl mb-2">Página Gerada com Sucesso!</h4>
                      <p className="text-green-700 text-sm mb-4">Use o link abaixo para promover. Seus leads serão capturados antes de serem enviados para o checkout.</p>
                      <div className="bg-white p-4 rounded-xl border border-green-100 flex items-center gap-3 overflow-hidden">
                        <code className="text-xs text-green-600 truncate flex-1">{generatedBridgeLink}</code>
                        <button 
                          onClick={() => { navigator.clipboard.writeText(generatedBridgeLink); alert('Link copiado!'); }}
                          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full md:w-auto">
                      <a 
                        href={generatedBridgeLink}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white text-green-600 border-2 border-green-500 px-8 py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white transition-all shadow-sm whitespace-nowrap"
                      >
                        TESTAR PÁGINA <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Affiliate Link Placement */}
        <div className="mt-20 max-w-4xl mx-auto bg-gray-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-10">
            <ShoppingBag className="h-60 w-60" />
          </div>
          <h2 className="text-3xl font-black heading-font mb-6">Precisa da Melhor Estrutura?</h2>
          <p className="text-lg opacity-80 mb-10">Para vender muito, você precisa de uma hospedagem rápida e profissional. Recomendamos a HostGator para sua estrutura própria.</p>
          <a 
            href={SITE_CONFIG.affiliateLinks.hospedagem} 
            className="inline-flex items-center gap-3 bg-orange-500 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/40"
          >
            VER DESCONTO EXCLUSIVO
            <ChevronRight className="h-6 w-6" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default AIHubPage;
