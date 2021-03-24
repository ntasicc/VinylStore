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
    public class ShopsModel : PageModel
    {
        private RecordContext context;
        public List<Shop> Shopss {get; set;}
        public ShopsModel(RecordContext c)
        {
            context=c;
        }
        public async Task OnGet()
        {
            Shopss = await context.Shops.ToListAsync();
        }
    }
}
