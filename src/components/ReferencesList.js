import React from 'react';

function ReferencesList({ references }) {
  if (!references || references.length === 0) {
    return null;
  }

  return (
    <section className="detail-section">
      <h2>Referencias</h2>
      <div className="references-list">
        {references.map((reference, index) => (
          <article key={index} className="reference-item">
            {reference.url ? (
              <a
                href={reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="reference-title"
              >
                {reference.title}
              </a>
            ) : (
              <p className="reference-title">{reference.title}</p>
            )}
            {reference.author && <p className="reference-author">por {reference.author}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

export default ReferencesList;
