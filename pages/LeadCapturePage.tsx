
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Added missing Loader2 import
import { CheckCircle, Lock, Mail, MessageSquare, ArrowRight, Loader2 } from 'lucide-react';
import { Analytics } from '../analytics';
import { SITE_CONFIG } from '../config';

const LeadCapturePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    Analytics.trackLead();

    // Simula salvamento e redireciona para a página de obrigado que contém o material
    setTimeout(() => {
      setLoading(false);
      navigate('/obrigado');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-8">
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
            Acesso Restrito: Liberação Gratuita
          </div>
          <h1 className="text-4xl md:text-6xl font-black heading-font leading-tight text-gray-900">
            Baixe o Mapa da <span className="text-orange-500 underline">Primeira Venda</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Descubra o passo a passo exato para sair do zero e começar a lucrar como afiliado ainda hoje.
          </p>
          
          <ul className="space-y-4">
            {["Estratégia 3 Passos", "Nichos Lucrativos 2024", "Anúncios Inbloqueáveis"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-bold">
                <CheckCircle className="text-green-500 h-6 w-6" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black heading-font">Libere seu Acesso</h3>
            <p className="text-gray-500">Insira seus dados para receber o PDF exclusivo.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input 
                  required
                  type="email" 
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input 
                  required
                  type="tel" 
                  placeholder="Seu WhatsApp"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black text-xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 flex items-center justify-center gap-2 group"
            >
              {/* Fix: Loader2 is now imported above */}
              {loading ? <Loader2 className="animate-spin h-6 w-6" /> : (
                <>
                  RECEBER MATERIAL AGORA
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-[10px] text-gray-400 text-center uppercase font-bold">
              <Lock className="inline h-3 w-3 mr-1" /> Seus dados estão 100% seguros conosco.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadCapturePage;
