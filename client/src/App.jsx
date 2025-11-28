import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [kudos, setKudos] = useState([]);
  const [formData, setFormData] = useState({ recipient: '', message: '', sender: '' });
  

  useEffect(() => {
    fetchKudos();
  }, []);

  const fetchKudos = async () => {
    try {
      const res = await fetch(`https://api.lid75l.me/api/kudos`);
      const data = await res.json();
      setKudos(data);
    } catch (err) {
      console.error("Nem sikerült elérni a backendet:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://api.lid75l.me/api/kudos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormData({ recipient: '', message: '', sender: '' });
        fetchKudos();
      }
    } catch (err) {
      console.error("Hiba küldéskor:", err);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>🏆 Kudos Wall</h1>
        <p>Dicsérd meg a kollégáidat!</p>
      </header>

      <section className="form-section">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Kinek? (pl. Backend csapat)" 
            value={formData.recipient}
            onChange={e => setFormData({...formData, recipient: e.target.value})}
            required
          />
          <input 
            type="text" 
            placeholder="Kitől? (Opcionális)" 
            value={formData.sender}
            onChange={e => setFormData({...formData, sender: e.target.value})}
          />
          <textarea 
            placeholder="Miért jár a dicséret?" 
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
            required
          />
          <button type="submit">Küldés 🚀</button>
        </form>
      </section>

      <section className="wall">
        {kudos.length === 0 ? <p>Még nincs dicséret. Legyél te az első!</p> : null}
        
        {kudos.map((kudo) => (
          <div key={kudo._id} className="card">
            <div className="card-header">
              <p>To: {kudo.recipient}</p>
            </div>
            <p className="card-body">"{kudo.message}"</p>
            <div className="card-footer">
              <small>From: {kudo.sender}</small>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default App