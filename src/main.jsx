import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Obrigado from './pages/Obrigado.jsx';
import Igreja from './pages/Igreja.jsx';
import IgrejaEspecial from './pages/IgrejaEspecial.jsx';
import Amostra from './pages/Amostra.jsx';
import './styles.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Links internos da mesma página (#oferta, #acervo, #plano) rolam até a seção sem
// criar entrada no histórico. Assim o botão "voltar" não fica preso nesses saltos
// e não dispara o back redirect por engano.
document.addEventListener('click', (e) => {
  const a = e.target.closest?.('a[href^="#"]');
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
  const el = document.getElementById(a.getAttribute('href').slice(1));
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/obrigado" element={<Obrigado />} />
        <Route path="/igreja" element={<Igreja />} />
        <Route path="/igreja-especial" element={<IgrejaEspecial />} />
        <Route path="/amostra" element={<Amostra />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
