'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Atom, BrainCircuit, Code2, Contact, GitFork, Mail, Microscope, MousePointer2, Sparkles } from 'lucide-react';

const links = {
  github: 'https://github.com/MDMinhajul-Islam',
  linkedin: 'https://www.linkedin.com/in/md-minhajul-isalm-64785b305/',
  scholar: 'https://scholar.google.com/citations?user=6482WSIAAAAJ&hl=en&authuser=1',
  email: 'mailto:mdminhajul.islam1823@gmail.com',
};

const projects = [
  { index: '01', title: 'PhantomFill', type: 'COMPUTER VISION RESEARCH', summary: 'Instance-aware object removal and high-fidelity background reconstruction through a hybrid YOLOv8, LaMa, and Stable Diffusion pipeline.', metrics: ['PSNR / SSIM / LPIPS', 'Residual-aware evaluation', 'PyTorch + CUDA'], href: 'https://github.com/MDMinhajul-Islam/CSE-498R-Directed-Research-', color: '#adff2f' },
  { index: '02', title: 'NexDrive AI', type: 'AI SYSTEMS ENGINEERING', summary: 'A production-style AI dealership platform with a FastAPI backend, 10,000-vehicle relational inventory, voice-agent tools, CRM workflows, and secure operations.', metrics: ['FastAPI + Supabase', 'Deterministic data pipeline', 'Voice-agent tools'], href: 'https://github.com/MDMinhajul-Islam/nexdrive-ai-dealership', color: '#8b5cf6' },
  { index: '03', title: 'Lightweight Diffusion', type: 'GENERATIVE AI / THESIS', summary: 'Design and analysis of efficient diffusion models for image inpainting, exploring the trade-off between parameter count, inference speed, and visual fidelity.', metrics: ['Efficient U-Net', 'CelebA + COCO', 'Model benchmarking'], href: 'https://github.com/MDMinhajul-Islam/Lightweight-Diffusion-Models-for-Efficient-Image-Inpainting', color: '#27d8ff' },
  { index: '04', title: 'MindCare', type: 'RESPONSIBLE AI', summary: 'A privacy-minded mental health interview agent using PHQ-9, local LLaMA 3 inference, crisis detection, authentication, and downloadable reports.', metrics: ['Local LLM via Ollama', 'JWT + MongoDB', 'Safety-aware flow'], href: 'https://github.com/MDMinhajul-Islam/Mental-Health-Interview-Agent', color: '#ff6b8a' },
  { index: '05', title: 'MRI Tumor Classifier', type: 'MEDICAL IMAGING', summary: 'A multiclass deep-learning system for brain tumor classification from Figshare MRI images, developed through preprocessing, CNN training, and evaluation.', metrics: ['Multiclass CNN', 'Medical imaging', 'Jupyter workflow'], href: 'https://github.com/MDMinhajul-Islam/Brain-Tumor-Detection-using-MRI-Images-', color: '#ffb347' },
  { index: '06', title: 'Chat-Wave', type: 'SOFTWARE ENGINEERING', summary: 'A real-time chat application with a Node and Express backend, bidirectional Socket.io communication, authentication, and an interactive interface.', metrics: ['Node.js + Express', 'Socket.io', 'Real-time UX'], href: 'https://github.com/MDMinhajul-Islam/Chat-Wave', color: '#5eead4' },
];

