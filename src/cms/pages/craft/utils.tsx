import React from 'react'
import { useNode } from '@craftjs/core'
import { Button as ShButton } from '../../../components/ui/button'
import { Input as ShInput } from '../../../components/ui/input'
import { Textarea as ShTextarea } from '../../../components/ui/textarea'
import { Card as ShCard, CardContent as ShCardContent } from '../../../components/ui/card'
import { Badge as ShBadge } from '../../../components/ui/badge'
import { Separator as ShSeparator } from '../../../components/ui/separator'
import { Checkbox as ShCheckbox } from '../../../components/ui/checkbox'
import { Switch as ShSwitch } from '../../../components/ui/switch'
import { Slider as ShSlider } from '../../../components/ui/slider'
import { Select as ShSelect, SelectTrigger as ShSelectTrigger, SelectContent as ShSelectContent, SelectItem as ShSelectItem, SelectValue as ShSelectValue } from '../../../components/ui/select'

export const HTML_SKIP_KEYS = new Set([
  'className', 'style', 'children', 'id', 'role', 'tabIndex', 'title', 'dir', 'lang', 'draggable', 'hidden', 'slot'
])

export const isHtmlPropName = (k: string) => HTML_SKIP_KEYS.has(k) || /^data-/.test(k) || /^aria-/.test(k) || /^on[A-Z]/.test(k)

export function safeStringify(val: any) {
  try { return JSON.stringify(val, null, 2) } catch { return '' }
}

export function setDisplayName(comp: any, name: string) {
  comp.craft = { ...(comp.craft || {}), displayName: name }
}

// Primitive/utility Craft components used in resolver and toolbox
export function Container({ children }: { children?: React.ReactNode }) {
  const { connectors: { connect, drag } } = useNode()
  return (
    <div ref={(ref) => ref && connect(drag(ref))} className="p-4 border rounded bg-white">
      {children}
    </div>
  )
}
(Container as any).craft = { rules: { canMoveIn: () => true }, displayName: 'Container' }

export function Text({ text }: { text: string }) {
  const { connectors: { connect, drag }, actions: { setProp } } = useNode()
  return (
    <p
      ref={(ref) => ref && connect(drag(ref))}
      className="text-gray-800"
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => setProp((props: any) => { props.text = (e.currentTarget as HTMLElement).innerText })}
    >
      {text}
    </p>
  )
}
(Text as any).craft = { props: { text: 'Hello world' }, displayName: 'Text' }

export function Button({ label }: { label: string }) {
  const { connectors: { connect, drag }, actions: { setProp } } = useNode()
  return (
    <button
      ref={(ref) => ref && connect(drag(ref))}
      className="px-4 py-2 bg-black text-white rounded"
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => setProp((props: any) => { props.label = (e.currentTarget as HTMLElement).innerText })}
    >
      {label}
    </button>
  )
}
(Button as any).craft = { props: { label: 'Click me' }, displayName: 'Button' }

export function UIButton({ label }: { label: string }) {
  const { connectors: { connect, drag } } = useNode()
  return (
    <div ref={(ref) => ref && connect(drag(ref))}>
      <ShButton>{label}</ShButton>
    </div>
  )
}
(UIButton as any).craft = { props: { label: 'Button' }, displayName: 'UIButton' }

export function UIInput({ placeholder }: { placeholder?: string }) {
  const { connectors: { connect, drag } } = useNode()
  return (
    <div ref={(ref) => ref && connect(drag(ref))}>
      <ShInput placeholder={placeholder} />
    </div>
  )
}
(UIInput as any).craft = { props: { placeholder: 'Placeholder' }, displayName: 'UIInput' }

export function UITextarea({ placeholder, rows = 3 }: { placeholder?: string; rows?: number }) {
  const { connectors: { connect, drag } } = useNode()
  return (
    <div ref={(ref) => ref && connect(drag(ref))}>
      <ShTextarea placeholder={placeholder} rows={rows} />
    </div>
  )
}
(UITextarea as any).craft = { props: { placeholder: 'Write here', rows: 3 }, displayName: 'UITextarea' }

