# 🚀 Click Money Flow - Guia de Deploy Gratuito (clickmoneyflow.com)

Se a Netlify estiver cobrando $9/mês, é porque você está tentando usar o "Netlify DNS". **Siga estes passos para usar o Plano Gratuito:**

## 选项 A: Netlify (Sem pagar)
1. **Não use o "Netlify DNS"**: No painel, vá em `Domain Management`.
2. Adicione seu domínio `clickearn.com`.
3. Em vez de mudar os NameServers para a Netlify, use a opção **"External DNS"**.
4. Vá no seu provedor de domínio (onde você comprou o clickearn.com) e configure apenas o **Registro A** apontando para o IP da Netlify (75.2.60.5) e o **CNAME** (www) para o endereço `seu-site.netlify.app`.

## 选项 B: Vercel (Recomendado se a Netlify dificultar)
A Vercel costuma ser mais amigável para domínios `.com` no plano free.
1. Crie uma conta na [Vercel](https://vercel.com).
2. Conecte seu GitHub e importe este projeto.
3. Em `Settings > Domains`, adicione `clickearn.com`.
4. Siga as instruções de DNS que eles fornecerão (geralmente um Registro A e um CNAME).

## 🛠 Configurações Técnicas Aplicadas
- **SPA Routing**: O arquivo `_redirects` e `vercel.json` garantem que as rotas `/captura`, `/oferta`, etc., funcionem perfeitamente.
- **Environment Variables**: Lembre-se de adicionar a `API_KEY` nas configurações de ambiente da plataforma escolhida.

---
*Configurado para máxima performance e custo zero de hospedagem.*