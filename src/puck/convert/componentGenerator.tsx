// Generate Puck component config entries from section names
export function generatePuckComponentConfigs(sectionNames: string[]) {
  const components: Record<string, any> = {}
  for (const name of sectionNames) {
    components[`${name}Section`] = {
      label: `${name} Section`,
      fields: {
        title: { type: 'text' },
        content: { type: 'slot' },
      },
      // Render stub; consumers should override visually
      render: ({ title, content: Content }: any) => (
        <section>
          <h2>{title}</h2>
          <Content />
        </section>
      ),
    }
  }
  return { components }
}
