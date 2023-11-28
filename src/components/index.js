import { defineFocusArea } from "./focusArea";
import { defineDialog } from "./dialog";
import { defineToast } from "./toast";

export function define() {
  defineFocusArea();
  defineDialog();
  defineToast();
}
