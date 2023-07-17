const apiKey = "b8f19e26f675d75b4146145b2ca97bb1";

const apiEndpoint = "https://api.themoviedb.org/3";
const apiPaths = {
  fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apiKey}`,
  fetchMovieList: (id) =>
    `${apiEndpoint}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
};

function onLoadComplete() {
  fetchAndBuildAllSections();
}

function fetchAndBuildAllSections() {
  fetch(apiPaths.fetchAllCategories)
    .then((response) => response.json())
    .then((response) => {
      const category = response.genres;
      if (Array.isArray(category) && category.length) {
        category.forEach((category) => {
          fetchAndBuildCategorySections(
            apiPaths.fetchMovieList(category.id),
            category
          );
        });
      }
      // console.table(category);
    })
    .catch((err) => console.error(err));
}

function fetchAndBuildCategorySections(fetchUrl, category) {
  console.log(fetchUrl, category);
  fetch(fetchUrl)
    .then((response) => response.json())
    .then((response) => {
      console.table(response);
    })
    .catch((err) => console.error(err));
}

window.addEventListener("load", function () {
  onLoadComplete();
});
