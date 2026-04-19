<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 弹窗状态
const showPopup = ref(false)
const popupMessage = ref('')

// 照料选项
const careOptions = [
  { id: 1, name: '单次照料', price: 50, description: '包含一次施肥和除虫服务' },
  { id: 2, name: '季度照料', price: 150, description: '包含一个季度的定期照料' },
  { id: 3, name: '全年全包照料', price: 500, description: '包含一年的全方位照料服务' }
]

// 打开弹窗
const openPopup = (message) => {
  popupMessage.value = message
  showPopup.value = true
}

// 关闭弹窗
const closePopup = () => {
  showPopup.value = false
}

// 选择照料选项
const selectCareOption = (option) => {
  openPopup(`演示版：选择${option.name}`)
}

// 立即支付
const payNow = () => {
  openPopup('演示版：支付成功')
}

// 返回我的树页面
const goBack = () => {
  router.push('/my-tree')
}
</script>

<template>
  <div class="container">
    <!-- 顶部 -->
    <div class="header">
      <button class="back-button" @click="goBack">
        ←
      </button>
      <h1>你的小树需要施肥/除虫啦</h1>
      <div class="empty"></div>
    </div>

    <!-- 中部说明 -->
    <div class="description">
      <p>当前处于膨果期，需要及时施肥和除虫，以保证果实的质量和产量。</p>
    </div>

    <!-- 卡片区 -->
    <div class="care-cards">
      <div 
        v-for="option in careOptions" 
        :key="option.id"
        class="care-card"
        @click="selectCareOption(option)"
      >
        <h3>{{ option.name }}</h3>
        <p class="care-description">{{ option.description }}</p>
        <div class="care-price">¥{{ option.price }}</div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom-button">
      <button class="btn-primary" @click="payNow">
        立即支付，委托果园照料
      </button>
    </div>

    <!-- 弹窗 -->
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <h3>{{ popupMessage }}</h3>
        <button class="btn-primary" @click="closePopup">
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 全局样式 */
* {
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  box-sizing: border-box;
}

.container {
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #e8f5e9;
}

/* 顶部导航 */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  position: relative;
  height: 44px;
}

.back-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}

.header h1 {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  flex: 1;
  margin: 0 44px;
  color: #333;
}

.empty {
  width: 44px;
}

/* 说明部分 */
.description {
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.description p {
  font-size: 14px;
  line-height: 1.5;
  color: #666;
  margin: 0;
}

/* 照料选项卡片 */
.care-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.care-card {
  background-color: white;
  color: #333;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.care-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.care-card h3 {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 10px 0;
  color: #333;
}

.care-description {
  font-size: 14px;
  color: #666;
  margin: 0 0 15px 0;
  line-height: 1.4;
}

.care-price {
  font-size: 16px;
  font-weight: bold;
  color: #2e7d32;
  position: absolute;
  bottom: 20px;
  right: 20px;
}

/* 底部按钮 */
.bottom-button {
  margin-top: 30px;
  margin-bottom: 20px;
}

.btn-primary {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(46, 125, 50, 0.2);
}

.btn-primary:hover {
  background-color: #1b5e20;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
}

/* 弹窗 */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 80%;
  min-width: 280px;
}

.popup-content h3 {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.popup-content button {
  width: 100%;
  padding: 12px;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 16px;
  }
  
  .header h1 {
    font-size: 16px;
    margin: 0 40px;
  }
  
  .back-button {
    font-size: 18px;
    width: 40px;
    height: 40px;
  }
  
  .empty {
    width: 40px;
  }
  
  .description {
    padding: 14px;
  }
  
  .description p {
    font-size: 13px;
  }
  
  .care-card h3 {
    font-size: 15px;
  }
  
  .care-description {
    font-size: 13px;
  }
  
  .care-price {
    font-size: 15px;
  }
  
  .btn-primary {
    padding: 14px;
    font-size: 15px;
  }
  
  .popup-content {
    padding: 24px;
  }
  
  .popup-content h3 {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 12px;
  }
  
  .header {
    height: 40px;
  }
  
  .back-button {
    font-size: 16px;
    width: 40px;
    height: 40px;
  }
  
  .header h1 {
    font-size: 15px;
    margin: 0 40px;
  }
  
  .empty {
    width: 40px;
  }
  
  .description {
    padding: 12px;
  }
  
  .description p {
    font-size: 12px;
  }
  
  .care-card {
    padding: 16px;
  }
  
  .care-card h3 {
    font-size: 14px;
  }
  
  .care-description {
    font-size: 12px;
  }
  
  .care-price {
    font-size: 14px;
    bottom: 16px;
    right: 16px;
  }
  
  .bottom-button {
    margin-top: 24px;
  }
  
  .btn-primary {
    padding: 12px;
    font-size: 14px;
    border-radius: 10px;
  }
  
  .popup-content {
    padding: 20px;
    max-width: 90%;
    min-width: 260px;
  }
  
  .popup-content h3 {
    font-size: 14px;
    margin-bottom: 16px;
  }
  
  .popup-content button {
    padding: 10px;
    font-size: 13px;
  }
}
</style>