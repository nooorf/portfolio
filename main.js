/* ───────────────────────── data ───────────────────────── */
const PROJECTS = [
  {
    id: "cortexpi",
    wide: true,
    color: "var(--cyan)",
    cat: "Clinical AI · Federated Learning",
    title: "CortexPI",
    sub: "Federated ICU deterioration intelligence: real-time, privacy-preserving risk prediction across hospitals.",
    metric: ["5", "hospital nodes trained with FedAvg + differential privacy"],
    stack: ["PyTorch", "Mamba SSM", "Triton", "RAPIDS", "Spark", "Kafka", "Delta Lake"],
    summary:
      "A real-time, privacy-preserving clinical AI platform that predicts ICU patient deterioration across distributed hospital nodes, without a single patient record ever leaving its source hospital.",
    stats: [["5", "federated hospital nodes"], ["(ε, δ)", "formal DP guarantees"], ["3", "clinical prediction heads"], ["2×T4", "pipeline-parallel training"]],
    pipeline: [
      ["Stream ingestion", "Kafka · exactly-once · live vitals + ECG"],
      ["GPU stream processing", "RAPIDS cuDF + Spark Streaming · Delta Lake"],
      ["Deep learning core", "Mamba ECG · GRU-D vitals · Graph Attention"],
      ["Federated training", "FedAvg + DP · torchrun 2×T4"],
      ["Output", "Deterioration risk + calibrated uncertainty"],
    ],
    highlights: [
      "<b>Mamba state-space ECG encoder</b> for long-range cardiac sequence modeling, outperforming LSTM baselines on irregular clinical time series",
      "<b>GRU-D vitals encoder</b> with learned missingness decay, built for the extreme sparsity of real ICU data",
      "<b>Custom Triton GPU kernel</b> running Pan-Tompkins QRS detection fully on-GPU, with zero CPU round-trips",
      "<b>FedAvg + differential privacy</b> across 5 hospital nodes with formal (ε, δ) guarantees",
      "<b>Graph Attention Network</b> modeling relational structure across clinical signals, driving 3 prediction heads",
      "<b>EWC continual learning</b> against catastrophic forgetting as patient populations drift",
      "<b>Conformal prediction</b> wrapping every risk score in calibrated, distribution-free uncertainty bounds",
    ],
    note: "Data: PhysioNet 2012 · PTB-XL  ·  Compute: Apple M2 Pro · Kaggle dual-T4",
  },
  {
    id: "academiq",
    wide: true,
    color: "var(--violet)",
    cat: "Retrieval · LLM Systems",
    title: "AcademIQ",
    sub: "Evidence-grounded AI search: hybrid retrieval and grounded LLM answers, each one cited down to the page.",
    metric: ["7×", "faster retrieval than exact TF-IDF, with +6 pp precision"],
    stack: ["Python", "scikit-learn", "MinHash LSH", "SimHash", "MapReduce", "OpenAI API"],
    summary:
      "A production-grade retrieval and question-answering engine that turns dense university policy handbooks into a fast, auditable natural-language knowledge system. Every answer ships with its source, section and page.",
    stats: [["7×", "faster than exact TF-IDF"], ["+6 pp", "precision recovered"], ["54 ms", "retrieval at 10× corpus"], ["< 1 ms", "cached responses"]],
    pipeline: [
      ["Query cache", "Thread-safe LRU + TTL · SON-warmed"],
      ["Hybrid retrieval", "TF-IDF · MinHash-LSH · SimHash"],
      ["Rank fusion", "Reciprocal Rank Fusion · diversity control"],
      ["Grounded synthesis", "Evidence-constrained LLM · extractive fallback"],
      ["Answer", "Source · section · page · latency"],
    ],
    highlights: [
      "<b>7× faster retrieval</b> than exact TF-IDF while <b>recovering +6 pp precision</b> through hybrid retrieval and re-ranking",
      "<b>54 ms retrieval at 10× corpus scale</b>, keeping approximate search well inside the sub-100 ms regime",
      "<b>Reciprocal Rank Fusion</b> of TF-IDF, MinHash-LSH and SimHash into a single relevance ranking",
      "<b>Hallucination-resistant synthesis</b> constrained strictly to retrieved evidence",
      "<b>MapReduce-style parallel indexing</b> and <b>SON frequent-pattern mining</b> to pre-warm the cache",
    ],
  },
  {
    id: "spatio",
    color: "var(--pink)",
    cat: "Generative AI · Diffusion",
    status: "In progress",
    title: "SpatioArchitect",
    sub: "Satellite image + one sentence → a furnished, walkable 3D house.",
    metric: ["90.4%", "boundary IoU on the proof of concept"],
    stack: ["PyTorch", "HouseDiffusion", "SAM 2", "FastAPI", "React", "three.js"],
    summary:
      "Give it a satellite image of a real plot and one sentence, like “3-bedroom modern house with 2 bathrooms”, and it generates a boundary-compliant, fully furnished 3D house you can walk through and edit in the browser.",
    stats: [["90.4%", "boundary IoU (PoC)"], ["100", "plot stratified benchmark"], ["4", "baselines compared"], ["≥ 60 cm", "guaranteed circulation"]],
    pipeline: [
      ["Vision", "SAM 2 plot segmentation · GSD scale · setbacks"],
      ["Brief → graph", "Program + feasibility gate · bubble prior"],
      ["Guided diffusion", "HouseDiffusion + training-free projection"],
      ["Construction", "3D shell · fixtures · SAT collision"],
      ["Walkthrough", "First-person editor · oracle-validated"],
    ],
    highlights: [
      "<b>Training-free boundary-guided diffusion</b>: projects HouseDiffusion's clean estimate onto boundary-compliant layouts inside the sampling loop, with zero retraining",
      "<b>Zero-shot plot extraction with SAM 2</b>, with Web-Mercator GSD calibration turning map pixels into real metres",
      "<b>Semantically complete interiors</b> with fixture manifests, plumbing-aware wet walls and exact SAT collision checks",
      "<b>Provable navigability</b>: a morphological circulation oracle guarantees a ≥ 60 cm path to every door and fixture",
      "<b>Research-grade evaluation</b>: paired Wilcoxon + Holm statistics, ablations and a user study",
    ],
    note: "Final Year Project · 3-person team. My core area is deep learning & mathematical modelling.",
  },
  {
    id: "brats",
    color: "var(--blue)",
    cat: "Medical Imaging · 3D Vision",
    title: "3D Brain Tumor Segmentation",
    sub: "Multi-modal MRI fusion with a compact MONAI 3D U-Net.",
    metric: ["0.77", "Dice on enhancing tumor, the clinically critical class"],
    stack: ["PyTorch", "MONAI", "3D U-Net", "BraTS 2020", "W&B"],
    summary:
      "A volumetric deep-learning pipeline that fuses four complementary MRI sequences (T1, T1ce, T2 and FLAIR) to deliver voxel-precise, multi-class brain tumor segmentation.",
    stats: [["0.7652", "Dice · enhancing tumor"], ["0.6479", "mean validation Dice"], ["55", "held-out patients"], ["4.8 M", "parameters"]],
    pipeline: [
      ["Multi-modal MRI", "T1 · T1ce · T2 · FLAIR fusion"],
      ["3D preprocessing", "Normalization · foreground-biased 96³ patches"],
      ["MONAI 3D U-Net", "4.8 M params · Dice + Focal loss"],
      ["Inference", "Sliding-window, full-volume"],
      ["Evaluation", "Patient-level split · W&B tracked"],
    ],
    highlights: [
      "<b>0.7652 Dice on Enhancing Tumor</b>, the clinically critical sub-region",
      "<b>4-modal 3D MRI fusion</b> into a single volumetric input for voxel-level reasoning",
      "<b>Hybrid Dice + Focal loss</b> to counter extreme class imbalance",
      "<b>Leak-proof evaluation</b> with strict patient-level splits, fully tracked in Weights & Biases",
    ],
  },
  {
    id: "london",
    color: "var(--teal)",
    cat: "Geospatial ML · XAI",
    title: "London Crime Intelligence",
    sub: "City-scale risk forecasting with a 3D digital twin and what-if simulation.",
    metric: ["0.95", "R² on continuous risk-score regression"],
    stack: ["XGBoost", "scikit-learn", "SHAP", "GeoPandas", "PyDeck", "Streamlit"],
    summary:
      "A geospatial intelligence platform that forecasts crime risk across every London neighbourhood (LSOA), fusing census, socio-economic, POI and temporal signals into an ensemble ML engine, explained with SHAP and rendered as an interactive 3D digital twin.",
    stats: [["0.95", "R² regression"], ["83%", "3-class accuracy"], ["SHAP", "per-prediction attribution"], ["3D", "geospatial digital twin"]],
    pipeline: [
      ["Data fusion", "Census · crime · POIs · temporal"],
      ["Features", "LSOA joins · spatial + temporal"],
      ["Ensemble ML", "XGBoost · Random Forest"],
      ["Explainability", "SHAP attribution"],
      ["Digital twin", "3D map · what-if simulation"],
    ],
    highlights: [
      "<b>83% accuracy</b> classifying Low / Medium / High risk with XGBoost",
      "<b>0.95 R²</b> on continuous risk-score regression with a Random Forest ensemble",
      "<b>What-if scenario engine</b> that perturbs socio-economic levers and quantifies the risk delta in real time",
      "<b>SHAP explainability</b> surfacing the drivers behind every individual prediction",
    ],
  },
];

