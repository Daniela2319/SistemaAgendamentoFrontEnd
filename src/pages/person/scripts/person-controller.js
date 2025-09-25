import { PersonRepository } from "./person-repository.js";
import { Person } from "./person-model.js";

class PersonController {
  constructor() {
    this.repository = new PersonRepository();
  }

  bindForm() {
    const form = document.querySelector("form");
    form.onsubmit = async (event) => {
      event.preventDefault();
      const nome = event.target.nome.value;
      const email = event.target.email.value;
      const telefone = event.target.telefone.value;
      this.createPerson(nome, email, telefone);
      this.bindTable();
      event.target.reset();
    };
  }
  createPerson(nome, email, telefone) {
    const person = new Person(nome, email, telefone);
    this.repository.create(person);
  }
  //completa a tabela
  async bindTable() {
    const table = document.querySelector("table");
    if (table) {
      const tbory = table.querySelector("tbody");
      const list = await this.getAll();
      if (list) {
        tbory.innerHTML = "";
        list.forEach(function (person) {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${person.id}</td>
              <td>${person.nome}</td>
              <td>${person.email}</td>
              <td>${person.telefone}</td>
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
export { PersonController };
