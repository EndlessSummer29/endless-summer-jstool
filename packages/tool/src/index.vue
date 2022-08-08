<template>
    <div>
        这是demo-component.vue{{ msg }}
    </div>
</template>
<script>
export default {
  name: 'demoComponent',
  props: {
    msg: {
      type: String,
      required: true
    }
  }
}
</script>