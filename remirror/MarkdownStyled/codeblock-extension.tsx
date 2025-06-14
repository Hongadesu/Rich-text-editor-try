import { CodeBlockExtension } from "remirror/extensions";
import { CommandFunction } from "remirror";

export class CustomCodeBlockExtension extends CodeBlockExtension {
  createCommands() {
    const baseCommands =
      typeof super.createCommands === "function" ? super.createCommands() : {};

    return {
      ...baseCommands,

      setCodeBlockLanguage:
        (language: string): CommandFunction =>
        ({ tr, dispatch, state }) => {
          const { selection } = state;
          const { $from } = selection;

          const node = $from.node($from.depth);

          if (node.type.name !== this.name) return false;

          const pos = $from.before($from.depth);
          if (dispatch) {
            dispatch(
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                language,
              })
            );
          }

          return true;
        },
    };
  }
}
