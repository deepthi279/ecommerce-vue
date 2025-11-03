<template>
  <div class="dark:bg-gray-900 dark:text-white">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center text-white"
      
    >
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative z-10 text-center py-24">
        <h1 class="text-5xl font-bold mb-2">Our Services</h1>
        <p class="text-lg">
          <router-link to="/" class="hover:underline">Home</router-link> / Services
        </p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center mb-12 text-green-600">
        What We Offer
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Landscaping -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-6 text-center">
          <img
            
            alt="Landscaping"
            class="w-16 h-16 mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold mb-2">Landscaping</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Transform outdoor spaces with beautiful and sustainable landscape designs tailored to your needs.
          </p>
        </div>

        <!-- Gardening -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-6 text-center">
          <img
           
            alt="Gardening"
            class="w-16 h-16 mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold mb-2">Gardening</h3>
          <p class="text-gray-600 dark:text-gray-300">
            From planting to seasonal care, we help you maintain vibrant and healthy gardens all year round.
          </p>
        </div>

        <!-- Maintenance -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-6 text-center">
          <img
            
            alt="Maintenance"
            class="w-16 h-16 mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold mb-2">Maintenance</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Regular upkeep and expert tips to keep your plants, soil, and garden tools in perfect condition.
          </p>
        </div>

        <!-- Delivery -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-6 text-center">
          <img
            
            alt="Delivery"
            class="w-16 h-16 mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold mb-2">Delivery</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Safe and timely plant and tool delivery service right to your doorstep across Coimbatore.
          </p>
        </div>

        <!-- Plant Guide -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-6 text-center">
          <img
            
            alt="Plant Care Guide"
            class="w-16 h-16 mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold mb-2">Plant Care Guidance</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Learn how to care for different plant types, watering schedules, sunlight needs, and soil preparation.
          </p>
        </div>

        <!-- Tools & Fertilizers -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-6 text-center">
          <img
            
            alt="Tools & Fertilizers"
            class="w-16 h-16 mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold mb-2">Tools & Fertilizer Guidance</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Explore essential gardening tools and learn how to use natural fertilizers for healthy plant growth.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="text-center py-12 bg-green-600 text-white">
      <h3 class="text-2xl font-bold mb-4">Want to know more about our services?</h3>
      <router-link
        to="/contact"
        class="bg-white text-green-700 px-6 py-3 rounded hover:bg-gray-100 font-semibold"
      >
        Contact Us
      </router-link>
    </section>
  </div>
</template>
