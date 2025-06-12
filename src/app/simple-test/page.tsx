'use client';

export default function SimpleButtonTest() {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f3f4f6' }}>
      <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>
        Test Boutons Simples
      </h1>

      <div style={{ marginBottom: '1rem' }}>
        <h2>Avec Tailwind (si ça marche) :</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Bleu
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded ml-2">
          Rouge
        </button>
        <button className="bg-emerald-700 text-white px-4 py-2 rounded ml-2">
          Vert
        </button>
      </div>

      <div>
        <h2>Avec styles inline (référence) :</h2>
        <button
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            border: 'none',
            marginRight: '0.5rem',
          }}
        >
          Bleu
        </button>
        <button
          style={{
            backgroundColor: '#ef4444',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            border: 'none',
            marginRight: '0.5rem',
          }}
        >
          Rouge
        </button>
        <button
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            border: 'none',
          }}
        >
          Vert
        </button>
      </div>
    </div>
  );
}
