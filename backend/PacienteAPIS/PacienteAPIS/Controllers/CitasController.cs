using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PacienteAPIS.Data;
using PacienteAPIS.Models;
using System.Globalization;
using System.Security.Claims;

namespace PacientesAPIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CitasController : Controller
    {
        private readonly AplicationDbContext dbContext;
        public CitasController(AplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // Ruta para obtener todas las citas 

        [HttpGet]
        public async Task<IActionResult> GetCitas()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var citas = await dbContext.Citas.Where(c => c.UserId == userId).ToListAsync();
            return Ok(citas);
        }

        // Ruta para obtener cita especifica 
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetCita([FromRoute] Guid id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var cita = await dbContext.Citas.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (cita == null)
            {
                return NotFound();
            }

            return Ok(cita);
        }

        // Ruta para crear una cita

        [HttpPost]
        public async Task<IActionResult> AddCitas(AddCitasRequest addCitasRequest)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(); // Devuelve Unauthorized si el usuario no está autenticado correctamente
            }

            var citas = new CitasModel()
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Tipodocumento = addCitasRequest.Tipodocumento,
                NumeroDocumento = addCitasRequest.NumeroDocumento,
                Nombres = addCitasRequest.Nombres,
                Apellidos = addCitasRequest.Apellidos,
                Fijo = addCitasRequest.Fijo,
                Celular = addCitasRequest.Celular,
                Departamento = addCitasRequest.Departamento,
                Ciudad = addCitasRequest.Ciudad,
                Regional = addCitasRequest.Regional,
                Oficina = addCitasRequest.Oficina,
                Tramite = addCitasRequest.Tramite,
                Calendario = addCitasRequest.Calendario,
            };

            await dbContext.Citas.AddAsync(citas);
            await dbContext.SaveChangesAsync();

            return Ok(citas);
        }

        // Ruta para actualizar cita

        [HttpPut]
        [Route("{id:guid}")]

        public async Task<IActionResult> UpdateCitas([FromRoute] Guid id, UpdateCitasRequest updateCitasRequest)
        {
            var citas = await dbContext.Citas.FindAsync(id);

            if (citas != null)
            {
                citas.Tipodocumento = updateCitasRequest.Tipodocumento;
                citas.NumeroDocumento = updateCitasRequest.NumeroDocumento;
                citas.Nombres = updateCitasRequest.Nombres;
                citas.Apellidos = updateCitasRequest.Apellidos;
                citas.Fijo = updateCitasRequest.Fijo;
                citas.Celular = updateCitasRequest.Celular;
                citas.Departamento = updateCitasRequest.Departamento;
                citas.Ciudad = updateCitasRequest.Ciudad;
                citas.Regional = updateCitasRequest.Regional;
                citas.Oficina = updateCitasRequest.Oficina;
                citas.Tramite = updateCitasRequest.Tramite;
                citas.Calendario = updateCitasRequest.Calendario;

                await dbContext.SaveChangesAsync();

                return Ok(citas);
            }

            return NotFound();
        }

        // Ruta para eliminar cita


        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteCitas([FromRoute] Guid id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; 

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(); 
            }

            var cita = await dbContext.Citas.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (cita == null)
            {
                return NotFound(); 
            }

            dbContext.Citas.Remove(cita);
            await dbContext.SaveChangesAsync();

            return Ok(cita);

        }
    }

}
