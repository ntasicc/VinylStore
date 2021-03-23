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

        let labelHTML=["Album","Performer","Price","Cover"];
        let inputType=["text","text","number","text"];
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

        const addBtt=document.createElement("button");
        addBtt.innerHTML="Add";
        addBtt.classList.add("add");
        addBtt.onclick=ev =>{
            let a=document.querySelector(".add");
            this.AddOrUpdateVinyl(a.innerHTML);
           
        }
        sideDiv.appendChild(addBtt);
        this.drawSearchArea(sideDiv);

        const mainDiv=document.createElement("div");
        mainDiv.classList.add("mainDiv");
        fullDiv.appendChild(mainDiv);

        this.genres[0].drawGenre(mainDiv);

        const footer= document.createElement("div");
        footer.classList.add("footer");
        footer.innerHTML="Nikola Tasic 17486 @ELEKTORONSKI FAKULTET U NISU,PROJEKAT IZ WEB-a";
        host.appendChild(footer);  
    }

    drawSearchArea(host)
    {
        let label= document.createElement("label");
        label.innerHTML="Max price";
        host.appendChild(label);
    
        let input=document.createElement("input");
        input.type="number";
        input.classList.add("maxPrice");
        input.placeholder="Enter..";
        host.appendChild(input);

        const buttonDiv= document.createElement("div");
        buttonDiv.classList.add("buttonDiv");
        host.appendChild(buttonDiv);

    
        const searchBtt=document.createElement("button");
        searchBtt.innerHTML="Search";
        searchBtt.classList.add("searchBtt");
        searchBtt.onclick=ev =>{
                const inp=document.querySelector(".maxPrice").value;
                if(inp=="")
                    alert("Enter price range!");
                else{
                    const vinArr=document.querySelector(".vinylArray");
                    vinArr.innerHTML="";
                    const currentGenre=document.querySelector(".genreTitle").innerHTML;
                    let i=0;
                    this.genres.forEach(el=>
                        {
                            if(el.getName() == currentGenre )
                            {
                                el.getVinyls().forEach(v => {
                                    if(v.getPrice()<= inp)
                                       { v.drawVinyl(vinArr);
                                         i++;
                                       }
                                })
                                if(i==0)
                                {
                                    alert("No records were found");
                                    el.getVinyls().forEach(v => {
                                        v.drawVinyl(vinArr);
                                });
                                }
                                else
                                {
                                    refreshhBtt.hidden=false;
                                }
                            }
                        });
                    
                }
            }
            buttonDiv.appendChild(searchBtt);
            const refreshhBtt=document.createElement("button");
            refreshhBtt.innerHTML="&#8634";
            refreshhBtt.classList.add("refreshBtt");
            refreshhBtt.hidden=true;
            refreshhBtt.onclick=ev =>{
                
                const vinArr=document.querySelector(".vinylArray")
                vinArr.innerHTML="";
                const currentGenre=document.querySelector(".genreTitle").innerHTML;
                this.genres.forEach(el=>
                    {
                        if(el.getName() == currentGenre )
                        {
                            el.getVinyls().forEach(v => {
                                
                                    v.drawVinyl(vinArr);
                            });
                        }
                    });
                   
                    refreshhBtt.hidden=true;
            }
            buttonDiv.appendChild(refreshhBtt);
    }

    AddOrUpdateVinyl(type)
    {
        const namee =document.querySelector(".Album").value;
        const performerr =document.querySelector(".Performer").value;
        const pricee =document.querySelector(".Price").value;
        const imgg=document.querySelector(".Cover").value;
        

        if(type=="Add")
        {
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
                                console.log("Error: "+p);
                            });
        }
        else if(type=="Update")
        {
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
                                console.log("Error: "+p);
                            });
        }
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
        edit=document.querySelector(".maxPrice");
        edit.value="";
    }
}