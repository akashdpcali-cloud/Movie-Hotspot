let container=document.querySelector(".container");
let crew=document.querySelector('.carddiv');
let tit=document.querySelector('title');
let urlIdSearch= new URLSearchParams(window.location.search);
let movieId= urlIdSearch.get('id');
const api='41ee980e4b5f05f6693fda00eb7c4fd4';

async function singleFetch(){
  try {
    let array= await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api}`)
    let data= await array.json();
    container.innerHTML=`
                <div class="img"><img class="mainimg" src="https://media.themoviedb.org/t/p/w600_and_h900_face${data.poster_path}.jpg" alt="${data.title}"></div>
                <div class="details">
                  <h1>${data.title}</h1>
                  <div class="rating p">Rating: ${data.vote_average}</div>
                  <div class="original p">Original language: ${data.original_language}</div>
                  <div class="length p">Runtime: ${data.runtime}m</div>
                  <div class="date p">${data.release_date}</div>
                  <div class="budget p">Budget: $${data.budget}</div>
                  <div class="revenue p">Revenue: $${data.revenue}</div>
                  
                  <h2 class="h2">overview</h2>
                  <div class="overview">${data.overview}</div>
                </div>
          `;
          tit.innerHTML=`${data.title} Overview`;
    let crewArray= await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api}`);
    let crewData= await crewArray.json();
    
    crewData.cast.forEach(mem=>{
      crew.innerHTML+=`
              <div class="card">
                <div class="cardimg"><img class="castimg" src="https://media.themoviedb.org/t/p/w276_and_h350_face${mem.profile_path}" alt="Pic not available!!"></div>
                <div class="name">${mem.original_name}</div>
                <div class="char">${mem.character}</div>
              </div>
      `;
    })
    crewData.crew.forEach(mem=>{
      crew.innerHTML+=`
              <div class="card">
                <div class="cardimg"><img class="castimg" src="https://media.themoviedb.org/t/p/w276_and_h350_face${mem.profile_path}" alt="Pic not available!!"></div>
                <div class="name">${mem.original_name}</div>
                <div class="char">${mem.department}</div>
              </div>
      `;
    })

  } catch (error) {
    
  }
  
}
singleFetch();

