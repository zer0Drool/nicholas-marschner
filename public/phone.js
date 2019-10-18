console.log('pheon')

var globoTransitioning = false;

var workImgs = document.getElementsByClassName('workImg');
var imgCount = 1;
var transitioning = false;
var prevTarget = null;
var nav = document.getElementById('nav');

setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);

var dpr = window.devicePixelRatio || 1;

var mirrorSrcs = [];
var mirrorObjs = [];
var mirrorLoader = 0;
var mirrorLoaded = false;

for (var i = 0; i < 4; i++) {
    mirrorSrcs.push(`img/mirror${i + 1}.jpeg`);
    var mirrorObj = new Image();
    mirrorObj.src = mirrorSrcs[i];
    mirrorObj.className = 'mirrorImg';
    mirrorObj.onload = function() {
        mirrorLoader++;
        if (mirrorLoader === 4) {
            mirrorLoaded = true;
        }
    }
    mirrorObjs.push(mirrorObj);
}

var hookSrcs = [];
var hookObjs = [];
var hookLoader = 0;
var hookLoaded = false;

for (var i = 0; i < 4; i++) {
    hookSrcs.push(`img/hook${i + 1}.jpeg`);
    var hookObj = new Image();
    hookObj.src = hookSrcs[i];
    hookObj.className = 'hookImg';
    hookObj.onload = function() {
        hookLoader++;
        if (hookLoader === 4) {
            hookLoaded = true;
        }
    }
    hookObjs.push(hookObj);
}

var infoButton = document.getElementById('infoButton');
var info = document.getElementById('info');
var infoOpen = false;

infoButton.addEventListener('click', () => {
    if (!infoOpen) {
        console.log(bodyScrollLock);
        bodyScrollLock.disableBodyScroll(info);
        info.style.display = 'flex';
        setTimeout(() => {
            info.style.opacity = '1';
            infoOpen = true;
        }, 100);
    } else {
        info.style.opacity = '0';
        setTimeout(() => {
            info.style.display = 'none';
            bodyScrollLock.enableBodyScroll(info);
            infoOpen = false;
        }, 350);
    }
});

info.addEventListener('click', (e) => {
    if (infoOpen && e.target.tagName.toLowerCase() !== 'a') {
        info.style.opacity = '0';
        setTimeout(() => {
            info.style.display = 'none';
            bodyScrollLock.enableBodyScroll(info);
            infoOpen = false;
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
