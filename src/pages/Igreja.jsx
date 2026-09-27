import { BookOpen, Church, CircleCheck, HandHeart, HeartHandshake, Lock, ShieldCheck, Users, Zap, Baby } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LINKS, PRICES } from '../config.js';
import {
  CheckList,
  CheckoutButton,
  Faq,
  GuaranteeSection,
  Ornament,
  Reveal,
  useNoIndex,
  usePageMeta,
} from '../components/ui.jsx';

const INCLUDED = [
  'Todo o Acervo Completo Recado do Céu',
  'Licença para imprimir e distribuir em todo o ministério',
  'Artes com espaço para o nome e o logo da sua igreja',
  'Kit para células e pequenos grupos',
  'Kit para visitas em hospitais e asilos',
  'Kit para ações sociais e evangelismo de rua',
];

const IDEAL = [
  { icon: Church, label: 'Pastores' },
  { icon: Users, label: 'Líderes de célula' },
  { icon: Baby, label: 'Ministério infantil' },
  { icon: HandHeart, label: 'Grupos de oração' },
  { icon: BookOpen, label: 'Pastoral' },
  { icon: HeartHandshake, label: 'Ação social' },
];

const FAQ = [
  { q: 'Posso usar em mais de uma congregação?', a: '[DEFINIR REGRA]' },
  {
    q: 'Como coloco o nome da minha igreja?',
    a: 'Os arquivos editáveis vêm com um espaço reservado para você inserir o nome e o logo pelo Canva.',
  },
];

export default function Igreja() {
  usePageMeta(
    'Plano Igreja — Recado do Céu',
    'Recados bíblicos prontos para células, visitas, ministério infantil e ações sociais, com licença de uso para toda a sua igreja.'
  );
  useNoIndex();

  return (
    <>
      <div className="success-bar" role="status">
        <CircleCheck size={22} strokeWidth={2} aria-hidden="true" />
        <span>Seu pedido foi aprovado! Os recados já estão a caminho do seu WhatsApp.</span>
      </div>

      <main>
        <section className="hero glow">
          <Reveal className="container narrow center">
            <p className="eyebrow">Antes de sair, uma oferta para a sua igreja</p>
            <h1>Recados do Céu para todo o seu ministério</h1>
            <p className="lead">
              Material pronto para células, visitas, ministério infantil e ações sociais, com licença de uso para toda a
              sua igreja.
            </p>
            <a href="#plano" className="btn btn-outline">
              Ver o que está incluído
            </a>
          </Reveal>
        </section>

        <section className="section alt" id="plano">
          <Reveal className="container narrow">
            <div className="center">
              <Ornament />
              <h2 className="section-title">O que está incluído</h2>
            </div>
            <div className="card">
              <CheckList items={INCLUDED} />
            </div>
          </Reveal>
        </section>

        <section className="section">
          <div className="container">
            <Reveal className="center narrow">
              <Ornament type="star" />
              <h2 className="section-title">Ideal para</h2>
            </Reveal>
            <div className="category-grid">
              {IDEAL.map(({ icon: Icon, label }, i) => (
                <Reveal className="card category" key={label} delay={(i % 3) * 80}>
                  <span className="icon-circle">
                    <Icon size={26} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span>{label}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt">
          <Reveal className="container">
            <div className="card offer">
              <h2 className="section-title">Plano Igreja</h2>
              <p className="section-sub">Acervo completo + licença para todo o ministério</p>
              <div className="price">
                <span className="price-value">{PRICES.igreja}</span>
                <span className="price-note">pagamento único</span>
              </div>
              <CheckoutButton href={LINKS.checkoutIgreja} className="btn-lg">
                SIM, QUERO O PLANO IGREJA
              </CheckoutButton>
              <Link to="/igreja-especial" className="decline">
                Não, obrigado. Não quero levar para a minha igreja.
              </Link>
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
            </div>
          </Reveal>
        </section>

        <GuaranteeSection />

        <section className="section alt">
          <div className="container narrow">
            <Reveal className="center">
              <Ornament type="star" />
              <h2 className="section-title">Perguntas frequentes</h2>
            </Reveal>
            <Reveal>
              <Faq items={FAQ} />
            </Reveal>
          </div>
        </section>
      </main>

      <p className="mini-footer">© 2026 Recado do Céu</p>
    </>
  );
}
