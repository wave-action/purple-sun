import { FloatingTriggerComponent } from "./core/floatingTriggerComponent";

export class FocusArea extends FloatingTriggerComponent {
  static override observedAttributes = ["scroll-block", ...super.observedAttributes];

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
    super(FocusArea.css);

    const slot  = document.createElement("slot");
    this.shadow.appendChild(slot);
  }

  get scrollBlock() {
    return this.getAttribute("scroll-block");
  }

  set scrollBlock(value) {
    this.setAttribute("scroll-block", value);
  }

  protected override handleOpenChange(value: any) {
    if (value === "true" && this.scrollBlock !== "false") {
        document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    super.handleOpenChange(value);
  }
}
