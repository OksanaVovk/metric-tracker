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
  }
  .header-content {
    display: flex;
    align-items: flex-start;
    padding: 16px 80px;
    width: 100%;
    max-width: 1400px;
  }
  .logo {
    color: #ff8000;
    margin: 0;
    font-size: 1.5em;
  }
</style>
