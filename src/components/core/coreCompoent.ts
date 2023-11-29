export abstract class CoreComponent extends HTMLElement {
  protected shadow: ShadowRoot;

  constructor() {
    super();

    this.shadow = this.attachShadow({mode: "open"});
  }
}
