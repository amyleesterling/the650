import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const LINKS = [
  { to: "/", label: "The Hidden Effort", end: true },
  { to: "/muscles", label: "Explore a Muscle" },
  { to: "/why", label: "Why Gentle & Slow" },
  { to: "/practice", label: "The Practice" },
  { to: "/about", label: "About & Sources" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav__inner container">
        <NavLink to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__mark" aria-hidden="true">
            650
          </span>
          <span className="nav__brandtext">The&nbsp;650</span>
        </NavLink>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className={`nav__bars ${open ? "is-open" : ""}`} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>

        <nav
          id="nav-links"
          className={`nav__links ${open ? "is-open" : ""}`}
          aria-label="Primary"
        >
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `nav__link ${isActive ? "is-active" : ""}`
              }
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
