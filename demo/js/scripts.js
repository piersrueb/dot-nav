//  dot nav

const dotNav = () => {

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
        const allElements = document.getElementsByTagName(elem),
            windowHeight = window.innerHeight;
        window.addEventListener('scroll', elems);
        function elems(){
            for (let i = 0; i < allElements.length; i++) {
                let viewportOffset = allElements[i].getBoundingClientRect(),
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

    const allSecs = document.getElementsByTagName('section');
    const nav = document.getElementById('dot-nav');
    const scrollSpeed = '1000';
    let allVis = document.getElementsByClassName('in-viewport'),
        allDots;

    for (let i = 0; i < allSecs.length; i++) {
        allSecs[i].classList.add('section-' + i);
    }

    //  add the dots

    const buildNav = () => {
        for (let i = 0; i < allSecs.length; i++) {
            const dotCreate = document.createElement('a');
            dotCreate.id = 'dot-' + i;
            dotCreate.classList.add('dots');
            dotCreate.href = '#';
            dotCreate.setAttribute('data-sec', i);
            nav.appendChild(dotCreate);
        }
    }
    buildNav();

    //  nav position

    let navHeight = document.getElementById('dot-nav').clientHeight,
        hNavHeight = navHeight / 2;
    document.getElementById('dot-nav').style.top = 'calc(50% - ' + hNavHeight + 'px)';

    //  onscroll

    const dotActive = () => {
        allVis = document.getElementsByClassName('in-viewport');
        allDots = document.getElementsByClassName('dots');
        visNum = allVis.length;
        let a = visNum - 1;
        for (let i = 0; i < allSecs.length; i++) {
            allDots[i].classList.remove('active');
        }
        document.getElementById('dot-' + a).classList.add('active');
    }
    dotActive();
    window.onscroll = function(){ dotActive(); };

    //  click stuff

    const scrollMe = (e) => {
        let anchor = e.currentTarget.dataset.sec;
        scrollIt(document.querySelector('.section-' + anchor), scrollSpeed, 'easeInOutQuart');
        e.preventDefault();
    }

    allDots = document.getElementsByClassName('dots');
    for (let i = 0; i < allDots.length; i++) {
        allDots[i].addEventListener('click', scrollMe);
    }

}

if (document.getElementById('dot-nav').length > 0) {
    dotNav();
}

let x = document.getElementById('dot-nav').length;

console.log(document.getElementById('dot-nav').length);