const STACK_A = [
  ["Python", "cyan"], ["PyTorch", "pink"], ["TensorFlow", "violet"], ["scikit-learn", "blue"], ["MONAI", "teal"],
  ["OpenCV", "cyan"], ["Triton", "pink"], ["XGBoost", "blue"], ["SHAP", "teal"],
  ["Weights & Biases", "violet"], ["LLMs & RAG", "cyan"],
];
const STACK_B = [
  ["Apache Spark", "pink"], ["Apache Kafka", "cyan"], ["RAPIDS", "teal"], ["Delta Lake", "blue"], ["Pandas", "violet"],
  ["NumPy", "cyan"], ["GeoPandas", "teal"], ["FastAPI", "pink"], ["React", "cyan"], ["TypeScript", "blue"],
  ["three.js", "violet"], ["Docker", "blue"], ["Linux", "teal"], ["C++", "pink"], ["Java", "violet"],
];

const TYPED = ["Deep Learning · Generative AI · LLM Systems", "RAG · Agentic AI · Real-time ML", "Reinforcement learning for 6G", "End-to-end ML: data → model → deployment"];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);

/* ───────────────────────── nav ───────────────────────── */
const nav = $("#nav");
const toggle = $("#navToggle");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", false); })
);
const navMap = new Map([...document.querySelectorAll(".nav-links a:not(.nav-cta)")].map((a) => [a.getAttribute("href").slice(1), a]));
{
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navMap.forEach((a) => a.classList.remove("active"));
      navMap.get(e.target.id)?.classList.add("active");
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  navMap.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

/* ───────────────────────── typing ───────────────────────── */
(function typer() {
  const el = $("#typed");
  if (reduceMotion) { el.textContent = TYPED[0]; return; }
  let line = 0, i = 0, deleting = false;
  const tick = () => {
    const full = TYPED[line];
    el.textContent = full.slice(0, i);
    if (!deleting && i < full.length) { i++; setTimeout(tick, 42 + Math.random() * 40); }
    else if (!deleting) { deleting = true; setTimeout(tick, 2100); }
    else if (i > 0) { i--; setTimeout(tick, 18); }
    else { deleting = false; line = (line + 1) % TYPED.length; setTimeout(tick, 350); }
  };
  setTimeout(tick, 700);
})();

/* ───────────────────────── neural field canvas ───────────────────────── */
(function neural() {
  const canvas = $("#net");
  const ctx = canvas.getContext("2d");
  const COLORS = ["34,211,238", "139,92,246", "236,72,153", "59,130,246"];
  let w, h, dpr, nodes = [], pulses = [], raf;
  const mouse = { x: -9999, y: -9999 };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(110, (w * h) / 13000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.8,
      c: COLORS[(Math.random() * COLORS.length) | 0],
    }));
    pulses = [];
  }
  const LINK = 140;

  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      const dx = n.x - mouse.x, dy = n.y - mouse.y, d2 = dx * dx + dy * dy;
      if (d2 < 22000) { const f = 0.6 / Math.sqrt(d2 + 1); n.x += dx * f; n.y += dy * f; }
    }
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
        if (d < LINK) {
          ctx.strokeStyle = `rgba(${a.c},${(1 - d / LINK) * 0.22})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          if (pulses.length < 14 && Math.random() < 0.0009) pulses.push({ a, b, t: 0 });
        }
      }
    }
    pulses = pulses.filter((p) => p.t <= 1);
    for (const p of pulses) {
      p.t += 0.02;
      const x = p.a.x + (p.b.x - p.a.x) * p.t, y = p.a.y + (p.b.y - p.a.y) * p.t;
      const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
      g.addColorStop(0, `rgba(${p.a.c},.95)`); g.addColorStop(1, `rgba(${p.a.c},0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
    }
    for (const n of nodes) {
      ctx.fillStyle = `rgba(${n.c},.85)`;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", () => { cancelAnimationFrame(raf); resize(); reduceMotion ? frame1() : frame(); });
  canvas.parentElement.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
  const frame1 = () => { frame(); cancelAnimationFrame(raf); };
  // pause when hero is off-screen
  new IntersectionObserver(([e]) => {
    cancelAnimationFrame(raf);
    if (e.isIntersecting) reduceMotion ? frame1() : frame();
  }).observe(canvas);
})();

