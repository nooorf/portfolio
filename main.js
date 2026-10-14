/* ───────────────────────── data ───────────────────────── */
const PROJECTS = [
  {
    id: "shelfwise",
    feature: true,
    color: "var(--violet)",
    cat: "Conversational AI · Information Retrieval",
    title: "Shelfwise",
    sub: "A voice-first library assistant that understands a mood, respects every constraint, and cannot invent a book.",
    metric: ["0%", "invented books across 150 adversarial cases, versus 21% for naive RAG"],
    stack: ["Qwen3-4B", "BM25 + bge", "pgvector", "FastAPI", "Whisper", "React", "three.js VRM"],
    repo: "https://github.com/nooorf/shelfwise",
    summary:
      "Ask it the way you'd ask a librarian, typed or out loud: “a dark psychological thriller, nothing supernatural, under 300 pages, on the shelf today”. Shelfwise answers only from the library's own 5,358 books, tells you which floor and shelf to walk to, and explains each pick while a talking avatar reads the answer. It all runs locally on an 8 GB laptop with no paid APIs.",
    stats: [["0.687", "nDCG@10 on the locked test split"], ["+58%", "over BM25 · +14% over BM25 + dense"], ["95.0%", "query-parser F1"], ["0%", "invented books (naive RAG 21%, LLM alone 77%)"]],
    images: [
      ["img/projects/shelfwise-landing.jpg", "Describe a mood, find it on the shelf", "The Shelfwise landing page with the avatar behind an arc of book covers"],
      ["img/projects/shelfwise-chat.jpg", "Every constraint becomes a chip; the top pick shows its floor and shelf", "Chat answering a request for a dark psychological thriller under 300 pages, with constraint chips and the top pick on stage"],
      ["img/projects/shelfwise-voice.jpg", "Live voice session: ask out loud, the avatar answers with numbered picks", "The avatar answering a spoken request for gothic horror novels with five numbered books"],
      ["img/projects/shelfwise-details.jpg", "Book details: what it's like, and where every copy is", "A book detail panel listing tone, romance, violence, pace and the shelf location of each copy"],
      ["img/projects/shelfwise-bench.jpg", "The /bench page: every claim, measured", "Benchmark cards showing nDCG@10, 0% invented books, 95% constraint F1 and search latency"],
    ],
    pipeline: [
      ["Speech in", "Whisper large-v3-turbo · Silero VAD"],
      ["Query parsing", "Qwen3-4B → constraints, preferences, topic"],
      ["Filter-first retrieval", "SQL allowed set · BM25 + dense · facets"],
      ["Grounded narration", "ID-constrained LLM + sentence validator"],
      ["Voice + avatar", "Kokoro streaming TTS · VRM lip-sync"],
    ],
    highlights: [
      "<b>Hybrid retrieval over 5,358 books</b> reaching 0.687 nDCG@10, 14% better than BM25 + dense search and 58% better than BM25 alone",
      "<b>A Qwen3-4B query parser</b> (95.0% F1) that splits a request into hard constraints, soft preferences and a topic, with a deterministic rules fallback",
      "<b>Negation that works</b>: LLM-tagged book facets turn “without the romance” into a filter instead of a vector that drifts towards romance, halving constraint violations from 62% to 31%",
      "<b>No invented books</b> across 150 adversarial cases, thanks to ID-constrained generation and validation, against 21% with naive RAG and 77% with an LLM on its own",
      "<b>A fully local voice assistant</b> with streaming TTS, barge-in interruption and a three.js VRM avatar: 59 FPS, 4 ms median lip-sync offset and 0.73 s to first frame on an 8 GB laptop",
      "<b>Evaluation built to be trusted</b>: 12,331 relevance judgments, paraphrase-separated dev/test splits and paired bootstrap confidence intervals",
    ],
    note: "Behind it sits a simulated library: four floors, multiple copies per title and a year of loans from 2,000 simulated patrons, so “on the shelf today” changes as you use it.",
  },
  {
    id: "sentinel",
    feature: true,
    color: "var(--cyan)",
    cat: "MLOps · Real-time ML",
    title: "Sentinel",
    sub: "Real-time card-fraud scoring that watches its own inputs, retrains itself, and only promotes a model that earns it.",
    metric: ["−46%", "false alarms against a logistic-regression baseline at the same recall target"],
    stack: ["XGBoost", "Isolation Forest", "FastAPI", "Evidently", "MLflow", "Docker", "Azure ML"],
    repo: "https://github.com/nooorf/sentinel",
    summary:
      "An end-to-end ML system for card fraud: a scoring API that answers in milliseconds, drift monitoring on everything it scores, gated retraining with versioned rollback, and a fraud-operations console, all shipped as one Docker container. It is trained on 284K real card transactions, of which only 0.17% are fraud.",
    stats: [["9.7 ms", "p99 latency over HTTP"], ["260 / s", "requests at concurrency 8"], ["0.41 → 0.54", "review-queue precision"], ["−62%", "fraud cost vs no screening"]],
    images: [
      ["img/projects/sentinel-overview.jpg", "Operations console: impact on a held-out, time-ordered test window", "Sentinel overview showing 46% fewer false alarms, 31% fewer reviews and the precision-recall curve"],
      ["img/projects/sentinel-score.jpg", "Scoring a real held-out transaction through POST /predict", "A fraudulent transaction scored at 0.997 probability and sent to review"],
      ["img/projects/sentinel-drift.jpg", "A simulated traffic shift raising an Evidently drift alert", "Drift monitoring grid showing 12 of 29 features drifting in a shifted batch"],
      ["img/projects/sentinel-registry.jpg", "Model registry with the promotion gate and rollback", "Model versions, retraining runs, and retrain and roll back controls"],
    ],
    pipeline: [
      ["Offline training", "Time-ordered split · LR, XGBoost, Isolation Forest"],
      ["Scoring API", "POST /predict · probability, anomaly rank, decision"],
      ["Drift monitoring", "Evidently · feature + prediction drift"],
      ["Gated retraining", "Validation gate · promote or reject"],
      ["Registry", "SHA-256 versions · hot swap · rollback"],
    ],
    highlights: [
      "<b>9.7 ms p99 end to end</b> at 260 requests/s, with about 2 ms of that spent in the model itself",
      "<b>Precision up from 0.41 to 0.54</b> through cost-aware threshold tuning, which cut false alarms by 46%, manual reviews by 31% and fraud cost by 62%",
      "<b>Leakage-free temporal evaluation</b> on a dataset with 0.17% fraud prevalence, scored on a held-out window of 56,746 transactions the model never saw",
      "<b>It watches itself</b>: Evidently compares live traffic with the serving model's reference data and raises drift alerts that can trigger retraining",
      "<b>Safe promotion</b>: a candidate replaces the serving model only after passing a validation gate, with SHA-256-verified versions, zero-downtime hot swap and one-click rollback",
      "<b>Production engineering</b>: 42 automated tests, GitHub Actions CI, MLflow tracking, a single Docker container and Azure ML blue/green deployment scripts",
    ],
    note: "Data: ULB / Worldline credit card fraud dataset, 284,807 transactions over two days with 0.17% fraud.",
  },
  {
    id: "academiq",
    feature: true,
    color: "var(--pink)",
    cat: "RAG · Information Retrieval",
    title: "AcademIQ",
    sub: "Evidence-grounded answers to university policy questions, each one cited down to the section and page.",
    metric: ["7×", "faster retrieval than exact TF-IDF, with +6 pp precision"],
    stack: ["Python", "scikit-learn", "MinHash LSH", "SimHash", "MapReduce", "FastAPI", "LLM APIs"],
    repo: "https://github.com/nooorf/AcademIQ",
    summary:
      "A production-grade retrieval and question-answering engine that turns NUST's dense undergraduate and postgraduate handbooks into a fast, auditable knowledge system. The LLM is the last step and can only use what retrieval finds, so every answer ships with its source, section and page, and the system says so when the handbook doesn't cover a question.",
    stats: [["7×", "faster than exact TF-IDF"], ["+6 pp", "precision over exact TF-IDF"], ["54 ms", "retrieval at 10× corpus"], ["< 1 ms", "cached responses"]],
    images: [
      ["img/projects/academiq-ask.jpg", "A cited answer, with the retrieved sections plotted in the handbook's TF-IDF space", "AcademIQ answering an attendance policy question with numbered citations beside a map of handbook sections"],
      ["img/projects/academiq-compare.jpg", "Comparing TF-IDF, MinHash-LSH, SimHash and hybrid RRF on one question", "Side-by-side latency and rank agreement for four retrieval methods"],
      ["img/projects/academiq-timings.jpg", "Per-stage timings and ranked sources for every answer", "Stage timings for retrieval, re-ranking and generation above the list of cited sources"],
      ["img/projects/academiq-health.jpg", "System health: latency percentiles, cache hit rate and precision@k", "Dashboard with per-query latency, cache statistics, precision by method and method usage"],
    ],
    pipeline: [
      ["Query cache", "Thread-safe LRU + TTL · SON-warmed"],
      ["Hybrid retrieval", "TF-IDF · MinHash-LSH · SimHash"],
      ["Rank fusion", "Reciprocal Rank Fusion · diversity control"],
      ["Grounded synthesis", "Evidence-constrained LLM · extractive fallback"],
      ["Answer", "Source · section · page · latency"],
    ],
    highlights: [
      "<b>7× faster retrieval</b> than exact TF-IDF while <b>gaining +6 pp precision</b> through hybrid retrieval and re-ranking",
      "<b>54 ms retrieval at 10× corpus scale</b>, with sub-millisecond responses for cached queries",
      "<b>Reciprocal Rank Fusion</b> of TF-IDF, MinHash-LSH and SimHash into a single ranking, with a diversity penalty so one section can't crowd out the rest",
      "<b>Grounded synthesis</b> that answers strictly from retrieved evidence, with an extractive fallback that keeps answers reliable without an LLM",
      "<b>Parallel MapReduce-style indexing</b> and <b>SON frequent-query mining</b> to pre-warm a thread-safe LRU/TTL cache",
    ],
  },
  {
    id: "cortexpi",
    wide: true,
    color: "var(--teal)",
    cat: "Clinical AI · Federated Learning",
    title: "CortexPI",
    sub: "Federated ICU sepsis and deterioration prediction across hospitals, without patient records ever leaving their source.",
    metric: ["5", "hospital nodes trained with FedAvg + differential privacy"],
    stack: ["PyTorch", "Mamba SSM", "GRU-D", "Triton", "Kafka", "Spark", "Delta Lake"],
    summary:
      "A multimodal patient-deterioration platform that predicts sepsis risk from ECG waveforms and irregular ICU vitals. Training is federated across distributed hospital nodes, so no patient record ever leaves the hospital it came from.",
    stats: [["5", "federated hospital nodes"], ["77×", "faster GPU ECG preprocessing"], ["< 100 ms", "per-patient latency target"], ["2×T4", "pipeline-parallel training"]],
    pipeline: [
      ["Stream ingestion", "Kafka · live vitals + ECG"],
      ["GPU stream processing", "Triton · RAPIDS cuDF · Spark · Delta Lake"],
      ["Deep learning core", "Mamba ECG · GRU-D vitals · Graph Attention"],
      ["Federated training", "FedAvg + DP · dual-GPU pipeline parallelism"],
      ["Output", "Sepsis risk + calibrated uncertainty"],
    ],
    highlights: [
      "<b>Multimodal architecture</b> combining a Mamba state-space ECG encoder, a GRU-D vitals encoder with learned missingness decay, and graph attention across clinical signals",
      "<b>Five-node federated pipeline</b> with FedAvg and differential privacy under formal (ε, δ) guarantees, trained across distributed hospital data with dual-GPU pipeline parallelism",
      "<b>GPU-accelerated ECG preprocessing</b> with NVIDIA Triton; I contributed to the optimization within a benchmark that cut preprocessing from 2,400 ms to 31 ms (77×)",
      "<b>Distributed inference</b> through GPU acceleration and parallel execution, targeting under 100 ms per patient across a Kafka-based streaming architecture",
      "<b>EWC continual learning</b> against catastrophic forgetting as patient populations drift",
      "<b>Conformal prediction</b> wrapping every risk score in calibrated, distribution-free uncertainty bounds",
    ],
    note: "Data: PhysioNet 2012 · PTB-XL  ·  Compute: Apple M2 Pro · Kaggle dual-T4",
  },
  {
    id: "brats",
    wide: true,
    color: "var(--blue)",
    cat: "Medical Imaging · 3D Vision",
    title: "3D Brain Tumor Segmentation",
    sub: "Multimodal MRI fusion with a compact MONAI 3D U-Net.",
    metric: ["0.77", "Dice on enhancing tumor, the clinically critical class"],
    stack: ["PyTorch", "MONAI", "3D U-Net", "BraTS 2020", "W&B"],
    summary:
      "A volumetric deep-learning pipeline that fuses four complementary MRI sequences (T1, T1ce, T2 and FLAIR) to deliver voxel-precise, multi-class brain tumor segmentation.",
    stats: [["0.7652", "Dice · enhancing tumor"], ["0.6479", "mean validation Dice"], ["55", "held-out patients"], ["4.8 M", "parameters"]],
    pipeline: [
      ["Multimodal MRI", "T1 · T1ce · T2 · FLAIR fusion"],
      ["3D preprocessing", "Normalization · foreground-biased 96³ patches"],
      ["MONAI 3D U-Net", "4.8 M params · Dice + Focal loss"],
      ["Inference", "Sliding-window, full-volume"],
      ["Evaluation", "Patient-level split · W&B tracked"],
    ],
    highlights: [
      "<b>0.7652 Dice on Enhancing Tumor</b>, the clinically critical sub-region",
      "<b>4-modal 3D MRI fusion</b> into a single volumetric input for voxel-level reasoning",
      "<b>Foreground-biased sampling</b> and a <b>hybrid Dice + Focal loss</b> to counter extreme class imbalance",
      "<b>Leak-proof evaluation</b> with strict patient-level splits and independent evaluation, fully tracked in Weights & Biases",
    ],
  },
  {
    id: "spatio",
    wide: true,
    color: "var(--violet)",
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
    id: "london",
    wide: true,
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
  ["Python", "cyan"], ["PyTorch", "pink"], ["Hugging Face Transformers", "violet"], ["Sentence Transformers", "blue"], ["scikit-learn", "teal"],
  ["XGBoost", "cyan"], ["MONAI", "pink"], ["Stable-Baselines3", "violet"], ["Gymnasium", "blue"], ["Ollama", "teal"],
  ["pgvector", "cyan"], ["Triton", "pink"], ["SHAP", "violet"], ["pandas", "teal"], ["NumPy", "cyan"], ["SciPy", "blue"],
];
const STACK_B = [
  ["FastAPI", "pink"], ["PostgreSQL", "cyan"], ["SQLAlchemy", "teal"], ["Redis", "blue"], ["Docker", "violet"],
  ["GitHub Actions", "cyan"], ["MLflow", "teal"], ["Evidently", "pink"], ["Azure ML", "blue"], ["Weights & Biases", "violet"],
  ["Apache Kafka", "cyan"], ["Apache Spark", "pink"], ["React", "teal"], ["TypeScript", "blue"], ["Node.js", "violet"],
  ["three.js", "cyan"], ["SQL", "pink"], ["C++", "teal"],
];

const TYPED = ["Hybrid retrieval · grounded LLMs · voice AI", "Real-time ML · drift monitoring · MLOps", "Deep reinforcement learning for 6G", "End-to-end ML: data → model → deployment"];

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
const GITHUB_ICON = '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2.2c-3.34.73-4.04-1.42-4.04-1.42-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.31-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.62-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3"/></svg>';
const bento = $("#bento");
let featureCount = 0;
PROJECTS.forEach((p, i) => {
  const card = document.createElement("button");
  card.type = "button";
  const flip = p.feature && featureCount++ % 2 === 1;
  card.className = `card reveal${p.feature ? " feature" : p.wide ? " wide" : ""}${flip ? " flip" : ""}`;
  card.style.setProperty("--c", p.color);
  card.style.setProperty("--d", `${p.feature ? 0 : (i % 2) * 0.08}s`);
  card.setAttribute("aria-haspopup", "dialog");
  const body = `
    <div class="card-top"><span class="card-cat">${p.cat}</span>${p.status ? `<span class="card-status">${p.status}</span>` : ""}</div>
    <h3>${p.title}</h3>
    <p class="card-sub">${p.sub}</p>
    <div class="card-metric"><strong>${p.metric[0]}</strong><span>${p.metric[1]}</span></div>
    <div class="card-foot"><span class="card-stack">${p.stack.join(" · ")}</span><span class="card-open">${arrow}</span></div>`;
  card.innerHTML = p.feature
    ? `<div class="card-body">${body}</div>
       <div class="card-shot"><div class="shot-bar"><span></span><span></span><span></span></div><img src="${p.images[0][0]}" alt="${p.images[0][2]}" loading="lazy" decoding="async" /></div>`
    : body;
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
    ${p.images ? `<p class="m-h">Screenshots</p>
    <div class="gallery">${p.images.map(([src, cap, alt]) => `<figure><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${alt}" loading="lazy" decoding="async" /></a><figcaption>${cap}</figcaption></figure>`).join("")}</div>` : ""}
    <p class="m-h">Architecture</p>
    <div class="pipeline">${p.pipeline.map(([t, d]) => `<div class="pipe"><b>${t}</b><span>${d}</span></div>`).join("")}</div>
    <p class="m-h">Highlights</p>
    <ul class="ticks">${p.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
    ${p.note ? `<p class="m-note">${p.note}</p>` : ""}
    <p class="m-h">Stack</p>
    <div class="tags">${p.stack.map((s) => `<span>${s}</span>`).join("")}</div>
    ${p.repo ? `<a class="btn btn-ghost m-repo" href="${p.repo}" target="_blank" rel="noopener">${GITHUB_ICON} View the code on GitHub</a>` : ""}`;
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
