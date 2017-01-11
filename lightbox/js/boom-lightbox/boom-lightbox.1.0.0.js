/* boom-lighbox: Pure javascript responsive lightbox */
/* https://github.com/boominteractive/boom-lightbox */
/* MIT License copyright (c) 2016 Boom Interactive Inc, Jason Jakob, boominteractiveinc@gmail.com */

function boomLightBoxInit(selectorList) {
    //init each passed in lightbox
    for (i = 0; i < selectorList.length; i++) {
        //find the target boom-lightbox
        var fadeTarget = document.getElementById(selectorList[i].selector);
        if (fadeTarget == null) {
            alert('lightbox div:' + selectorList[i].selector + ' not found in DOM');
            return;
        }

        //wrap the lightbox content in an outer div which centers on the screen and a close button
        fadeTarget.innerHTML = '<div class="boom-lightbox-outer" style="height: ' + selectorList[i].configs.height + '; width:' + selectorList[i].configs.width + ' ;">' +
            '<div class="boom-lightbox-close"></div>' + fadeTarget.innerHTML + '</div>';

        //set default opacity
        fadeTarget.style.opacity = 1;

        //register a click listener to hide the window
        fadeTarget.addEventListener("click", boomLightBoxHide);
    }
}

function boomLightBoxShow(selector) {
    var fadeTarget = resolveElement(selector);
    if (fadeTarget == null) {
        return;
    }

    //init as transparent and visible
    fadeTarget.style.opacity = 0;
    fadeTarget.style.display = 'block';

    var fadeInEffect = setInterval(function () {
        var cnt = parseFloat(fadeTarget.style.opacity);
        if (cnt > 1) {
            clearInterval(fadeInEffect);
            fadeTarget.style.opacity = "1";
        } else {
            cnt += 0.1;
            fadeTarget.style.opacity = cnt.toString();
        }
    }, 20);
}

function boomLightBoxHide(selector) {
    var fadeTarget = resolveElement(selector);
    if (fadeTarget == null) {
        return;
    }

    if (fadeTarget.className == "boom-lightbox-close") {
        //we accept the close button click, so make the target the parent of outer which is parent of close
        fadeTarget = fadeTarget.parentElement.parentElement;
    }

    if (fadeTarget.className == "boom-lightbox") {
        //handle the click event to hide the box
        fadeTarget.style.opacity = '1';
        fadeTarget.style.display = 'block';

        var fadeOutEffect = setInterval(function () {
            var cnt = parseFloat(fadeTarget.style.opacity);

            if (cnt < 0) {
                clearInterval(fadeOutEffect);
                //hide and reset opacity
                fadeTarget.style.display = 'none';
                fadeTarget.style.opacity = '1';

                //if there is an iframe inside maybe embedded multimedia video/audio, we should reload so it stops playing
                var iframes = fadeTarget.getElementsByTagName("iframe");
                if (iframes != null) {
                    for (var i = 0; i < iframes.length; i++) {
                        iframes[i].src = iframes[i].src; //causes a reload so it stops playing, music, video, etc.
                    }
                }
                
            } else {
                cnt -= 0.1;
                fadeTarget.style.opacity = cnt.toString();
            }
        }, 20);
    }
}

function resolveElement(selector) {
    //resolve the selector to an element
    if (selector == null) {
        return;
    }
    var element = null;
    //try to see if it's a string selector first
    if (typeof selector === 'string' || selector instanceof String) {
        element = document.getElementById(selector); //resolve selector to element
    } else {
        if (selector.type == "click") {
            element = selector.target; //the clicked target
        } else {
            element = selector; //the actual element was passed
        }        
    }
    if (element.style == null) {
        return; //invalid element not found
    }

    return element;
}

