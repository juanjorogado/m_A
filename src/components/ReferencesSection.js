import React from 'react';

const ReferencesSection = ({ references }) => {
  if (!references || references.length === 0) {
    return null;
  }

  return (
    <section>
      <h3 className="uppercase tracking-[0.22em] text-[11px] text-[#8B8378] mb-3">
        Referencias y Fuentes
      </h3>
      <div className="space-y-4">
        {references.map((ref, index) => (
          <div key={index} className="bg-white/30 rounded-xl p-4">
            <p className="font-semibold text-[#1D1B18] mb-2">
              {ref.title}
            </p>
            {ref.author && (
              <p className="text-[#7A7268] text-sm italic mb-2">
                por {ref.author}
              </p>
            )}
            {ref.url && (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#8B8378] hover:text-[#1D1B18] transition-colors text-sm"
              >
                {ref.url}
              </a>
            )}
            {ref.type && (
              <p className="text-[#91897D] text-xs italic mt-1">
                Fuente {ref.type === 'primary' ? 'primaria' : 'secundaria'}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReferencesSection;