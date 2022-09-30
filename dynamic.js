const APIURL = "https://japceibal.github.io/japflix_api/movies-data.json";
const search = document.getElementById("btnBuscar");
const inputSearch = document.getElementById("inputBuscar");
const container = document.getElementById("container");
const list = document.getElementById("listMore");

let films = "";
async function getData() {
  let data = await fetch(APIURL);
  data = await data.json();
  films = data;
  console.log(data);
}
document.addEventListener("DOMContentLoaded", () => {
  getData();
});

search.addEventListener("click", () => {
  container.innerHTML = "";
  let input = inputSearch.value.toLowerCase();
  if (input) {
    for (const film of films) {
        let includes = false;
        let i = 0;
        while (i < film.genres.length) {
          if (film.genres[i].name.toLowerCase().includes(input)) {
            includes = true;
          }
  
          i++;
        }
        if (
          film.title.toLowerCase().includes(input) ||
          includes ||
          film.tagline.toLowerCase().includes(input) ||
          film.overview.toLowerCase().includes(input)
        ) {
          let totalStars = Math.trunc(film.vote_average / 2);
          let starsHtml = "";
          for (let i = 0; i < 5; i++) {
            if (i < totalStars) {
              starsHtml += `<span class="fa fa-star checked"></span>`;
            } else {
              starsHtml += `<span class="fa fa-star"></span>`;
            }
          }
          container.innerHTML += `<div id="${film.id}" style="cursor:pointer;" class="film d-flex flex-row justify-content-between mx-5 border border-light m-4 p-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
        <div class="info">
        <h3 style="color:white;" >${film.title}</h3>
        <p style="color:white;">${film.tagline}</p>
        </div>
        <div class="stars">
        ${starsHtml}
        </div>
        </div>`;
    
        }
      let htmlFilms = document.getElementsByClassName("film");
      for (const htmlFilm of htmlFilms) {
        htmlFilm.addEventListener("click", () => {
          let id = htmlFilm.id;
          let title = document.getElementById("offCanvasTitle");
          let overview = document.getElementById("offCanvasOverview");
          let genres = document.getElementById("offCanvasGenre");
          let i = 0;
          while (i < films.length) {
            if (films[i].id == id) {
              title.innerHTML = films[i].title;
              overview.innerHTML = films[i].overview;
              genres.innerHTML = "";
              for (const genre of films[i].genres) {
                genres.innerHTML += genre.name + " ";
              }
              let { release_date, runtime, budget, revenue } = films[i];
              release_date = release_date.slice(0, 4);
              list.innerHTML = `
                <li>Year: ${release_date}</li>
                <li>Runtime: ${runtime}</li>
                <li>Budget: ${budget}</li>
                <li>Revenue: $${revenue}</li>`;
            }
            i++;
          }
        });
      }
    }
  }
});
