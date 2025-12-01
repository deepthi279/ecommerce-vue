<template>
  <section class="faq-section">
    <div class="faq-container">
      <!-- left heading -->
      <div class="faq-left">
        <h2>Frequently<br />Asked<br />Questions</h2>
        <div class="faq-question-mark">?</div>
      </div>

      <!-- right list -->
      <div class="faq-right">
        <div class="faq-bar"></div>
        <div class="faq-list">
          <div
            v-for="(item, index) in faqs"
            :key="index"
            class="faq-item"
          >
            <button
              type="button"
              class="faq-question-row"
              @click="toggle(index)"
            >
              <span class="faq-question">{{ item.question }}</span>
              <span class="faq-plus">
                {{ openIndex === index ? '−' : '+' }}
              </span>
            </button>

            <transition name="faq">
              <p
                v-if="openIndex === index"
                class="faq-answer"
              >
                {{ item.answer }}
              </p>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(-1)

/*
  Open your IGP / Google FAQ page in the browser and
  copy questions + answers into this array (replace examples).
*/
const faqs = [
  {
    question: 'Which indoor plants are easy to care for?',
    answer: 'Paste FAQ answer here from your source…',
  },
  {
    question: "I don't have much light at home, which plants are suitable?",
    answer: 'Paste another FAQ answer here…',
  },
  {
    question: 'What fertilizers are good for indoor plants?',
    answer: 'Paste answer here…',
  },
]
function toggle(i) {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>

<style scoped>
.faq-section {
  background: #ffffff;
  padding: 3rem 1rem 3.5rem;
}
.faq-container {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}

/* left side title */
.faq-left {
  min-width: 170px;
}
.faq-left h2 {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 1rem;
}
.faq-question-mark {
  width: 70px;
  height: 70px;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #9ca3af;
}

/* right side list */
.faq-right {
  flex: 1;
  display: flex;
  gap: 1.5rem;
}

/* vertical bar */
.faq-bar {
  width: 4px;
  background: #f43f5e;
}

/* questions */
.faq-list {
  flex: 1;
}
.faq-item {
  border-bottom: 1px solid #e5e7eb;
}
.faq-question-row {
  width: 100%;
  padding: 0.75rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  cursor: pointer;
}
.faq-question {
  font-size: 0.95rem;
  font-weight: 600;
  text-align: left;
  color: #111827;
}
.faq-plus {
  font-size: 1.3rem;
  color: #9ca3af;
}
.faq-answer {
  font-size: 0.85rem;
  color: #4b5563;
  padding-bottom: 0.75rem;
}

/* animation */
.faq-enter-active,
.faq-leave-active {
  transition: all 0.2s ease;
}
.faq-enter-from,
.faq-leave-to {
  opacity: 0;
  max-height: 0;
}

/* responsive */
@media (max-width: 768px) {
  .faq-container {
    flex-direction: column;
  }
  .faq-right {
    width: 100%;
  }
}
</style>
