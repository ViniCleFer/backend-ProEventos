using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {

        public IEnumerable<Evento> _evento = new Evento[]
        {
            new Evento()
            {
                EventoId = 1,
                Tema ="Naruto",
                Local = "Salto",
                Lote = "1 lote",
                QtdPessoas = 100,
                DataEvento = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy"),
                ImagemUrl = "https://static.wikia.nocookie.net/naruto-pedia/images/e/ea/Naruto.png/revision/latest?cb=20120407114822&path-prefix=pt-br"
            },
            new Evento()
            {
                EventoId = 2,
                Tema ="DBZ",
                Local = "Itu",
                Lote = "2 lote",
                QtdPessoas = 200,
                DataEvento = DateTime.Now.AddDays(9).ToString("dd/MM/yyyy"),
                ImagemUrl = "https://wpobservatoriodeseries.elav.tmp.br/wp-content/uploads/2020/05/Novo-Projeto-65.jpg"
            },
        };
        public EventoController()
        {
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _evento;
        }

        [HttpGet("{id}")]
        public IEnumerable<Evento> GetById(int id)
        {
            return _evento.Where(evento => evento.EventoId == id);
        }
    }
}
