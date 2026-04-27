import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWorkshopStore = defineStore('workshop', () => {
  // State
  const currentTemplate = ref<WorkshopTemplate | null>(null)
  const selectedControlId = ref<string | null>(null)
  const previewMode = ref(false)
  const gridVisible = ref(true)

  // Getters
  const selectedControl = computed(() => {
    if (!currentTemplate.value || !selectedControlId.value) return null
    return findControlById(currentTemplate.value.controls, selectedControlId.value)
  })

  const selectedControlData = computed(() => {
    const control = selectedControl.value
    if (!control) return null

    return {
      id: control.id,
      name: control.name,
      componentType: control.componentType,
      x: control.x,
      y: control.y,
      w: control.w,
      h: control.h,
      binding: control.binding,
      style: control.style,
      props: control.props || {},
    }
  })

  const hasSelectedControl = computed(() => selectedControl.value !== null)

  // Helper to find control by ID in nested structure
  function findControlById(
    controls: { [key: string]: WorkshopControl },
    targetId: string
  ): WorkshopControl | null {
    for (const control of Object.values(controls)) {
      if (control.id === targetId) return control
      // Search in children recursively
      const found = findControlById(control.children, targetId)
      if (found) return found
    }
    return null
  }

  // Actions
  function setTemplate(template: WorkshopTemplate) {
    currentTemplate.value = template
    selectedControlId.value = null // Clear selection when changing templates
  }

  function selectControl(controlId: string) {
    selectedControlId.value = controlId
  }

  function clearSelectedControl() {
    selectedControlId.value = null
  }

  function addControl(control: WorkshopControl) {
    if (!currentTemplate.value) return
    currentTemplate.value.controls[control.id] = control
  }

  function updateControlProperty(controlId: string, property: string, value: unknown) {
    const control = findControlById(currentTemplate.value?.controls || {}, controlId)
    if (control) {
      ;(control as any)[property] = value
      _touchTimestamp()
    }
  }

  function updateControlPosition(controlId: string, x: number, y: number, w: number, h: number) {
    const control = findControlById(currentTemplate.value?.controls || {}, controlId)
    if (control) {
      control.x = x
      control.y = y
      control.w = w
      control.h = h
      _touchTimestamp()
    }
  }

  function deleteControl(controlId: string) {
    if (!currentTemplate.value) return
    delete currentTemplate.value.controls[controlId]
    if (selectedControlId.value === controlId) selectedControlId.value = null
    _touchTimestamp()
  }

  function duplicateControl(controlId: string) {
    const source = findControlById(currentTemplate.value?.controls ?? {}, controlId)
    if (!source || !currentTemplate.value) return
    const newId = `ctrl-${crypto.randomUUID()}`
    const duplicate: WorkshopControl = {
      ...(JSON.parse(JSON.stringify(source)) as WorkshopControl),
      id: newId,
      name: `${source.name} (copy)`,
      x: source.x + 1,
      y: source.y + 1,
    }
    currentTemplate.value.controls[newId] = duplicate
    selectedControlId.value = newId
    _touchTimestamp()
  }

  function updateControlStyle(controlId: string, key: string, value: unknown) {
    const control = findControlById(currentTemplate.value?.controls ?? {}, controlId)
    if (control) {
      control.style[key] = value
      _touchTimestamp()
    }
  }

  function updateControlProps(controlId: string, key: string, value: unknown) {
    const control = findControlById(currentTemplate.value?.controls ?? {}, controlId)
    if (control) {
      if (!control.props) control.props = {}
      control.props[key] = value
      _touchTimestamp()
    }
  }

  function updateControlBinding(controlId: string, binding: WorkshopControl['binding']) {
    const control = findControlById(currentTemplate.value?.controls ?? {}, controlId)
    if (control) {
      control.binding = binding
      _touchTimestamp()
    }
  }

  function togglePreview() {
    previewMode.value = !previewMode.value
    if (previewMode.value) selectedControlId.value = null
  }

  function toggleGrid() {
    gridVisible.value = !gridVisible.value
  }

  function _touchTimestamp() {
    if (currentTemplate.value) {
      currentTemplate.value.updatedAt = new Date().toISOString()
    }
  }

  return {
    // State
    currentTemplate,
    selectedControlId,
    previewMode,
    gridVisible,

    // Getters
    selectedControl,
    selectedControlData,
    hasSelectedControl,

    // Actions
    setTemplate,
    selectControl,
    clearSelectedControl,
    addControl,
    deleteControl,
    duplicateControl,
    updateControlProperty,
    updateControlPosition,
    updateControlStyle,
    updateControlProps,
    updateControlBinding,
    togglePreview,
    toggleGrid,
  }
})
