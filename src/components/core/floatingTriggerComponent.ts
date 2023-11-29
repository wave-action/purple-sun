import { TriggerComponent } from "./triggerComponent";

export abstract class FloatingTriggerComponent extends TriggerComponent {
  static override observedAttributes = ["z-index", ...super.observedAttributes];
  
  constructor(style: string) {
    super(style);
  }

  get zIndex(): string | null {
    return this.getAttribute("z-index");
  }

  set zIndex(value: string) {
    this.setAttribute("z-index", value);
  }

  protected handleZIndexChange(value: any) {
    if (isNaN(value)) {
      return;
    }

    this.style.zIndex = value;
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
    case "z-index": this.handleZIndexChange(newValue); break;
    default: super.attributeChangedCallback(name, oldValue, newValue);
    }
  }
}
