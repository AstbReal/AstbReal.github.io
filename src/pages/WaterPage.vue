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
.container {
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  position: relative;
}

.back-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header h1 {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  flex: 1;
  margin: 0 40px;
}

.empty {
  width: 40px;
}

.description {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.description p {
  font-size: 14px;
  line-height: 1.5;
  color: #666;
}

.care-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}

.care-card {
  background-color: white;
  color: #333;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;
}

.care-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.care-card h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.care-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.4;
}

.care-price {
  font-size: 18px;
  font-weight: bold;
  color: #4CAF50;
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.bottom-button {
  margin-top: 30px;
  margin-bottom: 20px;
}

.bottom-button button {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header h1 {
    font-size: 18px;
  }
  
  .back-button {
    font-size: 20px;
  }
  
  .description p {
    font-size: 12px;
  }
  
  .care-card h3 {
    font-size: 16px;
  }
  
  .care-description {
    font-size: 12px;
  }
  
  .care-price {
    font-size: 16px;
  }
  
  .bottom-button button {
    padding: 12px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 16px;
  }
  
  .back-button {
    font-size: 18px;
  }
  
  .description p {
    font-size: 10px;
  }
  
  .care-card h3 {
    font-size: 14px;
  }
  
  .care-description {
    font-size: 10px;
  }
  
  .care-price {
    font-size: 14px;
  }
  
  .bottom-button button {
    padding: 10px;
    font-size: 12px;
  }
}
</style>