/* ───────────────────────── RIS panel cells ───────────────────────── */
(function ris() {
  const g = $("#risCells");
  if (!g) return;
  const NS = "http://www.w3.org/2000/svg";
  const cols = ["#22D3EE", "#8B5CF6", "#EC4899"];
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 3; c++) {
      const rect = document.createElementNS(NS, "rect");
      rect.setAttribute("x", c * 18); rect.setAttribute("y", r * 16);
      rect.setAttribute("width", 14); rect.setAttribute("height", 12); rect.setAttribute("rx", 2.5);
      rect.setAttribute("fill", cols[(r + c) % 3]);
      rect.setAttribute("class", "ris-cell");
      rect.style.animationDelay = `${-(r * 0.35 + c * 0.6)}s`;
      g.appendChild(rect);
    }
})();

/* ───────────────────────── projects ───────────────────────── */
const arrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const bento = $("#bento");
PROJECTS.forEach((p, i) => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = `card reveal${p.wide ? " wide" : ""}`;
  card.style.setProperty("--c", p.color);
  card.style.setProperty("--d", `${(i % 3) * 0.08}s`);
  card.setAttribute("aria-haspopup", "dialog");
  card.innerHTML = `
    <div class="card-top"><span class="card-cat">${p.cat}</span>${p.status ? `<span class="card-status">${p.status}</span>` : ""}</div>
    <h3>${p.title}</h3>
    <p class="card-sub">${p.sub}</p>
    <div class="card-metric"><strong>${p.metric[0]}</strong><span>${p.metric[1]}</span></div>
    <div class="card-foot"><span class="card-stack">${p.stack.join(" · ")}</span><span class="card-open">${arrow}</span></div>`;
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
  card.addEventListener("click", () => openProject(p));
  bento.appendChild(card);
});

