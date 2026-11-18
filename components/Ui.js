"use client";
import { motion, useScroll, useSpring, useMotionValue, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Reveal = ({ children, delay = 0, className }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>
);

export function Progress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="progress" style={{ scaleX: x }} />;
}

export function Glow() {
  const x = useMotionValue(-300), y = useMotionValue(-300);
  useEffect(() => {
    const m = (e) => { x.set(e.clientX - 200); y.set(e.clientY - 200); };
    addEventListener("mousemove", m);
    return () => removeEventListener("mousemove", m);
  }, [x, y]);
  return <motion.div className="glow" style={{ x, y }} aria-hidden />;
}

export function Counter({ to, suffix = "" }) {
  const r = useRef(null);
  const seen = useInView(r, { once: true });
  useEffect(() => {
    if (!seen) return;
    const c = animate(0, to, { duration: 1.8, onUpdate: (v) => r.current && (r.current.textContent = Math.round(v) + suffix) });
    return () => c.stop();
  }, [seen, to, suffix]);
  return <span ref={r}>0{suffix}</span>;
}

export function Typing({ words }) {
  const [t, setT] = useState(""), [i, setI] = useState(0), [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    const id = setTimeout(() => {
      if (!del) { setT(w.slice(0, t.length + 1)); if (t.length + 1 === w.length) setTimeout(() => setDel(true), 1300); }
      else { setT(w.slice(0, t.length - 1)); if (t.length - 1 <= 0) { setDel(false); setI(i + 1); } }
    }, del ? 35 : 75);
    return () => clearTimeout(id);
  }, [t, del, i, words]);
  return <span className="typing">{t}<i className="caret" /></span>;
}
