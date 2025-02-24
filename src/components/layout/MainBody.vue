<template>
  <div class="container p-mt-3">
    <div class="p-d-flex p-flex-wrap p-jc-center">
      <div class="p-d-flex p-flex-wrap p-jc-center" v-if="loading">
        <div v-for="i in 6" :key="i" class="custom-skeleton p-mr-2">
          <Skeleton width="25rem" height="250px"></Skeleton>
          <div v-for="i in 2" :key="i" class="p-d-flex p-mb-3 p-mt-3">
            <div>
              <Skeleton width="10rem" class="p-mb-2"></Skeleton>
              <Skeleton width="5rem" class="p-mb-2"></Skeleton>
              <Skeleton height=".5rem"></Skeleton>
            </div>
          </div>
          <div class="p-d-flex p-jc-between p-mt-3">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
          </div>
          <Skeleton class="p-mt-3" width="100%" height="2rem"></Skeleton>
        </div>
      </div>

      <div class="p-d-flex p-flex-wrap p-jc-center" v-if="!loading">
        <div class="p-mr-2 p-mb-2" v-for="coffee of coffees" :key="coffee.id">
          <Card class="back-dark" style="width: 25em">
            <template #header>
              <img alt="coffee image" :src="coffee.img" />
            </template>
            <template #title>{{ coffee.name }}</template>
            <template subtitle>{{ coffee.name }}</template>
            <template #content>
              <p>{{ coffee.description }}</p>
              <p class="p-text-bold">Price: €{{ coffee.price }}</p>
              <p>In stock: {{ coffee.stock }}</p>
            </template>
            <template #footer>
              <div class="p-d-flex p-jc-center p-flex-column">
                <InputNumber
                  v-model="coffee.amountSelected"
                  showButtons
                  :max="coffee.stock"
                  :min="1"
                  inputClass="p-text-center"
                  buttonLayout="horizontal"
                  decrementButtonClass="p-button-danger"
                  incrementButtonClass="p-button-success"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                />
                <Button
                  class="p-button-sm p-mt-3"
                  @click="addToCard(coffee)"
                  icon="pi pi-check"
                  label="Add to shopping card"
                />
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import Card from "primevue/card";
import InputNumber from "primevue/inputnumber";
import Skeleton from "primevue/skeleton";
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { coffee } from "@/interfaces";

export default defineComponent({
  components: { Card, InputNumber, Skeleton },
  setup() {
    const toast = useToast();
    const store = useStore();

    const amount = ref(0);
    const loading = ref(true);

    onMounted(async () => {
      await store.dispatch("getProducts");
      setTimeout(() => {
        loading.value = false;
      }, 500);
    });

    const addToCard = (coffee: coffee) => {
      store.commit("addToCart", coffee);
      toast.add({
        severity: "success",
        summary: "Product added",
        detail: "The product has been added to the shopping cart",
        life: 3000,
      });
    };

    return {
      addToCard,
      coffees: computed(() => store.state.coffees),
      amount,
      loading,
    };
  },
});
</script>

<style>
</style>