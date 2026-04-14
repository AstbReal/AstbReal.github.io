<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 弹窗状态
const showPopup = ref(false)
const popupMessage = ref('')

// 我的摊位信息
const myStall = {
  fruitType: '樱桃',
  expectedYield: '10kg',
  isMature: false // 未成熟，按钮不可点击
}

// 市集商品
const marketItems = [
  { id: 1, name: '苹果', price: 19.9, stallName: '快乐果园', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20apples%2C%20red%2C%20high%20quality%20photo&image_size=square' },
  { id: 2, name: '梨', price: 15.9, stallName: '梨园春色', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20pears%2C%20yellow%2C%20high%20quality%20photo&image_size=square' },
  { id: 3, name: '桃子', price: 22.9, stallName: '桃花园', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20peaches%2C%20pink%20and%20yellow%2C%20high%20quality%20photo&image_size=square' },
  { id: 4, name: '葡萄', price: 29.9, stallName: '葡萄园', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20grapes%2C%20purple%2C%20high%20quality%20photo&image_size=square' },
  { id: 5, name: '草莓', price: 39.9, stallName: '草莓园', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20strawberries%2C%20red%2C%20high%20quality%20photo&image_size=square' },
  { id: 6, name: '蓝莓', price: 49.9, stallName: '蓝莓园', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20blueberries%2C%20blue%2C%20high%20quality%20photo&image_size=square' }
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

// 搜索功能
const search = () => {
  openPopup('演示版：搜索功能')
}

// 上架售卖
const sell = () => {
  if (myStall.isMature) {
    openPopup('演示版：已上架')
  }
}

// 查看商品详情
const viewItem = (item) => {
  openPopup(`演示版：查看${item.name}详情`)
}

// 发布我的果实
const publishFruit = () => {
  openPopup('演示版：发布成功')
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
      <h1>水果市集</h1>
      <div class="empty"></div>
    </div>

    <!-- 搜索框 -->
    <div class="search-section">
      <div class="search-box" @click="search">
        <span class="search-icon">🔍</span>
        <span class="search-placeholder">搜索水果、摊位</span>
      </div>
    </div>

    <!-- 我的摊位 -->
    <div class="my-stall">
      <h2>我的摊位</h2>
      <div class="stall-info">
        <div class="stall-details">
          <p>果实品种：{{ myStall.fruitType }}</p>
          <p>预计产量：{{ myStall.expectedYield }}</p>
        </div>
        <button 
          class="sell-button"
          :class="{ disabled: !myStall.isMature }"
          :disabled="!myStall.isMature"
          @click="sell"
        >
          上架售卖
        </button>
      </div>
    </div>

    <!-- 市集商品区 -->
    <div class="market-section">
      <h2>市集商品</h2>
      <div class="market-grid">
        <div 
          v-for="item in marketItems" 
          :key="item.id"
          class="market-item"
          @click="viewItem(item)"
        >
          <img :src="item.image" :alt="item.name" class="item-image" />
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p class="item-price">¥{{ item.price }}</p>
            <p class="item-stall">{{ item.stallName }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 悬浮按钮 -->
    <div class="floating-button">
      <button class="btn-primary" @click="publishFruit">
        发布我的果实
      </button>
    </div>

    <!-- 底部平台提示 -->
    <div class="platform-tip">
      <p>平台提示：交易成功后将收取5%摊位费</p>
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
  position: relative;
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

.search-section {
  margin-bottom: 30px;
}

.search-box {
  background-color: white;
  color: #333;
  border-radius: 20px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.search-icon {
  font-size: 16px;
  color: #999;
}

.search-placeholder {
  color: #999;
  font-size: 14px;
}

.my-stall {
  background-color: white;
  color: #333;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.my-stall h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.stall-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stall-details p {
  font-size: 14px;
  margin-bottom: 5px;
  color: #666;
}

.sell-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
}

.sell-button.disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.market-section {
  flex: 1;
  margin-bottom: 100px; /* 为悬浮按钮留出空间 */
}

.market-section h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.market-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.market-item {
  background-color: white;
  color: #333;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.market-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.item-info {
  padding: 10px;
}

.item-info h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.item-price {
  font-size: 14px;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 5px;
}

.item-stall {
  font-size: 12px;
  color: #999;
}

.floating-button {
  position: fixed;
  bottom: 80px;
  left: 20px;
  right: 20px;
  z-index: 100;
}

.floating-button button {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.platform-tip {
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 12px;
  color: #999;
  padding: 10px;
  background-color: #f5f5f5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header h1 {
    font-size: 18px;
  }
  
  .back-button {
    font-size: 20px;
  }
  
  .search-box {
    padding: 10px 16px;
  }
  
  .search-icon {
    font-size: 14px;
  }
  
  .search-placeholder {
    font-size: 12px;
  }
  
  .my-stall h2,
  .market-section h2 {
    font-size: 16px;
  }
  
  .stall-details p {
    font-size: 12px;
  }
  
  .sell-button {
    padding: 8px 16px;
    font-size: 12px;
  }
  
  .item-image {
    height: 100px;
  }
  
  .item-info h3 {
    font-size: 14px;
  }
  
  .item-price {
    font-size: 12px;
  }
  
  .item-stall {
    font-size: 10px;
  }
  
  .floating-button button {
    padding: 12px;
    font-size: 14px;
  }
  
  .platform-tip {
    font-size: 10px;
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 16px;
  }
  
  .back-button {
    font-size: 18px;
  }
  
  .search-box {
    padding: 8px 12px;
  }
  
  .search-icon {
    font-size: 12px;
  }
  
  .search-placeholder {
    font-size: 10px;
  }
  
  .my-stall h2,
  .market-section h2 {
    font-size: 14px;
  }
  
  .stall-details p {
    font-size: 10px;
  }
  
  .sell-button {
    padding: 6px 12px;
    font-size: 10px;
  }
  
  .item-image {
    height: 80px;
  }
  
  .item-info h3 {
    font-size: 12px;
  }
  
  .item-price {
    font-size: 10px;
  }
  
  .item-stall {
    font-size: 8px;
  }
  
  .floating-button button {
    padding: 10px;
    font-size: 12px;
  }
  
  .platform-tip {
    font-size: 8px;
    padding: 6px;
  }
}
</style>