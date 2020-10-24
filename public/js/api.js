const API_KEY = "ffcea9c344a44eb880b8cf3137e799f1";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2019;

const ENDPOINT_COMPETITION_STANDING = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const ENDPOINT_COMPETITION_MATCHES = `${BASE_URL}competitions/${LEAGUE_ID}/matches`;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

function getAllStandings() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION_STANDING).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION_STANDING)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}


function getAllMatches() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION_MATCHES).then(function (response) {
            if (response) {
                response.json().then(function (data1) {
                    console.log("Competition Data: " + data1);
                    showMatches(data1);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION_MATCHES)
        .then(data1 => {
            showMatches(data1);
        })
        .catch(error => {
            console.log(error)
        })
}

function getAllTeam(id) {
	const url = `${BASE_URL}teams/${id}`;

	if ('caches' in window) {
		caches.match(url).then(function (response) {
			if (response) {
				response.json().then(function (team) {
					showTeam(team);
				});
			}
		});
	}

	fetchAPI(url)
		.then((team) => {
			showTeam(team);
		})
		.catch((error) => {
			console.log(error);
		});
}
