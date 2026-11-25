const ASSETS_DRIVE_API_URL = 'https://script.google.com/macros/s/AKfycbwyQnguqPabAVG9PwTVkzSf9AgZZMrNkBO20x3bnDDzxAwtheXLLR04d1x_tbPEQtno/exec';

const photoProfile = document.querySelector('.photo-profile');
const message = document.querySelector('.message');
const newDesign = document.querySelector('.new-design');
const feedDesign = document.getElementById('feed-design');

function showData(files) {
    console.log('Success:', files);

    const profileFiles = files
        .filter(file => file.folder && file.folder.includes('photo-profile')
            && file.tipe && file.tipe.includes('image')
            && file.nama && file.nama.includes('active'));

    if (profileFiles.length > 0) {
        const active = profileFiles[0];
        photoProfile.style.backgroundImage = `url("https://drive.google.com/thumbnail?id=${active.id}&sz=w800")`;
    }

    const messageFile = files
        .filter(file => file.folder && file.folder.includes('note')
            && file.tipe && file.tipe.includes('text'))
        .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

    if (messageFile.length > 0) {
        messageFile.forEach(file => {
            let resultPlacement = [];
            for (i = 0; i < messageFile.length; i++) {
                let randomNumb = (Math.random() * 10);
                if (randomNumb < 2.5) {
                    resultPlacement.push(5);
                } else if (randomNumb >= 2.5 && randomNumb < 5) {
                    resultPlacement.push(-5);
                } else if (randomNumb >= 5 && randomNumb < 7.5) {
                    resultPlacement.push(-10);
                } else {
                    resultPlacement.push(10);
                }
            };
            console.log(resultPlacement);
            message.innerHTML += `
                <div class="note" style="transform: translate(${resultPlacement[0] * 2}px, ${resultPlacement[1] * 2}px) rotate(${resultPlacement[0]}deg)">
                    <p>${file.isi}</p>
                </div>
            `;
        });
    }

    newDesign.innerHTML = '';
    feedDesign.innerHTML = '';

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const newFileDesign = files
        .filter(file => (now - file.timestamp) <= oneDay)
        .sort((a, b) => b.timestamp - a.timestamp).slice(0, 1);

    if (newFileDesign.length <= 1) {
        newDesign.innerHTML = '<img src="assets/images/error-landscape.png">'
    } else {
        newFileDesign.forEach(file => {
            newDesign.innerHTML += `
                <img src="${file.url}" alt="${file.nama}"  referrerpolicy="no-referrer">
            `;
        });
    };

    const feedFiles = files
        .filter(file => file.folder && file.folder.includes('feed-design')
            && file.tipe && file.tipe.includes('image'))
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    if (feedFiles.length === 0) {
        feedDesign.innerHTML = `
            <img src="assets/images/error-potrait.png" alt="Kosong">
            <img src="assets/images/error-potrait.png" alt="Kosong">
        `;
    } else {
        feedFiles.forEach(file => {
            feedDesign.innerHTML += `
            <img src="https://drive.google.com/thumbnail?id=${file.id}&sz=w1600" alt="${file.nama}" referrerpolicy="no-referrer">
            `;
        });
    };
}

function loadDriveAssets() {
    const script = document.createElement('script');
    script.src = `${ASSETS_DRIVE_API_URL}?callback=showData`;
    document.body.appendChild(script);
}

loadDriveAssets();
