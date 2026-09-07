---
layout: archive
title: "Sitemap"
permalink: /sitemap/
description: "Pages and research outputs on Ruo-Yu Guan's academic website."
author_profile: true
---

Browse the site below, or use the [XML sitemap]({{ '/sitemap.xml' | relative_url }}).

<h2>Pages</h2>
<ul>
{% assign pages = site.pages | sort: 'title' %}
{% for item in pages %}
  {% if item.title and item.sitemap != false and item.published != false and item.url != page.url %}
  <li><a href="{{ item.url | relative_url }}">{{ item.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

{% for collection in site.collections %}
  {% if collection.output and collection.docs.size > 0 %}
  <h2>{% case collection.label %}{% when 'portfolio' %}Photography{% when 'posts' %}News &amp; notes{% else %}{{ collection.label | capitalize }}{% endcase %}</h2>
  <ul>
  {% for item in collection.docs reversed %}
    {% if item.sitemap != false and item.published != false %}
    <li><a href="{{ item.url | relative_url }}">{{ item.title }}</a></li>
    {% endif %}
  {% endfor %}
  </ul>
  {% endif %}
{% endfor %}
