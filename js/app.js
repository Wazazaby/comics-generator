const links = document.querySelectorAll('.options .column a');

if(links && links.length > 0){
    for(let link of links){
        const target = document.querySelector(link.hash);
    
        link.addEventListener('click', event => {
            event.preventDefault();
            target.classList.remove('is-hidden');
            target.scrollIntoView({behavior: 'smooth', block: 'center'});
    
            const h3h3 = target.querySelector('h2');
            h3h3.innerHTML = new Typed(h3h3, {strings: [h3h3.dataset.myText], showCursor: false, typeSpeed: 10, startDelay: 100});
    
            const imagesJson = JSON.parse(event.srcElement.dataset.choiceImage);
            const imagesArray = imagesJson.images;
    
            const displayImages = document.getElementById('display-images');
    
            if(imagesArray && imagesArray.length > 0){
                for(let image of imagesArray){
                    const imgTag = document.createElement('IMG');
                    imgTag.src = image;
                    
                    setTimeout(() => {
                        if(imgTag.naturalWidth < 2800){
                            imgTag.classList.add('image-is-one');
                        }else{
                            imgTag.classList.add('image-is-two');
                        }
                    }, 1000);
    
                    displayImages.appendChild(imgTag);
                }
            }
        });
    }
}

const saveLink = document.getElementById('save-bd-as-png').addEventListener('click', e => {
    e.preventDefault();
    html2canvas(document.querySelector('#display-images'), {useCORS: true}).then(canvasElm => {
        console.dir(canvasElm)
        const canvasUrl = canvasElm.toDataURL('image/png');
        if(canvasUrl.indexOf('image/octet-stream')){
            canvasUrl.replace('data:image/octet-stream;base64,', '');
        }else if(canvasUrl.indexOf('image/png')){
            canvasUrl.replace('data:image/png;base64,', '');
        }
        console.log(canvasUrl);

        const link  = document.createElement('a');
        window.open(canvasElm.toDataURL('image/png'));
        link.href = canvasUrl;
        link.download = 'image.png';
        link.click()
    });
});