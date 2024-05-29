document.addEventListener('DOMContentLoaded', () => {
    const breedsContainer = document.getElementById('breeds');
    const imagesContainer = document.getElementById('images');

    async function breedsSearch() {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/list/all');
            const data = await response.json();
            breedsShow(data.message);
        } catch (error) {
            console.error('Erro ao buscar nomes:', error);
        }
    }

    function breedsShow(breeds) {
        for (const breed in breeds) {
            const button = document.createElement('button');
            button.textContent = breed;
            button.addEventListener('click', () => imagesSearch(breed));
            breedsContainer.appendChild(button);
        }
    }

    async function imagesSearch(breed) {
        try {
            const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/13`);
            const data = await response.json();
            imagesShow(data.message);
        } catch (error) {
            console.error(`Erro ao buscar imagens ${breed}:`, error);
        }
    }

    function imagesShow(images) {
        imagesContainer.innerHTML = '';
        images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            imagesContainer.appendChild(img);
        });
    }

    breedsSearch();
});
