const searchTeam = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = "";
  if (searchText == "") {
    // alert("404! Error")
    const searchError = document.getElementById("search-error");
    searchError.classList.remove("d-none");
  } else {
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.teams));
      const searchError = document.getElementById("search-error");
      searchError.classList.add("d-none");
  }
};

const displaySearchResult = (teams) => {
  const searchResult = document.getElementById("seacrh-result");
  document.getElementById("details").textContent = "";
  searchResult.innerHTML = "";
  teams.forEach((team) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card">
      <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${team.strTeam}</h5>
        <p class="card-text">${team.strCountry}</p>
      </div>
      <button class="btn btn-primary" onclick="loadTeam('${team.idTeam}')"> See Details </button>
    </div>
        `;
    searchResult.appendChild(div);
  });
};
const loadTeam = (teamId) => {
  const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTeam(data.teams[0]));
};
const displayTeam = (team) => {
  const details = document.getElementById("details");
  const searchError = document.getElementById("search-error");
  searchError.classList.add("d-none");
  document.getElementById("details").textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card mx-auto" style="width: 18rem;">
  <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${team.strTeam}</h5>
    <p class="card-text">${team.strCountry}</p>
    <a href="${team.strFacebook}" class="btn btn-primary">Go FacebookPage</a>
  </div>
</div>
  `;
  details.appendChild(div);
};
