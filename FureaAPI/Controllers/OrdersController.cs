using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FureaAPI.Models;
using Microsoft.AspNetCore.Cors;

namespace FureaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
  [EnableCors("CorsPolicy")]

  public class OrdersController : ControllerBase
    {
        private readonly CoreDbContext _context;

        public OrdersController(CoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Orders>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

    [HttpPost("/ProcessOrder/")]

    public async Task<ActionResult<Orders>> ProcessOrder(OrdersData ordersData)
    {
      OrderItems item = new OrderItems();
      Orders order = new Orders();
       order.Id = 2147483647;
        order.UserId = ordersData.userId;
        order.OrderDate = DateTime.Now;
        order.OrderStatus = "New";
        order.TotalAmount = 0;
      _context.Orders.Add(order);
      await _context.SaveChangesAsync();

      var NewOrderID = (from a in _context.Orders

                           orderby a.Id descending
                           select  a.Id).First();

      Console.WriteLine(NewOrderID);
foreach (Products product in ordersData.products )
      {
        item.Id = 2147483647;
        item.NoPieces = (int)product.Qty;
        item.Price = (double)product.Price;
        item.ProductId =(int) product.Id;
        item.Total = (double)(product.Price * product.Qty);
        item.OrderId =(int) NewOrderID;
       _context.OrderItems.Add(item);
        //Console.WriteLine(item.ToString());
           await _context.SaveChangesAsync();
 }
      var orderTotal = (from a in _context.OrderItems

                        orderby a.Id descending
                        where a.OrderId.Equals(NewOrderID)
                        select a.Total).Sum();
     
      var NewOrder = _context.Orders.First(a => a.Id == NewOrderID);
      NewOrder.TotalAmount = orderTotal;
      await _context.SaveChangesAsync();
      order.Id = NewOrder.Id;
      order.TotalAmount = NewOrder.TotalAmount;
      Console.WriteLine(orderTotal);
  
      return CreatedAtAction( "GetOrders", new { order });
    }


    [HttpPost("/GetUserOrders/")]

    public async Task<ActionResult<Orders>> GetUserOrders(Users user)
    {

      var userOrders = await (from a in _context.Orders
                        join c in _context.Users on a.UserId equals c.Id
                        orderby a.Id descending
                       where a.UserId.Equals(user.Id)
                        select new {
                          id=a.Id,
                          userName=c.Name,
                          userId= a.UserId,
             orderDate = a.OrderDate,
             totalAmount = a.TotalAmount,
             orderStatus =a.OrderStatus,
                        }).ToListAsync();

      Console.WriteLine(userOrders);


      return CreatedAtAction("GetOrders", new { userOrders });
    }


    [HttpPost("/GetOrderDetails/")]

    public async Task<ActionResult<Orders>> GetOrderDetails(Orders order)
    {

      var userOrders = await (from a in _context.OrderItems
                              join b in _context.Orders on a.OrderId equals b.Id
                              join c in _context.Products on a.ProductId equals c.Id
                              orderby a.Total descending
                              where a.OrderId.Equals(order.Id)
                              select new
                              {
                                id = a.Id,
                                ProductName = c.Name,
                                qty=a.NoPieces,
                                Price=c.Price,
                                 ProductSum = a.Total,
                                orderTotal = b.TotalAmount,
                              }).ToListAsync();

      //Console.WriteLine(userOrders);


      return CreatedAtAction("GetOrders", new { userOrders });
    }



    // GET: api/Orders/5
    [HttpGet("{id}")]
        public async Task<ActionResult<Orders>> GetOrders(int id)
        {
            var orders = await _context.Orders.FindAsync(id);

            if (orders == null)
            {
                return NotFound();
            }

            return orders;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrders(int id, Orders orders)
        {
            if (id != orders.Id)
            {
                return BadRequest();
            }

            _context.Entry(orders).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrdersExists(id))
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

        // POST: api/Orders
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Orders>> PostOrders(Orders orders)
        {
            _context.Orders.Add(orders);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrders", new { id = orders.Id }, orders);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Orders>> DeleteOrders(int id)
        {
            var orders = await _context.Orders.FindAsync(id);
            if (orders == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(orders);
            await _context.SaveChangesAsync();

            return orders;
        }

        private bool OrdersExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }

  public class OrdersData
  {
      public int userId { get; set; }
      public List<Products> products { get; set; }
    
  }
}
