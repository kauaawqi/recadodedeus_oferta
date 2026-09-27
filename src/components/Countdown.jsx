import { useEffect, useState } from 'react';
import { PROMO } from '../config.js';

const TZ = 'America/Sao_Paulo';
const dayKey = (d) => d.toLocaleDateString('pt-BR', { timeZone: TZ });

// "de hoje", "de amanhã" ou "de 30/09", sempre no horário de Brasília
function dayLabel(end, now) {
  if (dayKey(end) === dayKey(now)) return 'de hoje';
  if (dayKey(end) === dayKey(new Date(now.getTime() + 864e5))) return 'de amanhã';
  return `de ${end.toLocaleDateString('pt-BR', { timeZone: TZ, day: '2-digit', month: '2-digit' })}`;
}

const pad = (n) => String(n).padStart(2, '0');

export default function Countdown() {
  const end = new Date(PROMO.fim);
  const [now, setNow] = useState(() => new Date());

  const left = end.getTime() - now.getTime();
  const active = !Number.isNaN(left) && left > 0;

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [active]);

  if (!active) return null; // prazo encerrado (ou data inválida): a barra some

  const total = Math.floor(left / 1000);
  const days = Math.floor(total / 86400);
  const units = [
    ...(days > 0 ? [{ v: days, l: days === 1 ? 'DIA' : 'DIAS' }] : []),
    { v: Math.floor((total % 86400) / 3600), l: 'H' },
    { v: Math.floor((total % 3600) / 60), l: 'MIN' },
    { v: total % 60, l: 'SEG' },
  ];
  const time = end.toLocaleTimeString('pt-BR', { timeZone: TZ, hour: '2-digit', minute: '2-digit' });

  return (
    <div className="countdown" role="timer" aria-live="off">
      <div className="countdown-inner">
        <p className="countdown-text">
          <span className="countdown-dot" aria-hidden="true" />
          <span>
            <strong>{days > 0 ? 'ÚLTIMOS DIAS:' : 'ÚLTIMAS HORAS:'}</strong> esta condição fica disponível até{' '}
            <em>
              {time} {dayLabel(end, now)}
            </em>
          </span>
        </p>
        <div className="countdown-clock" aria-label="Tempo restante">
          {units.map((u, i) => (
            <span className="countdown-unit-wrap" key={u.l}>
              {i > 0 && (
                <span className="countdown-sep" aria-hidden="true">
                  :
                </span>
              )}
              <span className="countdown-unit">
                <b>{pad(u.v)}</b>
                <small>{u.l}</small>
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
