export class FocusArea extends HTMLElement {
  static observedAttributes = ["trigger", "z-index", "open", "scroll-block"];

  static css = `
    :host {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      backdrop-filter: blur(3px);
      z-index: 10;
    }
  `;

  constructor() {
    super();

    this.shadow = this.attachShadow({mode: "open"});

    const style = document.createElement("style");
    const slot  = document.createElement("slot");

    style.innerHTML = FocusArea.css;

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

  get scrollBlock() {
    return this.getAttribute("scroll-block");
  }

  set scrollBlock(value) {
    this.setAttribute("scroll-block", value);
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
    case "trigger": this.#handleTriggerChange(newValue); break;
    }
  }

  #handleOpenChange(value) {
    if (value === "true") {
      this.style.display = "block";
      if (this.scrollBlock !== "false") {
        document.body.style.overflow = "hidden";
      }
    } else {
      this.style.display = "none";
      document.body.style.overflow = "auto";
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
