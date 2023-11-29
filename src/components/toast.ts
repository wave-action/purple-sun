import { FloatingTriggerComponent } from "./core/floatingTriggerComponent";

export class Toast extends FloatingTriggerComponent {
  static override observedAttributes = ["close-in", ...super.observedAttributes];

  static css = `
    :host {
      display: none;
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
    super(Toast.css);

    const slot  = document.createElement("slot");
    this.shadow.appendChild(slot);
  }

  get closeIn() {
    return this.getAttribute("close-in");
  }

  set closeIn(value) {
    this.setAttribute("close-in", value);
  }

  protected override handleOpenChange(value: any) {
    if (value === "true" && this.closeIn) {
      setTimeout(() => {
        this.open = "false";
      // @ts-ignore
      }, this.closeIn);
    }
    super.handleOpenChange(value);
  }
}
