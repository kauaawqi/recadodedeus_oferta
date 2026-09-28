import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, Image as ImageIcon, Play, ShieldCheck } from 'lucide-react';
import { CONTACT_EMAIL } from '../config.js';

/* ---------- Título e descrição por página ---------- */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}

/* ---------- Páginas pós-compra (upsell/downsell) fora do Google ---------- */
export function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
}

/* ---------- Back redirect (UTMify) ----------
   Mesmo comportamento do script da UTMify: cria entradas extras no histórico e,
   quando a pessoa aperta "voltar", manda para `url` repassando os parâmetros da
   URL atual (UTMs). O listener só existe enquanto a página que usa o hook está aberta. */
let backRedirectArmed = false;

export function useBackRedirect(url) {
  useEffect(() => {
    if (!url) return;

    const params = location.search.replace('?', '');
    const target = url.trim() + (params ? (url.includes('?') ? '&' : '?') + params : '');

    if (!backRedirectArmed) {
      backRedirectArmed = true;
      history.pushState({}, '', location.href);
      history.pushState({}, '', location.href);
      history.pushState({}, '', location.href);
    }

    const onPop = () => {
      setTimeout(() => {
        location.href = target;
      }, 1);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [url]);
}

/* ---------- Fade-in suave ao rolar ---------- */
let observer;
function getObserver() {
  if (!observer && typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            observer.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
  }
  return observer;
}

export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const obs = getObserver();
    if (!el) return;
    if (!obs) {
      el.classList.add('is-visible');
      return;
    }
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------- Ornamentos ---------- */
function CrossMark() {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-hidden="true">
      <path d="M9 1.5v19M3.5 7h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function StarMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2c.8 5.2 3 8.2 10 10-7 1.8-9.2 4.8-10 10-.8-5.2-3-8.2-10-10 7-1.8 9.2-4.8 10-10z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Ornament({ type = 'cross', className = '' }) {
  return (
    <div className={`ornament ${className}`} aria-hidden="true">
      <span className="ornament-line" />
      {type === 'star' ? <StarMark /> : <CrossMark />}
      <span className="ornament-line" />
    </div>
  );
}

/* ---------- Botões ---------- */
export function CheckoutButton({ href, children, className = '', ...rest }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`btn ${className}`} {...rest}>
      {children}
    </a>
  );
}

/* ---------- Imagens e vídeos (placeholder até você trocar) ----------
   Para trocar: passe `src` com o caminho da imagem (ex.: "/img/hero.jpg",
   colocando o arquivo em /public/img). O alt já está preenchido. */
// `priority`: para imagens do topo da página (visíveis ao abrir) — carregam na hora, sem esperar a rolagem.
export function Media({ src, alt, label, ratio = '4 / 3', kind = 'image', poster, webpSrcSet, sizes, priority = false, className = '' }) {
  const loadProps = priority ? { loading: 'eager', fetchPriority: 'high' } : { loading: 'lazy' };
  if (src && kind === 'video') {
    return (
      <video
        className={`media ${className}`}
        style={{ aspectRatio: ratio }}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="none"
        aria-label={alt}
      />
    );
  }
  if (src && webpSrcSet) {
    // Versões WebP leves por tamanho de tela, com `src` (JPG) de reserva
    return (
      <picture>
        <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
        <img
          className={`media ${className}`}
          style={{ aspectRatio: ratio }}
          src={src}
          alt={alt}
          {...loadProps}
          decoding="async"
        />
      </picture>
    );
  }
  if (src) {
    return (
      <img
        className={`media ${className}`}
        style={{ aspectRatio: ratio }}
        src={src}
        alt={alt}
        {...loadProps}
        decoding="async"
      />
    );
  }
  return (
    <div className={`placeholder ${className}`} style={{ aspectRatio: ratio }} role="img" aria-label={alt}>
      <span className="placeholder-icon">
        {kind === 'video' ? <Play size={26} strokeWidth={1.5} /> : <ImageIcon size={26} strokeWidth={1.5} />}
      </span>
      <span className="placeholder-label">{label}</span>
      <span className="placeholder-hint">{kind === 'video' ? 'Espaço para vídeo' : 'Espaço para imagem'}</span>
    </div>
  );
}

/* ---------- Vídeo curto sem som, em loop (estilo GIF) ----------
   Só baixa e toca quando aparece na tela; pausa ao sair dela.
   Com "reduzir movimento" ativado no celular, não toca sozinho e mostra os controles. */
export function AutoVideo({ src, poster, alt, ratio = '9 / 16', className = '' }) {
  const ref = useRef(null);
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!v.src) v.src = src;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, [src, reduced]);

  return (
    <video
      ref={ref}
      className={`media ${className}`}
      style={{ aspectRatio: ratio }}
      src={reduced ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      controls={reduced}
      preload="none"
      aria-label={alt}
    />
  );
}

/* ---------- Lista com check dourado ---------- */
export function CheckList({ items }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <span className="check-icon" aria-hidden="true">
            <Check size={16} strokeWidth={2.5} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- FAQ (acordeão nativo, leve e acessível) ---------- */
export function Faq({ items }) {
  return (
    <div className="faq">
      {items.map(({ q, a }) => (
        <details key={q} className="faq-item">
          <summary>
            <span>{q}</span>
            <ChevronDown className="faq-chevron" size={22} strokeWidth={1.75} aria-hidden="true" />
          </summary>
          <div className="faq-answer">{a}</div>
        </details>
      ))}
    </div>
  );
}

/* ---------- Garantia ---------- */
export function GuaranteeSeal({ src }) {
  if (src) {
    return <img className="seal-img" src={src} alt="Selo de garantia de 7 dias" loading="lazy" />;
  }
  return (
    <div className="seal" role="img" aria-label="Selo de garantia de 7 dias">
      <div className="seal-inner">
        <ShieldCheck size={22} strokeWidth={1.5} aria-hidden="true" />
        <strong>7 dias</strong>
        <span>garantia</span>
      </div>
    </div>
  );
}

export function GuaranteeSection() {
  return (
    <section className="section">
      <Reveal className="container narrow center">
        <GuaranteeSeal />
        <h2 className="section-title">Garantia de 7 dias</h2>
        <p>
          Se você abrir os arquivos e sentir que não é para você, é só pedir o reembolso dentro de 7 dias.
          Devolvemos 100% do valor, sem perguntas.
        </p>
      </Reveal>
    </section>
  );
}

/* ---------- Rodapé ---------- */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container center">
        <p className="footer-brand">Recado do Céu</p>
        <p className="footer-tag">Produto digital · Garantia de 7 dias · Pagamento seguro</p>
        <nav className="footer-links" aria-label="Links do rodapé">
          <Link to="/amostra">Amostra grátis</Link>
          <span aria-hidden="true">·</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>Contato: {CONTACT_EMAIL}</a>
        </nav>
        <p className="footer-copy">© 2026 Recado do Céu. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

/* ---------- Barra fixa inferior (só celular, após o hero) ---------- */
export function StickyBar({ targetRef, price, label, href }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = targetRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(([entry]) => {
      setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [targetRef]);

  return (
    <div className={`sticky-bar ${show ? 'show' : ''}`} aria-hidden={!show}>
      <div className="sticky-price">
        <span>a partir de</span>
        <strong>{price}</strong>
      </div>
      {href.startsWith('#') ? (
        <a href={href} className="btn btn-sm" tabIndex={show ? 0 : -1}>
          {label}
        </a>
      ) : (
        <CheckoutButton href={href} className="btn-sm" tabIndex={show ? 0 : -1}>
          {label}
        </CheckoutButton>
      )}
    </div>
  );
}
