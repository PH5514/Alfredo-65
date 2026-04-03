
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Loader2, 
  CheckCircle2,
  Lock,
  Gift,
  Star
} from 'lucide-react';
import { Analytics } from '../analytics';

const LeadBridgePage: React.FC = () => {
  const location = useLocation();
  const [params, setParams] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const p: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      p[key] = value;
    });
    setParams(p);
    
    if (!p.dest) {
      // Se não houver destino, algo está errado
      console.warn("Nenhum destino configurado para a ponte.");
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    Analytics.trackLead();

    // Simular salvamento e redirecionamento
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        if (params.dest) {
          window.location.href = params.dest;
        }
      }, 2000);
    }, 1500);
  };

  const productName = params.p || "OFERTA EXCLUSIVA";
  const benefit = params.b || "Acesse o conteúdo VIP e comece a lucrar hoje mesmo.";

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10">
        <div className="bg-orange-500 p-8 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <Lock className="h-3 w-3" /> ACESSO RESTRITO LIBERADO
          </div>
          <h1 className="text-3xl font-black heading-font leading-tight mb-2 uppercase">
            {productName}
          </h1>
          <div className="flex items-center justify-center gap-1 text-orange-200">
            {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 fill-current" />)}
            <span className="text-[10px] font-bold ml-2">CONTEÚDO VERIFICADO</span>
          </div>
        </div>

        <div className="p-8 md:p-12">
          {!success ? (
            <>
              <div className="text-center mb-10">
                <h2 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
                  {benefit}
                </h2>
                <p className="text-gray-500 text-sm">
                  Para garantir sua segurança e liberar o acesso oficial, por favor confirme seu melhor e-mail abaixo.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input 
                    type="email"
                    required
                    placeholder="Seu melhor e-mail aqui..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-5 text-lg outline-none focus:border-orange-500 transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">
                    <Zap className="h-6 w-6" />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 text-white py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 group"
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-6 w-6" />
                  ) : (
                    <>
                      LIBERAR ACESSO AGORA
                      <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 flex flex-col gap-4 items-center justify-center text-center">
                <div className="flex items-center gap-2 text-green-600 font-bold text-xs">
                  <ShieldCheck className="h-4 w-4" />
                  SEUS DADOS ESTÃO 100% SEGUROS
                </div>
                <div className="flex items-center gap-4 opacity-30 grayscale">
                  <img src="https://logodownload.org/wp-content/uploads/2014/10/hotmart-logo-1.png" alt="Hotmart" className="h-4" referrerPolicy="no-referrer" />
                  <img src="https://logodownload.org/wp-content/uploads/2019/09/monetizze-logo.png" alt="Monetizze" className="h-4" referrerPolicy="no-referrer" />
                  <img src="https://braip.com/wp-content/uploads/2020/06/logo-braip.png" alt="Braip" className="h-4" referrerPolicy="no-referrer" />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-10 animate-in zoom-in-95 duration-500">
              <div className="bg-green-100 text-green-600 p-6 rounded-full w-fit mx-auto mb-6">
                <CheckCircle2 className="h-16 w-16" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">Acesso Liberado!</h2>
              <p className="text-gray-500 mb-8">Estamos te redirecionando para a página oficial em instantes...</p>
              <div className="flex items-center justify-center gap-2 text-orange-500 font-black animate-pulse">
                <Loader2 className="h-5 w-5 animate-spin" />
                REDIRECIONANDO...
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-6 border-t border-gray-100 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
            <Gift className="h-3 w-3" /> BÔNUS INCLUSO
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
            <Zap className="h-3 w-3" /> ENTREGA IMEDIATA
          </div>
        </div>
      </div>

      <p className="mt-8 text-gray-500 text-[10px] font-medium uppercase tracking-widest opacity-50">
        Powered by Click Money Flow Intelligence
      </p>
    </div>
  );
};

export default LeadBridgePage;
