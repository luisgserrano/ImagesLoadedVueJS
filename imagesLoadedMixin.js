/**
 * VueJS Mixin to detect all images or background-images in a component.
 */
const imagesLoaded = {

    /**
     * imgLoadedCount: Variable to store how many images already have been loaded.
     * imgCount: Variable to store how many images exist in a component.
     */
    data() {
        return {
            imgLoadedCount: 0,
            imgCount: 0,
            imgElems: null,
            bgElems: null
        }
    },

    mounted() {
        this.getImages();
        this.setImageCounter();
        this.initImagesLoaded();
    },

    /**
     * You should destroy all variables when the component is destroyed to the Garbage collector do his work and clean memory.
     */
    destroyed() {
        this.imgLoadedCount = undefined;
        this.imgCount = undefined;
        this.imgElems = undefined;
        this.bgElems = undefined;
    },

    methods: {

        /**
         * bgElems: The class 'background-image' should be in all elements that have an image as a background-image.
         */
        getImages() {
            this.imgElems = document.querySelectorAll('img');
            this.bgElems = document.querySelectorAll('.background-image');
        },

        /**
         * Count of all images and background-images in a component.
         * Init the counter variables with the right values.
         */
        setImageCounter() {
            this.imgCount += this.imgElems.length;
            this.imgCount += this.bgElems.length;
        },

        initImagesLoaded() {
            if (this.imgCount > 0) {
                this.areImageLoaded();
                this.areBackgroundImageLoaded();
            }
        },

        /**
         * Check whether an image is Loaded or not.
         */
        areImageLoaded() {
            if (this.imgElems.length > 0) {
                this.imgElems.forEach(img => {
                    img.onload = () => {
                        this.imgLoadedCount++;
                        this.areAllImagesLoaded();
                    }
                });
            }
        },

        /**
         * Check whether a background-image is Loaded or not.
         */
        areBackgroundImageLoaded() {
            if (this.bgElems.length > 0) {
                this.bgElems.forEach(el => {
                    let img = new Image();
                    img.src = this.getBackgroundImage(el);
                    img.onload = () => {
                        this.imgLoadedCount++;
                        this.areAllImagesLoaded();
                    }
                });
            }
        },

        /**
         * Get the src of the image in a background-image css.
         * @param {*} el : Image to check
         */
        getBackgroundImage(el) {
            let bg = '';
            if (el.currentStyle) { // IE
                bg = el.currentStyle.backgroundImage;
            } else if (document.defaultView && document.defaultView.getComputedStyle) { // Firefox
                bg = document.defaultView.getComputedStyle(el, '').backgroundImage;
            } else {
                bg = el.style.backgroundImage;
            }

            return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
        },

        /**
         * If all images are loaded, is inside the if statement you should do something about it.
         * To check, this will compare both auxiliar counters.
         */
        areAllImagesLoaded() {
            if (this.imgCount === this.imgLoadedCount) {
                // // do something when all images are loaded
                // console.log('loaded');
            }
        }

    }

};

export default imagesLoaded;