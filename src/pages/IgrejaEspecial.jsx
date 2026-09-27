import { Church, HandHeart, HeartHandshake, Lock, ShieldCheck, Sparkles, Users, Zap } from 'lucide-react';
import { LINKS, PRICES } from '../config.js';
import {
  CheckoutButton,
  GuaranteeSeal,
  Ornament,
  Reveal,
  useNoIndex,
  usePageMeta,
} from '../components/ui.jsx';

// O que vem no Plano Igreja Essencial (downsell). Ajuste conforme o seu produto.
const ITEMS = [
  { icon: Church, label: 'Licença para imprimir e distribuir em todo o ministério' },
  { icon: Users, label: 'Kit para células e pequenos grupos' },
  { icon: HandHeart, label: 'Kit para visitas em hospitais e asilos' },
  { icon: HeartHandshake, label: 'Kit para ações sociais e evangelismo de rua' },
];

export default function IgrejaEspecial() {
  usePageMeta('Plano Igreja Essencial — Recado do Céu');
  useNoIndex();

  return (
    <>
      <main className="section glow upsell">
        <div className="container narrow center">
          <Reveal>
            <span className="badge">
              <Sparkles size={15} aria-hidden="true" /> Espere! Uma condição especial para a sua igreja
            </span>
            <h1 className="downsell-title">
              Leve os recados para o seu ministério por <span className="gold-word">{PRICES.igrejaDownsell}</span>
            </h1>
            <p className="lead">
              Entendemos que {PRICES.igreja} pode não caber agora. Por isso, preparamos o{' '}
              <strong>Plano Igreja Essencial</strong>: a licença para usar em todo o ministério e os kits para grupos,
              visitas e ações sociais.
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

          <Reveal className="card offer">
            <h2 className="section-title">Plano Igreja Essencial</h2>
            <div className="price">
              <span className="price-from">
                Plano Igreja completo: <s>{PRICES.igreja}</s>
              </span>
              <span className="price-value">{PRICES.igrejaDownsell}</span>
              <span className="price-note">pagamento único</span>
            </div>
            <CheckoutButton href={LINKS.checkoutIgrejaDownsell} className="btn-lg">
              SIM, QUERO POR {PRICES.igrejaDownsell}
            </CheckoutButton>
            <ul className="seals">
              <li>
                <Zap size={18} strokeWidth={1.6} aria-hidden="true" /> Acesso imediato
              </li>
              <li>
                <Lock size={18} strokeWidth={1.6} aria-hidden="true" /> Pagamento seguro
              </li>
              <li>
                <ShieldCheck size={18} strokeWidth={1.6} aria-hidden="true" /> Garantia de 7 dias
              </li>
            </ul>
            <a href={LINKS.acesso} className="decline">
              Não, obrigado. Quero só acessar o que já comprei.
            </a>
          </Reveal>

          <Reveal className="downsell-guarantee">
            <Ornament type="star" />
            <GuaranteeSeal />
            <p>
              Se você abrir os arquivos e sentir que não é para a sua igreja, é só pedir o reembolso dentro de 7 dias.
              Devolvemos 100% do valor, sem perguntas.
            </p>
          </Reveal>
        </div>
      </main>

      <p className="mini-footer">© 2026 Recado do Céu</p>
    </>
  );
}
