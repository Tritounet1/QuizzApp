<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();

let score = 0, responses = ref([]), gameIndex = ref(0)
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
    question: "10 + 8",
    answers: ["19", "17", "18", "23"],
    response: "18",
  },
]);

const verifyResponse = (selectedResponse) => {
  responses.value[gameIndex.value] = {
    playerResponse: selectedResponse,
    goodResponse: game.value[gameIndex.value].response,
    questionDetails: game.value[gameIndex.value],
  };
  if(game.value[gameIndex.value].response === selectedResponse) {
    toast.add({
      severity: 'success',
      summary: 'Correct!',
      detail: `The answer "${selectedResponse}" is correct.`,
      life: 3000
    });
    score++;
  }
  else {
    toast.add({
      severity: 'error',
      summary: 'Incorrect!',
      detail: `The correct answer was "${game.value[gameIndex.value].response}".`,
      life: 3000
    });
  }
  if (game.value.length - 1 === gameIndex.value) {
    const cleanedResponses = responses.value.map((response) => ({
      playerResponse: response.playerResponse,
      questionDetails: response.questionDetails,
    }));
    router.push({
      path: "/result",
      query: { game: JSON.stringify(cleanedResponses), score: score },
    });
    return;
  }
  gameIndex.value++;
}

</script>

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

<style scoped>

</style>