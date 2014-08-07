soc_js_slideshow
================

A Drupal 7 input filter that turns a &lt;div#slideshow> &lt;img> HTML combo into a simple JS slide show. Assumes jQuery present. 


To Install 
==========
- Git clone this repo into `sites/all/modules`
- Set Administer soc js slideshow permission 
- Turn on the Input filter 

To Configure
============
- Set options in `admin/soc/slider` to set where control placement and what is used as first, previous, next, and last text or images.

On Node
=======
In the body content area, populate a `<div>` with `<img>` tags and add the filter trigger `[slideshow:#divid]`.
```
[slideshow:#slideshow]
<div id="slideshow"><img class="active" src="/sites/default/files/utopia-imports/images/epics/icm/normal/Epics_ICS_001.jpg">
  <img src="002.jpg">
  <img src="003.jpg"> 
  <img src="004.jpg"> 
  .
  .
  .
</div>
```
Requires
- Drupal 7
- jQuery
