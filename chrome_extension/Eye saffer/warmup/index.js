const h1 = document.querySelector('h1');

setTimeout(() => {
    h1.classList.add('animate__zoomOut');
}, 2000)

fetch('https://picsum.photos/1920/1080').then(({url}) => {
    document.body.style.background = `url('${url}')`
});
