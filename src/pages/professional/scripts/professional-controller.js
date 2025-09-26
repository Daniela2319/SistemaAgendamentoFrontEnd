import { ProfessionalRepository } from "./professional-repository.js";
import { Professional } from "./professional-model.js";

class ProfessionalController {
  constructor() {
    this.repository = new ProfessionalRepository();
  }

  bindForm() {
    const form = document.querySelector("form");
    form.onsubmit = async (event) => {
      event.preventDefault();
      const nome = event.target.nome.value;
      this.createProfessional(nome);
      this.bindTable();
      event.target.reset();
    };
  }
  createProfessional(nome) {
    const professional = new Professional(nome);
    this.repository.create(professional);
  }
  //completa a tabela
  async bindTable() {
    const table = document.querySelector("table");
    if (table) {
      const tbory = table.querySelector("tbody");
      const list = await this.getAll();
      if (list) {
        tbory.innerHTML = "";
        list.forEach(function (professional) {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${professional.id}</td>
              <td>${professional.nome}</td>
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
export { ProfessionalController };
