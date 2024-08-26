let section="";
let sortby="";
let genreSel="";
let name="";
let author="";
let maxPrice=130,minPrice=0;
let prevSidebar={};
let prevopen=0;
let genre=0,sort=0;
let close=1;
let c1=0,c2=0;
let currPage=1;
let nameAuthtoggle=0;

const option=document.querySelector('#authorOrName');
option.value='name';

function aontoggle(){
    const option=document.querySelector('#authorOrName');
    if(option.value==='author')
    nameAuthtoggle=1;
    else nameAuthtoggle=0;
}

function closeside(isSidebar=0){
    // console.log(close);
    if(close)
    return;
   
    if(isSidebar)
    return;
    let x=new Date();
    if(x-prevopen<=500)
    return;
    close=1;
    const sidebar=document.querySelector(".sidebar");
    sidebar.style.visibility="hidden";
    if(genre){
        genretoggle();
        genre=1;
    }
    if(sort){
        sortoptionstoggle();
        sort=1;
    }
    getData();
    // console.log('hi');
}


const openSide=document.querySelector(".open-sidebar");
// console.log(openSide);
function openside(){
    // console.log('hi');
    // console.log(close);
    close=0;
    prevopen=new Date();
    const sidebar=document.querySelector(".sidebar");
    sidebar.style.visibility="visible";
    if(genre){
        genretoggle();
    }
    if(sort){
        sortoptionstoggle();
    }
}

openSide.addEventListener('click',openside);

function openinput(){
    const input=document.querySelector('.search');
    input.style.visibility="visible";
}

function closeinput(){
    // console.log('hi');
    const input=document.querySelector('.search');
    input.style.visibility="hidden";
}

function sortoptionstoggle(){
    // console.log('hi');
    const heading=document.querySelector('#sort-drop');
    const options=document.querySelectorAll('.sort-list a');
    // console.log(options);
    if((options[0].style.visibility==='hidden')||c1===0){
        sort=1;
        c1=1;
        heading.style.color="white";
        options.forEach((x)=>{
            x.style.visibility="visible";
            x.style.height="auto";
            x.style.padding="6px";
            // x.style.width:;
            })
    }
    else{
        sort=0;
        // sortby=""
        heading.style.color="#7b91a8";
        // selectSortBy("");
        options.forEach((x)=>{
            x.style.visibility="hidden";
            x.style.height="0";
            x.style.padding="0";
            // x.style.width:;
            })
    }
}

function genretoggle(){
    const options=document.querySelectorAll('.genre a');
    const lit=document.querySelector('#Literature');
    if((options[0].style.visibility==='hidden')||c2===0){
        // console.log('why')
        genre=1;
        c2=1;
        // sectionSelect('misc');
        lit.style.color='white';
        // section='Literature';
        // console.log(section);
        options.forEach((x)=>{
            x.style.visibility="visible";
            x.style.height="auto";
            x.style.padding="6px";
            // x.style.width:;
            })
        if(sortby!==""){
            if(sortby==='rental_fee'){
                const selected=document.querySelector('.rental_fee_ascend');
                selected.style.color="white";
            }
            else if(sortby==='-rental_fee'){
                const selected=document.querySelector('.rental_fee_descend');
                selected.style.color="white";
            }
            else{
                const selected=document.querySelector('.'+sortby);
                selected.style.color="white";
            }
        }
    }
    else{
        genre=0;
        // genreSel="";
        // selectGenre("");
        // sectionSelect('misc');
        lit.style.color="#7b91a8";
        // section='';
        // console.log('hey');
        options.forEach((x)=>{
           
            x.style.visibility="hidden";
            x.style.height="0";
            x.style.padding="0";
            // x.style.width:;
            })
    }
}



function rangeSlide(value,y) {
    // console.log(y);
    if(y=='min')
    {
        // localStorage.setItem('minPrice',value);
        document.querySelector('#min-value').innerHTML = value;
        minPrice=value;
        document.querySelector('.minSlider').value=minPrice;
    }
    else{
        // localStorage.setItem('maxPrice',value);
        document.querySelector('#max-value').innerHTML = value;
        maxPrice=value;
        document.querySelector('.maxSlider').value=maxPrice;
    }
}
rangeSlide(70,'min');
rangeSlide(130,'max');

function selectSortBy(str){
    if(str==='rented'||str==='rating')
    {
        sortby='-'+str;
    }
    else sortby=str;
    if(str==='rental_fee'){
        const selected=document.querySelector('.rental_fee_ascend');
        if(selected.style.color==='white')
        {
            selected.style.color="#7b91a8"
            sortby="";
            return;
        }
    }
    else if(str==='-rental_fee'){
        const selected=document.querySelector('.rental_fee_descend');
        if(selected.style.color==='white')
        {
            selected.style.color="#7b91a8"
            sortby="";
            return;
        }
    }
    else{
        const selected=document.querySelector('.'+str);
        if(selected.style.color==='white')
        {
            selected.style.color="#7b91a8"
            sortby="";
            return;
        }
    }

    const options=document.querySelectorAll('.sort-list a');

    options.forEach((x)=>{
        if(x.style.color==='white'){
            x.style.color="#7b91a8";
        }
    })
    if(str==="")
    return;
    if(str==='rental_fee'){
        const selected=document.querySelector('.rental_fee_ascend');
        selected.style.color="white";
    }
    else if(str==='-rental_fee'){
        const selected=document.querySelector('.rental_fee_descend');
        selected.style.color="white";
    }
    else{
        const selected=document.querySelector('.'+str);
        selected.style.color="white";
    }
}

