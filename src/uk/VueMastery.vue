<template>
  <div class="vue-mastery-link">
    <a
      href="https://www.vuemastery.com/migration-guide-cheat-sheet/"
      target="_blank"
    >
      <div class="banner-wrapper">
        <img
          class="banner"
          alt="Vue Mastery banner"
          width="96px"
          height="56px"
          src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png"
        />
      </div>
      <p class="description">
        Get the free Migration Guide Cheat Sheet at <span>VueMastery.com</span>
      </p>
      <div class="logo-wrapper">
        <img
          alt="Vue Mastery Logo"
          width="25px"
          src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png"
        />
      </div>
    </a>
  </div>
</template>

<style>
.vue-mastery-link {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 8px 16px 8px 8px;
}

.vue-mastery-link a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.vue-mastery-link .banner {
  background-color: #f9f9f9;
  border-radius: 4px;
  width: 96px;
  height: 56px;
  object-fit: cover;
}

.vue-mastery-link .description {
  flex: 1;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #213547;
  margin: 0 0 0 16px;
}

.vue-mastery-link .description span {
  color: #42b883;
}

.vue-mastery-link .logo-wrapper {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vue-mastery-link .logo-wrapper img {
  width: 25px;
  object-fit: contain;
}

@media (max-width: 576px) {
  .vue-mastery-link .banner {
    width: 56px;
  }

  .vue-mastery-link .description {
    font-size: 12px;
    line-height: 18px;
  }
  .vue-mastery-link .logo-wrapper {
    position: relative;
    width: 32px;
    height: 32px;
  }
}
</style>
