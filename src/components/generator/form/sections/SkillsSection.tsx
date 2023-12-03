import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'

import { LabeledInput } from '../../../core/LabeledInput'
import { AddButton } from '../../../core/Button'
import { Divider } from '../../../core/Divider'
import { FormSection } from './FormSection'
import Keywords from '../Keywords'

export function SkillsSection() {
  const { fields, append } = useFieldArray({ name: 'skills' })

  return (
    <FormSection title="Your Skills">
      <LabeledInput
        name="headings.skills"
        label="Section Heading"
        placeholder="Skills"
      />
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <Divider />
          <LabeledInput
            name={`skills.${index}.name`}
            label="Skill name"
            placeholder="Programming Languages"
          />
          <Keywords
            label="Skill Details"
            placeholder="TypeScript"
            name={`skills.${index}.keywords`}
          />
        </Fragment>
      ))}
      <AddButton type="button" onClick={() => append({})}>
        + Add Skill
      </AddButton>
    </FormSection>
  )
}
