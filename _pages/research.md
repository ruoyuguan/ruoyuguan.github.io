---
title: "Research"
description: "Research by Ruo-Yu Guan on the Galactic-binary foreground, angular anisotropy, stochastic gravitational-wave background inference, and gamma-ray bursts."
permalink: /research/
author_profile: true
math: true
---

My research focuses on space-based gravitational-wave astrophysics, particularly Galactic compact binaries and the unresolved gravitational-wave foreground they produce. I study foreground statistics and angular anisotropy, and examine how residual foreground power affects stochastic gravitational-wave background (SGWB) inference.

## Galactic-Binary Foreground and Anisotropy

**Ongoing research.** I am studying the angular anisotropy of the unresolved Galactic-binary gravitational-wave foreground, with an emphasis on double white dwarf populations. The work concerns how the spatial distribution of Galactic sources shapes the sky-dependent foreground observed by space-based detectors.

## Residual Foreground and SGWB Inference

**Completed research.** In our [2026 paper]({{ '/publications/residual-galactic-binary-foreground-lisa/' | relative_url }}), accepted for publication in *Physical Review D*, Yan Wang and I use LISA Data Challenge 2A injections and the Erebor injection–recovery match to estimate the catalog-level residual foreground left by unresolved or imperfectly recovered Galactic binaries.

The study distinguishes source-discreteness effects from spectral degeneracy. Random-phase sums of discrete source signals can have non-Gaussian statistics, quantified by excess kurtosis, although instrumental noise and the fiducial SGWB dilute this signature in most frequency bins. The residual spectrum also overlaps with an isotropic power-law SGWB in the mean binned power. We quantify this spectral degeneracy with a local Fisher information matrix for the SGWB amplitude and residual-power factor.

For a frequency-independent SGWB with fiducial amplitude $\Omega_0=10^{-11}$ and residual power distributed uniformly over the Fourier frequencies within each bin, marginalizing over the residual-power factor increases the $\Omega_0$ uncertainty by 13.6% under the Gaussian Fourier-amplitude covariance. This value is specific to the paper's catalog-level model and statistical assumptions, not a general forecast for all LISA analyses. The [accepted abstract]({{ '/publications/residual-galactic-binary-foreground-lisa/' | relative_url }}), [supporting code and processed numerical results](https://doi.org/10.5281/zenodo.23979478), and [Yangzhou presentation slides]({{ '/talks/2026-07-31-yangzhou-sgwforeground-talk' | relative_url }}) are available.

## Previous Research

My earlier research also covered gamma-ray bursts (GRBs) and X-ray source identification:

- **GRB time series:** detrended fluctuation analysis and Hurst-index estimation for 163 long-duration gamma-ray bursts observed by BATSE, followed by correlation studies with prompt-emission observables ([JHEAp paper]({{ '/publications/grb-hurst-index/' | relative_url }})).
- **GRB prompt-emission polarization:** time-integrated polarization predictions for 37 bursts under synchrotron emission in ordered magnetic fields ([A&A paper]({{ '/publications/grb-time-integrated-polarization/' | relative_url }})).
- **Cygnus OB2:** reduction and merging of 18 Chandra observations, X-ray source catalog construction, and cross-matching with Gaia counterparts during my M.Sc. project at the University of Hong Kong.

## Research Interests

- Space-based gravitational-wave astrophysics.
- Galactic compact binaries, particularly double white dwarfs.
- Stochastic gravitational-wave backgrounds, foreground statistics, and Bayesian inference.

## Software and Open Science

**GW Research Copilot (GWRC).** I am developing [GW Research Copilot (GWRC)](https://github.com/ruoyuguan/gw-research-copilot), an early-stage open-source toolkit for gravitational-wave research. Its current prototype includes agent skills, covariance and power spectral density checks, a basic Gaussian Fisher-matrix demonstration, and reproducible run records.

**Scientific Textbook Proofreading Skill.** I also maintain [Scientific Textbook Proofreading Skill](https://github.com/ruoyuguan/scientific-textbook-proofreading-skill), an open-source pre-release for AI-assisted scientific proofreading and errata auditing. It provides a structured workflow designed to help generate traceable candidate errata for human expert review. [Read the project announcement]({{ '/posts/2026/05/scientific-textbook-proofreading-skill-pre-release/' | relative_url }}).
