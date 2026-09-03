'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Atom, BrainCircuit, Code2, Contact, GitFork, Mail, Microscope, MousePointer2 } from 'lucide-react';

const links = {
  github: 'https://github.com/MDMinhajul-Islam',
  linkedin: 'https://www.linkedin.com/in/md-minhajul-isalm-64785b305/',
  scholar: 'https://scholar.google.com/citations?user=6482WSIAAAAJ&hl=en&authuser=1',
  email: 'mailto:mdminhajul.islam1823@gmail.com',
};

const projects = [
  { index: '01', title: 'PhantomFill', type: 'COMPUTER VISION RESEARCH', summary: 'Removes people from crowded photographs and reconstructs the hidden background. I built a multi-stage pipeline that detects each person, refines the mask, performs global inpainting, and locally restores difficult regions.', proof: 'YOLOv8x-seg → LaMa → Stable Diffusion 2, evaluated for visual quality and residual detections.', metrics: ['PyTorch', 'OpenCV', 'Diffusers'], href: 'https://github.com/MDMinhajul-Islam/CSE-498R-Directed-Research-', color: '#adff2f' },
  { index: '02', title: 'NexDrive AI', type: 'AI SYSTEMS ENGINEERING', summary: 'Turns a dealership into an AI-assisted operation. Customers can search inventory and speak with a voice agent while staff manage leads, appointments, inventory, and traceable call outcomes.', proof: 'Production-style FastAPI architecture with secure Supabase data access and deterministic relational test data.', metrics: ['FastAPI', 'Supabase', 'Voice AI'], href: 'https://github.com/MDMinhajul-Islam/nexdrive-ai-dealership', color: '#8b5cf6' },
  { index: '03', title: 'Lightweight Diffusion', type: 'GENERATIVE AI / THESIS', summary: 'Investigates how to make image inpainting faster without sacrificing generation quality. I designed and compared lighter U-Net configurations against a Stable Diffusion baseline.', proof: 'Eight-month senior design project with reproducible experiments, deployment code, and quality-efficiency analysis.', metrics: ['U-Net', 'CelebA + COCO', 'Gradio'], href: 'https://github.com/MDMinhajul-Islam/Lightweight-Diffusion-Models-for-Efficient-Image-Inpainting', color: '#27d8ff' },
  { index: '04', title: 'MindCare', type: 'RESPONSIBLE AI', summary: 'Guides a user through a PHQ-9 mental-health screening conversation, calculates severity, detects crisis language, and produces a downloadable assessment report.', proof: 'Local LLaMA 3 inference keeps the conversational model on-device; JWT and MongoDB support secure user sessions.', metrics: ['Ollama', 'Node.js', 'MongoDB'], href: 'https://github.com/MDMinhajul-Islam/Mental-Health-Interview-Agent', color: '#ff6b8a' },
  { index: '05', title: 'MRI Tumor Classifier', type: 'MEDICAL IMAGING', summary: 'Classifies brain tumors from MRI scans. The work progressed from an overly simple binary dataset to a more realistic multiclass Figshare dataset and a complete CNN evaluation workflow.', proof: 'Shows model-development judgment: dataset correction, preprocessing, multiclass training, and evidence-based evaluation.', metrics: ['CNN', 'MRI Imaging', 'Jupyter'], href: 'https://github.com/MDMinhajul-Islam/Brain-Tumor-Detection-using-MRI-Images-', color: '#ffb347' },
  { index: '06', title: 'Chat-Wave', type: 'SOFTWARE ENGINEERING', summary: 'A browser-based communication product where authenticated users exchange messages instantly through persistent, bidirectional connections.', proof: 'Built as a software-engineering project with Express APIs, Socket.io events, and a responsive Tailwind/DaisyUI interface.', metrics: ['Express.js', 'Socket.io', 'DaisyUI'], href: 'https://github.com/MDMinhajul-Islam/Chat-Wave', color: '#5eead4' },
  { index: '07', title: 'Northstar Voice Agent', type: 'AGENTIC PRODUCT ENGINEERING', summary: 'Connects a conversational sales agent to live vehicle inventory and real appointment availability. The agent can answer product questions, explain trade-offs, find matching cars, and schedule a test drive during the call.', proof: 'Containerized Node service with protected inventory tools, Cal.com booking integration, health checks, and production deployment guidance.', metrics: ['Grok Voice', 'REST APIs', 'Docker'], href: 'https://github.com/MDMinhajul-Islam/northstar-grok-voice-agent', color: '#6ee7ff' },
  { index: '08', title: 'Automatic Toll System', type: 'FULL-STACK AUTOMATION', summary: 'Reduces manual toll-booth processing through a web-based workflow for vehicle identification, transaction handling, and centralized record management.', proof: 'Demonstrates end-to-end product thinking across interface design, application logic, and persistent operational data.', metrics: ['JavaScript', 'Database', 'Automation'], href: 'https://github.com/MDMinhajul-Islam/Automatic-Toll-Collection-System', color: '#f7c948' },
];

