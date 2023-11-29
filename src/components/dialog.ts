import { FloatingTriggerComponent } from "./core/floatingTriggerComponent";

export class Dialog extends FloatingTriggerComponent {
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
    super(Dialog.css);

    const slot  = document.createElement("slot");
    this.shadow.appendChild(slot);
  }
}
