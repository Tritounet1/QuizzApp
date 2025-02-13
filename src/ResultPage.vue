<script setup lang="ts">
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const router = useRouter();

const route = useRoute();
const game = route.query.game ? JSON.parse(route.query.game) : [];
const score = route.query.score;
const numberQuestions = game.length;

const restart = () => {
  router.push({path: "/",});
}

</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <!-- Card -->
    <div class="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
      <!-- App Title -->
      <h1 class="text-3xl font-bold text-center text-blue-600 mb-4">Result</h1>
      <!-- Score -->
      <p class="font-bold text-center  mb-4"> {{ score }} / {{ numberQuestions }} </p>
      <!-- Responses Section -->
      <div class="flex flex-col gap-8 pt-4">
        <div v-for="(question, index) in game" :key="index">
          <h2 class="text-lg font-medium text-center text-gray-800 mb-4">
            {{ question.questionDetails.question }}
          </h2>
          <!-- Answers Section -->
          <div class="space-y-2">
            <div v-for="(answer, index) in question.questionDetails.answers" :key="index">
              <div v-if="answer === question.questionDetails.response">
                <div
                    class="border p-3 rounded-lg text-gray-800 bg-emerald-600"
                >
                  {{ answer }}
                </div>
              </div>
              <div v-else-if="answer === question.playerResponse && question.playerResponse !== question.questionDetails.response">
                <div
                    class="border p-3 rounded-lg text-gray-800 bg-red-600"
                >
                  {{ answer }}
                </div>
              </div>
              <div v-else>
                <div
                    class="border p-3 rounded-lg text-gray-800"
                >
                  {{ answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Restart Button !-->
        <button
            class="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition duration-300 ease-in-out shadow-md"
            @click="restart()"
        >
          Recommencer
        </button>
      </div>
    </div>
  </div>
</template>