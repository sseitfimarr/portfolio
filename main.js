const ASSETS_DRIVE_API_URL = 'https://script.google.com/macros/s/AKfycbwyQnguqPabAVG9PwTVkzSf9AgZZMrNkBO20x3bnDDzxAwtheXLLR04d1x_tbPEQtno/exec';

const photoProfile = document.querySelector('.photo-profile');
const newDesign = document.querySelector('.new-design');
const feedDesign = document.getElementById('feed-design');
const musicDesign = document.getElementById('music-design');

function showData(files) {
    console.log('Success:', files);
    files.forEach(file => {
        if (file.folder.includes('photo-profile') && file.nama.includes('active')) {
            photoProfile.style.backgroundImage = `url(${file.url})`;
        }
        if (file.folder.includes('new-design') && file.url == true) {
            newDesign.innerHTML += `<img src="${file.url}" alt="${file.nama}" referrerpolicy="no-referrer">`;
        } else {
            newDesign.innerHTML = '';
            newDesign.innerHTML = '<img src="assets/images/error-landscape.png">'
        }
        if (file.folder.includes('feed-design') && file.url == true) {
            feedDesign.innerHTML += `<img src="${file.url}" alt="${file.nama}" referrerpolicy="no-referrer">`;
        } else {
            feedDesign.innerHTML = '';
            feedDesign.innerHTML = '<img src="assets/images/error-potrait.png">'
            feedDesign.innerHTML += '<img src="assets/images/error-potrait.png">'
        }
        if (file.folder.includes('music') && file.url == true) {
            musicDesign.innerHTML += `<img src="${file.url}" alt="${file.nama}" referrerpolicy="no-referrer">`;
        } else {
            musicDesign.innerHTML = '';
            musicDesign.innerHTML = '<img src="assets/images/error-potrait.png">'
            musicDesign.innerHTML += '<img src="assets/images/error-potrait.png">'
        }
    });
}

function loadDriveAssets() {
    const script = document.createElement('script');
    script.src = `${ASSETS_DRIVE_API_URL}?callback=showData`;
    document.body.appendChild(script);
}

loadDriveAssets();
