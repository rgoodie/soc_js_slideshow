soc_js_slideshow
================

A Drupal 7 input filter that turns a &lt;div#slideshow> &lt;img> HTML combo into a simple JS slide show. Assumes jQuery present. 


To Install 
==========
- Git clone this repo into `sites/all/modules`
- Set Administer soc js slideshow permission 
- Set options in `admin/soc/slider`
- Turn on the Input filter 

On Node
=======
In the body content area, populate a <div> with <img> and add the filter trigger `[slideshow:#divid]`.
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
