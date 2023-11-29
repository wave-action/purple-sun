export class CloseButton extends HTMLElement {
  static observedAttributes: string[] = ["for", "forHtml"];

  shadow: ShadowRoot;

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

  attributeChangedCallback(name: string, _oldValue: any, newValue: any) {
    switch (name) {
    case "for":
    case "forHtml":
      this.handleTargetChange(newValue);
      break;
    }
  }

  private handleTargetChange(value: any) {
    this.addEventListener("click", () => {
      document.getElementById(value).open = "false";
    });
  }
}
