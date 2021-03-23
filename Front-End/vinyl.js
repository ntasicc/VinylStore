export class Vinyl
{
    constructor(id,name,performer,price,img)
    {
        this.id=id;
        this.name=name;
        this.performer=performer;
        this.price=price;
        this.img=img;
        this.miniCont=null;
    }

    drawVinyl(host)
    {
        this.miniCont=document.createElement("div");
        this.miniCont.classList.add("vinyl");
        host.appendChild(this.miniCont);

        const div1=document.createElement("div");
        div1.classList.add("divImg");
        this.miniCont.appendChild(div1);

        const deleteBtn=document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.innerHTML="X";
        deleteBtn.onclick=ev=>
        {
            const parent=this.miniCont.parentNode;
            parent.removeChild(this.miniCont);
            console.log(this.id);
            this.deleteVinyl(this.id);
        }
        div1.appendChild(deleteBtn);

        const editBtn=document.createElement("button");
        editBtn.classList.add("editBtn");
        editBtn.innerHTML="&#x270D";
        editBtn.onclick=ev=>
        {
            this.fillEditForm();
        }
        div1.appendChild(editBtn);

       
        

        const image=document.createElement("img");
        image.classList.add("image");
        image.src=this.img;
        image.alt=this.name+" by: "+this.performer;
        div1.appendChild(image);
        
        
        

        const div2=document.createElement("div");
        div2.classList.add("divInfo");
        this.miniCont.appendChild(div2);

        const infoArray =[this.name,this.performer,this.price+"€"];
        const classArray=["name","performer","price"];

        for(let i=0; i< infoArray.length;i++)
        {
            let vinylInfo=document.createElement("p");
            vinylInfo.innerHTML=infoArray[i];
            vinylInfo.classList.add(classArray[i]);
            div2.appendChild(vinylInfo);
        }

        /*const vinylName=document.createElement("p");
        vinylName.innerHTML=this.name;
        vinylName.classList.add("name");
        div2.appendChild(vinylName);

        const vinylPerf=document.createElement("p");
        vinylPerf.innerHTML=this.performer;
        vinylPerf.classList.add("performer");
        div2.appendChild(vinylPerf);

        const cost=document.createElement("p");
        cost.innerHTML=this.price + "€";
        cost.classList.add("price");
        div2.appendChild(cost);
        */
    }

    getPrice()
    {
        return this.price;
    }

    fillEditForm()
    {
        let edit=document.querySelector(".Album");
        edit.value=this.name;

         edit=document.querySelector(".Performer");
        edit.value=this.performer;

         edit=document.querySelector(".Price");
        edit.value=this.price;

         edit=document.querySelector(".Cover");
        edit.value=this.img;

         edit=document.querySelector(".add");
         edit.innerHTML="Update";
        edit.value=this.id;

    }

    deleteVinyl(id)
    {
         fetch("https://localhost:5001/Record/DeleteVinyl/"+id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response=>
            {
                if(response.ok)
                {
                    console.log("Succesful" );
                }
            }).catch(error => console.log("error unpacking response " + error));
            
        
            
    }


}