// ============================================================
// CONFIGURAÇÕES DO SITE — troque os valores abaixo pelos seus.
// ============================================================

export const LINKS = {
  // Checkout do Kit Essencial (R$ 10) — botão "Não, obrigado" do pop-up
  checkoutKit: 'https://ggcheckout.app/checkout/v2/Rof7NXadxiy2kpcGHbmd',
  // Checkout do Acervo Completo pelo preço normal (R$ 29,90) — card "Super oferta"
  checkoutCompleto: 'https://ggcheckout.app/checkout/v2/7jZ8un6Pgyiaayvouw25',
  // Checkout do Acervo Completo com desconto (R$ 19,90) — botão principal do pop-up
  checkoutCompletoPopup: 'https://ggcheckout.app/checkout/v2/uoWg2fJzMj57ACWy94ls',
  // Checkout do Acervo Completo (R$ 27) — botão da página "/obrigado"
  checkoutUpsell: 'https://SEU-CHECKOUT.com/acervo-completo',
  // Link do "Não, obrigado" na página "/obrigado" (downsell ou página de acesso)
  downsell: 'https://SEU-SITE.com/acesso',
  // Checkout do Plano Igreja (R$ 67) — upsell na página "/igreja"
  checkoutIgreja: 'https://SEU-CHECKOUT.com/plano-igreja',
  // Checkout do downsell do Plano Igreja (R$ 39,90) — página "/igreja-especial"
  checkoutIgrejaDownsell: 'https://SEU-CHECKOUT.com/plano-igreja-essencial',
  // Para onde vai quem recusa o downsell ("Não, obrigado" em "/igreja-especial"):
  // normalmente a página/área de acesso aos arquivos que ela já comprou
  acesso: 'https://SEU-SITE.com/acesso',
};

export const PRICES = {
  essencial: 'R$ 10',
  completo: 'R$ 29,90',
  completoPopup: 'R$ 19,90',
  economiaPopup: 'R$ 10,00',
  igreja: 'R$ 67',
  igrejaDownsell: 'R$ 39,90',
  // Preço "De R$ ..." riscado no card do Acervo Completo. Deixe vazio ('') para não mostrar.
  // Use só um valor real (ex.: a soma dos kits vendidos separadamente).
  ancoraCompleto: '',
};

// Cronômetro da promoção (barra vermelha acima de "Escolha o seu kit").
// `fim`: data e hora REAIS em que a condição acaba, no horário de Brasília (-03:00).
// Quando o prazo passa, a barra some sozinha. Para uma nova promoção, é só trocar a data.
// Use só com prazo verdadeiro: depois do fim, o preço ou a condição precisam mudar de fato.
export const PROMO = {
  fim: '2026-09-27T23:59:59-03:00',
};

// Back redirect (UTMify): para onde vai quem aperta "voltar" na página de vendas ("/").
// Os parâmetros da URL (UTMs etc.) são repassados junto, como no script da UTMify.
// Deixe vazio ('') para desativar.
export const BACK_REDIRECT_URL = '';

export const CONTACT_EMAIL = 'recadodoceu@gmail.com';

// Amostra grátis: quando tiver a URL do webhook da sua ferramenta de
// e-mail/WhatsApp, cole aqui. Os dados são enviados via POST em JSON:
// { nome, whatsapp, email, origem, data }
// Enquanto estiver vazio, os dados ficam salvos apenas no navegador (localStorage).
export const LEAD_WEBHOOK_URL = '';
