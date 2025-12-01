<template>
  <section class="customer-stories">
    <div class="cs-container">
      <header class="cs-header">
        <h2>Customers Stories</h2>
        <p v-if="meta">
          (Rated {{ meta.rating }}/5 based on {{ meta.totalRatings }} ratings)
        </p>
        <p v-else>(What our customers say about us)</p>
      </header>

      <div v-if="loading" class="cs-loading">
        Loading reviews…
      </div>

      <div v-else-if="!visibleStories.length">
        <p>No reviews available right now.</p>
      </div>

      <div v-else class="cs-slider-wrapper">
        <!-- Left arrow -->
        <button class="cs-arrow cs-arrow-left" type="button" @click="prev">
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
                <img :src="story.profilePhoto || '/Areca-Palm.jpg'" :alt="story.name" />
              </div>

              <!-- rating + date -->
              <div class="cs-meta">
                <div class="cs-stars">
                  <span v-for="n in story.rating" :key="n">★</span>
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
        <button class="cs-arrow cs-arrow-right" type="button" @click="next">
          ›
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const loading = ref(true)
const meta = ref(null)          // rating + totalRatings
const reviews = ref([])         // full reviews from API
const start = ref(0)

// 👇 change this to your Django backend URL in production
const API_BASE = 'http://localhost:8000'

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE}/api/reviews/`)
    if (!res.ok) {
      throw new Error('Failed to load reviews')
    }
    const data = await res.json()

    if (data.reviews) {
      meta.value = {
        rating: data.rating,
        totalRatings: data.totalRatings || data.user_ratings_total,
      }
      reviews.value = data.reviews
    }
  } catch (e) {
    console.error('Failed to load reviews', e)
  } finally {
    loading.value = false
  }
})

const visibleStories = computed(() => {
  if (!reviews.value.length) return []
  const result = []
  for (let i = 0; i < Math.min(3, reviews.value.length); i++) {
    result.push(reviews.value[(start.value + i) % reviews.value.length])
  }
  return result
})

function prev() {
  if (!reviews.value.length) return
  start.value = (start.value - 1 + reviews.value.length) % reviews.value.length
}
function next() {
  if (!reviews.value.length) return
  start.value = (start.value + 1) % reviews.value.length
}
</script>

<style scoped>
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

.cs-loading {
  padding: 1rem 0;
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
</style>
