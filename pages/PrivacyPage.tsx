
import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-white py-24 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-black heading-font mb-12">Política de Privacidade</h1>
        
        <div className="prose prose-lg text-gray-600 space-y-8 font-medium">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Coleta de Informações</h2>
            <p>Coletamos informações quando você se cadastra em nosso site, entra em sua conta, faz uma compra, participa de um concurso e/ou quando sai de sua conta. As informações coletadas incluem o seu nome, endereço de e-mail, número de telefone e/ou cartão de crédito.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Uso das Informações</h2>
            <p>Qualquer informação que coletamos de você pode ser usada para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personalizar sua experiência e responder às suas necessidades individuais</li>
              <li>Fornecer conteúdo publicitário personalizado</li>
              <li>Melhorar o nosso site</li>
              <li>Melhorar o atendimento ao cliente e suas necessidades de suporte</li>
              <li>Entrar em contato por e-mail</li>
              <li>Administrar um concurso, promoção ou pesquisa</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Divulgação a Terceiros</h2>
            <p>Nós não vendemos, trocamos ou transferimos para terceiros as suas informações pessoalmente identificáveis. Isso não inclui terceiros confiáveis que nos auxiliam a operar o nosso site ou conduzir nossos negócios, desde que essas partes concordem em manter essas informações confidenciais.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Proteção de Informações</h2>
            <p>Implementamos uma variedade de medidas de segurança para manter a segurança de suas informações pessoais. Usamos criptografia de ponta para proteger informações confidenciais transmitidas online.</p>
          </section>

          <section className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
            <h2 className="text-2xl font-bold text-orange-900 mb-4">Consentimento</h2>
            <p className="text-orange-800">Ao utilizar o nosso site, você concorda com a nossa política de privacidade.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
