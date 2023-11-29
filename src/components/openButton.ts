
import { CoreComponent } from "./core/coreCompoent";
import { TriggerComponent } from "./core/triggerComponent";

export class OpenButton extends CoreComponent {
  static observedAttributes: string[] = ["for", "forHtml"];

  constructor() {
    super();

    const slot = document.createElement("slot");
    this.shadow.appendChild(slot);
  }

  get forHtml(): string | null {
    if (this.getAttribute("for")) {
      return this.getAttribute("for");
    }
    return this.getAttribute("forHtml");
  }

  set forHtml(value: string) {
    this.setAttribute("for", value);
  }

  attributeChangedCallback(name: string, _oldValue: any, newValue: any) {
    switch (name) {
    case "for":
    case "forHtml":
      this.handleTargetChange(newValue);
      break;
    }
  }

  private handleTargetChange(value: any) {
    this.addEventListener("click", () => {
      const element = document.getElementById(value) as TriggerComponent;
      element.open = "true";
    });
  }
}
