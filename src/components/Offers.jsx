import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Crown, Gift, Sparkles, Sprout, X } from 'lucide-react';
import { LINKS, PRICES } from '../config.js';
import { CheckList, CheckoutButton, Media } from './ui.jsx';

// Imagem do Acervo Completo (original em public/recadodoceu_acervo.png;
// as versões .webp e .jpg são cópias otimizadas para carregar rápido no celular)
const ACERVO_IMG = {
  src: '/recadodoceu_acervo.jpg',
  webpSrcSet: '/recadodoceu_acervo-700.webp 700w, /recadodoceu_acervo.webp 1200w',
  ratio: '1535 / 1024',
  alt: 'Super Kit Completo Recado do Céu: bilhetes com mensagens de fé impressos, modelos 3D, cartões e os 5 bônus exclusivos',
};

const ESSENCIAL = [
  '300 Recados do Céu separados por situação',
  'Versões coloridas e em preto e branco',
  'Tamanho que cabe na carteira',
  'Guia rápido de impressão e montagem',
  'Acesso imediato',
];

const COMPLETO = [
  '300 Recados do Céu separados por situação',
  '+ 6 kits extras para cada pessoa e cada data do ano',
  'Versões coloridas e em preto e branco',
  'Guia rápido de impressão e montagem',
  'Acesso imediato',
  'Imprima quantas vezes quiser',
];

const BONUS = [
  { title: 'Kit Infantil Ilustrado', text: 'Mensagens de fé pensadas para crianças.' },
  { title: 'Kit de Páscoa', text: 'Recados para celebrar a ressurreição com quem você ama.' },
  { title: 'Kit de Dia das Mães', text: 'Para homenagear mães, avós e madrinhas.' },
  { title: 'Kit de Natal', text: 'Para entregar junto com presentes e na ceia.' },
  { title: '50 Cartões de Oração', text: 'Para quem está passando por momentos difíceis.' },
  { title: 'Kit de Evangelização', text: 'Para ações em grupo, células e igrejas.' },
];

function UpsellModal({ open, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Clicar fora do pop-up fecha
  const onBackdrop = (e) => {
    if (e.target === ref.current) onClose();
  };

  return (
    <dialog ref={ref} className="upsell-modal" onClose={onClose} onClick={onBackdrop} aria-labelledby="upsell-title">
      <div className="modal-body">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar">
          <X size={22} />
        </button>

        <span className="badge">
          <Sparkles size={15} aria-hidden="true" /> Espere! Condição especial liberada
        </span>

        <h2 id="upsell-title" className="modal-title">
          Leve o <Crown className="inline-crown" size={26} strokeWidth={1.6} aria-hidden="true" /> Acervo Completo por{' '}
          <span className="gold-word">{PRICES.completoPopup}</span>
        </h2>
        <p className="modal-text">
          Com o kit de {PRICES.essencial} você leva 300 recados. Só nesta página, você pode levar o{' '}
          <strong>Acervo Completo: 300 recados + 6 kits extras</strong> por apenas {PRICES.economiaPopup} de diferença.
        </p>

        <Media {...ACERVO_IMG} sizes="(min-width: 480px) 420px, 88vw" />

        <div className="modal-price">
          <s>{PRICES.completo}</s>
          <strong>{PRICES.completoPopup}</strong>
          <span className="save-pill">Economize {PRICES.economiaPopup}</span>
        </div>

        <CheckList
          items={['300 Recados do Céu separados por situação', ...BONUS.map((b) => b.title)]}
        />

        <div className="seed-box">
          <Sprout size={20} strokeWidth={1.6} aria-hidden="true" />
          <p>
            Cada recado é uma semente. Com o Kit Essencial você alcança algumas pessoas. Com o{' '}
            <strong>Acervo Completo</strong>, você tem um recado para cada pessoa e cada data do ano: sua família, sua
            igreja e quem precisa ouvir de Deus hoje.
          </p>
        </div>

        <CheckoutButton href={LINKS.checkoutCompletoPopup} className="btn-lg modal-cta">
          SIM! QUERO O ACERVO COMPLETO POR {PRICES.completoPopup}
        </CheckoutButton>
        <p className="micro center">Condição especial disponível só nesta página · Acesso imediato · Garantia de 7 dias</p>

        <a href={LINKS.checkoutKit} target="_blank" rel="noopener noreferrer" className="decline" onClick={onClose}>
          Não, obrigado. Quero continuar com a opção de {PRICES.essencial}.
        </a>
      </div>
    </dialog>
  );
}

export default function Offers() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="offers">
      {/* Oferta básica */}
      <div className="card plan plan-basic">
        <h3 className="plan-title">Kit Essencial</h3>
        <p className="plan-sub">Para começar a espalhar a Palavra.</p>
        <CheckList items={ESSENCIAL} />
        <div className="plan-price">
          <span className="price-value">{PRICES.essencial}</span>
          <span className="price-note">pagamento único</span>
        </div>
        <button type="button" className="btn" onClick={() => setModalOpen(true)}>
          QUERO O KIT ESSENCIAL
        </button>
        <a href="#acervo" className="btn-soft">
          Temos uma oferta mais completa abaixo <ArrowDown size={18} aria-hidden="true" />
        </a>
      </div>

      {/* Oferta completa */}
      <div className="card plan plan-full" id="acervo">
        <span className="badge badge-top">
          <Sparkles size={15} aria-hidden="true" /> Super oferta
        </span>
        <h3 className="plan-title">
          <Crown size={24} strokeWidth={1.6} aria-hidden="true" /> Acervo Completo Recado do Céu
        </h3>
        <p className="plan-sub">O pacote mais completo para quem quer levar fé, esperança e carinho em todos os momentos.</p>

        <Media {...ACERVO_IMG} sizes="(min-width: 960px) 560px, 92vw" />

        <CheckList items={COMPLETO} />

        <div className="bonus-box">
          <p className="bonus-head">
            <Gift size={17} aria-hidden="true" /> 6 kits extras do Acervo Completo
          </p>
          <ul>
            {BONUS.map((b, i) => (
              <li key={b.title}>
                <strong>
                  Bônus {i + 1} — {b.title}
                </strong>
                <span>{b.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="plan-price plan-price-full">
          <span className="price-kicker">Tudo isso no Acervo Completo</span>
          {PRICES.ancoraCompleto && (
            <span className="price-from">
              De <s>{PRICES.ancoraCompleto}</s>
            </span>
          )}
          <span className="price-kicker small">por apenas</span>
          <span className="price-value">{PRICES.completo}</span>
          <span className="price-note">pagamento único</span>
        </div>

        <CheckoutButton href={LINKS.checkoutCompleto} className="btn-lg">
          QUERO O ACERVO COMPLETO POR {PRICES.completo}
        </CheckoutButton>
        <p className="micro center">Acesso imediato · Pagamento único · Garantia de 7 dias</p>
      </div>

      <UpsellModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
