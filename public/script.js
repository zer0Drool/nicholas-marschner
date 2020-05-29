console.log('design: Nicholas Marschner');
console.log('development: @mobius_blip');

// mobile detection
// let mobile = window.matchMedia("(pointer:coarse)").matches;

// loading
let title = document.getElementById('title');
let loadingInt;
let loadingArr = ['Nicholas Marschner', 'Nicholas Marschner.', 'Nicholas Marschner..', 'Nicholas Marschner...'];
let loadingCount = 0;

function loading() {
    title.innerText = loadingArr[loadingCount];
    loadingCount = loadingCount < loadingArr.length - 1 ? loadingCount + 1 : 0;
};

loadingInt = setInterval(loading, 250);

let dataFetchCount = 0;

// get work data
let works = {};
let worksWrap = document.getElementById('works');
axios.get('http://192.168.0.78/nickysofttouch/index.php/wp-json/wp/v2/works/?per_page=100')
.then(res => {
    res.data.map(post => {

        let work = post.acf;
        let title = post.title.rendered;
        works[title] = {
            description: work.description,
            dimensions: work.dimensions,
            materials: work.materials,
            year: work.year,
            media: []
        };

        for (var i = 1; i <= 8; i++) {
            let url = `${i}_work_image`;
            if (work[url]) {
                let mediaObj = {
                    url: work[url]
                };
                works[title].media.push(mediaObj);
            };
        };

    });
})
.then(() => {

    let worksImgs = {};
    let allImgLoadCount = 0;
    let worksArr = Object.entries(works);
    console.log(worksArr);

    worksArr.map(work => {
        let workDiv = document.createElement('div');
        workDiv.classList.add('work');

        worksImgs[work[0]] = [];
        for (var i = 0; i < work[1].media.length; i++) {

            let img = document.createElement('img');
            img.onload = () => {
                worksImgs[work[0]].push(img);
                if (worksImgs[work[0]].length === work[1].media.length) {

                    console.log(`all imgs for ${work[0]} loaded`);
                    workDiv.appendChild(worksImgs[work[0]][0]);

                    let workText = document.createElement('div');
                    let titleX = document.createElement('p');
                    titleX.innerText = work.title;
                    workText.appendChild(titleX);
                    if (work[1].materials) {
                        let materialsX = document.createElement('p');
                        materialsX.innerText = work[1].materials;
                        workText.appendChild(materialsX);
                    };
                    if (work[1].dimensions) {
                        let dimensionsX = document.createElement('p');
                        dimensionsX.innerText = work[1].dimensions;
                        workText.appendChild(dimensionsX);
                    };
                    if (work[1].description) {
                        let descriptionX = document.createElement('p');
                        descriptionX.innerHTML = work[1].description;
                        workText.appendChild(descriptionX);
                    };
                    workDiv.appendChild(workText);
                    worksWrap.appendChild(workDiv);

                    allImgLoadCount++;
                    if (allImgLoadCount === worksArr.length) {
                        dataFetchCount++;
                        if (dataFetchCount === 3) {
                            init();
                        };
                    };
                };
            };
            img.classList.add('workImg');
            img.alt = work[0];
            let urlX = work[1].media[i].url.split('78/');
            let url = `${urlX[0]}78/nickysofttouch/${urlX[1]}`;
            img.src = url;
            // img.src = work[1].media[i].url;

        };

    });

})
.catch(err => console.log('error fetching works >>> ', err));

// get info data
let information = {};
let mail = document.getElementById('mail');
let insta = document.getElementById('insta');
let phone = document.getElementById('phone');
let infoText = document.getElementById('infoText');
axios.get('http://192.168.0.78/nickysofttouch/index.php/wp-json/wp/v2/info/?per_page=100')
.then(res => {

        let data = res.data[0].acf;
        console.log(data);
        information = {
            bio: data.bio,
            insta: data.insta,
            mail: data.mail,
            phone: data.phone
        };

})
.then(() => {

    mail.innerText = information.mail;
    mail.href = `mailto:${information.mail}`;
    insta.innerText = information.insta;
    insta.href = `https://www.instagram.com/${information.insta.replace('@', '')}`;
    phone.innerText = information.phone;
    infoText.innerHTML = information.bio;

    dataFetchCount++;
    if (dataFetchCount === 3) {
        init();
    };

})
.catch(err => console.log('error fetching info >>> ', err));

