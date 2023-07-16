const apiEndpoint = "https://api.themoviedb.org/3";
const apiPaths = {
  fetchAllCategories: `${apiEndpoint}/genre/movie/list`,
};

function onLoadComplete() {
  fetchAndBuildAllSections();
}

function fetchAndBuildAllSections() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGYxOWUyNmY2NzVkNzViNDE0NjE0NWIyY2E5N2JiMSIsInN1YiI6IjY0YWZlODVkZTI0YjkzNWIzMzhkYTZmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ml1Z_fp3Pnf9xIm58s8UTJPrjFEJgj_JIsV_YuJGYJ0",
    },
  };

  fetch(apiPaths.fetchAllCategories, options)
    .then((response) => response.json())

    .then((response) => {
      const category = response.genres;
      if (Array.isArray(category) && category.length) {
        category.forEach((category) => {
          fetchAndBuildCategorySections(category);
        });
      }
      console.table("fetchAndBuildAllSections", category);
    })
    .catch((err) => console.error(err));
}

function fetchAndBuildCategorySections(category) {
  console.log("fetchAndBuildCategorySections", category);
}

window.addEventListener("load", function () {
  onLoadComplete();
});
