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
let worksImgs = {};
// axios.get('http://nicholasm.byethost32.com/wp-json/wp/v2/works/?per_page=100', { headers: {'Access-Control-Allow-Origin': '*'} })
axios.get('http://nicholasmarschner.dreamhosters.com/wp-json/wp/v2/works/?per_page=100')
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

    let workDivs = [];
    let allImgLoadCount = 0;
    let worksArr = Object.entries(works);
    console.log(worksArr);

    worksArr.map(work => {
        let workDiv = document.createElement('div');
        workDivs.push(workDiv);
        workDiv.classList.add('work');
        let imgDiv = document.createElement('div');
        imgDiv.classList.add('workImg');
        workDiv.appendChild(imgDiv);

        let imgLoadCount = 0;
        worksImgs[work[0]] = [];
        for (var i = 0; i < work[1].media.length; i++) {

            let img = document.createElement('img');
            img.onload = () => {
                imgLoadCount++;
                if (imgLoadCount === work[1].media.length) {

                    // console.log(`all imgs for ${work[0]} loaded`);
                    imgDiv.appendChild(worksImgs[work[0]][0]);

                    let workText = document.createElement('div');
                    workText.classList.add('workText');
                    let titleX = document.createElement('p');
                    titleX.innerText = work[0];
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
                        for (var i = 0; i < workDivs.length; i++) {
                            worksWrap.appendChild(workDivs[i]);
                        };
                        dataFetchCount++;
                        if (dataFetchCount === 3) {
                            init();
                        };
                    };
                };
            };
            img.alt = work[0];
            // let urlX = work[1].media[i].url.split('78/');
            // let url = `${urlX[0]}78/nickysofttouch/${urlX[1]}`;
            // img.src = url;
            img.src = work[1].media[i].url;
            worksImgs[work[0]].push(img);

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
// axios.get('http://nicholasm.byethost32.com/wp-json/wp/v2/info/?per_page=100', { headers: {'Access-Control-Allow-Origin': '*'} })
axios.get('http://nicholasmarschner.dreamhosters.com/wp-json/wp/v2/info/?per_page=100')
.then(res => {

        let data = res.data[0].acf;
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
// axios.get('http://nicholasm.byethost32.com/wp-json/wp/v2/exhibitions/?per_page=100', { headers: {'Access-Control-Allow-Origin': '*'} })
axios.get('http://nicholasmarschner.dreamhosters.com/wp-json/wp/v2/exhibitions/?per_page=100')
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
    // console.log('lets go');

    clearInterval(loadingInt);
    title.innerText = 'Nicholas Marschner';
    let contactWrap = document.getElementById('contactWrap');
    let worksWrap = document.getElementById('works');

    contactWrap.style.opacity = '1';
    worksWrap.style.opacity = '1';

    var workImgsXX = document.getElementsByClassName('workImg');
    var transitioning = false;
    var firstClick = false;
    var prevTarget = null;
    let positions = {};

    let worksImgsArr = Object.entries(worksImgs);
    for (var i = 0; i < worksImgsArr.length; i++) {
        positions[worksImgsArr[i][0]] = 0;
    };

    function imgClick(e) {
        if (!transitioning && worksImgs[e.target.alt].length > 1) {
            console.log(worksImgs[e.target.alt]);
            transitioning = true;
            positions[e.target.alt]++;
            if (positions[e.target.alt] === worksImgs[e.target.alt].length) {
                positions[e.target.alt] = 0;
            };
            console.log(positions[e.target.alt]);
            let targetX = e.target.parentNode;
            targetX.style.opacity = '0';
            setTimeout(function() {
                targetX.appendChild(worksImgs[e.target.alt][positions[e.target.alt]]);
                targetX.removeChild(targetX.children[0]);
                targetX.style.opacity = '1';
                setTimeout(() => {
                    transitioning = false;
                }, 350);
            }, 350);
        };
    };

    for (var i = 0; i < workImgsXX.length; i++) {
        workImgsXX[i].addEventListener('click', (e) => imgClick(e));
    };

    var infoButton = document.getElementById('infoButton');
    var info = document.getElementById('info');
    var infoOpen = false;

    function openInfo() {
        if (!infoOpen) {
            info.style.display = 'flex';
            setTimeout(() => {
                bodyScrollLock.disableBodyScroll(document.body);
                bodyScrollLock.disableBodyScroll(info);
                info.style.opacity = '1';
                infoOpen = true;
            }, 100);
        };
    };

    function closeInfo(e) {
        if (infoOpen && e.target.id !== 'mobLink') {
            info.style.opacity = '0';
            setTimeout(() => {
                info.style.display = 'none';
                infoOpen = false;
                bodyScrollLock.enableBodyScroll(document.body);
                bodyScrollLock.enableBodyScroll(info);
            }, 350);
        };
    };

    infoButton.addEventListener('click', () => {
        if (infoOpen) {
            closeInfo(e);
        } else {
            openInfo();
        };
    });

    info.addEventListener('click', closeInfo);

};
