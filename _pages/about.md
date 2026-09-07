---
permalink: /
title: "Ruo-Yu Guan"
description: "Ruo-Yu Guan is a PhD candidate at HUST studying Galactic compact binaries, LISA foregrounds, and stochastic gravitational-wave inference."
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I am a PhD Candidate in Theoretical Physics at Huazhong University of Science and Technology (HUST), working on gravitational-wave astrophysics. My research combines compact-binary population modelling with statistical inference for the Laser Interferometer Space Antenna (LISA).

## Current Research

- **Galactic compact binaries:** double white dwarf populations and the information they carry about the Milky Way.
- **LISA foregrounds:** resolved and unresolved sources, residual power, and source population modelling in the millihertz band.
- **Stochastic gravitational-wave inference:** statistical degeneracies between astrophysical foregrounds and a stochastic background.

[Research overview]({{ '/research/' | relative_url }}) · [Curriculum vitae]({{ '/cv/' | relative_url }})

## Selected Publications

{% assign selected_publications = site.publications | where: "selected", true | sort: "date" | reverse %}
{% for post in selected_publications limit:3 %}
{% include publication-card.html post=post heading_level=3 %}
{% endfor %}

[All publications]({{ '/publications/' | relative_url }})

## Latest News

<ul class="news-list">
{% assign news_posts = site.posts | where: "news", true %}
{% for post in news_posts limit:3 %}
  <li><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %d, %Y" }}</time> — <a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>

[All news and notes]({{ '/year-archive/' | relative_url }})

## Affiliations and Profiles

I am a member of the Gravitational-Wave Physics Group at the National Gravitation Laboratory, School of Physics, HUST. I am also a Core Member of the LISA Consortium, with the Astrophysics Working Group (AstroWG) as my primary working group.

[Google Scholar]({{ site.author.googlescholar }}) · [ORCID]({{ site.author.orcid }}) · [GitHub](https://github.com/{{ site.author.github }}) · [Contact](mailto:{{ site.author.email }})