function selectGenre(str){
    sortby=str;
    const aux=document.querySelector('.'+str);
    if(aux.style.color==='white'){
        aux.style.color="#7b91a8";
        genreSel="";
        return;
    }
    const options=document.querySelectorAll('.genre a');
    options.forEach((x)=>x.style.color="#7b91a8")
    if(str==="")
    return;
    const selected=document.querySelector('.'+str);
        selected.style.color="white";
    genreSel=str;
}

function sectionSelect(str){
    const list=['Literature','Physics','Chemistry','Mathematics','cse'];
    // console.log('hi');


    // if(str!='Liter'&&genre)
    // {
    //     genretoggle();
    //     section='';
    // }

    list.forEach((x)=>{
        const aux=document.querySelector('#'+x);
        if(aux.style.color==='white'){
            aux.style.color='#7b91a8';
            if(x===str)
            {
                section="";
            }
        }
        else if(x===str)
        {
            section=x;
            if(x==='cse')
            section='C.S.E.';
           
            aux.style.color='white';
        }
       
    })
}

const input=document.querySelector('.searching');
const debounce= ()=>{
    let timeoutID;
    return ()=>{
        clearTimeout(timeoutID);
        timeoutID=setTimeout(()=>{
            getData();
        },1000);       
    }
}
input.value='';

function setNameAuthor(str){
    if(nameAuthtoggle)
    author=str;
    else name=str;
    
}

input.addEventListener('change',debounce());

function noOfPages(total){
    const pages=Math.ceil(total/6);
    const btns=document.querySelectorAll('.btns');
    for(let i=0;i<pages;i++)
    btns[i].style.visibility="visible";
    for(let i=pages;i<4;i++)
    btns[i].style.visibility="hidden";
}

async function  getData(){
    // console.log(section,genreSel);
    let queryString="";
        // name="intro"
        queryString+='name='+name+"&author="+author+"&section="+section;
        if(section==='Literature'){
            queryString+='&genre='+genreSel;
        }
        if(sortby!=='')
        queryString+='&sort='+sortby;
        queryString+='&numericFilters='+'rental_fee>='+minPrice+',rental_fee<='+maxPrice;;
        queryString+='&fields=name,author,rental_fee,section,genre,available_copies,rating,_id';
        queryString+='&page='+currPage;
        // let books;
        try {
            const{
                data:{books}
            }=await axios.get('api/v1/books?'+queryString);
       
    // console.log(books);
    const container=document.querySelector('.container');
    container.innerHTML="";
    if(books.length===0){
        container.innerHTML="<h1 style='text-align:center'>No Books here</h1>";
    }
    books.forEach((book,i)=>{
        const{_id,name,author,rental_fee,section,genre,available_copies,rating}=book;
        let Genre=genre,Section=section;
        if(!Genre){
            Genre="___";
        }
        const bookID=_id;
        // console.log(book);
        // console.log(_id);
        if(section==='Mathematics')
        Section='Maths'
        const reqclass='book book'+i;
        container.innerHTML+=`<button class="${reqclass}" onclick="getSpecific('${bookID}')">
        <img src="https://dummyimage.com/50x70/000/fff" alt="Book-image" class="book-img">
        <!-- buidji -->
        <div class="brief">
            <p class="bname">${name}</p>
            <p class="bauthor">${author}</p>
            <p class="rental_fee">Rental Fee:&#8377 ${rental_fee}</p>
        </div>
        <div class="details">
            <p class="section">Section:${Section}</p>
            <p class="genre-select">Genre:${Genre}</p>
            <p class="available">Available:${available_copies}</p>
        </div>
        <div class="rating">
            <span class="stars 1">&#9733</span>
            <span class="stars 2 ">&#9733</span>
            <span class="stars 3 ">&#9733</span>
            <span class="stars 4" >&#9733</span>
            <span class="stars 5">&#9733</span>
        </div>
    </button>`;
    // console.log(reqclass);
    const stars=document.querySelectorAll('.book'+i+' .stars');
    // console.log(stars);
    // console.log(rating);
    let colored=Math.round(rating-0.2);
    for(let i=0;i<colored;i++)
    stars[i].style.color='gold';
    })
} catch (error) {
    console.log(error);
}

    
}
getData();

function changePage(x){
 currPage=x;
 getData();
}

function getSpecific(id){
    // console.log('hi');
    const sidebar=document.querySelector(".sidebar");
    if(sidebar.style.visibility==='visible'){
        return;
    }
    window.open(`book.html?id=${id}`);
}

// const getBooks= async ()=>{
//     const {data:{tasks}}=await axios.get('/')
// }

