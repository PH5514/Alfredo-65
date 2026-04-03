export const SITE_CONFIG = {
  name: "Click Money Flow",
  domain: "clickmoneyflow.com",
  whatsapp: "5511999999999", // <-- ALTERE PARA SEU NÚMERO REAL AQUI
  email: "suporte@clickmoneyflow.com",
  supportMessage: "Olá! Vim pelo site oficial clickmoneyflow.com e gostaria de suporte prioritário sobre o método.",
  // Configurado para WhatsApp enquanto não tem plataforma de checkout
  get checkoutLink() {
    return `https://wa.me/${this.whatsapp}?text=Olá!%20Quero%20me%20inscrever%20no%20Click%20Money%20Flow%20e%20garantir%20minha%20vaga%20promocional.`;
  }, 
  guiaDownloadLink: "/material/guia-primeira-venda.pdf",
  youtubeVslId: "766p8v_m0_E", // Vídeo institucional de marketing digital (exemplo) 
  
  // Links de Afiliados para Ferramentas e Vitrines
  affiliateLinks: {
    copywriting: "https://pay.hotmart.com/COPY_LINK",
    trafegoPago: "https://pay.hotmart.com/TRAFEGO_LINK",
    socialMedia: "https://pay.hotmart.com/INSTA_LINK",
    rendaExtra: "https://pay.hotmart.com/RENDA_LINK",
    hospedagem: "https://www.hostgator.com.br/SITE_LINK"
  },

  // Produtos recomendados pela IA no Hub
  products: [
    { id: '1', name: 'Mestre do Ads', niche: 'Tráfego Pago', link: 'https://pay.hotmart.com/TRAFEGO_LINK', desc: 'O melhor para quem quer investir e lucrar rápido.' },
    { id: '2', name: 'Copy Turbo', niche: 'Escrita e Vendas', link: 'https://pay.hotmart.com/COPY_LINK', desc: 'Aprenda a vender qualquer coisa com palavras.' },
    { id: '3', name: 'Insta Lucrativo', niche: 'Redes Sociais', link: 'https://pay.hotmart.com/INSTA_LINK', desc: 'Venda sem aparecer usando apenas seu celular.' }
  ]
};