<template>
  <section class="bg-gray-100 dark:bg-gray-800 py-12 px-6 mt-10">
    <h2 class="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
    <div class="grid gap-6 md:grid-cols-3">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition"
      >
        <p class="italic mb-4">"{{ review.text }}"</p>
        <div class="flex items-center">
          <img :src="review.avatar" alt="avatar" class="w-10 h-10 rounded-full mr-3" />
          <div>
            <p class="font-semibold">{{ review.name }}</p>
            <p class="text-sm text-gray-500">{{ review.location }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const reviews = [
  {
    id: 1,
    text: "Beautiful plants and great service! My snake plant arrived healthy and thriving.",
    name: "Anjali R.",
    location: "Chennai",
    avatar: "/images/user1.jpg"
  },
  {
    id: 2,
    text: "Affordable prices and fast delivery. The best nursery I've ordered from online.",
    name: "Vikram P.",
    location: "Bangalore",
    avatar: "/images/user2.jpg"
  },
  {
    id: 3,
    text: "Loved the customer support — they guided me on how to care for my peace lily.",
    name: "Deepa S.",
    location: "Coimbatore",
    avatar: "/images/user3.jpg"
  }
]
</script>
