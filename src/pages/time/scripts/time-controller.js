import { HorarioDisponivelRepository } from "./time-repository.js";
import { HorarioDisponivel } from "./time-model.js";

class HorarioDisponivelController {
  constructor() {
    this.repository = new HorarioDisponivelRepository();
  }

  bindForm() {
    const form = document.querySelector("form");
    form.onsubmit = async (event) => {
      event.preventDefault();

      // Captura e converte corretamente
      const dataHoraInicioRaw = event.target.DataHoraInicio.value;
      const dataHoraFimRaw = event.target.DataHoraFim.value;

      if (!dataHoraInicioRaw || !dataHoraFimRaw) {
        alert("Preencha data e hora de início e fim.");
        return;
      }

      const dataHoraInicio = new Date(dataHoraInicioRaw).toISOString();
      const dataHoraFim = new Date(dataHoraFimRaw).toISOString();
      const profissionalId = parseInt(event.target.profissionalId.value);

      this.createHorarioDisponivel(dataHoraInicio, dataHoraFim, profissionalId);
      this.bindTable();
      event.target.reset();
    };
  }

  createHorarioDisponivel(dataHoraInicio, dataHoraFim, profissionalId) {
    const horarioDisponivel = new HorarioDisponivel(
      dataHoraInicio,
      dataHoraFim,
      profissionalId
    );
    this.repository.create(horarioDisponivel);
  }

  async bindSelects() {
    const profissionalSelect = document.getElementById("profissionalId");

    // Limpa os selects e adiciona opção padrão
    profissionalSelect.innerHTML =
      '<option value="">Selecione o profissional</option>';

    // Busca dados dos repositórios (você pode adaptar conforme sua estrutura)
    const profissionais = await this.repository.getProfissionais(); // deve retornar lista de profissionais
    // Preenche o select de profissionais
    profissionais.forEach((profissional) => {
      const option = document.createElement("option");
      option.value = profissional.id;
      option.textContent = profissional.nome;
      profissionalSelect.appendChild(option);
    });
  }

  async bindTable() {
    const table = document.querySelector("table");
    if (table) {
      const tbory = table.querySelector("tbody");
      const list = await this.getAll();
      if (list) {
        tbory.innerHTML = "";
        list.forEach((horarioDisponivel) => {
          const formatarHorario = (dataHora) => {
            if (!dataHora) return "Não definido";
            const data = new Date(dataHora);
            const dataLocal = new Date(
              data.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
            );

            const dia = String(dataLocal.getDate()).padStart(2, "0");
            const mes = String(dataLocal.getMonth() + 1).padStart(2, "0");
            const horas = String(dataLocal.getHours()).padStart(2, "0");
            const minutos = String(dataLocal.getMinutes()).padStart(2, "0");

            return `${dia}/${mes} às ${horas}:${minutos}`;
          };

          const inicio = formatarHorario(horarioDisponivel.dataHoraInicio);
          const fim = formatarHorario(horarioDisponivel.dataHoraFim);

          const row = document.createElement("tr");
          row.innerHTML = `
      <td>${horarioDisponivel.profissionalId}</td>
      <td>${inicio}</td>
      <td>${fim}</td>
      <td>${
        horarioDisponivel.profissional?.nome || "Profissional indefinido"
      }</td>
    `;
          tbory.appendChild(row);
        });
      }
    }
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getProfissionais() {
    return await this.repository.getProfissionais();
  }
}

export { HorarioDisponivelController };
