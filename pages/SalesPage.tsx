
import React, { useEffect, useState } from 'react';
import { 
  CheckCircle, 
  Play, 
  Timer, 
  ArrowRight, 
  ShieldCheck, 
  Lock,
  Star,
  Image as ImageIcon
} from 'lucide-react';
import { Analytics } from '../analytics';
import { SITE_CONFIG } from '../config';

const SalesPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [videoStarted, setVideoStarted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEnroll = () => {
    Analytics.trackInitiateCheckout(297.00);
    window.location.href = SITE_CONFIG.checkoutLink;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-orange-600 text-white text-center py-3 text-sm font-bold flex items-center justify-center gap-4 sticky top-0 z-50 shadow-lg">
        <Timer className="h-4 w-4 animate-pulse" />
        <span className="uppercase tracking-wider font-black">A oferta expira em: {formatTime(timeLeft)}</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black heading-font text-gray-900 leading-tight mb-8">
            O Sistema de <span className="text-orange-500">Alta Conversão</span> para Afiliados
          </h1>
          
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border-[8px] border-white group mb-12">
            {!videoStarted ? (
              <div 
                className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://picsum.photos/1200/675?random=50')` }}
                onClick={() => setVideoStarted(true)}
              >
                <div className="bg-orange-500 text-white p-8 rounded-full shadow-2xl transform group-hover:scale-110 transition-all duration-500">
                  <Play className="h-12 w-12 fill-current" />
                </div>
                <p className="mt-6 text-white font-black text-xl animate-pulse">CLIQUE PARA ASSISTIR À REVELAÇÃO</p>
              </div>
            ) : (
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${SITE_CONFIG.youtubeVslId}?autoplay=1&rel=0`}
                title="Vídeo de Vendas"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border-4 border-orange-500 text-center mb-24">
           <h2 className="text-4xl font-black heading-font mb-4">FAÇA SUA INSCRIÇÃO AGORA</h2>
           <p className="text-gray-500 font-bold mb-8 italic">Preço promocional de lançamento disponível apenas hoje.</p>
           
           <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
              <div className="text-center">
                <p className="text-gray-400 line-through text-xl">De R$ 997,00</p>
                <p className="text-6xl font-black text-gray-900">12x R$ 29,70</p>
                <p className="text-orange-500 font-bold text-lg">ou R$ 297,00 à vista no PIX</p>
              </div>
              <button 
                onClick={handleEnroll}
                className="bg-green-500 text-white px-12 py-8 rounded-3xl font-black text-2xl hover:bg-green-600 transition-all shadow-xl animate-pulse-orange flex items-center gap-3"
              >
                QUERO ME INSCREVER
                <ArrowRight className="h-8 w-8" />
              </button>
           </div>
           
           <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
              <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-green-500" /> Garantia de 7 Dias</span>
              <span className="flex items-center gap-2"><Lock className="h-5 w-5 text-blue-500" /> Site Seguro</span>
              <span className="flex items-center gap-2"><Star className="h-5 w-5 text-orange-500 fill-current" /> Acesso Imediato</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
