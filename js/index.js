const URL_PATH = 'https://api.themoviedb.org';
const API_KEY = 'a0899ed16af0ea76f7fe886e4ff261c0';

//cuando la pagina este cargada ejecuta lo que hay dentro
document.addEventListener('DOMContentLoaded', () => {
    renderNewsMovies();
});


//nos trae todas las peliculas
const getMovies = () => {
    const url = `${URL_PATH}/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

    return fetch(url)
        //convertir a json
        .then(response => response.json())
        //traer las peliculas
        .then(result => result.results)
        .catch(error => console.log(error));

}

const renderNewsMovies = async () => {
    //cuando la funcion getNewsMovies acaba, se guarda en la constante newMovies y se muestra
    const newMovies = await getMovies();

    //console.log(newMovies);

    let html = '';

    //para iterar cada una de las peliculas
    //index lo usaremos para que el carousel se centre en la primer imagen que le llega
    newMovies.forEach((movie, index) => {
        //destructurar, para solo usar ciertas cosas de lo que trae cada pelicula
        const { id, title, overview, backdrop_path } = movie;
        //link de la imagen, cada imagen tiene su id por decirlo y ese valor esta en la variable implementada
        const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
        const urlMovie = `../movie.html?id=${id}`;

        /* 
         estaba intentando con  create element pero esto esta mal, no pude xD
                const carouselListNewsMovies = document.querySelector('#carousel-news-movies .carousel-inner .list-news-movies');
        
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                carouselItem.style.backgroundImage = `url('${urlImage}')`;
        
                const carouselCaption = document.createElement('div');
                carouselCaption.classList.add('carousel-caption');
        
                const titleItem = document.createElement('h5');
                //const contentTitleItem = document.createTextNode(`${title}`);
                //titleItem.appendChild(contentTitleItem)
                titleItem.textContent = `${title}`;
        
                const overviewItem = document.createElement('p');
                //const contentOverviewItem = document.createTextNode(`${overview}`);
                //overviewItem.appendChild(contentOverviewItem);
                overviewItem.textContent = `${overview}`;
        
                carouselItem.appendChild(carouselCaption);
                carouselCaption.appendChild(titleItem);
                carouselCaption.appendChild(overviewItem);
        
        
                carouselListNewsMovies.appendChild(carouselItem);
        
                 */

        html += `
            <div class="carousel-item ${index === 0 ? 'active' : null}" style="background-image: url('${urlImage}')">
                <div class="carousel-caption"> 
                    <h5>${title}</h5>
                    <p>${overview}</p>
                    <a href="${urlMovie}" class="btn btn-primary">Mas Información</a>
                </div>
            </div>
        `;
    });

    html += `
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-news-movies" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel-news-movies" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Siguiente</span>
        </button>
    `;

    document.getElementsByClassName('list-news-movies')[0].innerHTML = html;
}