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
    public class DeleteGenreModel : PageModel
    {
        public RecordContext context;

        public DeleteGenreModel(RecordContext c)
        {
            context=c;
        }
        public async Task<IActionResult> OnGetAsync(int id)
        {
           var vin=await context.Vinyls.Where(v => v.Genre.ID== id).ToListAsync();
            if(vin!=null)
                vin.ForEach(v => context.Remove(v));
            var genre = await context.Genres.FindAsync(id);
            context.Remove(genre);
            await context.SaveChangesAsync();
            return RedirectToPage("./Shops");
        }
    }
}
