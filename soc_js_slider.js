


/* Slide Show object */
function SlideShow(parentContainerId) {

    this.BEGINNING  = 'Beginning';
    this.END        = 'End of list';
    this.FIRSTINDEX = 0;

    this.length     = jQuery(parentContainerId + ' img').length;
    this.container  = jQuery(parentContainerId);
    this.imgs       = jQuery(parentContainerId + ' img');
    this.index      = this.FIRSTINDEX;
    this.status     = 'beginning';           // beginning, end



    this.init = function() {
        // get it started
        this.moveTo(this.FIRSTINDEX);
        this.process();

        // get object scope
        var parent      = this;

        // set up click listener
        this.container.find('img').click(function(e) {
            var item_width = jQuery(this).width();
            var x_click_ps = e.clientX - jQuery(this).offset().left;
            var x_diff     = x_click_ps / item_width;




            console.log(this);
            if (x_diff < .5) {
                parent.moveByIncrement(-1)
                parent.process();
            } else {
                parent.moveByIncrement(1);
                parent.process();
            }

        });
    }



    this.moveByIncrement = function(n) {

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
        jQuery(this.returnChild()).show();
    }
}




