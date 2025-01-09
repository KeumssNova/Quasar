async function authenticate() {
    const creds = {
        grant_type: "password",
        username: "keumss",
        password: "Brunadc_2014..",
        client_id: "personal-client-2ffc7775-20d5-48c9-8ac0-7b8cbfca3f79-9db1b507",
        client_secret: "aRA6vUZzp4ocsMEPO3zZhvvBspliE0oX",
    };

    const url = "https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token";

    try {
        // Si vous voulez contourner CORS, utilisez cors-anywhere ici
        const corsUrl = "https://cors-anywhere.herokuapp.com/";  // Utiliser un service proxy CORS
        const response = await fetch(corsUrl + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(creds), // Convertit l'objet en format 'x-www-form-urlencoded'
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const { access_token, refresh_token } = data;

        console.log("Access Token:", access_token);
        console.log("Refresh Token:", refresh_token);
    } catch (error) {
        console.error("Error during authentication:", error.message);
    }
}

authenticate();
