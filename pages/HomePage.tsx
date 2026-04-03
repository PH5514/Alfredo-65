import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowRight, 
  Rocket, 
  ShieldCheck, 
  Target, 
  Users, 
  CheckCircle,
  Star,
  Play,
  Calculator,
  Coins,
  TrendingUp,
  Info,
  Zap,
  Tag,
  Lock,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Quote
} from 'lucide-react';
import { Analytics } from '../analytics';
import { SITE_CONFIG } from '../config';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    { q: "Preciso de computador para começar?", a: "Não! 90% dos nossos alunos utilizam apenas o celular para gerenciar suas vendas e campanhas." },
    { q: "Quanto tempo demora para ter resultados?", a: "Isso depende da sua aplicação, mas temos alunos que realizaram a primeira venda nas primeiras 48 horas após aplicar o método." },
    { q: "Preciso aparecer nos vídeos?", a: "Absolutamente não. Ensinamos estratégias de tráfego pago e perfis de nicho onde você lucra sem nunca mostrar o rosto." },
    { q: "O curso tem garantia?", a: "Sim, você tem 7 dias de garantia incondicional. Se não gostar, devolvemos 100% do seu dinheiro via plataforma oficial." }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-black heading-font text-center mb-16 text-gray-900">Perguntas <span className="text-orange-500">Frequentes</span></h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-3xl overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-lg text-gray-900">{faq.q}</span>
                {openIndex === i ? <ChevronUp className="text-orange-500" /> : <ChevronDown className="text-gray-400" />}
              </button>
              {openIndex === i && (
                <div className="p-6 pt-0 text-gray-600 leading-relaxed bg-gray-50/50 animate-in slide-in-from-top-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    { name: "Ana Silva", role: "Aluna há 2 meses", text: "Minha vida mudou depois que aprendi a estruturar minhas campanhas no Click Money Flow. Ontem bati R$ 500 em comissões!", rating: 5, img: "https://i.pravatar.cc/150?u=ana" },
    { name: "Lucas Ferreira", role: "Iniciante", text: "Fiz minha primeira venda em menos de 1 semana. O suporte via WhatsApp é sensacional.", rating: 5, img: "https://i.pravatar.cc/150?u=lucas" },
    { name: "Carla Souza", role: "Afiliada Profissional", text: "Já fiz outros cursos, mas a clareza deste método é o que realmente faz a diferença na escala.", rating: 5, img: "https://i.pravatar.cc/150?u=carla" }
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-black heading-font text-center mb-16">O que dizem nossos <span className="text-orange-500">Alunos</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 relative group">
              <Quote className="absolute top-8 right-8 h-12 w-12 text-orange-500/10" />
              <div className="flex items-center gap-4 mb-6">
                <img src={t.img} className="w-14 h-14 rounded-full border-2 border-orange-100" />
                <div>
                  <h4 className="font-black text-gray-900">{t.name}</h4>
                  <p className="text-xs text-orange-500 font-bold uppercase">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex text-yellow-400">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PersonalizedBanner = () => {
  const [source, setSource] = useState<string | null>(null);
  
  useEffect(() => {
    const utms = Analytics.getUTMs();
    if (utms.source) {
      setSource(utms.source.toLowerCase());
    }
  }, []);

  if (!source) return (
    <div className="bg-gray-900 text-white py-2 px-4 text-center text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
      <Lock className="h-3 w-3 text-orange-500" />
      Conexão Segura Oficial: {SITE_CONFIG.domain}
    </div>
  );

  const messages: Record<string, string> = {
    facebook: "Vindo do Facebook? Temos um bônus exclusivo para você hoje!",
    google: "Vimos que você nos achou no Google. Aproveite o guia gratuito!",
    instagram: "Bem-vindo, seguidor do Instagram! O conteúdo que você procurava está aqui.",
    whatsapp: "Acesso direto via WhatsApp liberado. Comece agora!"
  };

  const message = messages[source] || `Oferta exclusiva para você que chegou via ${source}!`;

  return (
    <div className="bg-orange-500 text-white py-2 px-4 text-center text-sm font-bold flex items-center justify-center gap-2 animate-in slide-in-from-top duration-500">
      <Info className="h-4 w-4" />
      {message}
    </div>
  );
};

const ProfitCalculator = () => {
  const [investment, setInvestment] = useState(500);
  const conversionRate = 0.05;
  const avgCommission = 150;
  
  const estimatedSales = Math.floor((investment / 1) * conversionRate);
  const estimatedProfit = (estimatedSales * avgCommission) - investment;

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row max-w-5xl mx-auto my-24">
      <div className="p-10 md:p-16 bg-gray-900 text-white md:w-1/2">
        <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-500 px-4 py-1.5 rounded-full text-xs font-black uppercase mb-8">
          <Calculator className="h-4 w-4" />
          Simulador de Ganhos
        </div>
        <h2 className="text-3xl font-black heading-font mb-6 leading-tight">Quanto você quer <span className="text-orange-500">lucrar</span>?</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">Arraste o botão para simular seu investimento inicial em tráfego pago e veja o potencial de retorno como afiliado profissional.</p>
        
        <div className="space-y-6">
          <div className="flex justify-between font-bold">
            <span className="text-sm uppercase text-gray-500">Investimento Mensal</span>
            <span className="text-orange-500">R$ {investment.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="100" 
            max="10000" 
            step="100" 
            value={investment} 
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>
      </div>
      
      <div className="p-10 md:p-16 bg-white md:w-1/2 flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-8 mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-orange-50 p-4 rounded-2xl text-orange-500">
              <TrendingUp className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Lucro Estimado</p>
              <p className="text-4xl font-black text-gray-900">R$ {estimatedProfit.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 opacity-50">
            <div className="bg-blue-50 p-4 rounded-2xl text-blue-500">
              <Coins className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Vendas Estimadas</p>
              <p className="text-xl font-bold text-gray-900">{estimatedSales} vendas/mês</p>
            </div>
          </div>
        </div>
        
        <Link 
          to="/captura" 
          onClick={() => Analytics.trackButtonClick('Simulador - Quero esse Resultado')}
          className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black text-xl hover:bg-orange-600 transition-all text-center shadow-xl shadow-orange-100 flex items-center justify-center gap-2 group"
        >
          QUERO ESSE RESULTADO
          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

const FeaturedOffers = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black heading-font text-gray-900 mb-4">Ofertas <span className="text-orange-500">Exclusivas</span></h2>
            <p className="text-gray-500 font-medium">Produtos recomendados pela nossa curadoria para você acelerar seus lucros digitais.</p>
          </div>
          <Link to="/produtos" className="text-orange-500 font-black uppercase text-sm flex items-center gap-2 hover:translate-x-1 transition-transform">
            Ver Todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <OfferCard 
            title="Mestre do Ads" 
            price="R$ 197,00" 
            badge="POPULAR" 
            link={SITE_CONFIG.affiliateLinks.trafegoPago}
            img="https://picsum.photos/400/300?random=81"
          />
          <OfferCard 
            title="Copywriting Pro" 
            price="R$ 97,00" 
            badge="ESSENCIAL" 
            link={SITE_CONFIG.affiliateLinks.copywriting}
            img="https://picsum.photos/400/300?random=82"
          />
          <OfferCard 
            title="InstaLucro" 
            price="R$ 147,00" 
            badge="VIRAL" 
            link={SITE_CONFIG.affiliateLinks.socialMedia}
            img="https://picsum.photos/400/300?random=83"
          />
        </div>
      </div>
    </section>
  );
};

const OfferCard = ({ title, price, badge, link, img }: any) => (
  <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all group">
    <div className="relative aspect-video overflow-hidden">
      <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <span className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{badge}</span>
    </div>
    <div className="p-8">
      <h3 className="text-2xl font-black heading-font text-gray-900 mb-2">{title}</h3>
      <p className="text-orange-500 font-black text-xl mb-6">{price}</p>
      <a 
        href={link} 
        target="_blank" 
        rel="noreferrer"
        className="block w-full text-center bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-orange-500 transition-colors"
      >
        Acessar Oferta
      </a>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <PersonalizedBanner />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-orange-50 blur-3xl opacity-50"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold mb-8 animate-bounce">
              <Star className="h-4 w-4 fill-current" />
              <span>Plataforma Oficial Click Money Flow</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black heading-font tracking-tight text-gray-900 mb-8 leading-tight">
              Transforme Cliques em <span className="text-orange-500">Lucros Reais</span> Todos os Dias
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Descubra como construir um negócio digital sólido como afiliado em <span className="font-black text-gray-900">{SITE_CONFIG.domain}</span>. Sem segredos, apenas resultados validados.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/ia-hub" 
                onClick={() => Analytics.trackButtonClick('Hero - Usar IA')}
                className="w-full sm:w-auto bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-orange-500 transition-all shadow-xl flex items-center justify-center group"
              >
                <Zap className="h-5 w-5 mr-2" />
                USAR FERRAMENTAS IA
              </Link>
              <Link 
                to="/captura" 
                onClick={() => Analytics.trackButtonClick('Hero - Começar Agora')}
                className="w-full sm:w-auto bg-orange-500 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 flex items-center justify-center group"
              >
                QUERO COMEÇAR AGORA
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <FeaturedOffers />

      {/* Social Proof Bar */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 font-medium mb-8 text-sm uppercase tracking-widest">Plataformas que Utilizamos</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="text-3xl font-black text-gray-800">HOTMART</div>
            <div className="text-3xl font-black text-gray-800">EDUZZ</div>
            <div className="text-3xl font-black text-gray-800">KIWIFY</div>
            <div className="text-3xl font-black text-gray-800">BRAIP</div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black heading-font mb-4">Por que o Click Money Flow?</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Nós não ensinamos apenas teorias. Mostramos o campo de batalha para quem quer lucrar de verdade.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<Rocket className="h-8 w-8 text-orange-500" />}
              title="Escalabilidade Rápida"
              description="Aprenda a escalar suas campanhas e multiplicar seus ganhos de forma previsível e segura."
            />
            <BenefitCard 
              icon={<Target className="h-8 w-8 text-blue-500" />}
              title="Tráfego Qualificado"
              description="O segredo está em quem vê sua oferta. Te ensinamos a atrair compradores, não curiosos."
            />
            <BenefitCard 
              icon={<ShieldCheck className="h-8 w-8 text-green-500" />}
              title="Estratégias Validadas"
              description="Métodos testados por grandes nomes do mercado para garantir que você não perca dinheiro."
            />
          </div>
        </div>
      </section>

      <FAQSection />

      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <ProfitCalculator />
        </div>
      </section>

      <section className="py-24 bg-orange-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Rocket className="h-96 w-96 text-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black heading-font mb-6 leading-tight">
            Pare de apenas olhar. Comece a lucrar!
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Junte-se a mais de 5.000 alunos que já transformaram seus celulares em máquinas de vendas online através do {SITE_CONFIG.domain}.
          </p>
          <Link 
            to="/captura" 
            onClick={() => Analytics.trackButtonClick('CTA Final - Garantir Vaga')}
            className="bg-white text-orange-600 px-12 py-5 rounded-full font-black text-xl hover:bg-gray-100 transition-all shadow-2xl flex items-center justify-center mx-auto w-fit"
          >
            GARANTIR MINHA VAGA AGORA
          </Link>
        </div>
      </section>
    </div>
  );
};

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-gray-50 p-8 rounded-3xl hover:shadow-xl transition-all border border-gray-100 group">
    <div className="bg-white p-4 rounded-2xl w-fit mb-6 shadow-sm group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-black heading-font mb-4 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default HomePage;