const skills = [
  ['Python', 92], ['PyTorch', 88], ['Computer Vision', 90], ['Deep Learning', 86],
  ['C++', 78], ['JavaScript', 82], ['SQL & Data', 76], ['Git / GitHub', 86],
  ['Docker & Containers', 80], ['CI/CD Pipelines', 78],
] as const;

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
    <div className="project-topline"><span>{project.index}</span><span>{project.type}</span><ArrowUpRight size={18} /></div><h3>{project.title}</h3><p>{project.summary}</p><p className="project-proof">{project.proof}</p><div className="chips">{project.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
  </a>;
}

function SkillMatrix() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .28 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) { setProgress(0); return; }
    const started = performance.now();
    let raf = 0;
    const tick = (now: number) => { const next = Math.min(1, (now - started) / 4600); setProgress(next); if (next < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);
  return <div ref={ref} className={`skill-chart ${visible ? 'is-live' : ''}`}>{skills.map(([name, value], i) => {
    const rowProgress = Math.max(0, Math.min(1, progress * 1.28 - i * .04));
    return <div className="skill-row" key={name}><span>{name}</span><div><i style={{ width: `${value * rowProgress}%` }} /></div><b>{Math.round(value * rowProgress)}%</b></div>;
  })}</div>;
}

function ProjectDemo() {
  const [active, setActive] = useState(0);
  const [round, setRound] = useState(0);
  const labels = ['Image inpainting', 'AI dealership', 'Voice agent', 'Chat-Wave', 'MRI classifier', 'MindCare AI'];
  const carQueries = [
    { q: 'Find a family SUV under $35k', lead: 'Qualified lead · family / safety', cars: [['2024 Toyota RAV4', '$32,900 · 94% match'], ['2023 Honda CR-V', '$30,500 · 91% match']] },
    { q: 'Hybrid commuter under $30k', lead: 'Qualified lead · economy / commute', cars: [['2023 Toyota Prius', '$28,400 · 96% match'], ['2022 Hyundai Ioniq', '$25,900 · 89% match']] },
    { q: 'AWD vehicle for weekend trips', lead: 'Qualified lead · AWD / cargo', cars: [['2022 Subaru Outback', '$29,800 · 95% match'], ['2023 Mazda CX-5', '$31,200 · 90% match']] },
  ];
  const chats = [
    ['The model evaluation is ready.', 'Great - sending the comparison grid now.', 'I will review the residual detections.'],
    ['Can we deploy the new API tonight?', 'Build passed. I’m checking the health endpoint.', 'Production is healthy ✓'],
    ['The segmentation mask misses one person.', 'I’ll expand the mask and rerun stage two.', 'New output uploaded.'],
  ];
  const tumors = [
    ['Glioma detected', '94.2%', 'class 01 / 04'], ['Meningioma detected', '91.7%', 'class 02 / 04'], ['Pituitary tumor', '96.1%', 'class 03 / 04'], ['No tumor detected', '93.8%', 'class 04 / 04'],
  ];
  const car = carQueries[round % carQueries.length], chat = chats[round % chats.length], tumor = tumors[round % tumors.length];
  useEffect(() => { const timer = window.setInterval(() => setActive((value) => { const next = (value + 1) % labels.length; if (next === 0) setRound((r) => r + 1); return next; }), 5000); return () => window.clearInterval(timer); }, []);
  return <div className="demo-stage" aria-label={`Project demonstration: ${labels[active]}`}>
    <div className="demo-browser"><div className="demo-browser-bar"><i /><i /><i /><span>minhajul.lab / live-demo</span><b>RUNNING</b></div>
      <div className={`demo-scene inpaint-scene ${active === 0 ? 'active' : ''}`}><div className="before-pane"><span>INPUT + MASK</span><div className="photo-person" /></div><div className="reconstruction-field"><div className="pixel-cloud">{Array.from({length: 42},(_,i)=><i key={i} style={{'--px':`${(i * 37) % 100}%`,'--py':`${(i * 61) % 100}%`,'--pd':`${(i % 12) * .08}s`} as React.CSSProperties}/>)}</div><span>LATENT RECONSTRUCTION</span></div><div className="after-pane"><span>RECONSTRUCTED</span><div className="paint-sweep" /><div className="rebuild-grid">{Array.from({length: 36},(_,i)=><i key={i} style={{'--pd':`${i * .035}s`} as React.CSSProperties}/>)}</div></div><div className="demo-result"><b>MASK FILLED</b><small>structure → texture → refinement</small></div></div>
      <div className={`demo-scene agent-scene ${active === 1 ? 'active' : ''}`}><div className="agent-query">{car.q}<small>{car.lead}</small></div><div className="agent-flow"><span>INTENT</span><i /><span>TOOL PLAN</span><i /><span>LIVE INVENTORY</span><i /><span>RANKED MATCHES</span></div><div className="vehicle-results">{car.cars.map(([name, meta], i)=><div key={name}><span>0{i + 1}</span><b>{name}</b><small>{meta}</small><em>{i === 0 ? 'Best overall fit' : 'Strong alternative'}</em></div>)}</div><div className="agent-outcome"><span>CRM lead created</span><span>Test-drive slots ready</span><span>Conversation logged</span></div></div>
      <div className={`demo-scene call-scene ${active === 2 ? 'active' : ''}`}><div className="caller"><i>AI</i><div><b>Avery · Voice Agent</b><span>Connected · 01:24</span></div></div><div className="waveform">{Array.from({length: 28},(_,i)=><i key={i} style={{'--h':`${18 + (i * 31) % 62}%`} as React.CSSProperties}/>)}</div><p>“I found two SUVs within your budget. Would you like to book a test drive?”</p><div className="call-tools"><span>inventory.search ✓</span><span>calendar.slots ✓</span></div></div>
      <div className={`demo-scene chat-scene ${active === 3 ? 'active' : ''}`}><div className="chat-head"><i>CW</i><div><b>Chat-Wave · Engineering</b><span>4 members online · live Socket.io room</span></div><strong>● LIVE</strong></div><div className="chat-video-strip"><span><i>MI</i><small>Minhajul</small></span><span><i>AK</i><small>Ayesha</small></span><span><i>RN</i><small>Rayan</small></span><b>◉ 00:{24 + round}</b></div><div className="messages"><p className="incoming">{chat[0]}</p><p className="outgoing">{chat[1]}</p><p className="incoming delivered">{chat[2]} <small>delivered · now</small></p><p className="incoming typing"><i/><i/><i/></p></div><div className="message-box">Write a message… <b>↗</b></div></div>
      <div className={`demo-scene mri-scene ${active === 4 ? 'active' : ''}`}><div className={`scan-image tumor-${round % 4}`}><div className="tumor-hotspot" /><span>MRI · AXIAL · {tumor[2]}</span><div className="scan-ray"/></div><div className="scan-data"><span>MODEL OUTPUT</span><h4>{tumor[0]}</h4><div><b>Confidence</b><strong>{tumor[1]}</strong></div><div className="confidence"><i style={{width:tumor[1]}} /></div><small>4-class CNN · Glioma / Meningioma / Pituitary / No tumor</small></div></div>
      <div className={`demo-scene mindcare-scene ${active === 5 ? 'active' : ''}`}><div className="listener"><div className="avatar-rings"><i>AI</i><span/><span/></div><b>MindCare is listening</b><small>Private local inference · LLaMA 3</small></div><div className="mind-chat"><p>“Over the last two weeks, how often have you felt little interest or pleasure in doing things?”</p><div className="response-options"><span>Not at all</span><span>Several days</span><span className="chosen">More than half the days</span></div><div className="assessment"><div><span>PHQ-9 progress</span><b>7 / 9</b></div><i><em /></i><p><span>Current score</span><strong>{8 + (round % 5)}</strong><small>Moderate range · supportive guidance prepared</small></p></div></div></div>
    </div>
    <div className="demo-tabs">{labels.map((label, i) => <button key={label} className={active === i ? 'active' : ''} onClick={() => { setActive(i); setRound((r) => r + 1); }}><span>0{i + 1}</span>{label}<i /></button>)}</div>
  </div>;
}

