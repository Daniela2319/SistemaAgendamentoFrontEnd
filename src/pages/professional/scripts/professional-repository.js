class ProfessionalRepository {
  constructor() {
    this.baseUrl = "https://localhost:7163/api/Profissional";
  }

  create(professional) {
    return fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(professional),
    });
  }

  async getAll() {
    const response = await fetch(this.baseUrl);
    const list = await response.json();
    return list;
  }
}
export { ProfessionalRepository };
