
import React, { useState } from 'react';
import { Star, ShoppingCart, ExternalLink, ShieldCheck, Filter, Search } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  
  const products = [
    {
      id: 'p1',
      name: 'Curso Mestre do Tráfego',
      category: 'Digital',
      rating: 4.9,
      reviews: 1243,
      price: 'R$ 497,00',
      description: 'A bíblia do tráfego pago para quem quer escalar operações de afiliados com lucro real.',
      imageUrl: 'https://picsum.photos/400/500?random=21',
      badge: 'Bestseller'
    },
    {
      id: 'p2',
      name: 'Copywriting Sem Mistérios',
      category: 'Digital',
      rating: 4.8,
      reviews: 856,
      price: 'R$ 297,00',
      description: 'Scripts prontos e modelos mentais para criar textos que vendem qualquer produto.',
      imageUrl: 'https://picsum.photos/400/500?random=22',
      badge: 'Recomendado'
    },
    {
      id: 'p3',
      name: 'Kit Afiliado Profissional',
      category: 'Físico',
      rating: 4.7,
      reviews: 432,
      price: 'R$ 159,00',
      description: 'Equipamentos essenciais para quem grava conteúdo: Ring Light, Microfone e Tripé.',
      imageUrl: 'https://picsum.photos/400/500?random=23',
      badge: 'Físico'
    },
    {
      id: 'p4',
      name: 'Planilha Gestão de ROI',
      category: 'Ferramenta',
      rating: 5.0,
      reviews: 210,
      price: 'GRÁTIS',
      description: 'Controle seus gastos e lucros de forma profissional e automatizada.',
      imageUrl: 'https://picsum.photos/400/500?random=24',
      badge: 'Free'
    }
  ];

  const categories = ['Todos', 'Digital', 'Físico', 'Ferramenta'];
  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black heading-font mb-6">Nossas Recomendações</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Produtos que usamos e validamos. Aqui você encontra apenas o que realmente funciona no campo de batalha.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            <Filter className="h-5 w-5 text-gray-400 hidden md:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-100' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              placeholder="Buscar produto..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-gray-50 rounded-[2.5rem] overflow-hidden flex flex-col h-full hover:shadow-2xl hover:shadow-orange-100 transition-all border border-gray-100 relative group animate-in fade-in zoom-in-95 duration-500">
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-white text-gray-900 px-4 py-1.5 rounded-full text-xs font-black shadow-sm uppercase tracking-widest border border-gray-100">
                  {product.badge}
                </span>
              </div>
              
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-orange-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                </div>

                <h3 className="text-xl font-black heading-font text-gray-900 mb-2 leading-tight">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-2xl font-black text-orange-500">{product.price}</span>
                    {product.price !== 'GRÁTIS' && <span className="text-xs text-gray-400">à vista</span>}
                  </div>

                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-500 transition-all group"
                  >
                    Ver Detalhes
                    <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado nesta categoria.</p>
            <button onClick={() => setActiveCategory('Todos')} className="text-orange-500 font-bold mt-4 underline">Ver todos os produtos</button>
          </div>
        )}

        <div className="mt-24 p-12 bg-blue-600 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <ShieldCheck className="h-40 w-40" />
          </div>
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-3xl font-black heading-font mb-4">Compra 100% Segura</h2>
            <p className="text-lg opacity-90">Todos os links de afiliados nesta página direcionam para plataformas oficiais e seguras com garantia incondicional de satisfação.</p>
          </div>
          <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all shadow-xl relative z-10 whitespace-nowrap">
            Falar com Suporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
