import { Vinyl } from "./vinyl.js"
import { Genre } from "./genre.js"
import { Shop } from "./shop.js"

fetch("http://localhost:5000/Record/ReadShop", {
    method: "GET"
}).then(p => {
    p.json().then(data =>{
        data.forEach(shop => {
          const shop1= new Shop(shop.id,shop.name,shop.location,shop.bannerImg);
          shop.genres.forEach(gen=>{
            const gen1= new Genre(gen.name,gen.id);
            gen.vinyls.forEach(vin=>
              {
                const vin1 = new Vinyl(vin.id,vin.name,vin.performer,vin.price,vin.img);
                gen1.addVinyl(vin1);
              });
            shop1.addGenre(gen1);
          });
          shop1.drawShop(document.body);
        });
        
    });
}).catch(err => {
  console.log(err);
});


/*
var nab=document.querySelector("mainDiv");
console.log(nab);
var sticky = nab.offsetTop;
window.onscroll=function() {
    myFunction()};
function myFunction() {
  if (window.pageYOffset >= sticky) {
    nab.classList.add("sticky");
  } else {
    nab.classList.remove("sticky");
  }
}



const v=new Genre("Alternative Rock",1);
const v1=new Vinyl("amo","Bring me the horizon",19.99,1,"./img/sss.jpg");
const v2=new Vinyl("Coming Home","Falling in reverse",19.99,1,"./img/coming-home.jpeg");
const v3=new Vinyl("Let Light Overcome","Our Last Night",19.99,1,"./img/asdf.jpg");
const v4=new Vinyl("Dear.","Cavetown",19.99,1,"./img/aaa.jpg");
const v5=new Vinyl("Teardrops","Bring me the horizon",19.99,1,"./img/bring-me-the-horizon.jpg");

v.addMovie(v1);
v.addMovie(v2);
v.addMovie(v3);
v.addMovie(v4);
v.addMovie(v5);


const vv=new Genre("Heavy Metal",2);
const vvv=new Genre("Rap",3);
const vvvv=new Genre("Pop",4);
const vvvvv=new Genre("Hip Hop",5);

const s=new Shop();
s.addGenre(v);
s.addGenre(vv);
s.addGenre(vvv);
s.addGenre(vvvv);
s.addGenre(vvvvv);
s.drawShop(document.body);
*/
