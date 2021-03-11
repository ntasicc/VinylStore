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
        public GenresModel(RecordContext c)
        {
            context=c;
        }
        public async Task OnGet()
        {
            Gen = await context.Genres.ToListAsync();
        }
    }
}
