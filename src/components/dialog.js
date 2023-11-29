export class Dialog extends HTMLElement {
  static observedAttributes = ["trigger", "z-index", "open"];

  static css = `
    :host {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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

    style.innerHTML = Dialog.css;

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

  get trigger() {
      return this.getAttribute("trigger");
  }

  set trigger(value) {
    this.setAttribute("trigger", value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
    case "open": this.#handleOpenChange(newValue); break;
    case "z-index": this.#handleZIndexChange(newValue); break;
    case "trigger":
        this.#handleTriggerChange(newValue);
        break;
    }
  }

  #handleOpenChange(value) {
    if (value === "true") {
      this.style.display = "block";
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

  #handleTriggerChange(value) {
    document.getElementById(value).addEventListener("click", () => {
      this.open = "true";
    });
  }
}
