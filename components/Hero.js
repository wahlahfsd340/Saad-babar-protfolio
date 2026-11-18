"use client";
import { motion } from "framer-motion";
import { profile, stats, stack } from "./data";
import { Typing, Counter } from "./Ui";

const parent = { show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="blob b1" /><div className="blob b2" />
      <motion.div className="wrap" variants={parent} initial="hidden" animate="show">
        <motion.span variants={item} className="status"><i /> Available for work</motion.span>
        <motion.h1 variants={item}>Hi, I am {profile.name}.<br /><span className="grad"><Typing words={profile.roles} /></span></motion.h1>
        <motion.p variants={item} className="lead">{profile.intro}</motion.p>
        <motion.div variants={item} className="row">
          <a className="btn solid" href="#projects">View Projects</a>
          <a className="btn line" href="/cv.pdf" download>Download Resume</a>
        </motion.div>
        <motion.div variants={item} className="stats">
          {stats.map((s) => (<div key={s.label}><b><Counter to={s.n} suffix={s.s} /></b><span>{s.label}</span></div>))}
        </motion.div>
      </motion.div>
      <div className="marquee" aria-hidden>
        <div className="track">{[...stack, ...stack].map((s, i) => <span key={i}>{s}</span>)}</div>
      </div>
    </section>
  );
}
