---
layout: archive
title: "CV"
description: "Academic CV of Ruo-Yu Guan: research interests, education, publications, research experience, presentations, memberships, and skills."
last_updated: 2026-11-13
cv_pdf_url: /files/ruoyuguan-cv.pdf
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}
{% assign cv_pdf_url = page.cv_pdf_url | default: '' | strip %}
<p class="cv-download">{% if cv_pdf_url != empty %}<a class="btn" href="{{ cv_pdf_url | relative_url | escape }}">Download Academic CV (PDF)</a>{% endif %}<span>Last updated: {{ page.last_updated | date: "%B %d, %Y" }}</span></p>

<div class="cv-print-heading">
  <div class="cv-print-name">Ruo-Yu Guan</div>
  <p>Curriculum vitae · {{ page.last_updated | date: "%B %Y" }}<br><a href="mailto:{{ site.author.email }}">{{ site.author.email }}</a> · <a href="{{ site.url }}">{{ site.url | remove: 'https://' }}</a></p>
</div>

## Research Interests

- Space-based gravitational-wave astrophysics; Galactic compact binaries, particularly double white dwarfs.
- Unresolved Galactic-binary gravitational-wave foregrounds and angular anisotropy; residual foreground statistics and non-Gaussianity.
- Stochastic gravitational-wave backgrounds and statistical inference.
- Potential applications to Galactic dynamics, dark matter, and unusual astrophysical environments.

## Education

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
    <span class="cv-sub-left">Ph.D. in Physics (Theoretical Physics)</span>
    <span class="cv-sub-right">Supervisor: <a href="http://faculty.hust.edu.cn/wangyan11/zh_CN/index.htm">Prof. Yan Wang</a></span>
  </div>
  <ul class="cv-list">
    <li>Doctoral coursework completed; thesis proposal successfully defended.</li>
    <li>Ranked 2nd of 138 Ph.D. students based on course grades.</li>
  </ul>
</div>

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">The University of Hong Kong</span>
    <span class="cv-right">Hong Kong SAR, China</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">M.Sc. in Physics, Department of Physics, Faculty of Science</span>
    <span class="cv-sub-right">Degree conferred: Nov. 2024</span>
  </div>
  <ul class="cv-list">
    <li>Capstone project: <em>Identifying Sources in Cygnus OB2 Using Multiwavelength Observations</em>, supervised by Assoc. Prof. Stephen Chi-Yung Ng.</li>
  </ul>
</div>

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Jilin University</span>
    <span class="cv-right">Changchun, China</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">B.Sc.</span>
    <span class="cv-sub-right">Degree conferred: Jun. 2022</span>
  </div>
  <ul class="cv-list">
    <li>Graduation thesis: <em>Study on the Prompt Emission of Gamma-ray Bursts and its Polarization</em>; research mentor: Prof. Mi-Xiang Lan.</li>
  </ul>
</div>

## Research Positions

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
    <li>Gamma-ray burst research with Prof. Yuan-Chuan Zou.</li>
  </ul>
</div>

## Publications

