<template>
  <div class="container my-5 dark:bg-gray-900 dark:text-white min-h-screen">
    <h2 class="text-center mb-4 text-3xl font-bold text-green-600">Contact Us</h2>
    <p class="text-center mb-5 text-lg">
      Need help with plant care, orders, or services? Reach us via chat, call, or email.
    </p>

    <!-- Contact Options -->
    <div class="row text-center g-4 mb-6">
      <!-- WhatsApp Chat -->
      <div class="col-md-4">
        <a
          href="https://wa.me/919840626841"
          target="_blank"
          class="flex flex-col items-center hover:text-green-500 transition"
        >
          <i class="bi bi-whatsapp display-4 text-success"></i>
          <h5 class="mt-2">Chat on WhatsApp</h5>
          <p>Instant support for your queries</p>
        </a>
      </div>

      <!-- Email -->
      <div class="col-md-4">
        <a
          href="mailto:veenasivaji8@gmail.com"
          class="flex flex-col items-center hover:text-green-500 transition"
        >
          <i class="bi bi-envelope-fill display-4 text-success"></i>
          <h5 class="mt-2">Email Us</h5>
          <p>veenasivaji8@gmail.com</p>
        </a>
      </div>

      <!-- Instagram -->
      <div class="col-md-4">
        <a
          href="https://www.instagram.com/sivaji_nursery/"
          target="_blank"
          class="flex flex-col items-center hover:text-green-500 transition"
        >
          <i class="bi bi-instagram display-4 text-success"></i>
          <h5 class="mt-2">Follow Us</h5>
          <p>@sivaji_nursery</p>
        </a>
      </div>
    </div>

    <!-- Map Embed -->
    <div class="text-center mt-8">
      <h4 class="mb-3 text-2xl font-semibold">Visit Our Nursery</h4>
      <div class="w-full h-72 rounded shadow overflow-hidden">
        <iframe
          class="w-full h-full border-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.78616786374!2d80.2122067!3d12.9704253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525db4e1e597a3%3A0x52bd3a5160def2f5!2sSivaji%20Plant%20Nursery!5e0!3m2!1sen!2sin!4v1673254000000!5m2!1sen!2sin"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </div>
</template>
