using Domain;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Persistence.Contextos;
using Application.Contratos;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Http;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class EventosController : ControllerBase
  {
    private readonly IEventoService _eventoService;
    public EventosController(IEventoService eventoService)
    {
      _eventoService = eventoService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      try
      {
          var eventos = await _eventoService.GetAllEventosAsync(true);
          if (eventos == null) return NotFound("Nenhum evento encontrado.");

          return Ok(eventos);
      }
      catch (Exception err)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError,
          $"Erro ao tentar recuperar eventos. Erro: {err.Message}");
      }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
      try
      {
          var evento = await _eventoService.GetEventoByIdAsync(id, true);
          if (evento == null) return NotFound("Evento por Id não encontrado.");

          return Ok(evento);
      }
      catch (Exception err)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError,
          $"Erro ao tentar recuperar eventos pelo Id. Erro: {err.Message}");
      }
    }

    [HttpGet("tema/{tema}")]
    public async Task<IActionResult> GetByTema(string tema)
    {
      try
      {
          var eventos = await _eventoService.GetAllEventosByTemaAsync(tema, true);
          if (eventos == null) return NotFound("Eventos por Tema não encontrados.");

          return Ok(eventos);
      }
      catch (Exception err)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError,
          $"Erro ao tentar recuperar eventos por Tema. Erro: {err.Message}");
      }
    }

    [HttpPost]
    public async Task<IActionResult> Post(Evento model)
    {
      try
      {
          var evento = await _eventoService.AddEvento(model);
          if (evento == null) return BadRequest("Erro ao tentar adicionar eventos.");

          return Ok(evento);
      }
      catch (Exception err)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError,
          $"Erro ao tentar cadastrar evento. Erro: {err.Message}");
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Evento model)
    {
      try
      {
        var evento = await _eventoService.UpdateEvento(id, model);
        if (evento == null) return BadRequest("Erro ao tentar editar evento.");

        return Ok(evento);
      }
      catch (Exception err)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError,
          $"Erro ao tentar atualizar evento. Erro: {err.Message}");
      }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      try
      {
        if (await _eventoService.DeleteEvento(id))
          return Ok("Evento deletado.");
        else
          return BadRequest("Erro ao tentar excluir evento.");
      }
      catch (Exception err)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError,
          $"Erro ao tentar editar evento. Erro: {err.Message}");
      }
    }
  }
}