1. **Ruo-Yu Guan** and Yan Wang, [Residual Galactic binary foreground in LISA stochastic gravitational-wave background inference: Source power concentration and spectral degeneracy]({{ '/publications/residual-galactic-binary-foreground-lisa/' | relative_url }}), *Physical Review D*, accepted for publication (2026).<br>
   DOI: [10.1103/4779-jw6l](https://doi.org/10.1103/4779-jw6l) · [arXiv:2607.25349](https://arxiv.org/abs/2607.25349) · [Code &amp; Data (Zenodo)](https://doi.org/10.5281/zenodo.23979478)
2. **Ruo-Yu Guan**, Fei-Fei Wang, and Yuan-Chuan Zou, [Hurst index of gamma-ray burst light curves and its statistical study]({{ '/publications/grb-hurst-index/' | relative_url }}), *Journal of High Energy Astrophysics* **51**, 100559 (2026).<br>
   DOI: [10.1016/j.jheap.2026.100559](https://doi.org/10.1016/j.jheap.2026.100559)
3. **Ruo-Yu Guan** and Mi-Xiang Lan, [Interpreting time-integrated polarization data of gamma-ray burst prompt emission]({{ '/publications/grb-time-integrated-polarization/' | relative_url }}), *Astronomy &amp; Astrophysics* **670**, A160 (2023).<br>
   DOI: [10.1051/0004-6361/202243805](https://doi.org/10.1051/0004-6361/202243805)
{: .cv-publication-list }

## Research Experience

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Angular Anisotropy of the Unresolved Galactic-Binary Foreground</span>
    <span class="cv-right">Ongoing</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">National Gravitation Laboratory and School of Physics, Huazhong University of Science and Technology</span>
    <span class="cv-sub-right">Wuhan, China</span>
  </div>
  <div class="cv-sub">Research with Prof. Yan Wang</div>
  <ul class="cv-list">
    <li>Studying the angular anisotropy of the unresolved Galactic-binary gravitational-wave foreground, with an emphasis on double white dwarf populations.</li>
    <li>Investigating how the spatial distribution of Galactic sources shapes the sky-dependent foreground for space-based detectors.</li>
  </ul>
</div>

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Residual Galactic Binary Foreground and SGWB Inference</span>
    <span class="cv-right">Completed</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">National Gravitation Laboratory and School of Physics, Huazhong University of Science and Technology</span>
    <span class="cv-sub-right">Wuhan, China</span>
  </div>
  <div class="cv-sub">Research with Prof. Yan Wang</div>
  <ul class="cv-list">
    <li>Estimated the catalog-level residual foreground using LISA Data Challenge 2A injections and the Erebor injection–recovery match.</li>
    <li>Quantified source-discreteness signatures through excess kurtosis, including their dilution by instrumental noise, and analyzed spectral degeneracy with an isotropic stochastic gravitational-wave background.</li>
    <li>First-author paper accepted for publication in <em>Physical Review D</em> (2026); supporting analysis code and processed numerical results released through Zenodo.</li>
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
  <div class="cv-sub">Research with Prof. Yuan-Chuan Zou</div>
  <ul class="cv-list">
    <li>Analyzed 163 long BATSE bursts using detrended fluctuation analysis and Hurst-index estimation; performed statistical correlation studies in Python.</li>
    <li>Resulted in a first-author refereed article in the <em>Journal of High Energy Astrophysics</em>.</li>
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
  <div class="cv-sub">M.Sc. capstone project supervised by Assoc. Prof. Stephen Chi-Yung Ng</div>
  <ul class="cv-list">
    <li>Reduced and merged 18 Chandra observations and assembled a catalog of detected X-ray sources.</li>
    <li>Cross-matched X-ray sources with Gaia counterparts to distinguish association members from foreground and background objects.</li>
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
  <div class="cv-sub">Research with Prof. Mi-Xiang Lan, originating in the B.Sc. thesis project</div>
  <ul class="cv-list">
    <li>Computed time-integrated polarization degrees for 37 gamma-ray bursts under a synchrotron-emission framework and compared the predictions with observations.</li>
    <li>Resulted in a first-author refereed article in <em>Astronomy &amp; Astrophysics</em>.</li>
  </ul>
</div>

## Conference Presentations

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Shanghai International Symposium on Relativistic Astrophysics</span>
    <span class="cv-right">Dec. 2026</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Scheduled poster presentation: “Residual Galactic binary foreground in LISA stochastic gravitational-wave background inference”</span>
  </div>
  <div class="cv-note"><em>Shanghai, China</em> · <a href="{{ '/talks/2026-12-07-isra-2026-poster' | relative_url }}">Presentation details</a></div>
</div>

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">2026 Mid-Year Workshop of the National Key R&amp;D Program Project on Space Gravitational-Wave Detection Signal Simulation, Processing, and Verification</span>
    <span class="cv-right">Jul. 2026</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Oral presentation: “Galactic Binary Residuals in LISA SGWB Amplitude Inference: Source Power Concentration and Spectral Degeneracy”</span>
  </div>
  <div class="cv-note"><em>Yangzhou, China</em> · <a href="{{ '/talks/2026-07-31-yangzhou-sgwforeground-talk' | relative_url }}">Presentation and slides</a></div>
</div>

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">2024 PKU International PhD Student Forum on the Frontiers of Modern Astronomy</span>
    <span class="cv-right">Dec. 2024</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Poster presentation: “Time-integrated Polarizations of Gamma-ray Burst Prompt Phase”</span>
  </div>
  <div class="cv-note"><em>Beijing, China</em> · <a href="{{ '/talks/2024-12-01-pku-forum-poster' | relative_url }}">Presentation and poster</a></div>
</div>

## Academic Memberships

- **Laser Interferometer Space Antenna (LISA) Consortium** — Core Member, Astrophysics Working Group, Mar. 2026 – Present.
- **Laboratory for Space Research, The University of Hong Kong** — Member, Oct. 2023 – Nov. 2024.

## Skills

- **Research Methods:** Statistical analysis and inference (Fisher-matrix analysis, correlation analysis); time-series analysis; binary population synthesis (COSMIC).
- **Programming &amp; Tools:** Python (NumPy, SciPy, pandas, Matplotlib); MATLAB, Mathematica, R (familiar); Git, Linux, LaTeX.
- **Languages:** Chinese (Mandarin: native; Cantonese: conversational); English (English-taught M.Sc. at HKU).
