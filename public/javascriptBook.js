const params=window.location.search
const id= new URLSearchParams(params).get('id');
// console.log(id);
const name_=document.querySelector('.name');
const author_=document.querySelector('.author');
const section_=document.querySelector('.section');
const genre_=document.querySelector('.genre');
const available_=document.querySelector('.available');
const total_=document.querySelector('.total');
const rented_=document.querySelector('.rented');
const rating_=document.querySelector('.rating');
const date_=document.querySelector('.date');
const rent_=document.querySelector('.rupees');

const showBook =async () =>{
    try{
        const{
            data:{ book },
        }=await axios.get(`/api/v1/books/${id}`);
        const{_id:bookID,name,author,total,published_On,rented,rating,rental_fee,available_copies,section,genre}=book;
        let Genre=genre;
        if(!Genre)
        Genre='___'
        name_.innerHTML=name;
        author_.innerHTML=author;
        section_.innerHTML='Section: '+section;
        genre_.innerHTML='genre: '+Genre;
        available_.innerHTML='Available Copies: '+available_copies;
        total_.innerHTML='Total Copies: '+total;
        rented_.innerHTML='Rented by '+rented+' people';
        rating_.innerHTML='Rating: '+rating+'/5';
      

        rent_.innerHTML=+rental_fee +' per week';
    } catch(error){
        console.log(error);
    }
}
showBook();