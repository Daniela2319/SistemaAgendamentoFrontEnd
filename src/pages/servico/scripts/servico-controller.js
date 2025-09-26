import { ServicoRepository } from "./servico-repository.js";
import { Servico } from "./servico-model.js";

class ServicoController {
  constructor() {
    this.repository = new ServicoRepository();
  }

  bindForm() {
    const form = document.querySelector("form");
    form.onsubmit = async (event) => {
      event.preventDefault();
      const nomeServico = event.target.nomeServico.value;
      const descricao = event.target.descricao.value;
      const duracaoMinutos = parseInt(event.target.duracaoMinutos.value);
      const preco = parseFloat(event.target.preco.value);

      const duracao = this.formatarDuracao(duracaoMinutos);

      this.createServico(nomeServico, descricao, duracao, preco);
      this.bindTable();
      event.target.reset();
    };
  }

  formatarDuracao(duracaoMinutos) {
    const horas = Math.floor(duracaoMinutos / 60);
    const restoMinutos = duracaoMinutos % 60;
    return `${horas.toString().padStart(2, "0")}:${restoMinutos
      .toString()
      .padStart(2, "0")}:00`;
  }

  converterParaMinutos(duracaoStr) {
    const [horas, minutos, segundos] = duracaoStr.split(":").map(Number);
    return horas * 60 + minutos;
  }

  createServico(nomeServico, descricao, duracao, preco) {
    const servico = new Servico(nomeServico, descricao, duracao, preco);
    this.repository.create(servico);
  }

  async bindTable() {
    const table = document.querySelector("table");
    if (table) {
      const tbory = table.querySelector("tbody");
      const list = await this.getAll();
      if (list) {
        tbory.innerHTML = "";
        list.forEach((servico) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${servico.id}</td>
              <td>${servico.nomeServico}</td>
              <td>${servico.descricao}</td>
              <td>${this.converterParaMinutos(servico.duracaoMinutos)} min</td>
              <td>${servico.preco.toFixed(2)}</td>
            `;
          tbory.appendChild(row);
        });
      }
    }
  }

  async getAll() {
    return await this.repository.getAll();
  }
}

export { ServicoController };
