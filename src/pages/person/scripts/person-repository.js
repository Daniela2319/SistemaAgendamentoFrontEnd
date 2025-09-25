class PersonRepository {
  constructor() {
    this.baseUrl = "https://localhost:7163/api/Usuario";
  }

  create(person) {
    return fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  async getAll() {
    const response = await fetch(this.baseUrl);
    const list = await response.json();
    return list;
  }
}
export { PersonRepository };
