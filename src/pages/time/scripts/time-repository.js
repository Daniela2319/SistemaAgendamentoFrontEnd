class HorarioDisponivelRepository {
  constructor() {
    this.baseUrl = "https://localhost:7163/api/horarioDisponivel";
    this.profissionalUrl = "https://localhost:7163/api/profissional";
  }

  create(serviceProfessional) {
    return fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceProfessional),
    });
  }

  async getAll() {
    const response = await fetch(this.baseUrl);
    const list = await response.json();
    return list;
  }

  async getProfissionais() {
    const response = await fetch(this.profissionalUrl);
    const list = await response.json();
    return list;
  }
}
export { HorarioDisponivelRepository };
