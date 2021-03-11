using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecordController : ControllerBase
    {
        public RecordContext Context{get; set;}
        public RecordController(RecordContext context)
        {
            Context=context;
        }       
       
       [Route("ReadShop")]
       [HttpGet]
       public async Task<List<Shop>> ReadShop()
       {
           return await Context.Shops.Include(p=>p.Genres).ThenInclude(a => a.Vinyls).ToListAsync();
       }

       [Route("CreateShop")]
       [HttpPost]
       public async Task CreateShop([FromBody] Shop shop)
       {
           Context.Shops.Add(shop);
           await Context.SaveChangesAsync();
       }

       [Route("UpdateShop")]
       [HttpPut]
       public async Task UpdateShop([FromBody] Shop shop)
       {
           Context.Update<Shop>(shop);
           await Context.SaveChangesAsync();
       }

       [Route("DeleteShop/{id}")]
        [HttpDelete]
        public async Task DeleteShop(int id)
        {
            var shop = await Context.Shops.FindAsync(id);
            Context.Remove(shop);
            await Context.SaveChangesAsync();
        }

        [Route("ReadGenre")]
        [HttpGet]
        public async Task<List<Genre>> ReadGenre()
        {
            return await Context.Genres.Include(p =>p.Vinyls).ToListAsync();
        }

         [Route("CreateGenre/{shopid}")]
       [HttpPost]
       public async Task CreateGenre(int shopid,[FromBody] Genre genre)
       {
           var shop= await Context.Shops.FindAsync(shopid);
            genre.Shop=shop;
           Context.Genres.Add(genre);
           await Context.SaveChangesAsync();
       }

       [Route("DeleteGenre/{id}")]
        [HttpDelete]
        public async Task DeleteGenre(int id)
        {
            var vin=await Context.Vinyls.Where(v => v.Genre.ID== id).ToListAsync();
            if(vin!=null)
                vin.ForEach(v => Context.Remove(v));
            var genre = await Context.Genres.FindAsync(id);
            Context.Remove(genre);
            await Context.SaveChangesAsync();
        }

       [Route("CreateVinyl/{genreid}")]
       [HttpPost]
       public async Task<IActionResult> CreateVinyl(int genreid,[FromBody] Vinyl vinyl)
        {
            var genre= await Context.Genres.Where(g => g.ID ==genreid).Include(g => g.Shop).FirstOrDefaultAsync();
            vinyl.Genre=genre;
            
                Context.Vinyls.Add(vinyl);
                await Context.SaveChangesAsync();
                int a=vinyl.ID;
                return Ok(a);
          

        }
        [Route("UpdateVinyl")]
        [HttpPut]
        public async Task<IActionResult> UpdateVinyl([FromBody] Vinyl vinyl)
        {
            if(vinyl.Img=="" || vinyl.Name=="" || vinyl.Performer=="" || vinyl.Price==0)
            {
                return StatusCode(406);
            }
            else
            {
                Context.Update<Vinyl>(vinyl);
                await Context.SaveChangesAsync();
                return Ok();
            }

        }

        [Route("DeleteVinyl/{id}")]
        [HttpDelete]
        public async Task DeleteVinyl(int id)
        {
            var vinyl = await Context.Vinyls.FindAsync(id);
            Context.Remove(vinyl);
            await Context.SaveChangesAsync();
        }

    }
}
