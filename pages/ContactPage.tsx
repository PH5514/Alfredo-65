
import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import { Analytics } from '../analytics';

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Dúvida sobre Curso',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Rastreia o contato
    Analytics.trackContact();

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: 'Dúvida sobre Curso', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
          
          {/* Info Side */}
          <div className="lg:w-2/5 bg-gray-900 text-white p-12 md:p-16 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-black heading-font mb-8">Estamos aqui para ajudar!</h1>
              <p className="text-gray-400 text-lg mb-12">Tem alguma dúvida técnica ou comercial? Nossa equipe de especialistas está pronta para te atender.</p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="bg-orange-500 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-black">Email</p>
                    <p className="text-lg font-bold">contato@clickelucre.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="bg-green-500 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-black">WhatsApp Suporte</p>
                    <p className="text-lg font-bold">+55 (11) 98765-4321</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="bg-blue-500 p-3 rounded-2xl">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-black">Atendimento</p>
                    <p className="text-lg font-bold">Digital & Global</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-800">
              <p className="text-gray-500 text-sm">Respondemos em até 24 horas úteis. Sua satisfação é nossa prioridade.</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-3/5 p-12 md:p-16 relative">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-500">
                <div className="bg-green-100 text-green-500 p-6 rounded-full">
                  <CheckCircle className="h-16 w-16" />
                </div>
                <h2 className="text-3xl font-black heading-font">Mensagem Enviada!</h2>
                <p className="text-gray-500 text-lg">Obrigado pelo contato. Em breve nossa equipe entrará em contato com você.</p>
                <button onClick={() => setStatus('idle')} className="text-orange-500 font-bold underline">Enviar outra mensagem</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-700 uppercase">Nome Completo</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
                      placeholder="Seu nome" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-700 uppercase">Seu Melhor Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
                      placeholder="email@exemplo.com" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-700 uppercase">Assunto</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none"
                  >
                    <option>Dúvida sobre Curso</option>
                    <option>Suporte ao Aluno</option>
                    <option>Parcerias & Afiliados</option>
                    <option>Outros</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-700 uppercase">Sua Mensagem</label>
                  <textarea 
                    required
                    rows={6} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
                    placeholder="Como podemos ajudar você hoje?"
                  ></textarea>
                </div>

                <button 
                  disabled={status === 'loading'}
                  type="submit"
                  className="bg-orange-500 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-100 flex items-center justify-center gap-3 w-full md:w-fit group disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      ENVIANDO...
                    </>
                  ) : (
                    <>
                      ENVIAR MENSAGEM
                      <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
