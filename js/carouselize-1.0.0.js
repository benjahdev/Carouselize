/**
 * Carouselize v1.0.0
 * Hervé Benjamin - 12/25/2017
 * License Creative Commons - BY SA - http://creativecommons.org/licenses/by-sa/4.0/
 */

(function ($) {

    /**
     * Dynamic Bootstrap 3.3.7 carousel constructor using fadeIn/fadeOut transition effects
     *
     * @param slidesData - The data objects to load (must be an array)
     * @param autoSize - Set a max-width size relative to the size of the image being the smallest
     * @param speedTransition - Set the speed of the transition when changing slides
     * @param speed - The carousel cycle speed
     */
    $.fn.carouselize = function (slidesData, autoSize = false, speed = 5000, speedTransition = 500) {
        $element = $(this);
        let interval = null;

        /**
         * Construct the carousel using Bootstrap classes
         */
        let build = function () {
            let baseIndicators = $('<ol></ol>')
                .addClass('carousel-indicators');

            let baseSlides = $('<div></div>')
                .addClass('carousel-inner');

            for (let i = 0; i < slidesData.length; i++) {
                let indicator = $('<li></li>')
                    .attr('data-target', $element.id)
                    .attr('data-slide-to', i);

                let img = $('<img src="' + slidesData[i].src + '">')
                    .attr('alt', slidesData[i].alt);

                if (autoSize) {
                    $(img).on('load', function () {
                        $("<img/>") // Make in memory copy of image to avoid css issues
                            .attr("src", $(this).attr("src"))
                            .on('load', function () {
                                if ($element.css('maxWidth') === 'none'
                                    || $element.css('maxWidth') > this.width) {
                                    $element.css('maxWidth', this.width);
                                }
                            });
                    });
                }

                let item = $('<div></div>')
                    .addClass('item')
                    .append(img);

                if (0 === i) {
                    item.addClass('active');
                    indicator.addClass('active');
                }

                baseIndicators.append(indicator);
                baseSlides.append(item);
            }

            $element.addClass('carousel slide')
                .append(baseIndicators)
                .append(baseSlides)
                .append($('<a></a>')
                    .addClass('left carousel-control')
                    .attr('href', $element.id)
                    .attr('role', 'button')
                    .append($('<span></span>')
                        .addClass('glyphicon')
                        .addClass('glyphicon-chevron-left'))
                    .append($('<span></span>')
                        .addClass('sr-only')))
                .append($('<a></a>')
                    .addClass('right carousel-control')
                    .attr('href', $element.id)
                    .attr('role', 'button')
                    .append($('<span></span>')
                        .addClass('glyphicon')
                        .addClass('glyphicon-chevron-right'))
                    .append($('<span></span>')
                        .addClass('sr-only')));
        };

        let slideTo = function (activeElement, targetElement, targetIndex) {
            let indicators = $element.find('.carousel-indicators');

            targetElement.opacity = 0;

            realSpeed = Math.round(speedTransition / 2);

            activeElement.fadeOut(realSpeed, function () {
                activeElement.removeClass('active');

                indicators.find('.active').removeClass('active');
                $(indicators.children()[targetIndex]).addClass('active');

                targetElement.fadeIn(realSpeed, function () {

                    targetElement.addClass('active');
                })
            });
        };

        let changeSlide = function (goRight = true) {
            let items = $element.children('.carousel-inner').children('.item');
            let activeItem = $element.find('.item.active');
            let curPos = items.index(activeItem);
            let nextPos = -1;

            if (goRight) {
                nextPos = curPos + 1;
                if (nextPos >= items.length) {
                    nextPos = 0;
                }
            } else {
                nextPos = curPos - 1;
                if (nextPos < 0) {
                    nextPos = items.length - 1;
                }
            }

            let nextItem = items.eq(nextPos);

            slideTo(activeItem, nextItem, nextPos);
        };

        let pause = function () {
            if (interval !== null) {
                clearInterval(interval);
                interval = null;
            }
        };

        let cycle = function () {
            if (interval == null) {
                interval = setInterval($.proxy(changeSlide, $element), speed);
            }
        };

        // Clear currents elements inside the carousel
        $(this).empty();

        // Construct the carousel elements
        build();

        $(this).find('.carousel-control').on('click', function () {
            if ($(this).hasClass('left')) {
                changeSlide(false);
            } else {
                changeSlide(true);
            }
        });

        $(this).find('.carousel-indicators > li').on('click', function () {
            let activeItem = $element.find('.item.active');
            let items = $element.children('.carousel-inner').children('.item');
            let targetIndex = $(this).attr('data-slide-to');
            let targetItem = items.eq(targetIndex);

            slideTo(activeItem, targetItem, targetIndex);
        });

        $(this).on('mouseenter', pause)
            .on('mouseleave', cycle)
            .on('keydown', function (e) {
                switch (e.which) {
                    case 37:
                        changeSlide(false);
                        break;
                    case 39:
                        changeSlide();
                        break;
                    default:
                        return;
                }

                e.preventDefault();
            });

        // Start cycling
        cycle();
    }
})(jQuery);
