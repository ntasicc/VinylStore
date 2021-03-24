import { Vinyl } from "./vinyl.js"
import { Genre } from "./genre.js"

export class Shop
{
    constructor(id,name,location,bannerImg)
    {
        this.id=id;
        this.genres=[];
        this.container=null;
        this.name=name;
        this.location=location;
        this.bannerImg=bannerImg;
    }

    addGenre(gen)
    {
        this.genres.push(gen);
    }
    drawShop(host)
    {
        this.container=document.createElement("div");
        this.container.classList.add("shopDIV");
        host.appendChild(this.container);

        const banner=document.createElement("div");
        banner.classList.add("header");
        this.container.appendChild(banner);

        const imgg=document.createElement("img");
        imgg.src=this.bannerImg;
        imgg.classList.add("banner");
        banner.appendChild(imgg);

        const navbar=document.createElement("div");
        navbar.classList.add("navbar");
        navbar.id="navbar";
        this.container.appendChild(navbar);

        let genreButt;
        this.genres.forEach(el=>{
           (function(a){ genreButt=document.createElement("a");
            genreButt.innerHTML=a.name;
            genreButt.onclick= ev=>
            {
                mainDiv.innerHTML="";
                a.drawGenre(mainDiv);
                resetBtn.click();
            }
            //genreButt.href="#";
            navbar.appendChild(genreButt);
        })(el);
            
        });
        
        

        const fullDiv= document.createElement("div");
        fullDiv.classList.add("fullDiv");
        this.container.appendChild(fullDiv);

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
            let a=this.container.querySelector(".add");
            this.AddOrUpdateVinyl(a.innerHTML);
           
        }
        sideDiv.appendChild(addBtt);
        this.drawSearchArea(sideDiv);

        const mainDiv=document.createElement("div");
        mainDiv.classList.add("mainDiv");
        fullDiv.appendChild(mainDiv);

        if(this.genres[0]!=null)
            this.genres[0].drawGenre(mainDiv,this.container);

        const footer= document.createElement("div");
        footer.classList.add("footer");
        footer.innerHTML=`Welcome to ${this.name}, location of this store is: ${this.location} <br /> Nikola Tasic 17486 @ELEKTORONSKI FAKULTET U NISU,PROJEKAT IZ WEB-a`;
        this.container.appendChild(footer); 
        
    
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
                const inp=this.container.querySelector(".maxPrice").value;
                if(inp=="")
                    alert("Enter price range!");
                else{
                    const vinArr=this.container.querySelector(".vinylArray");
                    vinArr.innerHTML="";
                    const currentGenre=this.container.querySelector(".genreTitle").innerHTML;
                    let i=0;
                    this.genres.forEach(el=>
                        {
                            if(el.getName() == currentGenre )
                            {
                                el.getVinyls().forEach(v => {
                                    if(v.getPrice()<= inp)
                                       { v.drawVinyl(vinArr,this.container);
                                         i++;
                                       }
                                })
                                if(i==0)
                                {
                                    alert("No records were found");
                                    el.getVinyls().forEach(v => {
                                        v.drawVinyl(vinArr,this.container);
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
                
                const vinArr=this.container.querySelector(".vinylArray")
                vinArr.innerHTML="";
                const currentGenre=this.container.querySelector(".genreTitle").innerHTML;
                this.genres.forEach(el=>
                    {
                        if(el.getName() == currentGenre )
                        {
                            el.getVinyls().forEach(v => {
                                
                                    v.drawVinyl(vinArr,this.container);
                            });
                        }
                    });
                   
                    refreshhBtt.hidden=true;
            }
            buttonDiv.appendChild(refreshhBtt);
    }

    AddOrUpdateVinyl(type)
    {
        const namee =this.container.querySelector(".Album").value;
        const performerr =this.container.querySelector(".Performer").value;
        const pricee =this.container.querySelector(".Price").value;
        const imgg=this.container.querySelector(".Cover").value;
        

        if(type=="Add")
        {
            const idd=0;
            let a;
        this.genres.forEach(el =>
            {
                if(el.name===this.container.querySelector(".genreTitle").innerHTML)
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
            const idd=this.container.querySelector(".add").value;;

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
        let edit=this.container.querySelector(".Album");
        edit.value="";

         edit=this.container.querySelector(".Performer");
        edit.value="";

         edit=this.container.querySelector(".Price");
        edit.value=null;

         edit=this.container.querySelector(".Cover");
        edit.value="";

         edit=this.container.querySelector(".add");
         edit.innerHTML="Add";
        edit.value=this.id;
        edit=this.container.querySelector(".maxPrice");
        edit.value="";
    }
}