<script setup>
</script>

<template>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 100vw;
  min-height: 100vh;
  padding: 20px;
}

button {
  cursor: pointer;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  transition: all 0.3s ease;
}

button:hover {
  opacity: 0.9;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 15px;
}

.card {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  max-width: 80%;
}

.popup-content h3 {
  margin-bottom: 20px;
}

.popup-content button {
  margin-top: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }
  
  button {
    padding: 12px 16px;
    font-size: 14px;
  }
  
  input {
    padding: 12px;
    font-size: 14px;
  }
  
  .card {
    padding: 15px;
  }
  
  .popup-content {
    padding: 20px;
    max-width: 90%;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 10px;
  }
  
  button {
    padding: 10px 14px;
    font-size: 14px;
  }
  
  input {
    padding: 10px;
    font-size: 14px;
  }
  
  .card {
    padding: 12px;
  }
  
  .popup-content {
    padding: 15px;
    max-width: 95%;
  }
}
</style>
