using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace  Backend.Pages
{
    public class GenresModel : PageModel
    {
        private RecordContext context;
        public List<Genre> Gen {get; set;}
        public int ShopID {get;set;}
        public GenresModel(RecordContext c)
        {
            context=c;
        }
        public async Task OnGet(int id)
        {
            ShopID=id;
            Gen = await context.Genres.Where(g =>g.Shop.ID==id).ToListAsync();
        }
    }
}
