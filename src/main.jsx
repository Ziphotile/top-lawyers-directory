import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const lawyers = [
  { id: 1, name: 'Lebo Mokoena', firm: 'Mokoena Legal', country: 'South Africa', city: 'Johannesburg', practice: ['Project Finance', 'Energy & Infrastructure'], seniority: 'Partner', featured: true, rating: 4.9 },
  { id: 2, name: 'Kwame Mensah', firm: 'Mensah & Partners', country: 'Ghana', city: 'Accra', practice: ['Banking & Finance', 'Projects'], seniority: 'Managing Partner', featured: true, rating: 4.8 },
  { id: 3, name: 'Amina Diallo', firm: 'Diallo & Co.', country: 'Senegal', city: 'Dakar', practice: ['Corporate', 'M&A'], seniority: 'Partner', featured: false, rating: 4.7 },
  { id: 4, name: 'Tunde Adeyemi', firm: 'Adeyemi Chambers', country: 'Nigeria', city: 'Lagos', practice: ['Energy', 'Natural Resources'], seniority: 'Partner', featured: true, rating: 4.9 },
  { id: 5, name: 'Nadia El Mansouri', firm: 'El Mansouri Avocats', country: 'Morocco', city: 'Casablanca', practice: ['Infrastructure', 'PPP'], seniority: 'Partner', featured: false, rating: 4.6 },
  { id: 6, name: 'Daniel K. Mwangi', firm: 'Mwangi Advocates', country: 'Kenya', city: 'Nairobi', practice: ['Projects', 'Construction'], seniority: 'Senior Partner', featured: false, rating: 4.8 },
  { id: 7, name: 'Chipo Ncube', firm: 'Ncube Law Group', country: 'Zambia', city: 'Lusaka', practice: ['Mining', 'Corporate'], seniority: 'Partner', featured: false, rating: 4.7 },
  { id: 8, name: 'Samuel Okoro', firm: 'Okoro Legal', country: 'Nigeria', city: 'Abuja', practice: ['Public Procurement', 'Infrastructure'], seniority: 'Partner', featured: false, rating: 4.6 },
];

function App() {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('All countries');
  const [practice, setPractice] = useState('All practice areas');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const countries = useMemo(() => ['All countries', ...new Set(lawyers.map((l) => l.country))], []);
  const practices = useMemo(() => ['All practice areas', ...new Set(lawyers.flatMap((l) => l.practice))], []);

  const filtered = lawyers.filter((lawyer) => {
    const text = `${lawyer.name} ${lawyer.firm} ${lawyer.city} ${lawyer.country} ${lawyer.practice.join(' ')}`.toLowerCase();
    return (!query || text.includes(query.toLowerCase()))
      && (country === 'All countries' || lawyer.country === country)
      && (practice === 'All practice areas' || lawyer.practice.includes(practice))
      && (!featuredOnly || lawyer.featured);
  });

  return (
    <div className="site-shell">
      <header className="navbar">
        <div className="container nav-inner">
          <div className="brand"><span className="brand-mark">TL</span><span>Top Lawyers</span></div>
          <nav><a href="#directory">Directory</a><a href="#how-it-works">How it works</a><a href="#about">About</a></nav>
          <button className="list-button">List your profile</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-content">
            <p className="eyebrow">AFRICA'S LEGAL DIRECTORY</p>
            <h1>Find the right lawyer.<br /><em>Anywhere in Africa.</em></h1>
            <p className="hero-copy">Discover leading lawyers and law firms by jurisdiction, expertise and sector.</p>
            <div className="hero-search">
              <span>⌕</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by lawyer, firm, city or practice area" />
              <button onClick={() => document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' })}>Search</button>
            </div>
            <div className="stats"><span><strong>54</strong> countries</span><span><strong>2,400+</strong> lawyers</span><span><strong>800+</strong> firms</span></div>
          </div>
        </section>

        <section id="directory" className="directory section">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow">EXPLORE THE DIRECTORY</p><h2>Lawyers worth knowing.</h2></div><p>Filter the directory to find specialists across Africa.</p></div>
            <div className="filters">
              <select value={country} onChange={(e) => setCountry(e.target.value)}>{countries.map((c) => <option key={c}>{c}</option>)}</select>
              <select value={practice} onChange={(e) => setPractice(e.target.value)}>{practices.map((p) => <option key={p}>{p}</option>)}</select>
              <label className="toggle"><input type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} /><span>Featured only</span></label>
              <span className="result-count">{filtered.length} results</span>
            </div>
            <div className="lawyer-grid">
              {filtered.map((lawyer) => <article className="lawyer-card" key={lawyer.id}>
                <div className="card-top"><div className="avatar">{lawyer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div>{lawyer.featured && <span className="featured">FEATURED</span>}</div>
                <h3>{lawyer.name}</h3><p className="firm">{lawyer.firm}</p><p className="location">{lawyer.city}, {lawyer.country}</p>
                <div className="tags">{lawyer.practice.map((p) => <span key={p}>{p}</span>)}</div>
                <div className="card-footer"><span>{lawyer.seniority}</span><span>★ {lawyer.rating}</span></div>
              </article>)}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="how section">
          <div className="container"><p className="eyebrow">HOW IT WORKS</p><h2>A better way to find African legal talent.</h2><div className="steps"><div><b>01</b><h3>Search</h3><p>Search by jurisdiction, sector, legal expertise or firm.</p></div><div><b>02</b><h3>Compare</h3><p>Review profiles, credentials and areas of specialisation.</p></div><div><b>03</b><h3>Connect</h3><p>Shortlist the right advisers and contact them directly.</p></div></div></div>
        </section>

        <section id="about" className="cta"><div className="container cta-inner"><div><p className="eyebrow">FOR LAWYERS & FIRMS</p><h2>Put your practice in front of the right clients.</h2></div><button className="primary">Create a profile →</button></div></section>
      </main>

      <footer><div className="container footer-inner"><div className="brand"><span className="brand-mark">TL</span><span>Top Lawyers</span></div><p>Independent directory of legal talent across Africa.</p><span>© 2026 Top Lawyers Directory</span></div></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
