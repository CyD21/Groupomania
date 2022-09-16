<script>
export default {
  name: "MODAL",
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
<template>
  <div class="myModal" v-show="open">
    <div class="container mx-auto col-11 col-xl-6">
      <div class="container bg-white p-3 rounded mt-5 scale-up-center">
        <div class="container d-flex justify-content-end pb-2 fw-bold">
          <button
            type="button"
            class="btn-close fw-bold"
            @click="$emit('close')"
            aria-label="Fermer"
          ></button>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>
<style></style>
