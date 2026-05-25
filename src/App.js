import React, { useState } from 'react';
import './App.css';

const MEDITATIONS = [
  {
    id: '2026-05-25',
    number: 180,
    book: 'VII',
    chapter: '—',
    quote:
      'TIENES PODER SOBRE TU MENTE, NO SOBRE LOS ACONTECIMIENTOS EXTERNOS. COMPRENDE ESTO Y ENCONTRARÁS LA FUERZA.',
    latin: 'Τὰ ἐφ’ ἡμῖν',
    source: 'Meditaciones · Libro VII · Meditación 180',
    explanation:
      'Marco Aurelio desarrolla aquí una de las ideas centrales del estoicismo: la diferencia entre aquello que depende de nosotros y aquello que pertenece al mundo exterior. La serenidad nace del dominio de la interpretación, no del control absoluto de la realidad.',
    context:
      'Escrita durante las campañas militares del emperador en el Danubio, esta reflexión aparece en un momento de enorme presión política y personal. La cita no es un ejercicio abstracto de filosofía, sino un mecanismo práctico de resistencia emocional.',
  },
];

function getMeditationOfDay() {
  const todayKey = new Date().toISOString().slice(0, 10);
  return MEDITATIONS.find(m => m.id === todayKey) || MEDITATIONS[0];
}

function App() {
  const meditation = getMeditationOfDay();
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1D1B18] overflow-hidden relative font-serif">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] bg-[radial-gradient(circle_at_center,_black_1px,_transparent_1px)] [background-size:22px_22px]" />

      <main className="relative z-10 flex flex-col min-h-screen px-6 py-8 md:px-10 md:py-10">
        <header className="flex items-center justify-between mb-10" />

        <section className="flex-1 flex items-center justify-center">
          <div
            className="relative w-full max-w-[430px] h-[620px] cursor-pointer"
            style={{ perspective: '2000px' }}
            onClick={() => setFlipped(v => !v)}
          >
            <div
              className="relative w-full h-full duration-700 [transform-style:preserve-3d]"
              style={{
                transform: flipped
                  ? 'rotateY(180deg) scale(1.02)'
                  : 'rotateY(0deg) scale(1.0)',
              }}
            >
              <CardFront meditation={meditation} />
              <CardBack meditation={meditation} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function CardFront({ meditation }) {
  return (
    <div className="absolute inset-0 rounded-[20px] border border-[#D7D0C6] bg-[#F9F6F0] shadow-[0_25px_60px_rgba(0,0,0,0.08)] overflow-hidden [backface-visibility:hidden]">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.7),rgba(235,229,220,0.4))]" />

      <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
        <div className="flex items-end justify-between text-[#91897D] text-xs tracking-[0.25em] uppercase">
          <span>Imperium Internum</span>
          <span>Roma · 170 AC</span>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center text-center px-2">
          <blockquote
            className="text-[21px] md:text-[20px] leading-[1.5] tracking-[0.11em] uppercase text-[#1D1B18]"
            style={{ fontFamily: 'Trajan Pro, Cinzel, Times New Roman, serif' }}
          >
            “{meditation.quote}”
          </blockquote>

          <div className="flex flex-col gap-2 mb-6 mt-10">
            <p
              className="text-[14px] uppercase text-[#7A7268]"
              style={{ fontFamily: 'Trajan Pro, Cinzel, Times New Roman, serif' }}
            >
              MARCO AURELIO
            </p>
            <p className="text-[12px] text-[#8B8378]">
              {meditation.source}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardBack({ meditation }) {
  return (
    <div className="absolute inset-0 rounded-[20px] border border-[#D7D0C6] bg-[#F8F5EF] shadow-[0_25px_60px_rgba(0,0,0,0.08)] overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(230,224,214,0.3))]" />

      <div className="relative h-full flex flex-col p-8 md:p-10 overflow-y-auto">
        <div className="space-y-8 text-[#332F2B] leading-relaxed text-[15px]">
          <section>
            <h3 className="uppercase tracking-[0.22em] text-[11px] text-[#8B8378] mb-3">
              Lectura Filosófica
            </h3>
            <p>{meditation.explanation}</p>
          </section>

          <section>
            <h3 className="uppercase tracking-[0.22em] text-[11px] text-[#8B8378] mb-3">
              Contexto Histórico
            </h3>
            <p>{meditation.context}</p>
          </section>

          <section>
            <h3 className="uppercase tracking-[0.22em] text-[11px] text-[#8B8378] mb-3">
              Concepto Griego Original
            </h3>

            <div className="border border-[#D8D0C4] rounded-2xl p-5 bg-white/50 backdrop-blur-sm">
              <p
                className="text-2xl tracking-[0.12em] mb-2"
                style={{ fontFamily: 'Trajan Pro, Cinzel, Times New Roman, serif' }}
              >
                {meditation.latin}
              </p>

              <p className="text-sm text-[#70685D] italic">
                “Lo que depende de nosotros”. Una distinción esencial del estoicismo.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-auto pt-10 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#8B8378]">
          <span>Contemplación diaria</span>
          <span>Desliza para archivo</span>
        </div>
      </div>
    </div>
  );
}

export default App;