function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0, width = 0, height = 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const points = Array.from({ length: 72 }, (_, i) => ({ a: (i / 72) * Math.PI * 2, ring: 0.28 + ((i * 19) % 67) / 100, lift: (((i * 37) % 100) - 50) / 50, speed: 0.1 + ((i * 13) % 20) / 100 }));
    const resize = () => { const box = canvas.getBoundingClientRect(); const dpr = Math.min(window.devicePixelRatio || 1, 2); width = box.width; height = box.height; canvas.width = width * dpr; canvas.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const draw = (now: number) => {
      const t = reduce ? 1.2 : now / 1000;
      ctx.clearRect(0, 0, width, height);
      const cx = width * 0.52, cy = height * 0.5, scale = Math.min(width, height) * 0.39;
      const projected = points.map((p) => { const theta = p.a + t * p.speed + pointer.current.x * 0.25; const phi = p.lift * 1.35 + Math.sin(t * 0.34 + p.a * 2) * 0.18 + pointer.current.y * 0.16; const x3 = Math.cos(theta) * Math.cos(phi) * p.ring; const y3 = Math.sin(phi) * p.ring; const z3 = Math.sin(theta) * Math.cos(phi) * p.ring; const perspective = 1 / (1.55 - z3 * 0.58); return { x: cx + x3 * scale * perspective * 1.6, y: cy + y3 * scale * perspective * 1.6, z: z3 }; });
      ctx.lineWidth = 0.7;
      for (let i = 0; i < projected.length; i++) for (let j = i + 1; j < projected.length; j++) { const a = projected[i], b = projected[j], dist = Math.hypot(a.x - b.x, a.y - b.y); if (dist < 75) { ctx.strokeStyle = `rgba(130,255,74,${(1 - dist / 75) * 0.18})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } }
      projected.sort((a, b) => a.z - b.z).forEach((node, i) => { const r = 1.2 + (node.z + 1) * 1.5; const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4); glow.addColorStop(0, i % 7 === 0 ? 'rgba(166,108,255,.95)' : 'rgba(176,255,72,.95)'); glow.addColorStop(1, 'rgba(125,255,75,0)'); ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2); ctx.fill(); });
      ctx.strokeStyle = 'rgba(178,255,81,.42)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx, cy, scale * 0.72, scale * 0.22, t * 0.08, 0, Math.PI * 2); ctx.stroke(); raf = requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointer.current = { x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 }; };
    resize(); window.addEventListener('resize', resize); canvas.addEventListener('pointermove', move); raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); canvas.removeEventListener('pointermove', move); };
  }, []);
  return <canvas ref={canvasRef} className="neural-canvas" aria-label="Interactive animated three-dimensional neural field" />;
}

function TiltCard({ project }: { project: (typeof projects)[number] }) {
  const ref = useRef<HTMLAnchorElement>(null); const [style, setStyle] = useState({});
  return <a ref={ref} href={project.href} target="_blank" rel="noreferrer" className="project-card" style={{ ...style, '--project': project.color } as React.CSSProperties} onPointerMove={(event) => { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; const rect = ref.current?.getBoundingClientRect(); if (!rect) return; const x = (event.clientX - rect.left) / rect.width - 0.5, y = (event.clientY - rect.top) / rect.height - 0.5; setStyle({ transform: `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 7}deg) translateY(-4px)` }); }} onPointerLeave={() => setStyle({})}>
    <div className="project-topline"><span>{project.index}</span><span>{project.type}</span><ArrowUpRight size={18} /></div><h3>{project.title}</h3><p>{project.summary}</p><div className="chips">{project.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
  </a>;
}

export default function Home() {
  return <main>
    <nav className="nav-wrap" aria-label="Main navigation"><a href="#top" className="monogram" aria-label="Home">MI<span>.</span></a><div className="nav-links"><a href="#work">Work</a><a href="#research">Research</a><a href="#about">About</a></div><a className="status-pill" href={links.email}><span /> Available to collaborate</a></nav>
    <section className="hero" id="top"><div className="hero-grid" aria-hidden="true" /><NeuralField /><div className="hero-copy"><p className="eyebrow"><span>01</span> AI ENGINEER · SOFTWARE BUILDER · RESEARCHER</p><h1>I engineer<br />intelligence <em>into</em><br />real-world systems.</h1><p className="hero-intro">I’m Md. Minhajul Islam - a CSE student and research intern working across computer vision, efficient deep learning, and production software.</p><div className="hero-actions"><a className="primary-action" href="#work">Explore selected work <ArrowDown size={17} /></a><a className="text-action" href={links.github} target="_blank" rel="noreferrer"><GitFork size={18} /> GitHub</a></div></div><div className="hero-orbit-label label-a">DIFFUSION<br /><span>GENERATIVE VISION</span></div><div className="hero-orbit-label label-b">YOLO + LAMA<br /><span>HYBRID PIPELINES</span></div><div className="hero-side-note"><MousePointer2 size={14} /> MOVE TO BEND THE FIELD</div><div className="scroll-cue">SCROLL TO EXPLORE <span /></div></section>
    <section className="signal-strip" aria-label="Core capabilities"><div><BrainCircuit /><span>Machine Learning</span><b>MODELS THAT LEARN</b></div><div><Atom /><span>Deep Learning</span><b>VISION + GENERATION</b></div><div><Code2 /><span>Software Systems</span><b>BUILT TO OPERATE</b></div><div><Microscope /><span>Research</span><b>MEASURED, REPRODUCIBLE</b></div></section>
    <section className="work-section" id="work"><div className="section-head"><p className="eyebrow"><span>02</span> SELECTED WORK</p><h2>From model<br />to <em>system.</em></h2><p>Projects chosen for technical depth, real-world relevance, and the clarity of the engineering decisions behind them.</p></div><div className="project-grid">{projects.map((project) => <TiltCard key={project.title} project={project} />)}</div><a className="all-work" href={links.github} target="_blank" rel="noreferrer">View all 23 public repositories <ArrowUpRight size={18} /></a></section>
    <section className="research-section" id="research"><div className="research-visual" aria-hidden="true"><div className="scan-ring ring-one" /><div className="scan-ring ring-two" /><div className="scan-core"><Sparkles /></div><div className="metric metric-a"><b>PSNR</b><span>signal fidelity</span></div><div className="metric metric-b"><b>LPIPS</b><span>perceptual distance</span></div><div className="metric metric-c"><b>SSIM</b><span>structural quality</span></div></div><div className="research-copy"><p className="eyebrow"><span>03</span> RESEARCH PRACTICE</p><h2>Curiosity,<br />made <em>measurable.</em></h2><p>My current work investigates efficient image inpainting and object removal: designing lightweight architectures, building hybrid vision pipelines, and evaluating not just how outputs look, but what remains detectable.</p><div className="research-facts"><div><span>Current role</span><b>Research Intern</b><small>Image Segmentation & Object Removal</small></div><div><span>Thesis</span><b>Lightweight Diffusion Models</b><small>Efficient Image Inpainting</small></div><div><span>Institution</span><b>North South University</b><small>BSc, Computer Science & Engineering</small></div></div><div className="paper-list"><a href={links.scholar} target="_blank" rel="noreferrer"><span>01</span><p>A Machine Learning-Driven Framework for Enhancing Cognitive Function Using tDCS and Brain Gym Interventions</p><ArrowUpRight /></a><div><span>02</span><p>Machine Learning-Enhanced Cardiovascular Disease Risk Prediction: A Clinical Intelligence Framework</p><b>FORTHCOMING</b></div></div><a className="primary-action scholar" href={links.scholar} target="_blank" rel="noreferrer">Google Scholar <ArrowUpRight size={17} /></a></div></section>
    <section className="about-section" id="about"><div className="portrait-shell"><div className="portrait-glow" /><img src="https://avatars.githubusercontent.com/u/131590440?v=4" alt="Md. Minhajul Islam" /><div className="portrait-tag">DHAKA, BANGLADESH <span>23.81° N / 90.41° E</span></div></div><div className="about-copy"><p className="eyebrow"><span>04</span> THE PERSON BEHIND THE PIPELINE</p><h2>I like hard problems<br />with <em>human stakes.</em></h2><p>Whether I’m removing visual artifacts, designing safer conversational AI, or engineering a real-time product, I care about systems that are rigorous under the hood and useful in someone’s hands.</p><p>Years of scouting leadership shaped how I work: stay calm under constraints, communicate clearly, and move a team toward the objective.</p><div className="stack-row"><span>PYTHON</span><span>PYTORCH</span><span>C++</span><span>JAVASCRIPT</span><span>SQL</span><span>GIT</span></div></div></section>
    <footer><p className="eyebrow"><span>05</span> LET’S BUILD SOMETHING USEFUL</p><h2>Have a difficult problem?<br /><a href={links.email}>Let’s talk.<ArrowUpRight /></a></h2><div className="footer-row"><span>© 2026 MD. MINHAJUL ISLAM</span><div><a href={links.github} target="_blank" rel="noreferrer"><GitFork /> GitHub</a><a href={links.linkedin} target="_blank" rel="noreferrer"><Contact /> LinkedIn</a><a href={links.scholar} target="_blank" rel="noreferrer"><Microscope /> Scholar</a><a href={links.email}><Mail /> Email</a></div></div></footer>
  </main>;
}
