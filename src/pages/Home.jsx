import { useRef } from 'react';
import {
  Bird,
  BookOpen,
  Briefcase,
  Cake,
  Flower2,
  HandHeart,
  Heart,
  HeartPulse,
  Star,
} from 'lucide-react';
import { PRICES } from '../config.js';
import Offers from '../components/Offers.jsx';
import Countdown from '../components/Countdown.jsx';
import { DEPOIMENTOS } from '../depoimentos.js';
import {
  AutoVideo,
  Faq,
  Footer,
  GuaranteeSection,
  Media,
  Ornament,
  Reveal,
  StickyBar,
  usePageMeta,
} from '../components/ui.jsx';

const CATEGORIES = [
  { icon: Flower2, label: 'Para quem está de luto' },
  { icon: HeartPulse, label: 'Para quem está doente' },
  { icon: Bird, label: 'Para quem está ansioso ou com medo' },
  { icon: BookOpen, label: 'Para quem se afastou de Deus' },
  { icon: HandHeart, label: 'Para agradecer' },
  { icon: Cake, label: 'Para aniversários' },
  { icon: Heart, label: 'Para casais' },
  { icon: Briefcase, label: 'Para quem está desempregado' },
  { icon: Star, label: 'Para encorajar no dia a dia' },
];

const STEPS = [
  { title: 'Escolha o recado', text: 'Pela situação da pessoa que vai receber.' },
  { title: 'Imprima', text: 'Em impressora comum, em papel sulfite ou fotográfico.' },
  { title: 'Recorte e dobre', text: 'Leva menos de 1 minuto por bilhete.' },
  { title: 'Entregue', text: 'Pessoalmente, dentro de um presente ou em um lugar especial.' },
];

const AUDIENCE = [
  'Para quem quer demonstrar carinho e fé de um jeito simples',
  'Para quem faz visitas em hospitais, asilos ou casas de família',
  'Para líderes de célula, professores de escola bíblica e ministério infantil',
  'Para quem quer presentear com algo que tem significado',
];

const FAQ = [
  {
    q: 'É produto físico?',
    a: 'Não. São arquivos em PDF que você recebe por WhatsApp e e-mail logo após o pagamento, para imprimir em casa.',
  },
  {
    q: 'Preciso de impressora colorida?',
    a: 'Não. Todos os recados têm versão em preto e branco, que fica bonita em papel comum e gasta pouca tinta.',
  },
  {
    q: 'Qual o tamanho do bilhete?',
    a: 'Cerca de 9 x 5 cm depois de dobrado, tamanho de um cartão de visita. Cabe na carteira, na Bíblia ou dentro de um presente.',
  },
  {
    q: 'Que papel devo usar?',
    a: 'Sulfite comum funciona bem. Para um acabamento mais bonito, use papel fotográfico ou couchê 180g.',
  },
  {
    q: 'Serve para católicos e evangélicos?',
    a: 'Sim. Os recados usam versículos e mensagens de fé cristã sem linguagem de denominação específica.',
  },
  {
    q: 'Posso usar na minha igreja?',
    a: 'O kit é para uso pessoal. Para uso em ministérios e grupos, temos o Plano Igreja, com licença para todo o ministério, oferecido logo após a compra do kit.',
  },
  {
    q: 'Como recebo?',
    a: 'O acesso chega no seu WhatsApp e no seu e-mail assim que o pagamento é confirmado. No Pix, é na hora.',
  },
];

