var workImgs = document.getElementsByClassName('workImg');
var imgCount = 1;
var transitioning = false;
var prevTarget = null;
var nav = document.getElementById('nav');

setTimeout(() => {
    // console.log(workImgs[0].getBoundingClientRect().top);
    // nav.style.top = `${workImgs[0].getBoundingClientRect().top}px`;
    document.body.style.opacity = '1';
}, 100);

var canvMirror = document.getElementById('canvMirror');
var canvMirrorCtx = canvMirror.getContext('2d');
canvMirror.height = window.innerHeight * 0.6;
canvMirror.width = window.innerWidth * 0.2;

var mirrorSrcs = [];
var mirrorObjs = [];
var mirrorLoader = 0;
var mirrorLoaded = false;

for (var i = 0; i < 4; i++) {
    mirrorSrcs.push(`img/mirror${i + 1}.jpeg`);
    var mirrorObj = new Image();
    mirrorObj.src = mirrorSrcs[i];
    mirrorObj.onload = function() {
        mirrorLoader++;
        if (mirrorLoader === 4) {
            mirrorLoaded = true;
            drawMirror();
        }
    }
    mirrorObjs.push(mirrorObj);
}

var canvHook = document.getElementById('canvHook');
var canvHookCtx = canvHook.getContext('2d');
canvHook.height = window.innerHeight * 0.6;
canvHook.width = window.innerWidth * 0.2;

var hookSrcs = [];
var hookObjs = [];
var hookLoader = 0;
var hookLoaded = false;

for (var i = 0; i < 4; i++) {
    hookSrcs.push(`img/hook${i + 1}.jpeg`);
    var hookObj = new Image();
    hookObj.src = hookSrcs[i];
    hookObj.onload = function() {
        hookLoader++;
        if (hookLoader === 4) {
            hookLoaded = true;
            drawHook();
        }
    }
    hookObjs.push(hookObj);
}

var infoButton = document.getElementById('infoButton');
var info = document.getElementById('info');
var infoOpen = false;

infoButton.addEventListener('click', () => {
    if (!infoOpen) {
        info.style.display = 'flex';
        setTimeout(() => {
            info.style.opacity = '1';
            infoOpen = true;
        }, 100);
    } else {
        info.style.opacity = '0';
        setTimeout(() => {
            info.style.display = 'none';
            infoOpen = false;
        }, 350);
    }
});

info.addEventListener('click', () => {
    if (infoOpen) {
        info.style.opacity = '0';
        setTimeout(() => {
            info.style.display = 'none';
            infoOpen = false;
        }, 350);
    }
});

var mirrorCounter = 0;

function drawMirror() {
    if (!mirrorLoaded) {
        return;
    }
    canvMirrorCtx.clearRect(0, 0, canvMirror.width, canvMirror.height);
    var hRatio = canvMirror.width / mirrorObjs[mirrorCounter].naturalWidth;
    var vRatio = canvMirror.height / mirrorObjs[mirrorCounter].naturalHeight;
    var imgRatio = mirrorObjs[mirrorCounter].naturalHeight / mirrorObjs[mirrorCounter].naturalWidth;
    var imgDrop = (canvMirror.height - (canvMirror.width * imgRatio)) / 2
    canvMirrorCtx.drawImage(mirrorObjs[mirrorCounter], 0, imgDrop, canvMirror.width, canvMirror.width * imgRatio);
    mirrorCounter = mirrorCounter === 3 ? 0 : mirrorCounter + 1;
}

canvMirror.addEventListener('click', drawMirror);

var hookCounter = 0;

function drawHook() {
    if (!hookLoaded) {
        return;
    }
    canvHookCtx.clearRect(0, 0, canvHook.width, canvHook.height);
    var hRatio = canvHook.width / hookObjs[hookCounter].naturalWidth;
    var vRatio = canvHook.height / hookObjs[hookCounter].naturalHeight;
    var imgRatio = hookObjs[hookCounter].naturalHeight / hookObjs[hookCounter].naturalWidth;
    var imgDrop = (canvHook.height - (canvHook.width * imgRatio)) / 2
    canvHookCtx.drawImage(hookObjs[hookCounter], 0, imgDrop, canvHook.width, canvHook.width * imgRatio);
    hookCounter = hookCounter === 3 ? 0 : hookCounter + 1;
}

canvHook.addEventListener('click', drawHook);

// window.addEventListener('resize', () => {
//     console.log(workImgs[0].getBoundingClientRect().top);
//     nav.style.top = `${workImgs[0].getBoundingClientRect().top}px`;
// })

// for (var i = 0; i < workImgs.length; i++) {
//     workImgs[i].addEventListener('click', (e) => {
//         if (!transitioning) {
//             transitioning = true;
//             if (e.target !== prevTarget) {
//                 console.log('new target');
//                 imgCount = 1;
//                 console.log(imgCount);
//                 prevTarget = e.target;
//             }
//             e.target.style.opacity = '0';
//             setTimeout(() => {
//                 imgCount += 1;
//                 console.log(imgCount);
//                 if ((e.target.id === 'mirror' && imgCount > 4) || (e.target.id === 'hook' && imgCount > 4)) {
//                     imgCount = 1;
//                     console.log(imgCount);
//                 }
//                 e.target.src = `img/${e.target.id + imgCount}.jpeg`;
//             }, 350);
//             setTimeout(() => {
//                 e.target.style.opacity = '1';
//             }, 450);
//             setTimeout(() => {
//                 transitioning = false;
//             }, 800);
//         };
//     });
// }
