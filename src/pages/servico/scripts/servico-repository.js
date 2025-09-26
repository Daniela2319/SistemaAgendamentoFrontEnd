class ServicoRepository {
  constructor() {
    this.baseUrl = "https://localhost:7163/api/Servico";
  }

  create(servico) {
    return fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(servico),
    });
  }

  async getAll() {
    const response = await fetch(this.baseUrl);
    const list = await response.json();
    return list;
  }
}
export { ServicoRepository };