// Faixa de depoimentos que desliza sem parar (pausa ao tocar ou passar o mouse).
// A lista é repetida até ter cards suficientes para preencher a tela e depois
// duplicada, para o fim emendar no começo sem "pulo".
function Testimonials() {
  const reps = Math.ceil(6 / DEPOIMENTOS.length);
  const half = Array.from({ length: reps }, () => DEPOIMENTOS).flat();
  const loop = [...half, ...half];

  return (
    <div className="marquee" role="region" aria-label="Depoimentos de clientes">
      <div className="marquee-track" style={{ '--duration': `${half.length * 7}s` }}>
        {loop.map((d, i) => {
          const copy = i >= DEPOIMENTOS.length; // cópias ficam ocultas para leitores de tela
          return (
            <figure className="print" key={i} aria-hidden={copy || undefined}>
              <img
                src={d.src}
                alt={copy ? '' : d.alt}
                loading="lazy"
                decoding="async"
                width="520"
                height="924"
                draggable="false"
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  usePageMeta(
    'Recado do Céu — Recados Bíblicos para Imprimir e Entregar',
    '300 recados bíblicos organizados por situação, prontos para imprimir em casa e entregar a quem precisa de uma palavra de fé. Acesso imediato.'
  );
  const heroRef = useRef(null);

  return (
    <>
      {/* 1 — Faixa de topo */}
      <div className="topbar">
        Material digital para imprimir em casa · Acesso imediato · Garantia de 7 dias
      </div>

      <main>
        {/* 2 — Hero */}
        <section className="hero glow" ref={heroRef}>
          <div className="container hero-grid">
            <Reveal className="hero-text">
              <p className="eyebrow">Recado do Céu</p>
              <h1>
                Tenha sempre a palavra certa para entregar a quem está sofrendo, mesmo quando você não sabe o que dizer🤎
              </h1>
              <p className="lead">
                300 recados bíblicos organizados por situação: luto, doença, ansiedade, gratidão, aniversário e muito
                mais. Você encontra o recado certo em segundos, imprime em casa e entrega hoje mesmo.
              </p>
            </Reveal>
            <Reveal className="hero-media" delay={120}>
              <Media
                src="/produto2.jpg"
                webpSrcSet="/produto2-600.webp 600w, /produto2-1000.webp 1000w"
                sizes="(min-width: 900px) 460px, 92vw"
                ratio="1 / 1"
                priority
                alt="Recados do Céu com Jesus em oração e versículos bíblicos, exibidos em dois celulares ao lado de uma Bíblia aberta e uma rosa"
              />
            </Reveal>
            <Reveal className="hero-cta" delay={200}>
              <a href="#oferta" className="btn">
                QUERO MEUS RECADOS
              </a>
              <p className="micro">A partir de {PRICES.essencial} · Pagamento único · Receba no WhatsApp e no e-mail</p>
            </Reveal>
          </div>
        </section>

        {/* 3 — Identificação */}
        <section className="section alt">
          <Reveal className="container narrow center">
            <Ornament />
            <h2 className="section-title">Você já passou por isso?</h2>
            <p>
              Uma amiga perdeu alguém querido, e você não sabia o que falar no velório. Um colega está doente, e você
              queria demonstrar que se importa, mas uma mensagem de WhatsApp parecia pouco. Um familiar se afastou de
              Deus, e toda conversa sobre fé vira discussão.
            </p>
            <p className="highlight">Às vezes, o que falta não é vontade. É a palavra certa, no momento certo.</p>
            <p>
              O Recado do Céu foi feito para esses momentos. Um bilhete pequeno, com um versículo e uma mensagem escrita
              com carinho, que a pessoa pode guardar na carteira, na geladeira ou na Bíblia, e reler sempre que
              precisar.
            </p>
          </Reveal>
        </section>

        {/* 4 — Diferencial */}
        <section className="section">
          <div className="container">
            <Reveal className="center narrow">
              <Ornament type="star" />
              <h2 className="section-title">Não é só uma pilha de versículos. É o recado certo para cada momento.</h2>
              <p className="section-sub">Cada bilhete está separado por situação, então você nunca fica procurando:</p>
            </Reveal>
            <div className="category-grid">
              {CATEGORIES.map(({ icon: Icon, label }, i) => (
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

        {/* 5 — Como funciona */}
        <section className="section alt">
          <div className="container">
            <Reveal className="center narrow">
              <Ornament />
              <h2 className="section-title">Simples como um gesto de carinho</h2>
            </Reveal>
            <ol className="timeline">
              {STEPS.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 100}>
                  <span className="step-num">{i + 1}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal className="video-wrap">
              <AutoVideo
                src="/video_recadodoceu.mp4"
                poster="/video_recadodoceu-capa.jpg"
                alt="Vídeo mostrando recados do céu impressos e recortados, montados em uma cesta de presente"
              />
              <p className="caption">Veja como é fácil montar</p>
            </Reveal>
          </div>
        </section>

        {/* 6 — Depoimentos (aparece só quando houver prints em src/depoimentos.js) */}
        {DEPOIMENTOS.length > 0 && (
          <section className="section testimonials-section">
            <div className="container">
              <Reveal className="center narrow">
                <Ornament />
                <h2 className="section-title">Recados que já chegaram ao coração de alguém</h2>
              </Reveal>
            </div>
            <Reveal>
              <Testimonials />
            </Reveal>
          </section>
        )}

        {/* 7 — Para quem é (fundo alterna conforme os depoimentos aparecem ou não) */}
        <section className={DEPOIMENTOS.length > 0 ? 'section alt' : 'section'}>
          <Reveal className="container narrow">
            <div className="center">
              <Ornament type="star" />
              <h2 className="section-title">Para quem é o Recado do Céu</h2>
            </div>
            <ul className="heart-list">
              {AUDIENCE.map((a) => (
                <li key={a}>
                  <Heart size={22} strokeWidth={1.5} aria-hidden="true" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Cronômetro da promoção (prazo em src/config.js → PROMO) */}
        <Countdown />

        {/* 8 — Ofertas */}
        <section className="section offer-section" id="oferta">
          <div className="container">
            <Reveal className="center narrow">
              <Ornament type="star" />
              <h2 className="section-title">Escolha o seu kit</h2>
              <p className="section-sub">Pagamento único, acesso imediato e garantia de 7 dias nas duas opções.</p>
            </Reveal>
            <Reveal>
              <Offers />
            </Reveal>
          </div>
        </section>

        {/* 9 — Garantia */}
        <GuaranteeSection />

        {/* 10 — FAQ */}
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

        {/* 11 — Chamada final */}
        <section className="section final glow">
          <Reveal className="container narrow center">
            <Ornament />
            <h2 className="final-title">Alguém perto de você precisa ouvir de Deus hoje.</h2>
            <p className="lead">
              Com {PRICES.essencial} você tem 300 formas de dizer isso, mesmo quando faltam palavras.
            </p>
            <a href="#oferta" className="btn">
              QUERO ENTREGAR MEU PRIMEIRO RECADO HOJE
            </a>
          </Reveal>
        </section>
      </main>

      {/* 12 — Rodapé */}
      <Footer />

      <StickyBar targetRef={heroRef} price={PRICES.essencial} label="VER OS KITS" href="#oferta" />
    </>
  );
}
