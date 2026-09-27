import { useEffect } from 'react';
import { Baby, CircleCheck, Egg, Flower2, HandHeart, Star, Users } from 'lucide-react';
import { LINKS } from '../config.js';
import { CheckoutButton, Media, Ornament, Reveal, usePageMeta } from '../components/ui.jsx';

const ITEMS = [
  { icon: Baby, label: 'Kit Infantil Ilustrado' },
  { icon: Egg, label: 'Kit de Páscoa' },
  { icon: Flower2, label: 'Kit de Dia das Mães' },
  { icon: Star, label: 'Kit de Natal' },
  { icon: HandHeart, label: '50 Cartões de Oração para quem passa por momentos difíceis' },
  { icon: Users, label: 'Kit de Evangelização para ações em grupo' },
];

export default function Obrigado() {
  usePageMeta('Pedido aprovado — Recado do Céu');

  // Página pós-compra não deve aparecer no Google
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <>
      <div className="success-bar" role="status">
        <CircleCheck size={22} strokeWidth={2} aria-hidden="true" />
        <span>Seu pedido foi aprovado! Os recados já estão a caminho do seu WhatsApp.</span>
      </div>

      <main className="section glow upsell">
        <div className="container narrow center">
          <Reveal>
            <p className="eyebrow">Antes de sair, veja isto:</p>
            <h1>Complete seu acervo por R$ 27 e tenha um recado para cada pessoa e cada data do ano</h1>
            <p className="lead">
              Você acabou de garantir 300 recados. Com o Acervo Completo, você também recebe:
            </p>
          </Reveal>

          <div className="upsell-grid">
            {ITEMS.map(({ icon: Icon, label }, i) => (
              <Reveal className="card upsell-item" key={label} delay={(i % 2) * 80}>
                <span className="icon-circle">
                  <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
                </span>
                <span>{label}</span>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Media
              label="Mockup do Acervo Completo"
              alt="Mockup do Acervo Completo Recado do Céu com os kits Infantil, Páscoa, Dia das Mães, Natal, Cartões de Oração e Evangelização"
              ratio="4 / 3"
            />
          </Reveal>

          <Reveal className="upsell-offer">
            <Ornament type="star" />
            <p>
              Comprando os kits separados, o total seria <s>R$ [SOMA REAL]</s>. Só nesta página, por ser cliente, você
              leva tudo por <strong className="gold-strong">R$ 27</strong>.
            </p>
            <CheckoutButton href={LINKS.checkoutUpsell} className="btn-lg">
              SIM, QUERO COMPLETAR MEU ACERVO
            </CheckoutButton>
            <a href={LINKS.downsell} className="decline">
              Não, obrigado. Vou ficar só com o Kit Essencial.
            </a>
          </Reveal>
        </div>
      </main>

      <p className="mini-footer">© 2026 Recado do Céu</p>
    </>
  );
}
