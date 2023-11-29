import { FloatingTriggerComponent } from "./core/floatingTriggerComponent";

export class Sheet extends FloatingTriggerComponent {
  static override observedAttributes = ["side", ...super.observedAttributes];

  static defaultSizeLimit = "250px";

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

  constructor() {
    super(Sheet.css);

    const slot  = document.createElement("slot");
    this.shadow.appendChild(slot);
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
    case "side": this.handleSideChange(newValue); break;
    default: super.attributeChangedCallback(name, oldValue, newValue);
    }
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
