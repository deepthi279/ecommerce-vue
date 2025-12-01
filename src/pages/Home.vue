<template>
  <div class="home-page">
    <!-- 1. FULL-SCREEN QUOTE CAROUSEL -->
    <section class="relative h-screen overflow-hidden">
      <!-- Carousel Wrapper -->
      <div class="absolute inset-0 w-full h-full">
        <transition-group name="fade" tag="div">
          <div
            v-for="(slide, index) in slides"
            v-show="currentSlide === index"
            :key="slide.id"
            class="absolute inset-0 bg-cover bg-center zoom-bg"
            :style="{ backgroundImage: `url(${slide.image})` }"
          ></div>
        </transition-group>
      </div>

      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black opacity-50"></div>

      <!-- Content -->
      <div class="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          "What you plant now, you will harvest later."
        </h1>
        <p class="text-white text-lg mb-6 max-w-2xl mx-auto">
          "To plant a garden is to believe in tomorrow."
        </p>
      </div>
    </section>

    <!-- 2. GREEN WELCOME / CTA SECTION -->
    <Homebanner />

    <!-- 3. SHOP BY CATEGORY -->
    <section class="categories">
      <div class="categories-inner">
        <h2 class="cat-title">Shop by category</h2>
        <div class="cat-grid">
          <!-- Indoor Plants -> Plants section -->
          <router-link
            :to="{ path: '/shop', query: { section: 'plants' } }"
            class="cat-card"
          >
            <span class="cat-icon">🏡</span>
            <div class="cat-name">Indoor Plants</div>
            <p class="cat-text">
              Low-light, easy-care plants for homes & offices.
            </p>
          </router-link>

          <!-- Outdoor & Balcony -> Plants section as well -->
          <router-link
            :to="{ path: '/shop', query: { section: 'plants' } }"
            class="cat-card"
          >
            <span class="cat-icon">☀️</span>
            <div class="cat-name">Outdoor & Balcony</div>
            <p class="cat-text">
              Hardy plants for balconies, terraces & gardens.
            </p>
          </router-link>

          <!-- Pots & Planters -> Pots section -->
          <router-link
            :to="{ path: '/shop', query: { section: 'pots' } }"
            class="cat-card"
          >
            <span class="cat-icon">🪴</span>
            <div class="cat-name">Pots & Planters</div>
            <p class="cat-text">
              Ceramic, plastic and decorative planters.
            </p>
          </router-link>

          <!-- Seeds & Grow Bags -> Grow-bags section -->
          <router-link
            :to="{ path: '/shop', query: { section: 'grow-bags' } }"
            class="cat-card"
          >
            <span class="cat-icon">🌱</span>
            <div class="cat-name">Seeds & Grow Bags</div>
            <p class="cat-text">
              Seeds, soil mixes and grow bags for kitchen gardens.
            </p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 4. CUSTOMER STORIES (dark background, cards) -->
    <section class="customer-stories">
      <div class="cs-container">
        <header class="cs-header">
          <h2>Customers Stories</h2>
          <p>(Rated 4.8/5 by our plant parents)</p>
        </header>

        <div class="cs-slider-wrapper">
          <!-- Left arrow -->
          <button class="cs-arrow cs-arrow-left" type="button" @click="prevStory">
            ‹
          </button>

          <!-- Cards -->
          <div class="cs-slider">
            <article
              v-for="(story, idx) in visibleStories"
              :key="idx"
              class="cs-card"
            >
              <div class="cs-card-inner">
                <!-- top image -->
                <div class="cs-avatar-wrap">
                  <img :src="story.image" :alt="story.name" />
                </div>

                <!-- rating + date -->
                <div class="cs-meta">
                  <div class="cs-stars">
                    <span v-for="n in 5" :key="n">★</span>
                  </div>
                  <span class="cs-date">{{ story.date }}</span>
                </div>

                <!-- quote text -->
                <div class="cs-quote-row">
                  <span class="cs-quote-mark">“</span>
                  <p class="cs-text">{{ story.text }}</p>
                  <span class="cs-quote-mark cs-quote-right">”</span>
                </div>

                <!-- author -->
                <p class="cs-author">- {{ story.name }}</p>
              </div>
            </article>
          </div>

          <!-- Right arrow -->
          <button class="cs-arrow cs-arrow-right" type="button" @click="nextStory">
            ›
          </button>
        </div>
      </div>
    </section>

    <!-- 5. FAQ SECTION (IGP-style list) -->
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
                @click="toggleFaq(index)"
              >
                <span class="faq-question">{{ item.question }}</span>
                <span class="faq-plus">
                  {{ openFaqIndex === index ? '−' : '+' }}
                </span>
              </button>

              <transition name="faq">
                <p
                  v-if="openFaqIndex === index"
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
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Homebanner from '../components/Homebanner.vue'

/* ---------- HERO CAROUSEL LOGIC ---------- */
const slides = [
  { id: 1, image: '/src/assets/images/1.jpg' },
  { id: 2, image: '/src/assets/images/2.jpg' },
]

const currentSlide = ref(0)
let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

/* ---------- CUSTOMER STORIES DATA ---------- */
const stories = [
  {
    name: 'Customer 1',
    date: '27 November 2025',
    text: 'Paste first Google review text here…',
    image: '/Areca-Palm.jpg',
  },
  {
    name: 'Customer 2',
    date: '18 November 2025',
    text: 'Paste second Google review text here…',
    image: '/Snake-Plant.jpg',
  },
  {
    name: 'Customer 3',
    date: '05 November 2025',
    text: 'Paste third Google review text here…',
    image: '/Monstera.jpg',
  },
  {
    name: 'Customer 4',
    date: '22 October 2025',
    text: 'Paste fourth Google review text here…',
    image: '/zz-Green.jpg',
  },
]

