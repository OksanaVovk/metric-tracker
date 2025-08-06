<template>
  <header class="header">
    <div class="header-content">
      <h1 class="logo">Metric Tracker</h1>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    height: 40px;
    width: 100%;
    background-color: black;
    align-items: center;
    justify-content: center;
    @media (min-width: 640px) {
      height: 60px;
    }
  }
  .header-content {
    display: flex;
    align-items: flex-start;
    padding: 10px 20px;
    width: 100%;
    max-width: 1400px;
    @media (min-width: 640px) and (max-width: 1200px) {
      padding: 16px 40px;
    }
    @media (min-width: 1200px) {
      padding: 16px 80px;
    }
  }
  .logo {
    color: #ff8000;
    margin: 0;
    font-size: 16px;
    @media (min-width: 640px) and (max-width: 1200px) {
      font-size: 20px;
    }
    @media (min-width: 1200px) {
      font-size: 24px;
    }
  }
</style>
