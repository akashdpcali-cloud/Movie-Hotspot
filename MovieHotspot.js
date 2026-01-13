const api='41ee980e4b5f05f6693fda00eb7c4fd4';
let main=document.querySelector('.main');
let input=document.querySelector('.search-space');
let form=document.querySelector('form');
let id=0;
let currentPage=1;
let isloading=false;
let totalPages=Infinity;


form.addEventListener('submit',(event)=>{
  event.preventDefault();
  inputFetch(input.value);
})

async function mainFetch(apiid){
  if(isloading||currentPage>totalPages) return;
  isloading=true
  try {
    
    let mainArray= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiid}&page=${currentPage}`);
    let maindata= await mainArray.json()
    totalPages=maindata.total_pages;
    console.log(maindata)
    maindata.results.forEach((card)=>{
      main.innerHTML+=`
            <div class="card" data-id=${card.id}>
                <div class="img"><img src="https://media.themoviedb.org/t/p/w440_and_h660_face${card.poster_path}" alt="${card.title}"></div>
                <div class="title">${card.title}</div>
                <div class="rating">Rating: ${(card.vote_average).toFixed(2)}</div>
            </div>
      `;

      let cards=document.querySelectorAll('.card');
      cards.forEach(card=>{
        card.addEventListener('click',()=>{
           id=card.dataset.id;
          window.location=`MovieOverview.html?id=${id}`;
        });
      });
    })
    currentPage++;
  } catch (error) {
    
  }finally{
    isloading=false;
  }
}
mainFetch(api);
//---------------- scrole-------------------------
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 300
  ) {
    mainFetch(api);
  }
});
//------------------------------------------------

async function inputFetch(input){
  console.log('hell0');
  try {
    main.innerHTML='';
    let searchArray= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${input}`);
    let searchDate= await searchArray.json();
    searchDate.results.forEach((card)=>{
      main.innerHTML+=`
            <div class="card" data-id=${card.id}>
                <div class="img"><img src="https://media.themoviedb.org/t/p/w440_and_h660_face${card.poster_path}" alt="${card.title}"></div>
                <div class="title">${card.title}</div>
                <div class="rating">Rating: ${(card.vote_average).toFixed(2)}</div>
            </div>
      `;
      let cards=document.querySelectorAll('.card');
      cards.forEach(card=>{
        card.addEventListener('click',()=>{
          id=card.dataset.id;
          window.location=`MovieOverview.html?id=${id}`;
        });
      });
    })

  } catch (error) {
     }
}