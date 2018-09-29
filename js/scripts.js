//  scroll it

function scrollIt(destination, duration = 200, easing = 'linear', callback) {
    const easings = { easeInOutQuart(t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; } };
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
    if ('requestAnimationFrame' in window === false) {
        window.scroll(0, destinationOffsetToScroll);
        if (callback) {
            callback();
        }
        return;
    }
    function scroll() {
        const now = 'now' in window.performance ? performance.now() : new Date().getTime();
        const time = Math.min(1, ((now - startTime) / duration));
        const timeFunction = easings[easing](time);
        window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));
        if (window.pageYOffset === destinationOffsetToScroll) {
            if (callback) {
                callback();
            }
            return;
        }
        requestAnimationFrame(scroll);
    }
    scroll();
}

//  in viewport js

function inViewport(elem){
    var allElements = document.getElementsByTagName(elem),
        windowHeight = window.innerHeight;
    window.addEventListener('scroll', elems);
    function elems(){
        for (var i = 0; i < allElements.length; i++) {
            var viewportOffset = allElements[i].getBoundingClientRect(),
                top = viewportOffset.top;
            if(top < windowHeight){
                allElements[i].classList.add('in-viewport');
            } else{
                allElements[i].classList.remove('in-viewport');
            }
        }
    }
    elems();
}
inViewport('section');

//  dot nav

var allSecs = document.getElementsByTagName('section'),
    allDots,
    allVis = document.getElementsByClassName('in-viewport'),
    nav = document.getElementById('dot-nav'),
    scrollSpeed = '1000';

for (var i = 0; i < allSecs.length; i++) {
    allSecs[i].id = 'section-' + i;
}

//  add the dots

function buildNav(){
    for (var i = 0; i < allSecs.length; i++) {
        var dotCreate = document.createElement('a');
        dotCreate.id = 'dot-' + i;
        dotCreate.classList.add('dots');
        dotCreate.href = '#';
        dotCreate.setAttribute('data-sec', i);
        nav.appendChild(dotCreate);
    }
}
buildNav();

//  nav position

var navHeight = document.getElementById('dot-nav').clientHeight,
    hNavHeight = navHeight / 2;
document.getElementById('dot-nav').style.top = 'calc(50% - ' + hNavHeight + 'px)';

//  onscroll

window.onscroll = function(){
    allVis = document.getElementsByClassName('in-viewport');
    allDots = document.getElementsByClassName('dots');
    visNum = allVis.length;
    for (var i = 0; i < allSecs.length; i++) {
        allDots[i].classList.remove('active');
    }
    for (var i = 0; i < allVis.length; i++) {
        allDots[i].classList.add('active');
    }
};

//  click stuff

allDots = document.getElementsByClassName('dots');
for (var i = 0; i < allDots.length; i++) {
    allDots[i].addEventListener('click', scrollMe);
}
function scrollMe(e){
    var anchor = e.currentTarget.dataset.sec;
    scrollIt(document.querySelector('#section-' + anchor), scrollSpeed, 'easeInOutQuart');
    e.preventDefault();
}
