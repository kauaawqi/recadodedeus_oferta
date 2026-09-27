import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { LEAD_WEBHOOK_URL } from '../config.js';
import { Footer, Media, Ornament, Reveal, usePageMeta } from '../components/ui.jsx';

function maskPhone(value) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (!d) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

async function saveLead(lead) {
  try {
    const saved = JSON.parse(localStorage.getItem('recado_leads') || '[]');
    saved.push(lead);
    localStorage.setItem('recado_leads', JSON.stringify(saved));
  } catch {
    /* navegador sem armazenamento local: segue sem salvar */
  }
  if (LEAD_WEBHOOK_URL) {
    await fetch(LEAD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
  }
}

export default function Amostra() {
  usePageMeta(
    'Amostra grátis — Recado do Céu',
    'Receba 10 Recados do Céu grátis para imprimir hoje e entregar a alguém que precisa de uma palavra de fé.'
  );

  const [form, setForm] = useState({ nome: '', whatsapp: '', email: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  const update = (field) => (e) => {
    const value = field === 'whatsapp' ? maskPhone(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (form.nome.trim().length < 2) er.nome = 'Digite seu nome.';
    const digits = form.whatsapp.replace(/\D/g, '');
    if (digits.length < 10) er.whatsapp = 'Digite seu WhatsApp com DDD.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) er.email = 'Digite um e-mail válido.';
    return er;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus('sending');
    try {
      await saveLead({
        nome: form.nome.trim(),
        whatsapp: form.whatsapp,
        email: form.email.trim(),
        origem: 'amostra',
        data: new Date().toISOString(),
      });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <main className="section glow amostra">
        <div className="container narrow center">
          <Reveal>
            <p className="eyebrow">Amostra grátis</p>
            <h1>Receba 10 Recados do Céu grátis para imprimir hoje</h1>
            <p className="lead">Escolha, imprima e entregue a alguém que precisa ouvir uma palavra de fé.</p>
          </Reveal>

          <Reveal delay={100}>
            <Media
              label="3 bilhetes do Recado do Céu abertos em leque"
              alt="Três bilhetes do Recado do Céu dispostos em leque"
              ratio="16 / 10"
            />
          </Reveal>

          <Reveal className="card form-card" delay={160}>
            {status === 'done' ? (
              <div className="form-success" role="status">
                <Ornament type="star" />
                <p className="success-title">Pronto! Sua amostra está a caminho do seu WhatsApp e e-mail. 💛</p>
                <p>Gostou? Conheça o kit completo com 300 recados</p>
                <Link to="/" className="btn">
                  CONHECER O KIT COMPLETO
                </Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="field">
                  <label htmlFor="nome">Nome</label>
                  <input
                    id="nome"
                    type="text"
                    autoComplete="given-name"
                    placeholder="Seu nome"
                    value={form.nome}
                    onChange={update('nome')}
                    aria-invalid={!!errors.nome}
                    aria-describedby={errors.nome ? 'nome-erro' : undefined}
                  />
                  {errors.nome && <span className="field-error" id="nome-erro">{errors.nome}</span>}
                </div>
                <div className="field">
                  <label htmlFor="whatsapp">WhatsApp</label>
                  <input
                    id="whatsapp"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="(00) 00000-0000"
                    value={form.whatsapp}
                    onChange={update('whatsapp')}
                    aria-invalid={!!errors.whatsapp}
                    aria-describedby={errors.whatsapp ? 'whatsapp-erro' : undefined}
                  />
                  {errors.whatsapp && <span className="field-error" id="whatsapp-erro">{errors.whatsapp}</span>}
                </div>
                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="seuemail@exemplo.com"
                    value={form.email}
                    onChange={update('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-erro' : undefined}
                  />
                  {errors.email && <span className="field-error" id="email-erro">{errors.email}</span>}
                </div>
                {status === 'error' && (
                  <p className="field-error" role="alert">
                    Não conseguimos enviar agora. Confira sua internet e tente de novo.
                  </p>
                )}
                <button type="submit" className="btn" disabled={status === 'sending'}>
                  {status === 'sending' ? 'ENVIANDO…' : 'QUERO MINHA AMOSTRA GRÁTIS'}
                </button>
                <p className="micro form-note">
                  <Lock size={15} strokeWidth={1.8} aria-hidden="true" /> Seus dados estão seguros. Não enviamos spam.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
