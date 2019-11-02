//const firstTitle = document.querySelector('#option-set-1 h2');
//const typed = new Typed(firstTitle, {strings: [firstTitle.dataset.myText], showCursor: false, typeSpeed: 10});
const links = document.querySelectorAll('.options .column a');

for(let link of links){
	const target = document.querySelector(link.hash);

	link.addEventListener('click', event => {
		event.preventDefault();
		target.classList.remove('is-hidden');
		target.scrollIntoView({behavior: 'smooth', block: 'center'});

		const h3h3 = target.querySelector('h2');
		h3h3.innerHTML = new Typed(h3h3, {strings: [h3h3.dataset.myText], showCursor: false, typeSpeed: 20, startDelay: 100});

		const imagesJson = JSON.parse(event.srcElement.dataset.choiceImage);
		const imagesArray = imagesJson.images;

		const displayImages = document.getElementById('display-images');

		if(imagesArray && imagesArray.length > 0){
			for(let image of imagesArray){
				const imgTag = document.createElement('IMG');
				imgTag.src = image;
				imgTag.crossOrigin = 'anonymous';

				setTimeout(() => {
					if(imgTag.naturalWidth > 3000){
						imgTag.classList.add('image-is-two');
					}else{
						imgTag.classList.add('image-is-one');
					}
				}, 100);

				displayImages.appendChild(imgTag);
			}
		}
	});
}

const saveAs = (uri, filename) => {
    const link = document.createElement('a');

    if(typeof(link.download) === 'string'){
      	link.href = uri;
      	console.dir(link)
      	link.download = filename;
      	document.body.appendChild(link);
      	link.click();
      	document.body.removeChild(link);
    }else{
      	window.open(uri);
    }
}

document.getElementById('save-comic').addEventListener('click', event => {
	const bd = document.getElementById('display-images');

	html2canvas(bd).then(canvas => {
    	const base64image = canvas.toDataURL("image/png");
    	window.open(base64image , "_blank");
    });
});