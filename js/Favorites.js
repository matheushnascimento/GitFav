import { GithubUser } from "./GithubUser.js";
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || [];
  }

  save() {
    localStorage.setItem("@github-favorites:", JSON.stringify(this.entries));
  }

  async add(username) {
    try {
      const userEsists = this.entries.find(entry => entry.login === username);

      if (userEsists) throw new Error("Usuário já cadastrado");

      const user = await GithubUser.search(username);

      if (user.login === undefined) throw new Error("Usuário não encontrado!");

      this.entries = [user, ...this.entries];
      this.update();
      this.save();
    } catch (error) {
      alert(error.message);
    }
  }

  delete() {}
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.tbody = this.root.querySelector("table tbody");
    this.star = document.querySelector("svg");

    this.update();
    this.oandd();
    this.buttonChange();
  }

  oandd() {
    const favoriteButton = this.root.querySelector("button");

    favoriteButton.onclick = () => {
      const input = document.querySelector("input");
      const { value } = input;

      this.add(value);
      input.value = "";
    };
  }

  update() {
    this.removeAllTr();

    this.entries.forEach(user => {
      const row = this.createRow();
      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`;

      row.querySelector(".user img").alt = `Imagem de ${user.name}`;
      row.querySelector(".user a").href = `https://github.com/${user.login}`;
      row.querySelector(".user a").textContent = user.name;
      row.querySelector(".user p").textContent = `/${user.login}`;
      row.querySelector(".repositories").textContent = user.public_repos;
      row.querySelector(".followers").textContent = user.followers;

      this.tbody.append(row);
    });
  }

  createRow() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td class="user">
    <img
      src="https://github.com/matheushnascimento.png"
      alt="Imagem de Matheus Nascimento"
    />
    <div class="user-texts">
      <a
        href="https://github.com/matheushnascimento"
        target="_blank"
        >Matheus Nascimento</a
      >
      <p>/matheushnascimento</p>
    </div>
  </td>
  <td class="repositories">123</td>
  <td class="followers">1234</td>
  <td class="action">Remover</td>
  `;

    return tr;
  }

  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach(tr => {
      tr.remove();
    });
  }

  buttonChange() {
    const button = document.querySelector("button");
    const img = button.querySelector("img");

    button.onmouseover = () => {
      img.src = "assets/button-blue-star.svg";
    };
    button.onmouseout = () => {
      img.src = "assets/button-star.svg";
    };
  }
}