const expertise = [
  ['COMPUTER VISION', 'SEEING COMPLEX SCENES'],
  ['GENERATIVE AI', 'REBUILDING THE MISSING'],
  ['AI AGENTS', 'TOOLS THAT TAKE ACTION'],
  ['SOFTWARE SYSTEMS', 'REAL-TIME, RELIABLE PRODUCTS'],
  ['APPLIED RESEARCH', 'EVIDENCE BEFORE CLAIMS'],
] as const;

function ExpertisePulse() {
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive((value) => (value + 1) % expertise.length), 2700); return () => window.clearInterval(timer); }, []);
  return <div className="expertise-pulse" key={active}><span>0{active + 1} / 05</span><b>{expertise[active][0]}</b><small>{expertise[active][1]}</small></div>;
}

const journeys = [
  { name: 'VISION SYSTEM', outcome: 'DEPLOYED INPAINTING DEMO', stages: [['Understand', 'Locate the visual failure'], ['Research', 'Compare models + evidence'], ['Categorize', 'Masks, scenes, edge cases'], ['Prototype', 'Build the hybrid pipeline'], ['Validate', 'Quality, speed, residuals'], ['Ship', 'Interactive final product']] },
  { name: 'AI AGENT', outcome: 'MONITORED TOOL-USING API', stages: [['Understand', 'Map the user intent'], ['Research', 'Select models + tools'], ['Categorize', 'Actions, data, constraints'], ['Prototype', 'Orchestrate the workflow'], ['Validate', 'Test failures + guardrails'], ['Ship', 'Observe and iterate']] },
  { name: 'SOFTWARE PRODUCT', outcome: 'RELIABLE REAL-TIME EXPERIENCE', stages: [['Understand', 'Study the user workflow'], ['Research', 'Choose the architecture'], ['Categorize', 'Services, states, events'], ['Prototype', 'Build the vertical slice'], ['Validate', 'QA, latency, resilience'], ['Ship', 'Deploy measurable value']] },
] as const;

