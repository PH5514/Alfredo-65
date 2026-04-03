
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, MessageCircle, Download, Sparkles, Share2, Gift } from 'lucide-react';
import { Analytics } from '../analytics';
import { SITE_CONFIG } from '../config';

const ThankYouPage: React.FC = () => {
  useEffect(() => {
    Analytics.trackLead();
  }, []);

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.supportMessage)}`;
  
  const referralText = `Ei! Olha esse mapa gratuito que eu acabei de baixar para fazer a primeira venda como afiliado no ${SITE_CONFIG.domain}. Vale muito a pena: ${window.location.origin}/#/captura`;
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(referralText)}`;

  return (
    <div className="bg-gray-50 min-h-screen py-24 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-24 text-orange-500/5 pointer-events-none">
        <Sparkles className="h-96 w-96" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <CheckCircle className="h-12 w-12" />
        </div>
        
        <h1 className="text-4xl md:text-7xl font-black heading-font text-gray-900 mb-6 leading-tight">
          Quase Pronto! <br/><span className="text-orange-500">Seu Mapa Chegou.</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Enviamos os dados de acesso para o seu e-mail, mas você pode garantir o download do guia digital agora mesmo:
        </p>

        {/* Viral Incentive Section */}
        <div className="bg-white border-2 border-dashed border-orange-200 p-8 rounded-[2.5rem] mb-12 shadow-sm relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-orange-50 p-6 rounded-3xl text-orange-500">
               <Gift className="h-10 w-10 animate-bounce" />
            </div>
            <div className="text-left flex-1">
               <h3 className="text-xl font-black heading-font text-gray-900">BÔNUS SECRETO: Lista de Nichos Black</h3>
               <p className="text-sm text-gray-500">Compartilhe o Click Money Flow com 3 amigos no WhatsApp para desbloquear uma lista com os 10 nichos que mais pagam comissão hoje.</p>
            </div>
            <a 
              href={shareUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-orange-100 whitespace-nowrap"
            >
              <Share2 className="h-4 w-4" />
              INDICAR E GANHAR
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-20">
          <button 
            onClick={() => window.open('https://picsum.photos/1200/1600?random=download', '_blank')}
            className="bg-gray-900 text-white px-10 py-6 rounded-2xl font-black text-xl hover:bg-orange-500 transition-all shadow-2xl flex items-center gap-4 w-full md:w-auto"
          >
            <Download className="h-6 w-6" />
            BAIXAR MATERIAL (PDF)
          </button>
          
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-green-500 text-white px-10 py-6 rounded-2xl font-black text-xl hover:bg-green-600 transition-all shadow-2xl flex items-center gap-4 w-full md:w-auto"
          >
            <MessageCircle className="h-6 w-6" />
            ENTRAR NO GRUPO VIP
          </a>
        </div>

        <div className="bg-orange-500 text-white p-12 rounded-[3rem] shadow-2xl text-left border-4 border-white relative">
          <div className="max-w-xl">
            <h2 className="text-3xl font-black heading-font mb-4">OPORTUNIDADE ÚNICA:</h2>
            <p className="text-lg mb-8 opacity-90">O Mapa é apenas o primeiro passo. Se você quer o sistema completo que me faz vender todos os dias, clique no botão abaixo para ver a oferta exclusiva que preparei.</p>
            <Link 
              to="/oferta"
              className="inline-flex items-center gap-3 bg-white text-orange-500 px-8 py-4 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all"
            >
              VER MÉTODO COMPLETO
              <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
