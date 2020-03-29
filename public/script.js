var globoTransitioning = false;

var workImgs = document.getElementsByClassName('workImg');
var imgCount = 0;
var transitioning = false;
var firstClick = false;
var prevTarget = null;
var nav = document.getElementById('nav');
var imgs = {
    casting: [],
    hook: [],
    mirror: []
};
var imgLoadCount = 0;

function preloadImgs()
{
    for (var i = 1; i < 3; i++) {
        var img = new Image();
        img.src = `/img/casting${i}.jpg`;
        img.onload = imgs.casting.push(img);
        imgLoadCount++;
        if (imgLoadCount === 10) {
            init();
        }
    }

    for (var i = 1; i < 5; i++) {
        var img = new Image();
        img.src = `/img/hook${i}.jpg`;
        img.onload = imgs.hook.push(img);
        imgLoadCount++;
        if (imgLoadCount === 10) {
            init();
        }
    }

    for (var i = 1; i < 5; i++) {
        var img = new Image();
        img.src = `/img/mirror${i}.jpg`;
        img.onload = imgs.mirror.push(img);
        imgLoadCount++;
        if (imgLoadCount === 10) {
            init();
        }
    }
}

preloadImgs();

function init() {
    console.log(imgs);
    document.body.style.opacity = '1';
}

for (var i = 0; i < workImgs.length; i++) {
    workImgs[i].addEventListener('click', (e) => {
        if (!transitioning) {
            transitioning = true;
            if (e.target !== prevTarget && firstClick) {
                console.log('new target');
                imgCount = -1;
                console.log(imgCount);
                prevTarget = e.target;
            }
            if (!firstClick) {
                firstClick = true;
                console.log('first click:', firstClick);
            }
            e.target.style.opacity = '0';
            setTimeout(() => {
                imgCount += 1;
                console.log(imgCount);
                if (imgCount > imgs[e.target.id].length - 1) {
                    imgCount = 0;
                    console.log(imgCount);
                }
                e.target.src = imgs[e.target.id][imgCount].src;
                e.target.onload = console.log('loaded');
                console.log(imgs[e.target.id][imgCount]);
                console.log(e.target.src);
            }, 350);
            setTimeout(() => {
                e.target.style.opacity = '1';
            }, 450);
            setTimeout(() => {
                transitioning = false;
            }, 800);
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