export function UICard({ children }: { children?: React.ReactNode }) {
  const { connectors: { connect, drag } } = useNode()
  return (
    <div ref={(ref) => ref && connect(drag(ref))}>
      <ShCard>
        <ShCardContent className="p-4">{children}</ShCardContent>
      </ShCard>
    </div>
  )
}
(UICard as any).craft = { rules: { canMoveIn: () => true }, displayName: 'UICard' }

export function UIBadge({ label = 'Badge', variant = 'default' }: { label?: string; variant?: string }) {
  const { connectors: { connect, drag } } = useNode()
  return (
    <div ref={(ref) => ref && connect(drag(ref))}>
      <ShBadge variant={variant as any}>{label}</ShBadge>
    </div>
  )
}
(UIBadge as any).craft = { props: { label: 'Badge', variant: 'default' }, displayName: 'UIBadge' }

export function UISeparator({ orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' }) {
  const { connectors: { connect, drag } } = useNode()
  return <div ref={(ref) => ref && connect(drag(ref as any))}><ShSeparator orientation={orientation} /></div>
}
(UISeparator as any).craft = { props: { orientation: 'horizontal' }, displayName: 'UISeparator' }

export function UICheckbox({ checked = false, label = 'Checkbox' }: { checked?: boolean; label?: string }) {
  const { connectors: { connect, drag }, actions: { setProp } } = useNode()
  return (
    <label ref={(ref) => ref && connect(drag(ref))} className="flex items-center gap-2">
      <ShCheckbox checked={checked} onCheckedChange={(v) => setProp((p: any) => { p.checked = Boolean(v) })} />
      <span>{label}</span>
    </label>
  )
}
(UICheckbox as any).craft = { props: { checked: false, label: 'Checkbox' }, displayName: 'UICheckbox' }

export function UISwitch({ checked = false, label = 'Switch' }: { checked?: boolean; label?: string }) {
  const { connectors: { connect, drag }, actions: { setProp } } = useNode()
  return (
    <label ref={(ref) => ref && connect(drag(ref))} className="flex items-center gap-2">
      <ShSwitch checked={checked} onCheckedChange={(v) => setProp((p: any) => { p.checked = Boolean(v) })} />
      <span>{label}</span>
    </label>
  )
}
(UISwitch as any).craft = { props: { checked: false, label: 'Switch' }, displayName: 'UISwitch' }

export function UISlider({ min = 0, max = 100, defaultValue = [50] }: { min?: number; max?: number; defaultValue?: number[] }) {
  const { connectors: { connect, drag }, actions: { setProp } } = useNode()
  return (
    <div ref={(ref) => ref && connect(drag(ref))} className="px-2">
      <ShSlider min={min} max={max} defaultValue={defaultValue}
        onValueChange={(v) => setProp((p: any) => { p.defaultValue = v as any })} />
    </div>
  )
}
(UISlider as any).craft = { props: { min: 0, max: 100, defaultValue: [50] }, displayName: 'UISlider' }

export function UISelect({ options = ['One','Two','Three'], value, placeholder = 'Select...' }: { options?: string[]; value?: string; placeholder?: string }) {
  const { connectors: { connect, drag }, actions: { setProp } } = useNode()
  return (
    <div ref={(ref) => ref && connect(drag(ref))}>
      <ShSelect value={value} onValueChange={(v) => setProp((p: any) => { p.value = v })}>
        <ShSelectTrigger><ShSelectValue placeholder={placeholder} /></ShSelectTrigger>
        <ShSelectContent>
          {options.map((o) => <ShSelectItem key={o} value={o}>{o}</ShSelectItem>)}
        </ShSelectContent>
      </ShSelect>
    </div>
  )
}
(UISelect as any).craft = { props: { options: ['One','Two','Three'], placeholder: 'Select...' }, displayName: 'UISelect' }


