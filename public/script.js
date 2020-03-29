var globoTransitioning = false;

var workImgs = document.getElementsByClassName('workImg');
var imgCount = 0;
var transitioning = false;
var firstClick = false;
var prevTarget = null;
var nav = document.getElementById('nav');
var imgs = {
    casting: {
        srcs: [],
        pos: 0
    },
    hook: {
        srcs: [],
        pos: 0
    },
    mirror: {
        srcs: [],
        pos: 0
    }
};
var imgLoadCount = 0;

function preloadImgs()
{
    for (var i = 1; i < 3; i++) {
        var img = new Image();
        img.src = `/img/casting${i}.jpg`;
        img.onload = imgs.casting.srcs.push(img);
        imgLoadCount++;
        if (imgLoadCount === 10) {
            init();
        }
    }

    for (var i = 1; i < 5; i++) {
        var img = new Image();
        img.src = `/img/hook${i}.jpg`;
        img.onload = imgs.hook.srcs.push(img);
        imgLoadCount++;
        if (imgLoadCount === 10) {
            init();
        }
    }

    for (var i = 1; i < 5; i++) {
        var img = new Image();
        img.src = `/img/mirror${i}.jpg`;
        img.onload = imgs.mirror.srcs.push(img);
        imgLoadCount++;
        if (imgLoadCount === 10) {
            init();
        }
    }
}

preloadImgs();

function init() {
    document.body.style.opacity = '1';
}

for (var i = 0; i < workImgs.length; i++) {
    workImgs[i].addEventListener('click', (e) => {
        if (!transitioning) {
            transitioning = true;
            e.target.style.opacity = '0';
            setTimeout(() => {
                imgs[e.target.id].pos += 1;
                if (imgs[e.target.id].pos > imgs[e.target.id].srcs.length - 1) {
                    imgs[e.target.id].pos = 0;
                }
                e.target.src = imgs[e.target.id].srcs[imgs[e.target.id].pos].src;
                e.target.onload = () => {
                    e.target.style.opacity = '1';
                    setTimeout(() => {
                        transitioning = false;
                    }, 350);
                };
            }, 350);
        };
    });
}

var infoButton = document.getElementById('infoButton');
var info = document.getElementById('info');
var infoOpen = false;

infoButton.addEventListener('click', () => {
    if (!infoOpen) {
        info.style.display = 'flex';
        setTimeout(() => {
            bodyScrollLock.disableBodyScroll(document.body);
            info.style.opacity = '1';
            infoOpen = true;
        }, 100);
    } else {
        info.style.opacity = '0';
        setTimeout(() => {
            info.style.display = 'none';
            infoOpen = false;
            bodyScrollLock.enableBodyScroll(document.body);
        }, 350);
    }
});

info.addEventListener('click', () => {
    if (infoOpen) {
        info.style.opacity = '0';
        setTimeout(() => {
            info.style.display = 'none';
            infoOpen = false;
            bodyScrollLock.enableBodyScroll(document.body);
        }, 350);
    }
});
