<template>
  <select :select="modelValue" @change="changeOption">
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option?.disabled"
      :selected="modelValue === option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style scoped>
  select {
    padding: .45rem;
    margin: 0 .5rem;

    border: 1px solid teal;
  }
</style>