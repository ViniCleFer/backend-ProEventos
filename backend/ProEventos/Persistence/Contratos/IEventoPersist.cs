using System.Threading.Tasks;
using Domain;

namespace Persistence.Contratos
{
    public interface IEventoPersist
    {
         Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);
         Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false);
         Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false);
    }
}