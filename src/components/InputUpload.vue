<!-- <template>
  <input type="file" @change="handleUpload" accept=".csv" />
  <p v-if="errorMessage" class="text">{{ errorMessage }}</p>
</template>

<script setup>
  import { useStore } from "vuex";
  import { computed, ref } from "vue";
  import Papa from "papaparse";

  const store = useStore();
  const experiments = computed(() => store.state.experiments);
  const errorMessage = ref("");

  function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "text/csv") {
      errorMessage.value = "Будь ласка, оберіть CSV файл";
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        store.commit("setExperiments", results.data);
        console.log(results.data);
        console.log("📦 Вміст Vuex-стейту:", experiments.value);
      },
    });
  }
</script>

<style lang="scss" scoped>
  .text {
    color: red;
  }
</style> -->

<template>
  <div class="upload-wrapper">
    <FileUpload
      mode="basic"
      name="file"
      accept=".csv"
      :auto="true"
      customUpload
      @select="handleUpload"
      :disabled="uploading"
      :chooseLabel="uploading ? 'Uploading...' : 'Upload CSV'"
      class="custom-upload"
    />
  </div>
</template>

<script setup>
  import { useStore } from "vuex";
  import { computed, ref } from "vue";
  import Papa from "papaparse";
  import FileUpload from "primevue/fileupload";

  const uploading = ref(false);
  const store = useStore();
  const experiments = computed(() => store.state.experiments);

  function handleUpload(event) {
    const file = event.files[0];
    if (!file) return;
    uploading.value = true;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setTimeout(() => {
          uploading.value = false;
        }, 1000);
        store.commit("setExperiments", results.data);
        console.log("📄 Parsed CSV:", results.data);
        console.log("📦 Vuex state:", experiments.value);
      },
      error: (err) => {
        console.error("❌ Parsing error:", err);
      },
    });
  }
</script>

<style scoped lang="scss">
  .upload-wrapper {
    display: flex;
    justify-content: center;

    ::v-deep(.p-button-icon) {
      margin-right: 8px;
      vertical-align: middle;
    }
    ::v-deep(.p-button) {
      background-color: #ff8000 !important;
      color: white !important;
      border-radius: 8px;
      padding: 0.6rem 1.2rem;
      transition: background-color 0.3s ease;
      border: none !important;

      &:hover {
        background-color: #e67300 !important;
      }
    }
  }
</style>
