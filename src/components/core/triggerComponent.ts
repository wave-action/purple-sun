import { StyledComponent } from "./styledComponent";

export abstract class TriggerComponent extends StyledComponent {
  static observedAttributes = ["trigger", "open"];

  protected openEvent: Event;
  protected closeEvent: Event;

  constructor(style: string) {
    super(style);

    this.openEvent = new Event("open");
    this.closeEvent = new Event("close");
  }

  get open(): string | null {
    return this.getAttribute("open");
  }

  set open(value: string) {
    this.setAttribute("open", value);
  }

  get trigger(): string | null {
      return this.getAttribute("trigger");
  }

  set trigger(value) {
    this.setAttribute("trigger", value);
  }

  protected handleOpenChange(value: any) {
    if (value === "true") {
      this.style.display = "block";
      this.dispatchEvent(this.openEvent);
    } else {
      this.style.display = "none";
      this.dispatchEvent(this.closeEvent);
    }
  }

  protected handleTriggerChange(value: any) {
    document.getElementById(value).addEventListener("click", () => {
      this.open = "true";
    });
  }
 
  attributeChangedCallback(name: string, _oldValue: any, newValue: any) {
    switch (name) {
    case "open": this.handleOpenChange(newValue); break;
    case "trigger": this.handleTriggerChange(newValue); break;
    }
  }
}