function ExperimentJourney() {
  const [scenario, setScenario] = useState(0);
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive((value) => { if (value === 5) { setScenario((s) => (s + 1) % journeys.length); return 0; } return value + 1; }), 1350); return () => window.clearInterval(timer); }, []);
  const journey = journeys[scenario];
  return <div className="journey-shell"><div className="journey-head"><span>LIVE EXPERIMENT SYSTEM</span><b>{journey.name}</b></div><div className="journey-track">{journey.stages.map(([title, detail], index) => <div className={`journey-node ${index < active ? 'done' : ''} ${index === active ? 'active' : ''}`} key={title}><i>0{index + 1}</i><div><b>{title}</b><small>{detail}</small></div><em>{index < active ? '✓' : index === active ? 'RUNNING' : 'QUEUED'}</em></div>)}</div><div className="journey-output"><span>OUTCOME</span><b>{journey.outcome}</b><i /></div></div>;
}

const career = [
  ['2020', 'College Completed', 'Academic foundation', 'Completed higher secondary education and prepared for the next stage in computer science.', 'COMPLETED'],
  ['2022—MAY 2026', 'CSE Graduate', 'North South University', 'Built foundations in software engineering, machine learning, deep learning, and computer vision.', 'COMPLETED'],
  ['2025—2026', 'Applied AI Research', 'Senior Design + Directed Research', 'Began university research in lightweight diffusion, image inpainting, and object removal.', 'COMPLETED'],
  ['2026—MAY 2026', 'Research Intern', 'Image Segmentation & Object Removal', 'Advanced a multi-stage computer-vision pipeline from failure analysis to reproducible results.', 'COMPLETED'],
  ['AUG 2026—NOW', 'AI Engineer Intern', 'NEXVIX', 'Engineering AI capabilities and dependable software workflows for real product use.', 'CURRENT'],
  ['NEXT', 'AI / Software Engineer', 'High-impact product team', 'Ready to build intelligent systems that move from research evidence to production value.', 'OPEN'],
] as const;

