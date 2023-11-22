import { GithubUser } from "./GithubUser.js";
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || [];
  }

  save() {}

  async add(username) {
    const x = await GithubUser.search(username);
    console.log(x);
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
  <td>123</td>
  <td>1234</td>
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
