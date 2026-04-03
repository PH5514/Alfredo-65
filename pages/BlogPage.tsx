
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';

const BlogPage: React.FC = () => {
  const posts = [
    {
      id: '1',
      title: '5 Gatilhos Mentais que Dobram Suas Vendas no WhatsApp',
      excerpt: 'Descubra como usar a persuasão de forma ética para converter leads em clientes fiéis em poucos minutos de conversa.',
      date: '12 Out, 2024',
      author: 'Estratégia Click Money Flow',
      category: 'Copywriting',
      imageUrl: 'https://picsum.photos/600/400?random=11'
    },
    {
      id: '2',
      title: 'Tráfego Pago para Afiliados: Google Ads vs Meta Ads',
      excerpt: 'Qual plataforma escolher para começar? Analisamos os prós e contras de cada uma para quem está iniciando no mercado.',
      date: '10 Out, 2024',
      author: 'Felipe Mello',
      category: 'Tráfego',
      imageUrl: 'https://picsum.photos/600/400?random=12'
    },
    {
      id: '3',
      title: 'Como Vender Sem Aparecer no Instagram em 2024',
      excerpt: 'Aprenda a criar perfis de nicho lucrativos que geram vendas recorrentes sem a necessidade de expor sua imagem.',
      date: '08 Out, 2024',
      author: 'Juliana Costa',
      category: 'Orgânico',
      imageUrl: 'https://picsum.photos/600/400?random=13'
    },
    {
      id: '4',
      title: 'O Guia Definitivo da Primeira Venda na Hotmart',
      excerpt: 'Um checklist completo de tudo o que você precisa configurar para que as notificações de venda comecem a chegar.',
      date: '05 Out, 2024',
      author: 'Equipe de Suporte',
      category: 'Iniciantes',
      imageUrl: 'https://picsum.photos/600/400?random=14'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
          <div>
            <h1 className="text-4xl md:text-5xl font-black heading-font text-gray-900 mb-4">Blog da Lucratividade</h1>
            <p className="text-gray-500 max-w-lg">Sua dose semanal de estratégias, hacks e notícias do mundo do marketing digital.</p>
          </div>
          
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Pesquisar artigos..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {['Todos', 'Copywriting', 'Tráfego Pago', 'Tráfego Orgânico', 'Iniciantes', 'Mentalidade'].map((cat) => (
            <button key={cat} className="px-6 py-2 rounded-full bg-white border border-gray-100 text-sm font-bold text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-4 text-xs font-bold text-orange-500 mb-4 uppercase tracking-widest">
                  <span className="bg-orange-50 px-3 py-1 rounded-full">{post.category}</span>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-black heading-font text-gray-900 mb-4 group-hover:text-orange-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    <span className="text-sm font-medium text-gray-700">{post.author}</span>
                  </div>
                  <Link to="/captura" className="text-orange-500 font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
                    Ler Mais <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-20">
          <button className="bg-white border-2 border-orange-500 text-orange-500 px-10 py-4 rounded-2xl font-black hover:bg-orange-500 hover:text-white transition-all shadow-lg shadow-orange-50">
            CARREGAR MAIS ARTIGOS
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
