---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<style>
/* ===== CV layout helpers (for hfill-like alignment) ===== */
.cv-block { margin-bottom: 0.9rem; }
.cv-row {
  display: flex;
  justify-content: space-between;   /* like \hfill */
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}
.cv-left  { font-weight: 700; }
.cv-right { white-space: nowrap; text-align: right; }
.cv-sub {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  font-style: italic;
  color: var(--global-text-color, inherit); /* 默认跟主题文字 */
  opacity: 0.82;                              /* 轻微弱化而非硬编码灰色 */
  margin-top: 0.1rem;
}

/* 深色模式增强对比 */
@media (prefers-color-scheme: dark) {
  .cv-sub {
    opacity: 0.92;
  }
}
.cv-sub-left  { }
.cv-sub-right { white-space: nowrap; text-align: right; }
.cv-note { margin-top: 0.25rem; }
.cv-list { margin-top: 0.35rem; margin-bottom: 0.2rem; }
.cv-list li { margin-bottom: 0.2rem; }

/* mobile fine-tuning */
@media (max-width: 640px) {
  .cv-right, .cv-sub-right { white-space: normal; text-align: left; }
}
</style>

Research Profile
======
* Gamma-ray burst astrophysics (prompt emission, polarization modeling, time-series analysis).
* Multiwavelength data analysis (Chandra X-ray observations and Gaia astrometric cross-matches).
* Compact stellar binaries (double white dwarfs) and Galactic structure inference via population synthesis and Bayesian methods (Laser Interferometer Space Antenna / TianQin).

Education
======

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Huazhong University of Science and Technology</span>
    <span class="cv-right">Wuhan, China</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">School of Physics; National Gravitation Laboratory</span>
    <span class="cv-sub-right">Sep. 2025 – Jun. 2029 (expected)</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Ph.D. in Physics (Theoretical Physics, in progress)</span>
    <span class="cv-sub-right">Supervisor: <a href="http://faculty.hust.edu.cn/wangyan11/zh_CN/index.htm">Prof. Yan Wang</a></span>
  </div>
  <ul class="cv-list">
    <li>Research focus: gravitational-wave astrophysics (Galactic double white dwarfs).</li>
  </ul>
</div>

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">The University of Hong Kong</span>
    <span class="cv-right">Hong Kong SAR, China</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Department of Physics, Faculty of Science</span>
    <span class="cv-sub-right">Sep. 2023 – Jul. 2024; degree conferred Nov. 2024</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">M.Sc. in Physics</span>
    <span class="cv-sub-right">Supervisor: <a href="https://astro.physics.hku.hk/~ncy/">Assoc. Prof. Stephen Chi-Yung Ng</a></span>
  </div>
  <ul class="cv-list">
    <li>Capstone project: <em>Identifying Sources in Cygnus OB2 Using Multiwavelength Observations</em>.</li>
  </ul>
</div>

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Jilin University</span>
    <span class="cv-right">Changchun, China</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Department of Materials Science, School of Materials Science and Engineering</span>
    <span class="cv-sub-right">Sep. 2018 – Jun. 2022</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">B.Sc. in Materials Physics</span>
    <span class="cv-sub-right"></span>
  </div>
  <ul class="cv-list">
    <li>Graduation thesis: <em>Study on the Prompt Emission of Gamma-ray Bursts and its Polarization</em>.</li>
    <li>Research mentor: Prof. Mi-Xiang Lan (Center for Theoretical Physics &amp; College of Physics, Jilin University).</li>
  </ul>
</div>

Research Positions
======

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Huazhong University of Science and Technology</span>
    <span class="cv-right">Wuhan, China</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Research Assistant (contract), Department of Astronomy</span>
    <span class="cv-sub-right">Nov. 2024 – Jun. 2025</span>
  </div>
  <ul class="cv-list">
    <li>Supervisor: <a href="http://faculty.hust.edu.cn/zouyc/zh_CN/index/1489801/list/index.htm">Prof. Yuan-Chuan Zou</a>.</li>
    <li>Gamma-ray burst research (see Research Experience / Publications).</li>
  </ul>
</div>

Publications
======
<ul>
{% for post in site.publications reversed %}
  {% include archive-single-cv.html %}
{% endfor %}
</ul>

Research Experience
======

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Milky Way Structure Inference from Multi-Messenger Observations of Double White Dwarf Binaries</span>
    <span class="cv-right">Jul. 2025 – Present</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">National Gravitation Laboratory and School of Physics, Huazhong University of Science and Technology</span>
    <span class="cv-sub-right">Wuhan, China</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Ph.D. research (Supervisor: Prof. Yan Wang)</span>
    <span class="cv-sub-right"></span>
  </div>
  <ul class="cv-list">
    <li>Research focus: gravitational-wave astrophysics and Milky Way structure inference using Galactic double white dwarf binaries.</li>
    <li>Building a simulation-based inference pipeline integrating population synthesis (COSMIC) with hierarchical Bayesian inference (GWpopulation).</li>
    <li>Quantifying selection effects, detector response, and observational uncertainties for space-based gravitational-wave observations (Laser Interferometer Space Antenna / TianQin context).</li>
    <li><strong>Milestone:</strong> Ph.D. proposal approved.</li>
  </ul>
