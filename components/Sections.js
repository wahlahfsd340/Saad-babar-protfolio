"use client";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useState } from "react";
import { projects, skills, timeline, profile } from "./data";
import { Reveal } from "./Ui";

function Card({ p }) {
  const rx = useMotionValue(0), ry = useMotionValue(0);
  return (
    <motion.article layout className="card" style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
      onMouseMove={(e) => { const b = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - b.left) / b.width - 0.5) * 12); rx.set(-((e.clientY - b.top) / b.height - 0.5) * 12); }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}>
      <h3>{p.title}</h3><p>{p.desc}</p>
      <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
      <a href={p.link}>View project</a>
    </motion.article>
  );
}

export function Projects() {
  const cats = ["All", ...new Set(projects.map((p) => p.cat))];
  const [f, setF] = useState("All");
  const list = projects.filter((p) => f === "All" || p.cat === f);
  return (
    <section id="projects"><div className="wrap">
      <Reveal><h2>Projects</h2><p className="sub">Selected work. Filter by type.</p></Reveal>
      <div className="filters">
        {cats.map((c) => (
          <button key={c} onClick={() => setF(c)} className={f === c ? "on" : ""}>
            {c}{f === c && <motion.span layoutId="fpill" className="pill" />}
          </button>
        ))}
      </div>
      <motion.div layout className="grid"><AnimatePresence mode="popLayout">{list.map((p) => <Card key={p.title} p={p} />)}</AnimatePresence></motion.div>
    </div></section>
  );
}

export function About() {
  return (
    <section id="about"><div className="wrap">
      <Reveal><h2>About</h2><p className="sub">Who I am and what I work with.</p></Reveal>
      <div className="two">
        <Reveal>
          <p className="muted">Write 2 to 3 sentences about your background and the work you enjoy.</p>
          <div className="tl">{timeline.map((t) => (
            <div key={t.year} className="tli"><b>{t.year}</b><div><h4>{t.title}</h4><p className="muted">{t.text}</p></div></div>
          ))}</div>
        </Reveal>
        <Reveal delay={0.15}><div className="skills">{skills.map(([n, v]) => (
          <div key={n}><label><span>{n}</span><span>{v}%</span></label>
            <div className="meter"><motion.i initial={{ width: 0 }} whileInView={{ width: v + "%" }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} /></div>
          </div>))}</div></Reveal>
      </div>
    </div></section>
  );
}

export function Contact() {
  const [msg, setMsg] = useState(null);
  const submit = (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    if (!d.name.trim() || !d.details.trim() || !/^\S+@\S+\.\S+$/.test(d.email)) return setMsg({ ok: false, t: "Fill name, a valid email, and project details." });
    const body = `Name: ${d.name}\nEmail: ${d.email}\nBudget: ${d.budget || "-"} USD\nTimeline: ${d.weeks || "-"} weeks\n\n${d.details}`;
    location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Project inquiry from " + d.name)}&body=${encodeURIComponent(body)}`;
    setMsg({ ok: true, t: "Opening your email app. Press send to finish." }); e.target.reset();
  };
  return (
    <section id="contact"><div className="wrap">
      <Reveal><h2>Let&apos;s create together</h2><p className="sub">Fill out the form and I will get back to you soon.</p></Reveal>
      <div className="two">
        <Reveal><div className="info">
          <a href={`mailto:${profile.email}`}><small>Email</small>{profile.email}</a>
          <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer"><small>WhatsApp</small>+{profile.whatsapp}</a>
          <a href={profile.github} target="_blank" rel="noreferrer"><small>GitHub</small>{profile.github.replace("https://", "")}</a>
          <div><small>Location</small>{profile.city}</div>
        </div></Reveal>
        <Reveal delay={0.15}><form onSubmit={submit} noValidate>
          <div className="r2"><label>Your name *<input name="name" /></label><label>Email address *<input name="email" type="email" /></label></div>
          <div className="r2"><label>Budget (USD)<input name="budget" type="number" min="0" /></label><label>Timeline (weeks)<input name="weeks" type="number" min="0" /></label></div>
          <label>Project details *<textarea name="details" /></label>
          <button className="btn solid" type="submit">Send Message</button>
          <AnimatePresence>{msg && <motion.p key={msg.t} className={"msg " + (msg.ok ? "ok" : "err")} role="status" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{msg.t}</motion.p>}</AnimatePresence>
        </form></Reveal>
      </div>
    </div></section>
  );
}
