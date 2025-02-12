<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <!-- Card -->
    <div class="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
      <!-- App Title -->
      <h1 class="text-3xl font-bold text-center text-blue-600 mb-4">Quiz</h1>
      <!-- Question -->
      <p class="text-gray-600 text-center mb-6">
        Question {{ gameIndex + 1 }} / {{ game.length }}
      </p>
      <!-- Question Section -->
      <div>
        <h2 class="text-lg font-medium text-center text-gray-800 mb-4">
          {{ game[gameIndex].question }}
        </h2>
        <!-- Answers Section -->
        <div class="space-y-2">
          <div
              v-for="(answer, index) in game[gameIndex].answers"
              @click="verifyResponse(answer)"
              :key="index"
              class="border p-3 rounded-lg text-gray-800 cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition"
          >
            {{ answer }}
          </div>
        </div>
      </div>
    </div>
    <Toast> </Toast>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const show = () => {
  toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
};

let score = 0;
let responses = ref([]);
let gameIndex = ref(0);
const game = ref([
  {
    question: "1 + 2",
    answers: ["6", "3", "4", "2"],
    response: "3",
  },
  {
    question: "7 + 8",
    answers: ["13", "14", "12", "15"],
    response: "15",
  },
  {
    question: "7 + 8",
    answers: ["13", "14", "12", "15"],
    response: "15",
  },
]);

const verifyResponse = (selectedResponse) => {
  if(game.value.length - 1 === gameIndex.value) {
    return;
  }
  if(game.value[gameIndex.value].response === selectedResponse) {
    show();
    score++;
  }
  else {
    show();
  }
  responses.value[gameIndex.value] = {
    playerResponse: selectedResponse,
    goodResponse: selectedResponse === game.value[gameIndex.value].response,
    questionDetails: game.value[gameIndex.value],
  };
  gameIndex.value++;
}

</script>