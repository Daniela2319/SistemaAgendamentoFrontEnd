import { ServiceProfessionalRepository } from "./serviceProfessional-repository.js";
import { ServiceProfessional } from "./serviceProfessional-model.js";

class ServiceProfessionalController {
  constructor() {
    this.repository = new ServiceProfessionalRepository();
  }

  bindForm() {
    const form = document.querySelector("form");
    form.onsubmit = async (event) => {
      event.preventDefault();
      const servicoId = event.target.servicoId.value;
      const profissionalId = parseInt(event.target.profissionalId.value);

      this.createServiceProfessional(servicoId, profissionalId);
      this.bindTable();
      event.target.reset();
    };
  }

  createServiceProfessional(servicoId, profissionalId) {
    const serviceProfessional = new ServiceProfessional(
      servicoId,
      profissionalId
    );
    this.repository.create(serviceProfessional);
  }

  async bindSelects() {
    const servicoSelect = document.getElementById("servicoId");
    const profissionalSelect = document.getElementById("profissionalId");

    // Limpa os selects e adiciona opção padrão
    servicoSelect.innerHTML = '<option value="">Selecione o serviço</option>';
    profissionalSelect.innerHTML =
      '<option value="">Selecione o profissional</option>';

    // Busca dados dos repositórios (você pode adaptar conforme sua estrutura)
    const servicos = await this.repository.getServicos(); // deve retornar lista de serviços
    const profissionais = await this.repository.getProfissionais(); // deve retornar lista de profissionais

    // Preenche o select de serviços
    servicos.forEach((servico) => {
      const option = document.createElement("option");
      option.value = servico.id;
      option.textContent = servico.nomeServico;
      servicoSelect.appendChild(option);
    });

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
        list.forEach((serviceProfessional) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${serviceProfessional.servicoId}</td>
              <td>${
                serviceProfessional.servico.nomeServico || "Serviço indefinido"
              }</td>
              <td>${
                serviceProfessional.servico.duracaoMinutos || "Sem duração"
              }</td>
              <td>R$ ${
                serviceProfessional.servico.preco.toFixed(2) || "0.00"
              }</td>
              <td>${
                serviceProfessional.profissional.nome ||
                "Profissional indefinido"
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

  async getServicos() {
    return await this.repository.getServicos();
  }

  async getProfissionais() {
    return await this.repository.getProfissionais();
  }
}

export { ServiceProfessionalController };