</div>

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Time-Series and Correlation Analysis of Gamma-Ray Burst Light Curves</span>
    <span class="cv-right">Oct. 2024 – Jan. 2026</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Department of Astronomy, Huazhong University of Science and Technology</span>
    <span class="cv-sub-right">Wuhan, China</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Pre-Ph.D. research (Research Assistant, contract; Supervisor: Prof. Yuan-Chuan Zou)</span>
    <span class="cv-sub-right"></span>
  </div>
  <ul class="cv-list">
    <li>Conducted gamma-ray burst light-curve analysis using detrended fluctuation analysis and Hurst exponent estimation; performed statistical correlation studies in Python.</li>
    <li>Maintained Python-based workflows for preprocessing, feature extraction, statistical analysis, and visualization.</li>
    <li>Resulted in a first-author refereed journal article.</li>
    <li>Supported by the National Square Kilometre Array Program of China (Grant No. 2022SKA0130100).</li>
  </ul>
</div>

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Identifying Sources in Cygnus OB2 Using Multiwavelength Observations</span>
    <span class="cv-right">Sep. 2023 – Jun. 2024</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Department of Physics, Faculty of Science, The University of Hong Kong</span>
    <span class="cv-sub-right">Hong Kong SAR, China</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">M.Sc. capstone project (Supervisor: Assoc. Prof. Stephen Chi-Yung Ng)</span>
    <span class="cv-sub-right"></span>
  </div>
  <ul class="cv-list">
    <li>Reduced and analyzed <em>Chandra</em> X-ray observations using the Chandra Interactive Analysis of Observations software.</li>
    <li>Merged 18 X-ray observations in the Cygnus OB2 region and assembled a catalog of detected X-ray sources.</li>
    <li>Cross-matched X-ray sources with <em>Gaia</em> counterparts to classify association members versus foreground/background objects.</li>
  </ul>
</div>

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Gamma-Ray Burst Prompt Emission and Polarization</span>
    <span class="cv-right">2022 – Feb. 2023</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Center for Theoretical Physics and College of Physics, Jilin University</span>
    <span class="cv-sub-right">Changchun, China</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Undergraduate research (Mentor: Prof. Mi-Xiang Lan)</span>
    <span class="cv-sub-right"></span>
  </div>
  <ul class="cv-list">
    <li>Collected and organized spectral parameters and polarization measurements of gamma-ray burst prompt emission from the literature.</li>
    <li>Computed time-integrated polarization degrees for ~37 gamma-ray bursts under a synchrotron-emission framework using Interactive Data Language.</li>
    <li>Resulted in a first-author refereed journal article.</li>
    <li>Supported by the National Natural Science Foundation of China (Grant Nos. 11903014 and 12147217).</li>
  </ul>
</div>

Skills
======
* **Languages:** Chinese (Mandarin: native; Cantonese: conversational); English (IELTS 6.5, 2023; completed an English-taught M.Sc. at The University of Hong Kong).
* **Programming:** Python (primary); MATLAB, Mathematica, R (familiar); Interactive Data Language, C++ (prior experience).
* **Methods:** time-series analysis; statistical correlation analysis; hierarchical Bayesian inference (GWpopulation; Markov chain Monte Carlo); Monte Carlo simulation and mock-catalog generation.
* **Scientific computing:** NumPy, SciPy, pandas, Matplotlib; Jupyter; Flexible Image Transport System data handling; pipeline automation (bash/Python scripts).
* **Astrophysics & gravitational-wave:** population synthesis (COSMIC); gravitational-wave population inference; catalog-based population studies.
* **Scholarly writing:** LaTeX; BibTeX.
* **Computing environment:** Git/GitHub; bash shell scripting; Windows, macOS, Linux (Ubuntu); high-performance computing (remote Linux servers, batch jobs); Secure Shell workflows.

Talks and Presentations
======
<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">2024 PKU International PhD Student Forum on the Frontiers of Modern Astronomy</span>
    <span class="cv-right">Dec. 2024</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Poster presentation: “Time-integrated Polarizations of Gamma-ray Burst Prompt Phase”</span>
    <span class="cv-sub-right"></span>
  </div>
  <div class="cv-note"><em>Kavli Institute for Astronomy and Astrophysics, Peking University</em></div>
</div>

Conferences and Workshops
======
* Aug. 2025 — Participant, Gravitational Wave Data Analysis Summer School (Lanzhou Center for Theoretical Physics)
* Jun. 2025 — Participant, The First Edinburgh School for Extragalactic Astronomy (Institute for Astronomy, The University of Edinburgh)
* May 2025 — Participant, Gravitational Wave Open Data Workshop 2025 (Gravitational Wave Open Science Center)
* Dec. 2024 — Poster presenter, 2024 PKU International PhD Student Forum on the Frontiers of Modern Astronomy
* Dec. 2024 — Volunteer (conference support), International Conference on Space Sustainability 2024
* Jul. 2024 — Participant, Celestial Holography Summer School 2024 (Perimeter Institute for Theoretical Physics)
* Nov. 2023 — Participant, International Symposium on Cosmology and Particle Astrophysics 2023
* Nov. 2023 — Participant, Multimessenger Astronomy: Bridging Transients, Lensing, and Dark Matter (Cosmic Frontiers)

Professional Activities
======
* Jan. 2026 – Present, Member — Laser Interferometer Space Antenna Consortium
* Oct. 2023 – Nov. 2024, Member — Laboratory for Space Research, The University of Hong Kong
* May 2021 – Apr. 2022, Student Member — Chinese Physical Society

Outreach Activities
======
* Jan. 2025 – Feb. 2025, Participant — China Skywatcher Asteroid Search Campaign  
  *International Astronomical Search Collaboration*

References
======
Available upon request.
