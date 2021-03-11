import { Vinyl } from "./vinyl.js"
import { Genre } from "./genre.js"

export class Shop
{
    constructor()
    {
        this.genres=[];
        this.container=null;
    }

    addGenre(gen)
    {
        this.genres.push(gen);
    }
    drawShop(host)
    {
        const banner=document.createElement("div");
        banner.classList.add("header");
        host.appendChild(banner);

        const imgg=document.createElement("img");
        imgg.src="./img/RSC-Logo-no_location-black-GS.jpg";
        imgg.classList.add("banner");
        banner.appendChild(imgg);

        const navbar=document.createElement("div");
        navbar.classList.add("navbar");
        navbar.id="navbar";
        host.appendChild(navbar);

        let genreButt;
        this.genres.forEach(el=>{
           (function(a){ genreButt=document.createElement("a");
            genreButt.innerHTML=a.name;
            genreButt.onclick= ev=>
            {
                mainDiv.innerHTML="";
                a.drawGenre(mainDiv);
            }
            genreButt.href="#";
            navbar.appendChild(genreButt);
        })(el);
            
        });
        
        

        const fullDiv= document.createElement("div");
        fullDiv.classList.add("fullDiv");
        host.appendChild(fullDiv);

        const sideDiv=document.createElement("div");
        sideDiv.classList.add("sideDiv");
        fullDiv.appendChild(sideDiv);

        const resetBtn=document.createElement("button");
        resetBtn.innerHTML="X";
        resetBtn.classList.add("resetForm");
        resetBtn.onclick=ev=>
        {
            this.resetForm();
        }
        sideDiv.appendChild(resetBtn);

        let labelHTML=["Album","Performer","Price"];
        let inputType=["text","text","number"];
        for(let i=0; i<labelHTML.length;i++)
        {
        let label= document.createElement("label");
        label.innerHTML=labelHTML[i];
        sideDiv.appendChild(label);

        var input=document.createElement("input");
        input.type=inputType[i];
        input.classList.add(labelHTML[i]);
        input.placeholder="Enter..";
        sideDiv.appendChild(input);
        }

        let label= document.createElement("label");
        label.innerHTML="Cover";
        sideDiv.appendChild(label);

        var input=document.createElement("input");
        input.type="text";
        input.classList.add("Cover");
        input.placeholder="Enter..";
        sideDiv.appendChild(input);

        const addBtt=document.createElement("button");
        addBtt.innerHTML="Add";
        addBtt.classList.add("add");
        addBtt.onclick=ev =>{
            let a=document.querySelector(".add");
            if(a.innerHTML==="Add")
            {
                this.AddVinyl();
            }
            if(a.innerHTML==="Update")
            {
                this.UpdateVinyl();
            }
        }
        sideDiv.appendChild(addBtt);

        const mainDiv=document.createElement("div");
        mainDiv.classList.add("mainDiv");
        fullDiv.appendChild(mainDiv);

        this.genres[0].drawGenre(mainDiv);

        const footer= document.createElement("div");
        footer.classList.add("footer");
        footer.innerHTML="Nikola Tasic 17486 @ELEKTORONSKI FAKULTET U NISU,PROJEKAT IZ WEB-a";
        host.appendChild(footer);  
    }

    

    AddVinyl()
    {
        const namee =document.querySelector(".Album").value;
        const performerr =document.querySelector(".Performer").value;
        const pricee =document.querySelector(".Price").value;
        const imgg=document.querySelector(".Cover").value;
        const idd=0;

        let a;
        this.genres.forEach(el =>
            {
                if(el.name===document.querySelector(".genreTitle").innerHTML)
                {
                    a=el;
                }
            });
            console.log(a);
        fetch("https://localhost:5001/Record/CreateVinyl/"+a.id,{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            id: idd,
                            name: namee,
                            performer: performerr,
                            price: pricee,
                            img: imgg

                    })
                }).then(p => {
                    if(p.ok){
                        console.log("Succesful")
                    }
                    else if(p.status == 406){
                        alert("Input all informations.");
                    }
                }).catch(p=>
                            {
                                alert("Error: "+p);
                            });
        let div=  document.querySelector(".mainDiv");
        div.innerHTML=""; 
        location.reload();
        this.resetForm();

    }

    UpdateVinyl()
    {
        const namee =document.querySelector(".Album").value;
        const performerr =document.querySelector(".Performer").value;
        const pricee =document.querySelector(".Price").value;
        const imgg=document.querySelector(".Cover").value;
        const idd=document.querySelector(".add").value;;

        fetch("https://localhost:5001/Record/UpdateVinyl",{
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            id: idd,
                            name: namee,
                            performer: performerr,
                            price: pricee,
                            img: imgg

                    })
                }).then(p => {
                    if(p.ok){
                        console.log("Succesful")
                    }
                    else if(p.status == 406){
                        alert("Input all informations.");
                    }
                }).catch(p=>
                            {
                                alert("Error: "+p);
                            });
        let div=  document.querySelector(".mainDiv");
        div.innerHTML=""; 
        location.reload();
        this.resetForm();
    }

    resetForm()
    {
        let edit=document.querySelector(".Album");
        edit.value="";

         edit=document.querySelector(".Performer");
        edit.value="";

         edit=document.querySelector(".Price");
        edit.value=null;

         edit=document.querySelector(".Cover");
        edit.value="";

         edit=document.querySelector(".add");
         edit.innerHTML="Add";
        edit.value=this.id;
    }
}