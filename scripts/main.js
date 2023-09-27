const url = 'https://www.omdbapi.com/?i=tt3896198&apikey=53b09bb3';
let movies = new Array();

let page = 1;
let count = 0;

function generatePages() {

    pageList.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
        pageList.innerHTML += `<li class="page-item" id="page">
        <a class="page-link" id="button" href="#">${i}</a>
    </li>`
    }

}

function makePagesClick() {
    getDataFromServer(url, title, type, button.value);
}

function showDetails(id) {
    let temp = null;
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].imdbID == id) {
            temp = movies[i];
        }
    }

    details.innerHTML = "";
    details.innerHTML = `<h1>${temp.Title}</h1>
    <div class="d-flex flex-row">
        <img src="${temp.Poster}">
        <div>
            <p>Released : ${temp.Released}</p>
            <p>Genre : ${temp.Genre}</p>
            <p>Country : ${temp.Country}</p>
            <p>Director : ${temp.Director}</p>
            <p>Writer : ${temp.Writer}</p>
            <p>Actors :< ${temp.Actors}/p>
            <p>Awards :< ${temp.Awards}/p>
        </div>
    </div>`;
}

async function getDataFromServer(url, title, type, page) {

    moviesList.innerHTML = "";

    const urlWithParams = url + "&s=" + title + "&type=" + type + `&page=${page}`;
    // GET: path
    let response = await fetch(urlWithParams);

    console.log("Status:", response.status);

    const data = await response.json();

    generatePages();

    console.log(data);

    for (const i of data.Search) {
        movies += i;
        moviesList.innerHTML += `
                                <div class="card" style="width: 18rem;">
                                    <img src="${i.Poster}" class="card-img-top">
                                    <div class="card-body justify-content-between">
                                        <h5 class="card-title">${i.Title}</h5>
                                        <p class="card-text">${i.Year}</p>
                                        <a href="#" onclick="showDetails(${i.imdbID})" class="btn btn-primary">Details</a>
                                    </div>
                                </div>
        `;
    }
}

findBtn.onclick = () => {
    let titles = document.getElementById("title").value;
    let types = document.getElementById("movies").value;
    getDataFromServer(url, titles, types, page);
}