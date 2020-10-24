
    // Load pages content
    let page = window.location.hash.substr(1);
    let urlTeamParam = window.location.hash.substr(9);
    if (page === '') page = 'home';

    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                var content = document.querySelector("#body-content");
                if (page === "standing") {
                    getAllStandings();
                } else if(page === "match") {
                    getAllMatches();
                } else if (page === "fav") {
                    showFavTeam();
                } else if (urlTeamParam.length > 0) {
                    // fungsi untuk menampilkan informasi team
                    getAllTeam(urlTeamParam);
                }
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                }  else if (this.status === 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
                urlTeamParam = '';
            }
        };
        // statement untuk mem fetch page sesuai dengan fungsi yang akan digunakan
        if (urlTeamParam.length > 0) {
            xhttp.open('GET', '/pages/team.html');
            xhttp.send();
            return;
        } else if (
            page === 'standing'
        ) {
            xhttp.open('GET', `/pages/standing.html`);
            xhttp.send();
            return;
        } else {
            xhttp.open('GET', `/pages/${page}.html`);
            xhttp.send();
        }
    }
    loadPage(page);