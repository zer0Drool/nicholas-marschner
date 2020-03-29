var globoTransitioning = false;

var workImgs = document.getElementsByClassName('workImg');
var imgCount = 1;
var transitioning = false;
var prevTarget = null;
var nav = document.getElementById('nav');

setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);

for (var i = 0; i < workImgs.length; i++) {
    workImgs[i].addEventListener('click', (e) => {
        if (!transitioning) {
            transitioning = true;
            if (e.target !== prevTarget) {
                console.log('new target');
                imgCount = 1;
                console.log(imgCount);
                prevTarget = e.target;
            }
            e.target.style.opacity = '0';
            setTimeout(() => {
                imgCount += 1;
                console.log(imgCount);
                if ((e.target.id === 'mirror' && imgCount > 4) || (e.target.id === 'hook' && imgCount > 4) || (e.target.id === 'casting' && imgCount > 2)) {
                    imgCount = 1;
                    console.log(imgCount);
                }
                e.target.src = `img/${e.target.id + imgCount}.jpg`;
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

var mirrorWrap = document.getElementById('mirrorWrap')
mirrorWrap.addEventListener('click', mirrorChange);

var mirrorCounter = 1;

function mirrorChange() {
    if (!mirrorLoaded || globoTransitioning) {
        return;
    }
    globoTransitioning = true;
    var mirrorImg = document.getElementsByClassName('mirrorImg')[0];
    mirrorImg.style.opacity = 0;
    setTimeout(() => {
        mirrorImg.parentNode.removeChild(mirrorImg);
        mirrorObjs[mirrorCounter].style.opacity = 0;
        mirrorWrap.appendChild(mirrorObjs[mirrorCounter]);
        setTimeout(() => {
            document.getElementsByClassName('mirrorImg')[0].style.opacity = 1;
            mirrorCounter = mirrorCounter === 3 ? 0 : mirrorCounter + 1;
            globoTransitioning = false;
        }, 50);
    }, 350);
}

var hookWrap = document.getElementById('hookWrap')
hookWrap.addEventListener('click', hookChange);

var hookCounter = 1;

function hookChange() {
    if (!hookLoaded || globoTransitioning) {
        return;
    }
    globoTransitioning = true;
    var hookImg = document.getElementsByClassName('hookImg')[0];
    hookImg.style.opacity = 0;
    setTimeout(() => {
        hookImg.parentNode.removeChild(hookImg);
        hookObjs[hookCounter].style.opacity = 0;
        hookWrap.appendChild(hookObjs[hookCounter]);
        setTimeout(() => {
            document.getElementsByClassName('hookImg')[0].style.opacity = 1;
            hookCounter = hookCounter === 3 ? 0 : hookCounter + 1;
            globoTransitioning = false;
        }, 50);
    }, 350);
}
