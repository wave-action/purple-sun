import { CoreComponent } from "./coreCompoent";

export abstract class StyledComponent extends CoreComponent {
  constructor(style: string) {
    super();

    const styleBody = document.createElement("style");
    // @ts-ignore
    styleBody.innerHTML = style;

    this.shadow.appendChild(styleBody);
  }
}