function CareerTrack() {
  return <div className="career-track">{career.map(([time, title, place, detail, status], index) => <article className={status === 'CURRENT' ? 'current' : ''} key={title}><div className="career-rail"><i /><span>{time}</span></div><div className="career-card"><div><small>{status}</small><b>0{index + 1}</b></div><h3>{title}</h3><h4>{place}</h4><p>{detail}</p></div></article>)}</div>;
}

function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState('sending');
    const form = event.currentTarget;
    try {
      const response = await fetch('https://formsubmit.co/ajax/mdminhajul.islam1823@gmail.com', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Message could not be sent');
      form.reset(); setState('sent');
    } catch { setState('error'); }
  }
  return <form className="contact-form" onSubmit={submit}><input type="hidden" name="_subject" value="Portfolio inquiry for Md. Minhajul Islam" /><label><span>Your name</span><input name="name" required placeholder="Jane Smith" /></label><label><span>Work email</span><input name="email" type="email" required placeholder="jane@company.com" /></label><label className="message-field"><span>What should we build?</span><textarea name="message" required rows={5} placeholder="Tell me about the role, product, or problem…" /></label><button type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : state === 'sent' ? 'Message sent ✓' : 'Send message'} <ArrowUpRight size={17} /></button>{state === 'error' && <p>Delivery paused. <a href={links.email}>Open your email app instead.</a></p>}</form>;
}

