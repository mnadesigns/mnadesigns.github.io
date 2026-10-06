@AGENTS.md

---

## Hard design rules

- **No outline on filled text.** Outlined (stroke-only) text is allowed, but the moment a letter is filled (on hover, after the intro animation, when a count finishes) its text-stroke must be set to 0, so filled text looks identical everywhere. Always pair `color: <fill>` with `-webkit-text-stroke: 0` in the filled state.
