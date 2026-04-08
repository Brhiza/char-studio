<script setup>
const props = defineProps({
  step: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    default: ""
  },
  footerVisible: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <section class="step-card" :class="{ 'step-card-with-footer': props.footerVisible }">
    <div class="step-head">
      <div class="step-head-main">
        <slot name="header">
          <div class="step-mark">{{ props.step }}</div>
          <div class="step-copy">
            <h2>{{ props.title }}</h2>
            <p v-if="props.desc" class="step-subtitle">{{ props.desc }}</p>
          </div>
        </slot>
      </div>
      <div class="step-head-actions">
        <slot name="actions" />
      </div>
    </div>
    <div class="step-body">
      <slot />
    </div>
    <div v-if="props.footerVisible" class="step-footer">
      <slot name="footer" />
    </div>
  </section>
</template>
