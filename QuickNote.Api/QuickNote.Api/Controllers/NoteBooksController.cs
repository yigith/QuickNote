using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuickNote.Api.Data;
using QuickNote.Api.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickNote.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteBooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NoteBooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<NoteBook>> OpenNoteBook(PostNoteBookDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var noteBook = await _context.NoteBooks.FirstOrDefaultAsync(x => x.Name == dto.Name);

            if (noteBook == null)
            {
                noteBook = new NoteBook() { Name = dto.Name };
                _context.NoteBooks.Add(noteBook);
                await _context.SaveChangesAsync();
            }

            return noteBook;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNoteBook(int id)
        {
            var noteBook = await _context.NoteBooks.FindAsync(id);
            if (noteBook == null) return NotFound();
            _context.NoteBooks.Remove(noteBook);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
