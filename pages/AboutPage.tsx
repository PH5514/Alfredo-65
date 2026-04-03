
import React from 'react';
import { Target, Users, TrendingUp, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black heading-font text-gray-900 mb-12 text-center">Nós Vivemos de <span className="text-orange-500">Resultados.</span></h1>
            
            <div className="aspect-video rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
              <img src="https://picsum.photos/1200/600?random=30" alt="Team" className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-xl mx-auto text-gray-600 leading-relaxed space-y-8 font-medium">
              <p>
                O <span className="text-gray-900 font-black">Click Money Flow</span> nasceu de uma frustração comum: a overdose de informação sem aplicação prática que permeia o mercado de afiliados.
              </p>
              <p>
                Nossa missão é simplificar o complexo. Acreditamos que o marketing digital não precisa ser uma caixa preta de algoritmos e segredos obscuros. É, acima de tudo, sobre pessoas, processos e valor.
              </p>
              <p>
                Ao longo dos últimos 5 anos, ajudamos milhares de pessoas a realizarem suas primeiras vendas e, mais importante, a transformarem essas vendas em um fluxo de renda previsível e escalável.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ValueCard icon={<Target className="text-orange-500" />} title="Foco no Lucro" desc="Não ensinamos métricas de vaidade. Ensinamos o que coloca dinheiro no seu bolso." />
            <ValueCard icon={<Users className="text-blue-500" />} title="Comunidade" desc="Sozinho você vai rápido, mas juntos vamos muito mais longe." />
            <ValueCard icon={<TrendingUp className="text-green-500" />} title="Escala" desc="Construímos sistemas que crescem com você." />
            <ValueCard icon={<Heart className="text-red-500" />} title="Transparência" desc="Mostramos a realidade do mercado, sem filtros e sem promessas falsas." />
          </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <img src="https://picsum.photos/100/100?random=31" className="w-24 h-24 rounded-full mx-auto border-4 border-orange-500 p-1" />
          </div>
          <blockquote className="text-3xl font-black heading-font text-gray-900 italic mb-8">
            "A liberdade não é sobre não ter um chefe, é sobre ser dono do seu próprio destino financeiro."
          </blockquote>
          <p className="font-bold text-gray-500 uppercase tracking-widest text-sm">— Fundador, Click Money Flow</p>
        </div>
      </section>
    </div>
  );
};

const ValueCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 text-center hover:shadow-xl transition-all">
    <div className="mb-6 flex justify-center">{icon}</div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default AboutPage;
