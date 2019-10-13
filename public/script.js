var workImgs = document.getElementsByClassName('workImg');
var imgCount = 1;
var transitioning = false;
var prevTarget = null;
var nav = document.getElementById('nav');

setTimeout(() => {
    console.log(workImgs[0].getBoundingClientRect().top);
    nav.style.top = `${workImgs[0].getBoundingClientRect().top}px`;
    document.body.style.opacity = '1';
}, 100);

window.addEventListener('resize', () => {
    console.log(workImgs[0].getBoundingClientRect().top);
    nav.style.top = `${workImgs[0].getBoundingClientRect().top}px`;
})

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
                if ((e.target.id === 'mirror' && imgCount > 4) || (e.target.id === 'hook' && imgCount > 4)) {
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
})

info.addEventListener('click', () => {
    if (infoOpen) {
        info.style.opacity = '0';
        setTimeout(() => {
            info.style.display = 'none';
            infoOpen = false;
        }, 350);
    }
})
