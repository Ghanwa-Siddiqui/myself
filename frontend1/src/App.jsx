import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/portfolio")
      .then((res) => {
        if (!res.ok) throw new Error("Backend not responding");
        return res.json();
      })
      .then((data) => setPortfolio(data))
      .catch((e) => setError(e.message));
  }, []);

  const goTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  if (error) {
    return (
      <div className="page">
        <div className="container">
          <h1 className="title">Portfolio</h1>
          <div className="alert">{error}</div>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="page">
        <div className="container loading">
          <div className="spinner" />
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />
      <aside className={`drawer ${open ? "open" : ""}`}>
        <button className="closeBtn" onClick={() => setOpen(false)}>×</button>
        <ul>
          <li><a href="#about" onClick={(e) => goTo(e, "about")}>About</a></li>
          <li><a href="#education" onClick={(e) => goTo(e, "education")}>Education</a></li>
          <li><a href="#skills" onClick={(e) => goTo(e, "skills")}>Skills</a></li>
          <li><a href="#experience" onClick={(e) => goTo(e, "experience")}>Experience</a></li>
          <li><a href="#projects" onClick={(e) => goTo(e, "projects")}>Projects</a></li>
          <li><a href="#contact" onClick={(e) => goTo(e, "contact")}>Contact</a></li>
        </ul>
      </aside>

      <div className="page">
        <div className="container">
          <header id="about" className="header">
            <div>
              <h1 className="title">{portfolio.name}</h1>
              <p className="muted">{portfolio.email} • {portfolio.location}</p>
            </div>
            <button
              className={`menuButton ${open ? "active" : ""}`}
              onClick={() => setOpen(true)}
            >
              <span></span><span></span><span></span>
            </button>
          </header>

          <section id="education" className="card">
            <h2 className="sectionTitle">Education</h2>
            <div className="row">
              <div className="col">
                <div className="item">
                  <div className="itemTitle">{portfolio.education.degree}</div>
                  <div className="muted">{portfolio.education.university}</div>
                </div>
              </div>
              <div className="col right">
                <div className="badge">CGPA: {portfolio.education.cgpa}</div>
                <div className="badge alt">Grad: {portfolio.education.graduation}</div>
              </div>
            </div>
          </section>

          <section id="skills" className="card">
            <h2 className="sectionTitle">Skills</h2>
            <div className="chips">
              {portfolio.skills.map((s, i) => (
                <span className="chip" key={i}>{s}</span>
              ))}
            </div>
          </section>

          <section id="experience" className="card">
            <h2 className="sectionTitle">Experience</h2>
            <div className="timeline">
              {portfolio.experience.map((exp, i) => (
                <div key={i} className="timelineItem">
                  <div className="dot"></div>
                  <div className="content">
                    <div className="itemTitle">{exp.role}</div>
                    <div className="muted">{exp.company} • {exp.duration}</div>
                    <div className="tags">
                      {exp.tech.map((t, j) => (
                        <span key={j} className="tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="card">
            <h2 className="sectionTitle">Projects</h2>
            <div className="projects">
              {portfolio.projects.map((p, i) => (
                <div className="project" key={i}>
                  <div className="projectHeader">
                    <span className="projectTitle">{p.title}</span>
                  </div>
                  <div className="projectDesc">{p.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="card">
            <h2 className="sectionTitle">Contact</h2>
            <p>Email: <b>{portfolio.email}</b></p>
          </section>

          <footer className="footer">
            <span>© {new Date().getFullYear()} {portfolio.name}</span>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
