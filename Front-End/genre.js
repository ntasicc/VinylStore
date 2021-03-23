import { Vinyl } from "./vinyl.js"
export class Genre
{
    constructor(name,id)
    {
        this.vinyls=[];
        this.name=name;
        this.id=id;
        this.miniCont=null;
    }

    addVinyl(vin)
    {
        this.vinyls.push(vin);
    }

    drawGenre(host)
    {
        this.miniCont=document.createElement("div");
        this.miniCont.classList.add("genreCont");
        host.appendChild(this.miniCont);

        const title= document.createElement("h3");
        title.innerHTML=this.name;
        title.classList.add("genreTitle");
        this.miniCont.appendChild(title);

        const vinylDiv=document.createElement("div");
        vinylDiv.classList.add("vinylArray");
        this.vinyls.forEach(element => {
            element.drawVinyl(vinylDiv);
        });
        this.miniCont.appendChild(vinylDiv);
    }

    findVinyl(id){
        for (const element of this.vinyls) {
            if(element.id == id){
                return element;
            }
        }
    }

    getName()
    {
        return this.name;
    }

    getVinyls()
    {
        return this.vinyls;
    }
}