const modal = $("#modal");
const modalBody = $("#modalBody");
function openProject(p) {
  modal.style.setProperty("--c", p.color);
  modalBody.innerHTML = `
    <div class="m-hero">
      <span class="card-cat">${p.cat}</span>
      <h3 id="mTitle">${p.title}</h3>
      <p>${p.summary}</p>
    </div>
    <div class="m-stats">${p.stats.map(([v, l]) => `<div class="m-stat"><strong>${v}</strong><span>${l}</span></div>`).join("")}</div>
    <p class="m-h">Architecture</p>
    <div class="pipeline">${p.pipeline.map(([t, d]) => `<div class="pipe"><b>${t}</b><span>${d}</span></div>`).join("")}</div>
    <p class="m-h">Highlights</p>
    <ul class="ticks">${p.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
    ${p.note ? `<p class="m-note">${p.note}</p>` : ""}
    <p class="m-h">Stack</p>
    <div class="tags">${p.stack.map((s) => `<span>${s}</span>`).join("")}</div>`;
  modal.showModal();
  modalBody.scrollTop = 0;
  document.body.style.overflow = "hidden";
}
modal.addEventListener("close", () => { document.body.style.overflow = ""; });
$("#modalClose").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

/* ───────────────────────── marquee ───────────────────────── */
function fill(id, items) {
  const html = items.map(([n, c]) => `<span class="pill" style="--c:var(--${c})"><i></i>${n}</span>`).join("");
  $(id).innerHTML = html + html.replace(/class="pill"/g, 'class="pill" aria-hidden="true"');
}
fill("#trackA", STACK_A);
fill("#trackB", STACK_B);

/* ───────────────────────── reveal───────────────────────── */
const revealIO = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    revealIO.unobserve(e.target);
  }),
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".hero .reveal").forEach((el, i) => el.style.setProperty("--d", `${0.1 + i * 0.09}s`));
document.querySelectorAll(".xp.reveal").forEach((el, i) => el.style.setProperty("--d", `${i * 0.08}s`));
document.querySelectorAll(".reveal").forEach((el) => revealIO.observe(el));

/* ───────────────────────── misc ───────────────────────── */
$("#year").textContent = new Date().getFullYear();
$("#copyEmail").addEventListener("click", async () => {
  const btn = $("#copyEmail"), txt = $("#copyText"), email = txt.textContent;
  try {
    await navigator.clipboard.writeText(email);
    btn.classList.add("done"); txt.textContent = "Copied to clipboard ✓";
    setTimeout(() => { btn.classList.remove("done"); txt.textContent = email; }, 1800);
  } catch { window.location.href = `mailto:${email}`; }
});
