const API_KEY = "b8f19e26f675d75b4146145b2ca97bb1";
const baseURL = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/original/";

const nav = document.getElementsByTagName("nav")[0];
const title = document.getElementById("title");
const language = document.getElementById("language");
const rating = document.getElementById("rating");
const description = document.getElementById("description");
const close = document.getElementById("close");
const container = document.getElementById("container");

const requests = [
  `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  `/discover/movie?api_key=${API_KEY}&include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=romance`,
  `/discover/tv?api_key=${API_KEY}&include_adult=false&include_null_first_air_dates=false&language=en&page=1&sort_by=popularity.desc&with_origin_country=US`,
  `/discover/movie?api_key=${API_KEY}&with_genres=99`,
];

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    nav.style.backgroundColor = "#111";
  } else {
    nav.style.backgroundColor = "transparent";
  }
});

const bannerEle = document.getElementById("banner");
const bannerTitle = document.getElementById("banner-title");
const bannerDescription = document.getElementById("banner-description");

async function fetchBanner() {
  const bannerRes = await fetch(`${baseURL}${requests[0]}`);
  const bannerData = await bannerRes.json();
  const banners = bannerData.results;
  // console.log(banners);
  const randomBanner = banners[Math.floor(Math.random() * banners.length)];
  // console.log(randomBanner);

  bannerEle.style.backgroundImage = `url(${imageUrl}${randomBanner.backdrop_path})`;
  bannerTitle.textContent = randomBanner.name;
  bannerDescription.textContent = randomBanner.overview;
}

fetchBanner();

async function fetchData() {
  for (let i = 0; i < 8; i++) {
    const response = await fetch(`${baseURL}${requests[i]}`);
    const data = await response.json();
    var movies = data.results;
    // console.log(movies);
    createRows(movies, i);
  }
  return movies;
}
fetchData();

function createRows(movies, i) {
  movies.map((movies) => {
    const rowImage = document.getElementById(`image${i}`);
    const poster = document.createElement("img");

    poster.src = `${imageUrl}${movies.poster_path}`;
    poster.classList.add("image");
    rowImage.appendChild(poster);

    // pop up section
    poster.addEventListener("click", (e) => {
      e.preventDefault();
      container.style.display = "flex";
      const moviePosterImg = document.getElementById("moviePosterImg");
      moviePosterImg.src = `${imageUrl}${movies.poster_path}`;
      // console.log(movies);
      title.textContent = movies.original_title || movies.title;
      language.textContent = movies.original_language;
      rating.textContent = movies.vote_average;
      description.textContent = movies.overview;
    });
  });
}

close.addEventListener("click", (e) => {
  e.preventDefault();
  container.style.display = "none";
});

// const btnLeft = document.getElementById("btnLeft");
// const btnRight = document.getElementById("btnRight");

// btnRight.addEventListener("click", (e) => {
//   e.preventDefault();
//   let div = e.target.parentElement.querySelector(".image-container");
//   // console.log(div);
//   div.scrollLeft += 460;
// });

// btnLeft.addEventListener("click", (e) => {
//   e.preventDefault();
//   let div = e.target.parentElement.querySelector(".image-container");
//   // console.log(div);
//   div.scrollLeft -= 460;
// });
