namespace PacienteAPIS.Models
{
    public class CitasModel
    {
        public Guid Id { get; set; }
        public string? UserId { get; set; }

        public string? Tipodocumento { get; set; }
        public long? NumeroDocumento { get; set; }
        public string? Nombres { get; set; }
        public string? Apellidos { get; set; }
        public long? Fijo { get; set; }
        public long? Celular { get; set; }
        public string? Departamento { get; set; }
        public string? Ciudad { get; set; }
        public string? Regional { get; set; }
        public string? Oficina { get; set; }
        public string? Tramite { get; set; }
        public DateTime? Calendario { get; set; }
    }
}
