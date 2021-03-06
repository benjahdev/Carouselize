# Carouselize v1.0.0

## About

This jQuery plugin can be used to dynamically generate a carousel using Bootstrap classes (v3.3.7) according to an object array.
The transition used when slides are changing is a fade-in/out from jQuery.

The look and features of the carousel are the same as those originally used by the [default bootstrap carousel](https://www.w3schools.com/bootstrap/bootstrap_carousel.asp). Only the transition is different using a fade effect.

You can preview a live example by clicking [here](https://benjahdev.github.io/Carouselize/1.0.0/).

## Requirements

You must include the following libraries:

- jQuery (tested with v3.2.1)
- Bootstrap v3.3.7 (CSS files)

## How to

You can check the `example` branch for a complete example of this plugin integration by clicking [here](https://github.com/benjahdev/Carouselize/tree/example).

1) After integrating the various required components you must first prepare the data set for the carousel slides:
    
    Example:
    ```javascript
    let slides = [
        {
            src: 'images/la.jpg',
            alt: 'Los Angeles'
        },
        {
            src: 'images/chicago.jpg',
            alt: 'Chicago'
        },
        {
            src: 'images/ny.jpg',
            alt: 'New York'
        },
    ];
    ```
    
    - The `src` attribute is the location of the image you would load.
    - The `alt` attribute will be the image name if it can not be loaded onto the page.
    
    Both of these attributes are required for the plugin to work properly.
    
2) Prepare an html container that will be used to generate the carousel:

    ```html
    <div id="myCarousel" tabindex="1">
        <noscript>
            <p>This code requires JavaScript, please enable it.</p>
        </noscript>
    </div>
    ```
    
    Here nothing is required, you can use any html container. Only if you want keyboard events to work properly, you must set the `tabindex` attribute on this container.
    All children elements of the container will be removed while the code will be added.
    
3) Call the plugin command passing the slides data as argument of this function:

    ```javascript
    $('#myCarousel').carouselize(slides);
    ```
    
    **Several options are available, here is a complete definition on the function call:**
    
    ```javascript
    $('#myCarousel').carouselize(slides, autoSize, speed, speedTransition);
    ```
    
    - **autoSize**: _default: **false**_
        
        Set a max-width size for the container relative to the size of the image being the smallest.
        
    - **speed**: _default: **5000**_
    
        The time will take the carousel before changing slide (when the cursor is not over the container)
        
    - **speedTransition**: _default: **500**_
    
        The time of the transition when the slide is changing to another one.
        
