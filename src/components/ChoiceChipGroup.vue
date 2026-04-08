<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: [Array, String],
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  multiple: {
    type: Boolean,
    default: false
  },
  addable: {
    type: Boolean,
    default: false
  },
  customOptions: {
    type: Array,
    default: () => []
  },
  editMode: {
    type: Boolean,
    default: false
  },
  inputPlaceholder: {
    type: String,
    default: "输入新标签"
  }
});

const emit = defineEmits(["update:modelValue", "add-option", "remove-option"]);
const isAdding = ref(false);
const draftOption = ref("");

function toggle(option) {
  if (!props.multiple) {
    emit("update:modelValue", option);
    return;
  }

  const current = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
  const index = current.indexOf(option);
  if (index >= 0) {
    current.splice(index, 1);
  } else {
    current.push(option);
  }
  emit("update:modelValue", current);
}

function isActive(option) {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(option);
  }
  return props.modelValue === option;
}

function isCustomOption(option) {
  return props.customOptions.includes(option);
}

function openAddPanel() {
  isAdding.value = true;
}

function closeAddPanel() {
  isAdding.value = false;
  draftOption.value = "";
}

function submitOption() {
  const normalized = draftOption.value.trim();
  if (!normalized) return;

  emit("add-option", normalized);

  if (props.multiple) {
    const current = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    if (!current.includes(normalized)) {
      current.push(normalized);
    }
    emit("update:modelValue", current);
  } else {
    emit("update:modelValue", normalized);
  }

  closeAddPanel();
}

function removeOption(option) {
  emit("remove-option", option);
}
</script>

<template>
  <div class="chip-group">
    <div class="chip-grid">
      <div
        v-for="option in options"
        :key="option"
        class="chip-item"
        :class="{
          'chip-item-custom': isCustomOption(option),
          'chip-item-editing': props.editMode && isCustomOption(option)
        }"
      >
        <button
          class="chip chip-main"
          :class="{ active: isActive(option) }"
          type="button"
          :aria-pressed="isActive(option)"
          @click="toggle(option)"
        >
          {{ option }}
        </button>

        <button
          v-if="props.editMode && isCustomOption(option)"
          class="chip-delete"
          type="button"
          :aria-label="`删除 ${option}`"
          @click.stop="removeOption(option)"
        >
          ×
        </button>
      </div>

      <button
        v-if="addable && props.editMode && !isAdding"
        class="chip chip-add"
        type="button"
        @click="openAddPanel"
      >
        + 添加
      </button>
    </div>

    <div v-if="addable && props.editMode && isAdding" class="chip-add-panel">
      <input
        v-model.trim="draftOption"
        class="chip-add-input"
        type="text"
        :placeholder="inputPlaceholder"
        @keydown.enter.prevent="submitOption"
        @keydown.esc.prevent="closeAddPanel"
      >
      <button class="primary-btn chip-add-confirm" type="button" @click="submitOption">确认添加</button>
      <button class="secondary-btn chip-add-cancel" type="button" @click="closeAddPanel">取消</button>
    </div>
  </div>
</template>

<style scoped>
.chip-group {
  display: grid;
  gap: 10px;
}

.chip-item {
  display: inline-flex;
  position: relative;
}

.chip-main {
  width: 100%;
}

.chip-item-editing {
  padding-top: 6px;
  padding-right: 6px;
}

.chip-add {
  border-style: dashed;
  background: color-mix(in srgb, var(--surface-muted) 72%, transparent);
  color: var(--muted);
  opacity: 0.86;
}

.chip-delete {
  position: absolute;
  top: -4px;
  right: -4px;
  z-index: 1;
  width: 22px;
  min-width: 22px;
  height: 22px;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: var(--surface);
  color: var(--muted);
  line-height: 1;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.chip-delete:hover {
  color: var(--ink);
}

.chip-add-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 8px;
}

.chip-add-input {
  width: 100%;
  min-height: 42px;
  padding: 10px 14px;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: var(--surface-muted);
}

.chip-add-confirm,
.chip-add-cancel {
  min-height: 42px;
  padding-inline: 14px;
}

@media (max-width: 820px) {
  .chip-add-panel {
    grid-template-columns: 1fr;
  }

  .chip-add-input,
  .chip-add-confirm,
  .chip-add-cancel {
    min-height: 36px;
  }

  .chip-delete {
    top: -3px;
    right: -3px;
    width: 20px;
    min-width: 20px;
    height: 20px;
  }
}
</style>