export default function Home() {
  return <main>
    <nav className="nav-wrap" aria-label="Main navigation"><a href="#top" className="monogram brand-name" aria-label="Home">Md. Minhajul Islam<span>.</span></a><div className="nav-links"><a href="#work">Work</a><a href="#research">Research</a><a href="#career">Career</a><a href="#about">About</a></div><a className="status-pill" href="#contact"><span /> Available to collaborate</a></nav>
    <section className="hero" id="top"><div className="hero-grid" aria-hidden="true" /><NeuralField /><div className="hero-copy"><p className="eyebrow"><span>01</span> AI ENGINEER · SOFTWARE BUILDER · RESEARCHER</p><h1>I build AI<br />that moves <em>beyond</em><br />the notebook.</h1><p className="hero-intro">I’m Md. Minhajul Islam — a CSE graduate and AI Engineer Intern at NEXVIX, turning computer vision, deep learning, and agentic ideas into tested software products.</p><div className="hero-actions"><a className="primary-action" href="#work">See engineering evidence <ArrowDown size={17} /></a><a className="text-action" href={links.github} target="_blank" rel="noreferrer"><GitFork size={18} /> GitHub</a></div></div><ExpertisePulse /><div className="hero-side-note"><MousePointer2 size={14} /> MOVE TO BEND THE FIELD</div><div className="scroll-cue">SCROLL TO EXPLORE <span /></div></section>
    <section className="signal-strip" aria-label="Core capabilities"><div><BrainCircuit /><span>Machine Learning</span><b>MODELS THAT LEARN</b></div><div><Atom /><span>Deep Learning</span><b>VISION + GENERATION</b></div><div><Code2 /><span>Software Systems</span><b>BUILT TO OPERATE</b></div><div><Microscope /><span>Research</span><b>MEASURED, REPRODUCIBLE</b></div></section>
    <section className="skills-section" id="skills"><div className="skills-intro"><p className="eyebrow"><span>02</span> ENGINEERING TOOLKIT</p><h2>Code, models,<br />and <em>systems.</em></h2><p>Built through production-minded projects, research experiments, and end-to-end software. Each capability now assembles visibly from 0% when it enters view.</p></div><SkillMatrix /></section>
    <section className="work-section" id="work"><div className="section-head"><p className="eyebrow"><span>03</span> SELECTED WORK</p><h2>From problem<br />to <em>proof.</em></h2><p>Each project explains the real problem, the system I built, and the engineering evidence behind it.</p></div><div className="project-grid">{projects.map((project) => <TiltCard key={project.title} project={project} />)}</div><a className="all-work" href={links.github} target="_blank" rel="noreferrer">Explore the complete GitHub portfolio <ArrowUpRight size={18} /></a></section>
    <section className="demo-section"><div className="demo-heading"><p className="eyebrow"><span>04</span> SYSTEMS IN MOTION</p><h2>See what the<br />projects <em>do.</em></h2><p>A rotating product-level view of the experiences and pipelines behind the repositories.</p></div><ProjectDemo /></section>
    <section className="research-section" id="research"><ExperimentJourney /><div className="research-copy"><p className="eyebrow"><span>05</span> RESEARCH PRACTICE</p><h2>Curiosity,<br />made <em>measurable.</em></h2><p>I approach AI as an engineering discipline: understand the failure, research the evidence, build the smallest convincing system, validate it, and turn the result into something people can use.</p><div className="research-facts"><div><span>Current role</span><b>AI Engineer Intern</b><small>NEXVIX · Engineering in progress</small></div><div><span>Research internship</span><b>Completed</b><small>Image Segmentation & Object Removal</small></div><div><span>Education</span><b>CSE Graduate</b><small>North South University</small></div></div><div className="paper-list"><a href={links.scholar} target="_blank" rel="noreferrer"><span>01</span><p>A Machine Learning-Driven Framework for Enhancing Cognitive Function Using tDCS and Brain Gym Interventions</p><ArrowUpRight /></a><div><span>02</span><p>Machine Learning-Enhanced Cardiovascular Disease Risk Prediction: A Clinical Intelligence Framework</p><b>FORTHCOMING</b></div></div><a className="primary-action scholar" href={links.scholar} target="_blank" rel="noreferrer">Google Scholar <ArrowUpRight size={17} /></a></div></section>
    <section className="career-section" id="career"><div className="career-heading"><p className="eyebrow"><span>06</span> CAREER SIGNAL</p><h2>A trajectory<br />built to <em>compound.</em></h2><p>Education became research. Research became engineering. The next step is building ambitious AI products with a team that values depth, ownership, and measurable impact.</p></div><CareerTrack /></section>
    <section className="about-section" id="about"><div className="portrait-shell"><div className="portrait-glow" /><img src="/minhajul-professional-v2.png" alt="Md. Minhajul Islam in a navy suit" /><div className="portrait-tag">DHAKA, BANGLADESH <span>AI ENGINEER · CSE GRADUATE</span></div></div><div className="about-copy"><p className="eyebrow"><span>07</span> THE PERSON BEHIND THE PIPELINE</p><h2>I like hard problems<br />with <em>human stakes.</em></h2><p>I combine a researcher’s skepticism with an engineer’s urgency. Whether I’m reconstructing a missing scene, designing safer conversational AI, or shipping a real-time product, the goal is the same: rigorous systems that create clear value.</p><p>Scouting leadership shaped how I work — stay calm under constraints, communicate clearly, and move a team toward the objective. I am now growing that discipline at NEXVIX as an AI Engineer Intern.</p><div className="stack-row"><span>PYTHON</span><span>PYTORCH</span><span>C++</span><span>JAVASCRIPT</span><span>SQL</span><span>GIT</span></div></div></section>
    <section className="contact-section" id="contact"><div><p className="eyebrow"><span>08</span> START A CONVERSATION</p><h2>Bring me the<br /><em>difficult</em> problem.</h2><p>Hiring for an AI or software role? Building a product that needs vision, agents, or dependable engineering? Send the context directly.</p><a className="contact-email" href={links.email}>Email me directly <ArrowUpRight size={18} /></a></div><ContactForm /></section>
    <footer><p className="eyebrow"><span>09</span> LET’S BUILD SOMETHING USEFUL</p><h2>Have a difficult problem?<br /><a href={links.email}>Let’s talk.<ArrowUpRight /></a></h2><div className="footer-row"><span>© 2026 MD. MINHAJUL ISLAM</span><div><a href={links.github} target="_blank" rel="noreferrer"><GitFork /> GitHub</a><a href={links.linkedin} target="_blank" rel="noreferrer"><Contact /> LinkedIn</a><a href={links.scholar} target="_blank" rel="noreferrer"><Microscope /> Scholar</a><a href={links.email}><Mail /> Email</a></div></div></footer>
  </main>;
}
