import React, { useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray, FormProvider } from 'react-hook-form'
import { ZodTypeAny, ZodObject, ZodArray, ZodString, ZodNumber, ZodBoolean, ZodEnum, ZodOptional, ZodDefault, ZodEffects } from 'zod'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Trash2 } from 'lucide-react'
import { registry } from '@/cms/content/registry'
import { usePageContent } from '@/cms/usePageContent'

function unwrap(type: ZodTypeAny): ZodTypeAny {
  // unwrap optional/default/effects
  // @ts-ignore internal _def
  while (type instanceof ZodOptional || type instanceof ZodDefault || type instanceof ZodEffects) {
    // @ts-ignore
    type = type._def.innerType || type._def.schema || type._def.effect?.schema || type
  }
  return type
}

function labelize(key: string) {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_.-]+/g, ' ')
    .replace(/^\w/, c => c.toUpperCase())
}

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './editor.css'

function HtmlEditor({ value, onChange, placeholder }: { value: string; onChange: (html: string) => void; placeholder?: string }) {
  const modules = {
    toolbar: [
      [{ header: [2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'clean']
    ]
  }
  const [mode, setMode] = React.useState<'design' | 'html'>('design')
  return (
    <div className="border rounded overflow-hidden editor-prose">
      <div className="flex items-center gap-2 border-b bg-gray-50 px-2 py-1">
        <div className="text-xs text-gray-600">Mode:</div>
        <div className="flex gap-1">
          <button type="button" onClick={() => setMode('design')} className={`px-2 py-1 text-xs border rounded ${mode==='design' ? 'bg-white shadow' : ''}`}>Design</button>
        
          <button type="button" onClick={() => setMode('html')} className={`px-2 py-1 text-xs border rounded ${mode==='html' ? 'bg-white shadow' : ''}`}>HTML</button>
        </div>
      </div>
      {mode === 'design' ? (
        <ReactQuill theme="snow" value={value} onChange={onChange} placeholder={placeholder} modules={modules} />
      ) : (
        <textarea
          className="w-full min-h-[200px] p-3 outline-none font-mono text-sm"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          spellCheck={false}
        />
      )}
    </div>
  )
}

function FieldRenderer({ schema, namePrefix, methods }: { schema: ZodTypeAny, namePrefix: string, methods: ReturnType<typeof useForm> }) {
  const t = unwrap(schema)

  if (t instanceof ZodObject) {
    const shape = (t as ZodObject<any>).shape
    // Special handling: For homepage sections object, render each section in an accordion
    if (namePrefix === 'sections') {
      const entries = Object.entries(shape)
      return (
        <Accordion type="single" collapsible className="w-full">
          {entries.map(([key, child]) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger>
                <span className="text-sm font-medium">{labelize(key)}</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-2 border rounded-md bg-white space-y-2">
                  <FieldRenderer
                    schema={child as ZodTypeAny}
                    namePrefix={`${namePrefix ? namePrefix + '.' : ''}${key}`}
                    methods={methods}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )
    }

    return (
      <div className="space-y-4">
        {Object.entries(shape).map(([key, child]) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{labelize(key)}</label>
            <FieldRenderer
              schema={child as ZodTypeAny}
              namePrefix={`${namePrefix ? namePrefix + '.' : ''}${key}`}
              methods={methods}
            />
          </div>
        ))}
      </div>
    )
  }

  if (t instanceof ZodArray) {
    const el = (t as ZodArray<any>).element
    const arr = useFieldArray({ control: methods.control, name: namePrefix as any })
    // Use accordion for array of objects. For arrays of primitives, keep simple list.
    const childIsObject = unwrap(el) instanceof ZodObject
    if (!childIsObject) {
      return (
        <div className="space-y-3">
          <div className="text-right">
            <button type="button" className="px-3 py-1.5 border rounded bg-white hover:bg-gray-50" onClick={() => arr.append({} as any)}>Add item</button>
          </div>
          {arr.fields.map((f, idx) => (
            <div key={f.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-gray-600">Item {idx + 1}</div>
                <button type="button" className="text-red-600 text-sm" onClick={() => arr.remove(idx)}>Remove</button>
              </div>
              <FieldRenderer
                schema={el}
                namePrefix={`${namePrefix ? namePrefix + '.' : ''}${idx}`}
                methods={methods}
              />
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-600">Items ({arr.fields.length})</div>
          <button type="button" className="px-3 py-1.5 border rounded bg-white hover:bg-gray-50" onClick={() => arr.append({} as any)}>Add item</button>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {arr.fields.map((f, idx) => (
            <AccordionItem key={f.id} value={`item-${idx}`}>
              <AccordionTrigger>
                <div className="flex items-center justify-between w-full pr-8">
                  <span className="text-sm">Item {idx + 1}</span>
                  <button
                    type="button"
                    className="ml-6 inline-flex items-center gap-1 text-red-600 hover:text-red-700"
                    onClick={(e) => { e.preventDefault(); arr.remove(idx) }}
                    aria-label={`Remove item ${idx + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-2 border rounded-md bg-white">
                  <FieldRenderer
                    schema={el}
                    namePrefix={`${namePrefix ? namePrefix + '.' : ''}${idx}`}
                    methods={methods}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )
  }

  if (t instanceof ZodString) {
    const isLong = /description|excerpt|content|html|body|contentHtml/i.test(namePrefix)
    const registerName = namePrefix as any
    if (isLong) {
      const current = methods.watch(registerName) as string
      if (methods.getFieldState(registerName).isDirty === undefined) {
        methods.register(registerName)
      }
      return (
        <HtmlEditor
          value={current || ''}
          onChange={(html) => methods.setValue(registerName, html, { shouldDirty: true, shouldTouch: true })}
          placeholder="Enter content..."
        />
      )
    }
    return (
      <input className="border px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-300" {...methods.register(registerName)} />
    )
  }

  if (t instanceof ZodNumber) {
    return <input type="number" className="border px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-300" {...methods.register(namePrefix as any, { valueAsNumber: true })} />
  }

  if (t instanceof ZodBoolean) {
    return (
      <label className="inline-flex items-center gap-2">
        <input type="checkbox" className="h-4 w-4" {...methods.register(namePrefix as any)} />
        <span className="text-sm text-gray-700">Enabled</span>
      </label>
    )
  }

  if (t instanceof ZodEnum) {
    const opts = (t as ZodEnum<any>).options
    return (
      <select className="border px-3 py-2 w-full rounded bg-white focus:outline-none focus:ring-2 focus:ring-gray-300" {...methods.register(namePrefix as any)}>
        {opts.map((o: string) => <option key={o} value={o}>{o}</option>)}
      </select>
    )
  }

  // Heuristic for image objects { src, alt }
  if (t instanceof ZodObject) {
    const shape = (t as ZodObject<any>).shape
    if ('src' in shape) {
      const srcName = `${namePrefix}src`
      const altName = `${namePrefix}alt`
      const srcVal = methods.watch(srcName as any)
      return (
        <div className="grid grid-cols-3 gap-3 items-start">
          <div className="col-span-2 space-y-2">
            <input className="border px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-300" placeholder="Image URL" {...methods.register(srcName as any)} />
            <input className="border px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-300" placeholder="Alt" {...methods.register(altName as any)} />
          </div>
          <div className="border rounded overflow-hidden bg-gray-50 aspect-[4/3] flex items-center justify-center">
            {srcVal ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={srcVal} alt={methods.getValues(altName as any)} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-gray-400">Preview</span>
            )}
          </div>
        </div>
      )
    }
  }

  // Fallback: JSON string
  return <input className="border px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-300" {...methods.register(namePrefix as any)} />
}

export default function ContentEditor() {
  const { slug = 'homepage' } = useParams()
  const navigate = useNavigate()
  const entry = (registry as any)[slug]
  const schema = entry?.schema
  const defaults = entry?.defaults
  const { data, save, exists } = usePageContent(slug, defaults)

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: useMemo(() => data, [data])
  })

  useEffect(() => { methods.reset(data) }, [data])

  async function onSubmit(values: any) { await save(values) }

  if (!entry) return <div className="p-8">Unknown page: {slug}</div>

  return (
    <FormProvider {...methods}>
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6 gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (window.history.length > 1) navigate(-1)
                else navigate('/admin')
              }}
              className="px-3 py-1.5 border rounded hover:bg-gray-50"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-2xl font-semibold">Edit: {entry.title}</h1>
              <div className="text-xs text-gray-500">{exists ? 'Existing content' : 'New content (will be created)'}</div>
            </div>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded" onClick={methods.handleSubmit(onSubmit)}>
            {exists ? 'Update' : 'Create'}
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <FieldRenderer schema={schema} namePrefix="" methods={methods} />
          </div>
        </div>
        <div className="fixed bottom-4 right-4">
          <button className="px-4 py-2 bg-black text-white rounded shadow" onClick={methods.handleSubmit(onSubmit)}>
            {exists ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </FormProvider>
  )
}