// get exhibitions data
let exhibitions = {};
let exhibitionsWrap = document.getElementById('exhibitionsWrap');
axios.get('http://192.168.0.78/nickysofttouch/index.php/wp-json/wp/v2/exhibitions/?per_page=100')
.then(res => {
    res.data.map(post => {

        let exhibition = post.acf;
        let title = post.title.rendered;
        exhibitions[title] = {
            location: exhibition.location,
            year: exhibition.year
        };

    });
})
.then(() => {

    let exhibitionsArr = Object.entries(exhibitions);
    console.log(exhibitionsArr);
    for (var i = 0; i < exhibitionsArr.length; i++) {
        exhibitionsWrap.innerHTML = exhibitionsWrap.innerHTML + `<p>${exhibitionsArr[i][0]} - ${exhibitionsArr[i][1].location} - ${exhibitionsArr[i][1].year}</p>`;
        if (i === exhibitionsArr.length - 1) {
            dataFetchCount++;
            if (dataFetchCount === 3) {
                init();
            };
        };
    };

})
.catch(err => console.log('error fetching exhibitions >>> ', err));


function init() {
    console.log('yeet');
};




// var globoTransitioning = false;
//
// var workImgs = document.getElementsByClassName('workImg');
// var imgCount = 0;
// var transitioning = false;
// var firstClick = false;
// var prevTarget = null;
// var nav = document.getElementById('nav');
// var imgs = {
//     casting: {
//         srcs: [],
//         pos: 0
//     },
//     hook: {
//         srcs: [],
//         pos: 0
//     },
//     mirror: {
//         srcs: [],
//         pos: 0
//     }
// };
// var imgLoadCount = 0;
//
// function preloadImgs()
// {
//     for (var i = 1; i < 3; i++) {
//         var img = new Image();
//         img.src = `/img/casting${i}.jpg`;
//         img.onload = imgs.casting.srcs.push(img);
//         imgLoadCount++;
//         if (imgLoadCount === 10) {
//             init();
//         }
//     }
//
//     for (var i = 1; i < 5; i++) {
//         var img = new Image();
//         img.src = `/img/hook${i}.jpg`;
//         img.onload = imgs.hook.srcs.push(img);
//         imgLoadCount++;
//         if (imgLoadCount === 10) {
//             init();
//         }
//     }
//
//     for (var i = 1; i < 5; i++) {
//         var img = new Image();
//         img.src = `/img/mirror${i}.jpg`;
//         img.onload = imgs.mirror.srcs.push(img);
//         imgLoadCount++;
//         if (imgLoadCount === 10) {
//             init();
//         }
//     }
// }
//
// preloadImgs();
//
// function init() {
//     document.body.style.opacity = '1';
// }
//
// for (var i = 0; i < workImgs.length; i++) {
//     workImgs[i].addEventListener('click', (e) => {
//         if (!transitioning) {
//             transitioning = true;
//             e.target.style.opacity = '0';
//             setTimeout(() => {
//                 imgs[e.target.id].pos += 1;
//                 if (imgs[e.target.id].pos > imgs[e.target.id].srcs.length - 1) {
//                     imgs[e.target.id].pos = 0;
//                 }
//                 e.target.src = imgs[e.target.id].srcs[imgs[e.target.id].pos].src;
//                 e.target.onload = () => {
//                     e.target.style.opacity = '1';
//                     setTimeout(() => {
//                         transitioning = false;
//                     }, 350);
//                 };
//             }, 350);
//         };
//     });
// }
//
// var infoButton = document.getElementById('infoButton');
// var info = document.getElementById('info');
// var infoOpen = false;
//
// infoButton.addEventListener('click', () => {
//     if (!infoOpen) {
//         info.style.display = 'flex';
//         setTimeout(() => {
//             bodyScrollLock.disableBodyScroll(document.body);
//             info.style.opacity = '1';
//             infoOpen = true;
//         }, 100);
//     } else {
//         info.style.opacity = '0';
//         setTimeout(() => {
//             info.style.display = 'none';
//             infoOpen = false;
//             bodyScrollLock.enableBodyScroll(document.body);
//         }, 350);
//     }
// });
//
// info.addEventListener('click', () => {
//     if (infoOpen) {
//         info.style.opacity = '0';
//         setTimeout(() => {
//             info.style.display = 'none';
//             infoOpen = false;
//             bodyScrollLock.enableBodyScroll(document.body);
//         }, 350);
//     }
// });
