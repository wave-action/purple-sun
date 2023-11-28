import { FocusArea } from "./focusArea";
import { Dialog } from "./dialog";
import { Toast } from "./toast";
import { Sheet } from "./sheet";

export function define() {
  customElements.define("ps-focus-area", FocusArea);
  customElements.define("ps-dialog", Dialog);
  customElements.define("ps-toast", Toast);
  customElements.define("ps-sheet", Sheet);
}
