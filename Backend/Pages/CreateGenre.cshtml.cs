using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Pages
{
    public class CreateGenreModel : PageModel
    {
        [BindProperty]
        public Genre Genre{get; set;}

        private RecordContext context;
        public Shop Shop {get; set;}

        public CreateGenreModel(RecordContext c)
        {
            context=c;
        }
       public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync(int id)
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            Shop= await context.Shops.FindAsync(id);
            if(Shop==null)
            {
                return Page();
            }
            Genre.Shop=Shop;
            context.Genres.Add(Genre);
            await context.SaveChangesAsync();

            return RedirectToPage("./Shops");
        }
    }
}
