### Craft.js Page Editor

Self-hosted, code-first page editor built on Craft.js. It lets you drag-and-drop existing React components, edit their props (with Tailwind CSS intact), and manage page structure via an outline panel.

### What’s included

- `src/cms/pages/CraftEditor.tsx`: Thin wrapper that renders the split editor.
- `src/cms/pages/craft/Editor.tsx`: Main editor shell with resolver and 3-column layout.
- `src/cms/pages/craft/Toolbox.tsx`: Draggable toolbox, grouped by category.
- `src/cms/pages/craft/OutlinePanel.tsx`: Outline tree for selection/reorder/delete.
- `src/cms/pages/craft/SettingsPanel.tsx`: Prop editor (filters HTML props; JSON fallback for complex types).
- `src/cms/pages/craft/utils.tsx`: Shared helpers and primitive Craft components:
  - `Container`, `Text`, `Button` and shadcn wrappers: `UIButton`, `UIInput`, `UITextarea`, `UICard`, `UIBadge`, `UISeparator`, `UICheckbox`, `UISwitch`, `UISlider`, `UISelect`
  - Helpers: `setDisplayName`, `isHtmlPropName`, `safeStringify`

### Run it

1) Start the dev server (usual project command).
2) Open the editor at `/craft`.

### How it works

- The editor uses Craft’s `resolver` to map component names to React components (see `src/cms/pages/craft/Editor.tsx`). All site and section components are registered so they can be dragged in.
- The canvas root is a `Container` node. You can nest content inside `Container` and `UICard` (both allow children).
- Toolbox groups:
  - Layout: `Container`, `UICard`
  - UI: shadcn wrappers (buttons, inputs, etc.) and a `Text` primitive (inline editable)
  - Site: `Navigation`, `Footer`, `WhatsApp*`
  - Sections: `HeroSection`, `TrialsSection`, etc. (wired with `homepageDefaults` for starter props)
  - Cards & Misc: e.g., `EventCard`, `TikTokIcon`
- Outline panel shows top-level nodes; supports select, reorder (↑/↓), and delete.
- Settings panel:
  - Edits React props only (filters HTML props like `className`, `style`, `children`, `onClick`, `data-*`, `aria-*`).
  - Has a generic editor that picks input types by value (boolean/number/string/array-of-strings/JSON fallback).
  - Inline editing works for `Text` and `Button` label directly on canvas.

Note: Delete is disabled for nodes whose parent is `ROOT` to avoid breaking the canvas. You can change that behavior in `SettingsPanel.tsx` if you want to allow deleting top-level nodes.

### Adding a new component

1) Register it in the `resolver` and set a readable display name so it appears nicely in the outline:

```ts
// src/cms/pages/craft/Editor.tsx
import MySection from '@/components/sections/MySection'
import { setDisplayName } from './utils.tsx'

setDisplayName(MySection, 'MySection')

<CraftEditorCore resolver={{
  // ...existing
  MySection,
}}>
```

2) Expose it in the toolbox so users can drag it in:

```tsx
// src/cms/pages/craft/Toolbox.tsx (inside a group)
{ name: 'MySection', node: <MySection /* starter props */ /> }
```

3) (Optional) Add tailored prop controls in the settings panel:

```ts
// src/cms/pages/craft/SettingsPanel.tsx
// Extend componentSchemas e.g. componentSchemas['MySection'] = { title: { type: 'string' }, items: { type: 'json' } }
```

If no schema is added, the generic editor will render appropriate inputs automatically, with JSON fallback for complex props.

### Editing props behavior

- The right panel targets the nearest component in the hierarchy that actually owns meaningful props.
- The editor ignores HTML/DOM props (e.g., `className`, `style`, `children`, `id`, `onClick`, `data-*`, `aria-*`).
- For complex props (objects/arrays), you can edit JSON directly. Invalid JSON is ignored while typing.

### Inline edit primitives

- `Text`: `contentEditable` paragraph; updates `text` prop on input.
- `Button`: `contentEditable` label; updates `label` prop on input.

### Tailwind CSS

All components retain Tailwind classes. The editor canvases and panels are styled with Tailwind for a clean authoring experience.

### Persistence (optional, not included)

Currently the editor state is ephemeral. To persist/load pages, you can use Craft’s serialize/deserialize APIs and store data in localStorage or Supabase.

Example sketch:

```tsx
// Save
const json = editor.query.serialize()
await supabase.from('pages').upsert({ slug, client_id, data: json })

// Load
const { data } = await supabase.from('pages').select('data').eq('slug', slug).eq('client_id', clientId).maybeSingle()
if (data?.data) editor.actions.deserialize(data.data)
```

Integrate this into `Editor.tsx` or a wrapper page component as needed.

### File map

- `src/cms/pages/CraftEditor.tsx` → wrapper
- `src/cms/pages/craft/Editor.tsx` → main editor + resolver
- `src/cms/pages/craft/Toolbox.tsx` → drag sources
- `src/cms/pages/craft/OutlinePanel.tsx` → selection/reorder/delete
- `src/cms/pages/craft/SettingsPanel.tsx` → prop editor (generic + schema)
- `src/cms/pages/craft/utils.tsx` → primitives + helpers

### Common tweaks

- Change sidebar placement or sticky behavior: adjust grid/utility classes in `Editor.tsx`.
- Add more shadcn UI wrappers: follow the pattern in `utils.tsx`.
- Show friendlier inputs for a component’s props: extend `componentSchemas` in `SettingsPanel.tsx`.

### Known limitations / next steps

- No built-in persistence (see Persistence section for an approach).
- Delete disabled for top-level nodes (parent `ROOT`) by default.
- Sections are added with starter props; you may want to wire richer defaults or loaders.


