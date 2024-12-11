const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDA4ZGUyOWUzYWQ1MDA2MTgwNGI3YmY2MmVmOTdkMSIsIm5iZiI6MTczMzMwOTUzOC4yNTEwMDAyLCJzdWIiOiI2NzUwMzQ2MjM1NWRiYzBiMTVkN2E5YjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1cQXQTWrc6xlSsm91H02kTsx5x2lwb01eV-VcyRk6rk' // Replace with your actual API key
    }
  };
  
  fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=10&sort_by=popularity.desc', options)
    .then(res => res.json())
    .then(data => {
        const showContainer = document.querySelector('.Show-Container');
        const seriesList = document.createElement('div'); // Create an unordered list
      
        data.results.forEach(serie => {  
          const serieCard = document.createElement('div');
          const cardBody = document.createElement('div')
          const img_500 = "https://image.tmdb.org/t/p/w500";
          cardBody.classList.add('card-body')
          serieCard.classList.add('card','rounded', 'w-25')
          const  serieImg = document.createElement('img');
          serieImg.src = img_500 + serie.backdrop_path || serie.poster_path;
          serieImg.alt = serie.name;
          const serieTitle = document.createElement('h3');
          serieTitle.textContent = serie.name;
          const serieDate = document.createElement('span');
          serieDate.textContent = serie.firt_air_date;
          const serieDesc = document.createElement('p');
          serieDesc.textContent = serie.overview
          serieImg.classList.add('card-image', 'rounded')

          seriesList.appendChild(serieCard);
          serieCard.appendChild(serieImg);
        //   serieCard.appendChild(cardBody);
        //   cardBody.appendChild(serieTitle);
        //   cardBody.appendChild(serieDate);
        //   cardBody.appendChild(serieDesc);

          serieTitle.classList.add('card-title')


          seriesList.classList.add("seriesList", "container", "bg-black")
        });
        
        console.log(data.results)
        showContainer.appendChild(seriesList); // Add the list to the container
      })
    .catch(err => console.error(err));