const storyStart = ref(0)

const visibleStories = computed(() => {
  const result = []
  for (let i = 0; i < 3; i++) {
    result.push(stories[(storyStart.value + i) % stories.length])
  }
  return result
})

function prevStory() {
  storyStart.value = (storyStart.value - 1 + stories.length) % stories.length
}
function nextStory() {
  storyStart.value = (storyStart.value + 1) % stories.length
}

/* ---------- FAQ DATA ---------- */
const faqs = [
  {
    question: 'Which indoor plants are easy to care for?',
    answer:
      'Snake plant, ZZ plant, money plant and peace lily are some of the easiest indoor plants. They tolerate low light and need watering only once or twice a week.',
  },
  {
    question: "I don't have much light at home, which plants are suitable?",
    answer:
      'ZZ plant, aglaonema, spider plant and philodendron do well in low to medium light, away from harsh direct sun.',
  },
  {
    question: 'What fertilizers are good for indoor plants?',
    answer:
      'Use a balanced NPK liquid fertilizer or organic vermicompost once in 3–4 weeks, always diluted as per instructions.',
  },
  {
    question: 'Why are the leaves of my plants turning yellow?',
    answer:
      'Overwatering is the most common reason. It can also be caused by low light, sudden temperature change or fertilizer burn.',
  },
]

const openFaqIndex = ref(-1)

function toggleFaq(i) {
  openFaqIndex.value = openFaqIndex.value === i ? -1 : i
}
</script>

<style scoped>
.home-page {
  background: #f3f4f6;
}

/* ---------- HERO CAROUSEL ---------- */
@keyframes zoomInOut {
  0% {
    background-size: 100%;
  }
  50% {
    background-size: 110%;
  }
  100% {
    background-size: 100%;
  }
}

.zoom-bg {
  animation: zoomInOut 15s ease-in-out infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ---------- CATEGORIES ---------- */
.categories {
  background: #f3f4f6;
  padding: 3rem 1rem 3.5rem;
}
.categories-inner {
  max-width: 1120px;
  margin: 0 auto;
}
.cat-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #065f46;
  margin-bottom: 2rem;
}
.cat-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
.cat-card {
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #d1fae5;
  padding: 1.5rem 1.25rem;
  text-align: center;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 6px 18px rgba(15, 118, 110, 0.08);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.cat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(15, 118, 110, 0.14);
}
.cat-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}
.cat-name {
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #065f46;
}
.cat-text {
  font-size: 0.8rem;
  color: #4b5563;
}

@media (min-width: 768px) {
  .cat-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* ---------- CUSTOMER STORIES ---------- */
.customer-stories {
  background: #3a415b;
  color: #ffffff;
  padding: 3rem 1rem;
}
.cs-container {
  max-width: 1120px;
  margin: 0 auto;
}
.cs-header h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}
.cs-header p {
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0 0 1.5rem;
}
.cs-slider-wrapper {
  position: relative;
  display: flex;
  align-items: stretch;
}
.cs-slider {
  display: flex;
  gap: 1.5rem;
  flex: 1;
}
.cs-card {
  flex: 1;
}
.cs-card-inner {
  background: #ffffff;
  color: #3a415b;
  border-radius: 18px;
  padding: 2.2rem 2rem 2rem;
  border: 2px solid #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 260px;
}
.cs-avatar-wrap {
  height: 72px;
  width: 72px;
  border-radius: 24px;
  border: 4px solid #f0f4ff;
  overflow: hidden;
  margin-bottom: 1rem;
}
.cs-avatar-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cs-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
}
.cs-stars span {
  color: #ffb800;
  font-size: 1rem;
}
.cs-date {
  color: #6b7280;
}
.cs-quote-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 2rem;
}
.cs-quote-mark {
  font-size: 2rem;
  color: #3a415b;
}
.cs-quote-right {
  align-self: flex-end;
}
.cs-text {
  font-size: 0.95rem;
  font-style: italic;
  color: #4b5563;
}
.cs-author {
  margin-top: auto;
  font-size: 0.85rem;
  color: #4b5563;
}
.cs-arrow {
  flex: 0 0 auto;
  height: 56px;
  width: 56px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: #ffffff;
  color: #3a415b;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto 0;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}
.cs-arrow-left {
  margin-right: 1rem;
}
.cs-arrow-right {
  margin-left: 1rem;
}

@media (max-width: 960px) {
  .cs-slider {
    flex-direction: column;
  }
  .cs-card-inner {
    min-height: auto;
  }
  .cs-arrow {
    display: none;
  }
}

/* ---------- FAQ ---------- */
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
.faq-right {
  flex: 1;
  display: flex;
  gap: 1.5rem;
}
.faq-bar {
  width: 4px;
  background: #f43f5e;
}
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
.faq-enter-active,
.faq-leave-active {
  transition: all 0.2s ease;
}
.faq-enter-from,
.faq-leave-to {
  opacity: 0;
  max-height: 0;
}

@media (max-width: 768px) {
  .faq-container {
    flex-direction: column;
  }
  .faq-right {
    width: 100%;
  }
}
</style>
