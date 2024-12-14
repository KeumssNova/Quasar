const baseUrl = 'https://api.themoviedb.org/3/tv'
const api_key = 'd008de29e3ad50061804b7bf62ef97d1'

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDA4ZGUyOWUzYWQ1MDA2MTgwNGI3YmY2MmVmOTdkMSIsIm5iZiI6MTczMzMwOTUzOC4yNTEwMDAyLCJzdWIiOiI2NzUwMzQ2MjM1NWRiYzBiMTVkN2E5YjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1cQXQTWrc6xlSsm91H02kTsx5x2lwb01eV-VcyRk6rk",
    },
};

fetch(
    "https://api.themoviedb.org/3/discover/tv?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDA4ZGUyOWUzYWQ1MDA2MTgwNGI3YmY2MmVmOTdkMSIsIm5iZiI6MTczMzMwOTUzOC4yNTEwMDAyLCJzdWIiOiI2NzUwMzQ2MjM1NWRiYzBiMTVkN2E5YjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1cQXQTWrc6xlSsm91H02kTsx5x2lwb01eV-VcyRk6rk&with_genres=10765",
    options
)
    .then((res) => res.json())
    .then((data) => {
        const showContainer = document.querySelector(".Show-Container");
        const seriesList = document.createElement("div"); 

        data.results.forEach((serie) => {
            const serieCard = document.createElement("div");
            const cardBody = document.createElement("div");
            const img_500 = "https://image.tmdb.org/t/p/w500";
            cardBody.classList.add("card-body");
            serieCard.classList.add("serieCard", "card", "rounded");
            const serieImg = document.createElement("img");
            serieImg.src = img_500 + serie.backdrop_path || serie.poster_path;
            serieImg.alt = serie.name;
            const serieTitle = document.createElement("h3");
            serieTitle.textContent = serie.name;
            const serieDate = document.createElement("span");
            serieDate.textContent = serie.firt_air_date;
            const serieDesc = document.createElement("p");
            serieDesc.textContent = serie.overview;
            serieImg.classList.add("card-image", "rounded");

            seriesList.appendChild(serieCard);
            serieCard.appendChild(serieImg);
            //   serieCard.appendChild(cardBody);
            //   cardBody.appendChild(serieTitle);
            //   cardBody.appendChild(serieDate);
            //   cardBody.appendChild(serieDesc);

            serieTitle.classList.add("card-title");

            seriesList.classList.add("seriesList", "container", "bg-black");
            
            fetch(`https://api.themoviedb.org/3/tv/${serie.id}/videos?include_video_language=fr-FR&language=en-US`, options)
            .then(res => res.json())
            .then(videoData => { 
                const carouselInner = document.querySelector(".carousel-inner");
                console.log(videoData)
                videoData.results.forEach((serie, index) => {
                    const carouselItem = document.createElement("div");
                    carouselItem.classList.add("carousel-item");
                    if (index === 0) {
                      carouselItem.classList.add("active"); 
                    }
                    carouselInner.appendChild(carouselItem);
                  
                    if (videoData.results) {
                      const trailer = videoData.results.find(video => video.type === "Trailer");
                      if (trailer) {
                        const trailerUrl = `https://www.youtube.com/embed/$${trailer.key}`;
                        const iframe = document.createElement("iframe");
                        iframe.src = trailerUrl;
                        iframe.classList.add("d-block", "w-100");
                        iframe.height = "315";
                        carouselItem.appendChild(iframe);
                      } else {

                        const noTrailerMessage = document.createElement('p');
                        noTrailerMessage.textContent = 'No trailer available for this series.';
                        carouselItem.appendChild(noTrailerMessage);
                      }
                    } else {
                      const noTrailerMessage = document.createElement('p');
                      noTrailerMessage.textContent = 'No trailers available for this series.';
                      carouselItem.appendChild(noTrailerMessage);
                    }
                  
                    

                    
                })
            })
            .catch(err => console.error(err));
        });

        console.log(data.results);
        showContainer.appendChild(seriesList); // Add the list to the container
    })
    .catch((err) => console.error(err));

      

  


