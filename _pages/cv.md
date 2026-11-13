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

- Space-based gravitational-wave astrophysics.
- Galactic compact binaries, particularly double white dwarfs.
- Stochastic gravitational-wave backgrounds, foreground statistics, and Bayesian inference.

## Education

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Ph.D. in Physics (Theoretical Physics)</span>
    <span class="cv-right">Sep. 2025 – Jun. 2029 (expected)</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">School of Physics, Huazhong University of Science and Technology (HUST)</span>
    <span class="cv-sub-right">Wuhan, China</span>
  </div>
  <div class="cv-sub">National Gravitation Laboratory</div>
  <ul class="cv-list">
    <li>Supervisor: <a href="http://faculty.hust.edu.cn/wangyan11/zh_CN/index.htm">Prof. Yan Wang</a>.</li>
    <li>Doctoral coursework completed; thesis proposal successfully defended.</li>
    <li>Ranked 2nd of 138 Ph.D. students based on course grades.</li>
  </ul>
</div>

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">M.Sc. in Physics</span>
    <span class="cv-right">Nov. 2024</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Department of Physics, The University of Hong Kong (HKU)</span>
    <span class="cv-sub-right">Hong Kong SAR, China</span>
  </div>
  <ul class="cv-list">
    <li>Capstone project: <em>Identifying Sources in Cygnus OB2 Using Multiwavelength Observations</em>.</li>
    <li>Supervisor: <a href="https://astro.physics.hku.hk/~ncy/">Assoc. Prof. Stephen Chi-Yung Ng</a>.</li>
  </ul>
</div>

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">B.Sc.</span>
    <span class="cv-right">Jun. 2022</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Jilin University</span>
    <span class="cv-sub-right">Changchun, China</span>
  </div>
  <ul class="cv-list">
    <li>Graduation thesis: <em>Study on the Prompt Emission of Gamma-Ray Bursts and Its Polarization</em>.</li>
    <li>Research mentor: Prof. Mi-Xiang Lan.</li>
  </ul>
</div>

## Research Positions

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Research Assistant</span>
    <span class="cv-right">Nov. 2024 – Jun. 2025</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Department of Astronomy, Huazhong University of Science and Technology</span>
    <span class="cv-sub-right">Wuhan, China</span>
  </div>
  <ul class="cv-list">
    <li>Research supervisor: <a href="http://faculty.hust.edu.cn/zouyc/zh_CN/index/1489801/list/index.htm">Prof. Yuan-Chuan Zou</a>.</li>
  </ul>
</div>

## Publications

1. **Ruo-Yu Guan** and Yan Wang, [Residual Galactic binary foreground in LISA stochastic gravitational-wave background inference: Source power concentration and spectral degeneracy]({{ '/publications/residual-galactic-binary-foreground-lisa/' | relative_url }}), *Physical Review D*, accepted (2026).<br>
   DOI: [10.1103/4779-jw6l](https://doi.org/10.1103/4779-jw6l) · [arXiv:2607.25349](https://arxiv.org/abs/2607.25349) · [Code &amp; Data (Zenodo)](https://doi.org/10.5281/zenodo.23979478)
2. **Ruo-Yu Guan**, Fei-Fei Wang, and Yuan-Chuan Zou, [Hurst index of gamma-ray burst light curves and its statistical study]({{ '/publications/grb-hurst-index/' | relative_url }}), *Journal of High Energy Astrophysics* **51**, 100559 (2026).<br>
   DOI: [10.1016/j.jheap.2026.100559](https://doi.org/10.1016/j.jheap.2026.100559)
3. **Ruo-Yu Guan** and Mi-Xiang Lan, [Interpreting time-integrated polarization data of gamma-ray burst prompt emission]({{ '/publications/grb-time-integrated-polarization/' | relative_url }}), *Astronomy &amp; Astrophysics* **670**, A160 (2023).<br>
   DOI: [10.1051/0004-6361/202243805](https://doi.org/10.1051/0004-6361/202243805)
{: .cv-publication-list }

## Research Experience

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Galactic-Binary Gravitational-Wave Foregrounds</span>
    <span class="cv-right">Jul. 2025 – Present</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">National Gravitation Laboratory and School of Physics, Huazhong University of Science and Technology</span>
    <span class="cv-sub-right">Wuhan, China</span>
  </div>
  <ul class="cv-list">
    <li>Investigating the angular anisotropy of the unresolved Galactic-binary gravitational-wave foreground.</li>
  </ul>
</div>

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Residual Galactic Binary Foregrounds in LISA SGWB Inference</span>
    <span class="cv-right">2026</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">National Gravitation Laboratory and School of Physics, Huazhong University of Science and Technology</span>
    <span class="cv-sub-right">Wuhan, China</span>
  </div>
  <ul class="cv-list">
    <li>Estimated the residual Galactic-binary power spectrum using injection–recovery catalogs.</li>
    <li>Quantified non-Gaussianity from source discreteness using excess kurtosis. Instrumental noise and SGWB power largely suppress this signature.</li>
    <li>Assessed spectral degeneracy with an isotropic SGWB using Fisher analysis. Marginalizing over the residual-power normalization increased the SGWB-amplitude uncertainty by 13.6% in the fiducial Gaussian-covariance model.</li>
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
  <ul class="cv-list">
    <li>Measured Hurst indices for 163 long-duration BATSE gamma-ray bursts using detrended fluctuation analysis.</li>
    <li>Found anti-correlations with burst durations and moderate positive correlations with peak photon flux. Standard spectral parameters showed no significant linear correlations.</li>
  </ul>
</div>

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Identifying Sources in Cygnus OB2 Using Multiwavelength Observations</span>
    <span class="cv-right">Sep. 2023 – Jun. 2024</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Department of Physics, The University of Hong Kong</span>
    <span class="cv-sub-right">Hong Kong SAR, China</span>
  </div>
  <ul class="cv-list">
    <li>Analyzed Chandra X-ray observations of Cygnus OB2 and cross-matched the detected sources with Gaia.</li>
    <li>Identified optical counterparts for 106 of 148 X-ray sources. Hardness ratios suggested that 12 unmatched sources might be background galaxies.</li>
  </ul>
</div>

<div class="cv-block">
  <div class="cv-row">
    <span class="cv-left">Gamma-Ray Burst Prompt Emission and Polarization</span>
    <span class="cv-right">2022</span>
  </div>
  <div class="cv-sub">
    <span class="cv-sub-left">Center for Theoretical Physics and College of Physics, Jilin University</span>
    <span class="cv-sub-right">Changchun, China</span>
  </div>
  <ul class="cv-list">
    <li>Predicted upper limits on time-integrated polarization for 37 GRBs using synchrotron emission in ordered magnetic fields.</li>
    <li>Most polarization observations were consistent with the model, while two bursts exceeded the predicted limits.</li>
    <li>Predicted energy-dependent polarization signatures for POLAR-2 to test competing prompt-emission models.</li>
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
