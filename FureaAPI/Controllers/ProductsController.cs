using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static FureaAPI.Models.CoreDbContext;

namespace FureaAPI.Models
{
    [Route("api/[controller]")]
    [ApiController]
  [EnableCors("CorsPolicy")]
  public class ProductsController : ControllerBase
    {
        private readonly CoreDbContext _context;

        public ProductsController(CoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Products>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

    [HttpGet("/ProdSpecified/{id}")]
    public async Task<ActionResult<IEnumerable<ProdData>>> GetSingleProduct(int id)
    {
      var ProdWithNames = (from a in _context.Products
                           join c in _context.Categories on a.CategoryId equals c.Id
                           orderby a.Id descending
                           where a.Id ==id
                           select new ProdData
                           {
                             id = a.Id,
                             name = a.Name,
                             categoryName = c.Name,
                             Qty = (int)a.Qty,
                             description = a.Description,
                             price = a.Price,
                             oldPrice = (double)a.OldPrice,
                             image = a.Image,
                             image2=a.Image2,
                             image3 = a.Image3,
                             image4 = a.Image4,
                           });


      return await ProdWithNames.ToListAsync();
      //await _context.User.ToListAsync();
    }
    [HttpGet("/ProdSpecified/")]
    public async Task<ActionResult<IEnumerable<ProdData>>> GetAllProducts()
    {
      var ProdWithNames = (from a in _context.Products
                      join c in _context.Categories on a.CategoryId equals c.Id
                      orderby a.Id descending
                      select new ProdData
                      {
                        id = a.Id,
                        name = a.Name,
             categoryName=c.Name,
                        categoryId = a.CategoryId,

                        Qty = (int)a.Qty,
     description =a.Description,
     price=a.Price,
     oldPrice= (double)a.OldPrice,
 image =a.Image,
 image2 = a.Image2,
                        image3 = a.Image3,
                        image4 = a.Image4
                      });

                      
      return await ProdWithNames.ToListAsync();
      //await _context.User.ToListAsync();
    }

    [HttpPost("/ImgUpload/"), DisableRequestSizeLimit]
    public async Task<IActionResult> Upload()
    {
      try
      {
        var prodID =Int32.Parse(Request.Form["id"]);
        var rand = Int32.Parse(Request.Form["rand"]);
        Console.WriteLine("Rand IS "+rand);

        string oldImage = Request.Form["oldImage"];
        Console.WriteLine(prodID);
        var editedProd = (from a in _context.Products
                             where a.Id.Equals(prodID)
                             select a).FirstOrDefault();
      //  Console.WriteLine(editedProd); 
        var pathToSave = @"E:\ShopSite\furea-shop\src\assets\img\products";
        var dbPath = @"assets\img\products";
        var file = Request.Form.Files[0];

          //   var id = Request.Form.Files[1];
        //  var oldImage = Request.Form.Files[2];
        // Console.WriteLine(oldImage);

          var folderName = Path.Combine("Resources", "Images");

         /*  var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);*/

        if (file.Length > 0)
        {
          var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
          Console.WriteLine(fileName);

       /*   Random random = new Random(100);
          int num = random.Next();*/
        //    Console.WriteLine(num);

          var fileName2 = fileName.Replace(".jpg", rand.ToString() + ".jpg");
           fileName2 = fileName2.Replace(".jpeg", rand.ToString() + ".jpeg");

          fileName2 = fileName2.Replace(".webp", rand.ToString() + ".jpg");
          Console.WriteLine(fileName2);
          var fullPath = Path.Combine(pathToSave, fileName2);
        using (var stream = new FileStream(fullPath, FileMode.Create))
          {
            file.CopyTo(stream);
          }
          Console.WriteLine(Path.Combine(dbPath, fileName2));
          if (oldImage == "image1")
          {
            editedProd.Image = Path.Combine(dbPath, fileName2).Replace('/', '\\');
            _context.Entry(editedProd).State = EntityState.Modified;
            Console.WriteLine(editedProd.Image);

          }
          if (oldImage == "image2")
          {
            editedProd.Image2 = Path.Combine(dbPath, fileName2).Replace('/','\\');
            _context.Entry(editedProd).State = EntityState.Modified;
            Console.WriteLine("2");
        
          }
          else if (oldImage == "image3")
          {
            editedProd.Image3 = Path.Combine(dbPath, fileName2).Replace('/', '\\'); ;
            _context.Entry(editedProd).State = EntityState.Modified;
            Console.WriteLine("3");

          }
          else if (oldImage == "image4")
          {
            editedProd.Image4 = Path.Combine(dbPath, fileName2).Replace('/', '\\'); ;
            _context.Entry(editedProd).State = EntityState.Modified;
            Console.WriteLine("4");

          }
          else
          {
            Console.WriteLine("false");

          }
          try
          {
            await _context.SaveChangesAsync();
          }
          catch
          {
            Console.WriteLine("error");
          }

          Console.WriteLine("true");
          return Ok(new { fullPath });
        }
        else
        {
          return BadRequest();
        }
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Internal server error: {ex}");
      }
    }


    // GET: api/Products/5
    [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProducts(int id)
        {
            var products = await _context.Products.FindAsync(id);

            if (products == null)
            {
                return NotFound();
            }

            return products;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducts(int id, Products products)
        {
            if (id != products.Id)
            {
                return BadRequest();
            }

            _context.Entry(products).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Products>> PostProducts(Products products)
        {products.Id=  2147483647;
      _context.Products.Add(products);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProducts", new { id = products.Id }, products);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Products>> DeleteProducts(int id)
        {
      Console.WriteLine(id);
            var products = await _context.Products.FindAsync(id);
            if (products == null)
            {
                return NotFound();
            }

            _context.Products.Remove(products);
            await _context.SaveChangesAsync();

            return products;
        }

        private bool ProductsExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
