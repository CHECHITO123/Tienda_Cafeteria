document.querySelectorAll('.ingrediente input').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        let imgSrc = this.nextElementSibling.querySelector('img').src;
        let ensaladaArea = document.querySelector('.ensalada-area');
        if (this.checked) {
            let img = document.createElement('img');
            img.src = imgSrc;
            img.style.position = 'absolute';
            img.style.width = '50px';
            img.style.height = '50px';
            img.style.left = `${Math.random() * (ensaladaArea.offsetWidth - 50)}px`;
            img.style.top = `${Math.random() * (ensaladaArea.offsetHeight - 50)}px`;
            ensaladaArea.appendChild(img);
        } else {
            let imgs = document.querySelectorAll('.ensalada-area img');
            imgs.forEach(img => {
                if (img.src === imgSrc) {
                    img.remove();
                }
            });
        }
    });
});
