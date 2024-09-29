const accessAPI = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjllZTBkZGY1ZDJmZWZhMmYwOWU4NGNlMmFiOWRmMiIsIm5iZiI6MTcyNzQ0OTYyMC4zNDkwOTksInN1YiI6IjY2ZjZjODk1YWE3ZTVmYTIwMjk2ODRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P5VzMSSsoSAHOlidypJosN6zVtq4S1f4WBM0QiL9M7M';
const keyAPI = '129ee0ddf5d2fefa2f09e84ce2ab9df2';
const pagesMovie = 5;

const movieList = document.getElementById('movie-list');
const genreId = null;

async function searchMovie() {
    movieList.innerHTML = '';

    
    const seenMovies = new Set();

    for (let page = 1; page <= pagesMovie; page++) {
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=${keyAPI}&language=pt-BR&page=${page}&include_adult=false`;

        if (genreId) {
            url += `&with_genres=${genreId}`;
        }

        try {
            const result = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessAPI}`,
                    'Content-Type': 'application/json',
                }
            });

            if (result.ok) {
                const data = await result.json();

                data.results.forEach(movie => {
                    
                    if (!seenMovies.has(movie.id)) {
                        seenMovies.add(movie.id); 

                        const overview = movie.overview ? 
                            (movie.overview.length > 10000 ? movie.overview.substring(0, 100) + '...' : movie.overview) : 
                            'Bom demais para ter uma sinopse, assista e diga o que achou.';

                        const movieDiv = document.createElement('div');
                        movieDiv.classList.add('movie');

                        movieDiv.innerHTML = `
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster" />
                            <div class="content">
                                <h2>${movie.title}</h2>
                                <p>${overview}</p>
                            </div>
                        `;

                        movieDiv.addEventListener('click', () => {
                            movieDiv.classList.toggle('active');
                        });

                        movieList.appendChild(movieDiv);
                    }
                });
            } else {
                movieList.innerHTML += `<p>Erro ao buscar filmes: ${result.status} ${result.statusText}</p>`;
            }
        } catch (error) {
            movieList.innerHTML += `<p>Erro de rede ou outro problema: ${error}</p>`;
        }
    }
}

searchMovie();
