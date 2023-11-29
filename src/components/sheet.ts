export class Sheet extends HTMLElement {
  static defaultSizeLimit = "250px";
  
  static observedAttributes = ["z-index", "open", "side"];

  static css = `
    :host {
      display: block;
      position: fixed;
      height: 100%;
      max-height: 100vh;
      width: 100%;
      max-width: ${Sheet.defaultSizeLimit};
      background-color: white;
      z-index: 20;
    }
  `;

  shadow: ShadowRoot;

  constructor() {
    super();

    this.shadow = this.attachShadow({mode: "open"});

    const style = document.createElement("style");
    const slot  = document.createElement("slot");

    style.innerHTML = Sheet.css;

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

  attributeChangedCallback(name: string, _oldValue: any, newValue: any) {
    switch (name) {
    case "open": this.handleOpenChange(newValue); break;
    case "z-index": this.handleZIndexChange(newValue); break;
    case "side": this.handleSideChange(newValue); break;
    }
  }

  private handleOpenChange(value: any) {
    if (value === "true") {
      this.style.display = "block";
    } else {
      this.style.display = "none";
    }
  }

  private handleZIndexChange(value: any) {
    if (isNaN(value)) {
      return;
    }

    this.style.zIndex = value;
  }

  private handleSideChange(value: any) {
    switch (value) {
    case "left":
        this.topLeft();
        this.verticalLimited();
        this.horizontalFull();
        break;
    case "right":
        this.topRight();
        this.verticalLimited();
        this.horizontalFull();
        break;
    case "top":
        this.topLeft();
        this.verticalFull();
        this.horizontalLimited();
        break;
    case "bottom":
        this.bottomLeft();
        this.verticalFull();
        this.horizontalLimited();
        break;
    }
  }

  private topLeft() {
    this.style.top = "0";
    this.style.left = "0";
    this.style.removeProperty('bottom');
    this.style.removeProperty('right');
  }

  private topRight() {
    this.style.top = "0";
    this.style.right = "0";
    this.style.removeProperty('bottom');
    this.style.removeProperty('left');
  }

  private bottomLeft() {
    this.style.bottom = "0";
    this.style.left = "0";
    this.style.removeProperty('top');
    this.style.removeProperty('right');
  }

  private verticalFull() {
    this.style.width = "100%";
    this.style.maxWidth = "100vw";
  }

  private verticalLimited() {
    this.style.width = "100%";
    this.style.maxWidth = "250px";
  }

  private horizontalFull() {
    this.style.height = "100%";
    this.style.maxHeight = "100vh";
  }

  private horizontalLimited() {
    this.style.height = "100%";
    this.style.maxHeight = "250px";
  }
}
