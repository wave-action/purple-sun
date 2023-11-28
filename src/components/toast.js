export class Toast extends HTMLElement {
  static observedAttributes = ["z-index", "open", "close-in"];

  static css = `
    :host {
      display: block;
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: white;
      border: solid 1px black;
      padding: 5px;
      z-index: 20;
    }
  `;

  constructor() {
    super();

    this.shadow = this.attachShadow({mode: "open"});

    const style = document.createElement("style");
    const slot  = document.createElement("slot");

    style.innerHTML = Toast.css;

    this.shadow.appendChild(style);
    this.shadow.appendChild(slot);
  }

  get open() {
    return this.getAttribute("open");
  }

  set open(value) {
    this.setAttribute("open", value);
  }

  
  get zIndex() {
    return this.getAttribute("z-index");
  }

  set zIndex(value) {
    this.setAttribute("z-index", value);
  }

  get closeIn() {
    return this.getAttribute("close-in");
  }

  set closeIn(value) {
    this.setAttribute("close-in", value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
    case "open": this.#handleOpenChange(newValue); break;
    case "z-index": this.#handleZIndexChange(newValue); break;
    }
  }

  #handleOpenChange(value) {
    if (value === "true") {
      this.style.display = "block";
      if (this.closeIn) {
        setTimeout(() => {
          this.open = "false";
        }, this.closeIn);
      }
    } else {
      this.style.display = "none";
    }
  }

  #handleZIndexChange(value) {
    if (isNaN(value)) {
      return;
    }

    this.style.zIndex = value;
  }
}

export function defineToast() {
  customElements.define("ps-toast", Toast);
}
