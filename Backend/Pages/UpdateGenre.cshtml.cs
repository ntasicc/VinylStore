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
    public class UpdateGenreModel : PageModel
    {
        private RecordContext context;

        [BindProperty]
        public Genre Genre {get; set;}

        public UpdateGenreModel(RecordContext c)
        {
            context=c;
        }
        public async Task OnGet(int id)
        {
            Genre =  await context.Genres.FindAsync(id);
        }

        public async Task<IActionResult> OnPostAsync(int id)
        {
            
            if(!ModelState.IsValid)
            {
                Genre= await context.Genres.FindAsync(id);
                return Page();
            }

            Genre.ID=id;
            context.Genres.Update(Genre);
            await context.SaveChangesAsync();
            return RedirectToPage("./Genres");
        }
        
    }
}
