

/*
* The jQuery ODR caller moved to be self enclosed
* */

jQuery(function() {


    a = [];

    // Loop through settings Drupal.settings.soc_js_slider.element_zero_collection
    // to see if there are any element ids that need to be converted to a slide show.
    for (var i=0; i < Drupal.settings.soc_js_slider.element_zero_collection.length; i++) {
        var element_id = Drupal.settings.soc_js_slider.element_zero_collection[i];
        a[i] = new SlideShow(element_id);
        a[i].init();

    }
});


/* Slide Show object */
function SlideShow(parentContainerId) {

    this.BEGINNING  = 'Beginning';
    this.END        = 'End of list';
    this.FIRSTINDEX = 0;

    this.CONTAINER_CSS = ' width: 100%; ';
    this.IMG_CSS    = ' max-width: 100%; margin-left: auto; margin-right: auto; display:block; cursor: pointer ';
    this.SPAN_CSS   = "cursor: pointer;"



    this.CTRL_HTML  =   '<div style="'+ this.CONTAINER_CSS + '"> ' +
                        '<span id="soc_js_controll_container" style="text-align:center;' + this.IMG_CSS + '">' +
                        '<span class="first" style="' + this.SPAN_CSS + '">' + Drupal.settings.soc_js_slider.first + '</span> ' +
                        '<span class="prev"  style="' + this.SPAN_CSS + '">' + Drupal.settings.soc_js_slider.prev + '</span> ' +
                        '<span class="indicator" style="vertical-align: top;"></span>' +
                        '<span class="next"  style="' + this.SPAN_CSS + '">' + Drupal.settings.soc_js_slider.next + '</span> ' +
                        '<span class="last"  style="' + this.SPAN_CSS + '">' + Drupal.settings.soc_js_slider.last + '</span>' +
                        '</span></div>';

    this.ctnl_placement = Drupal.settings.soc_js_slider.ctnl_placement;

    this.length     = jQuery(parentContainerId + ' img').length - 1;
    this.container  = jQuery(parentContainerId);
    this.imgs       = jQuery(parentContainerId + ' img');
    this.index      = this.FIRSTINDEX;
    this.status     = this.BEGINNING;           // beginning, end


    // Set up a variable by which to overcome the 'this' confusion in nested
    // clousures.
    self = this;


    this.init = function() {

        // get it started
        this.moveTo(this.FIRSTINDEX);
        this.process();

        // set up click listener
        this.container.click(function(e) {
            var item_width = jQuery(this).width();
            var x_click_ps = e.clientX - jQuery(this).offset().left;
            var x_diff     = x_click_ps / item_width;

            console.log(this);
            if (x_diff < .5) {
                self.moveByIncrement(-1)
                self.process();
            } else {
                self.moveByIncrement(1);
                self.process();
            }

        });

        // set up initial CSS
        self.container.attr('style', self.CONTAINER_CSS);

        // set up controls
        this.controls();

        // hook into the process method
        this.process();

    }

    this.controls = function() {

        // Where to place controls?
        if (this.ctnl_placement == 0) {
            self.container.prepend(self.CTRL_HTML);
        } else if (this.ctnl_placement == 1) {
            self.container.append(self.CTRL_HTML);
        } else {
            // no controls
        }

        // first button
        jQuery('#soc_js_controll_container .first').click(function(event) {
            self.moveTo(self.FIRSTINDEX);
            self.process();
            event.stopPropagation();

        });
         // first button
        jQuery('#soc_js_controll_container .prev').click(function(event) {
            self.moveByIncrement(-1);
            self.process();
            event.stopPropagation();
        });
         // first button
        jQuery('#soc_js_controll_container .next').click(function(event) {
            self.moveByIncrement(1);
            self.process();
            event.stopPropagation();
        });
         // first button
        jQuery('#soc_js_controll_container .last').click(function(event) {
            self.moveTo(self.length);
            self.process();
            event.stopPropagation();
        });
    }



    this.moveByIncrement = function(n) {


        console.log('old index ' + this.index);
        console.log('new index ' + (this.index +n) );

        // [in|de]crese
        this.index =  this.checkBounds(this.index + n);



        // return child
        return this.returnChild()
    }

   this.moveTo = function(n) {
        this.index = this.checkBounds(n);
        return this.returnChild();
    }

    this.returnChild = function() {
        return this.imgs.eq(this.index);
    }

    this.checkBounds = function(n) {
        // ensure index number is not beyond limits
        if (n < this.FIRSTINDEX) {
            n = this.FIRSTINDEX;
            this.status = this.BEGINNING;
        }
        if (n > this.length) {
            n = this.length;
            this.status = this.END;
        }

        return n;
    }

    this.process = function() {
        jQuery(this.imgs).hide();
        jQuery(this.returnChild()).attr('style', self.IMG_CSS ).show('fast');
        jQuery('#soc_js_controll_container .indicator').html(' [' + (this.index+1) + ' of ' + (this.length+1) + '] ');

    }
}




