import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWorkshopStore = defineStore('workshop', () => {
  // State
  const currentTemplate = ref<WorkshopTemplate | null>(null)
  const selectedControlId = ref<string | null>(null)

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
  function findControlById(controls: { [key: string]: WorkshopControl }, targetId: string): WorkshopControl | null {
    for (const control of Object.values(controls)) {
      if (control.id === targetId) return control
      // Search in children recursively
      const found = findControlById(control.children, targetId)
      if (found) return found
    }
    return null
  }

  // Convert WorkshopControl to vue-grid-layout item format
  const gridLayoutItems = computed(() => {
    if (!currentTemplate.value) return []
    
    return Object.values(currentTemplate.value.controls).map(control => ({
      i: control.id,
      x: control.x,
      y: control.y,
      w: control.w,
      h: control.h,
      static: false,
      // Attach original control data
      _control: control
    }))
  })

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

  function updateControlProperty(controlId: string, property: string, value: any) {
    const control = findControlById(currentTemplate.value?.controls || {}, controlId)
    if (control) {
      ;(control as any)[property] = value
      // Update template timestamp
      if (currentTemplate.value) {
        currentTemplate.value.updatedAt = new Date().toISOString()
      }
    }
  }

  function updateControlPosition(controlId: string, x: number, y: number, w: number, h: number) {
    const control = findControlById(currentTemplate.value?.controls || {}, controlId)
    if (control) {
      control.x = x
      control.y = y
      control.w = w
      control.h = h
      // Update template timestamp
      if (currentTemplate.value) {
        currentTemplate.value.updatedAt = new Date().toISOString()
      }
    }
  }

  return {
    // State
    currentTemplate,
    selectedControlId,

    // Getters
    selectedControl,
    selectedControlData,
    hasSelectedControl,
    gridLayoutItems,

    // Actions
    setTemplate,
    selectControl,
    clearSelectedControl,
    addControl,
    updateControlProperty,
    updateControlPosition,
  }
})
