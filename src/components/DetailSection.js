import React from 'react';

function DetailSection({ title, children }) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default DetailSection;
