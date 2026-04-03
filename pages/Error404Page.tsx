import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, Rocket } from 'lucide-react';

const Error404Page: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="bg-orange-100 text-orange-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertCircle className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-black heading-font text-gray-900 mb-4">Ops! Essa página <span className="text-orange-500">sumiu</span>.</h1>
        <p className="text-gray-600 mb-12 leading-relaxed font-medium">
          Mas não deixe isso te parar. Você pode voltar para o início ou aproveitar para liberar o seu mapa da primeira venda agora mesmo.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-500 transition-all"
          >
            Voltar ao Início
          </Link>
          <Link 
            to="/captura" 
            className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-lg shadow-orange-100"
          >
            Liberar Mapa Grátis <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404Page;