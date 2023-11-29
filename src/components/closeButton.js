export class CloseButton extends HTMLElement {
  static observedAttributes = ["for", "forHtml"];

  constructor() {
    super();

    this.shadow = this.attachShadow({mode: "open"});

    const slot  = document.createElement("slot");

    this.shadow.appendChild(slot);
  }

  get forHtml() {
    if (this.getAttribute("for")) {
      return this.getAttribute("for");
    }
    return this.getAttribute("forHtml");
  }

  set forHtml(value) {
    this.setAttribute("for", value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
    case "for":
    case "forHtml":
      this.#handleTargetChange(newValue);
      break;
    }
  }

  #handleTargetChange(value) {
    this.addEventListener("click", () => {
      document.getElementById(value).open = "false";
    });
  }
}
