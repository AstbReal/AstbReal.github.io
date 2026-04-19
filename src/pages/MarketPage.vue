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

// 计算市场价格（根据认养价格和时间折扣）
const getMarketPrice = (basePrice, fruitName) => {
  // 基础价格系数
  const priceFactors = {
    '樱桃': 0.2,
    '梨': 0.06,
    '黄金油蟠': 0.13,
    '阳光玫瑰': 0.17,
    '红美人果冻橙': 0.13,
    '国庆一号无核蜜橘': 0.11
  }
  
  // 检查是否是优惠时间（假设每天的9点到18点为优惠时间）
  const now = new Date()
  const hour = now.getHours()
  const isDiscountTime = hour >= 9 && hour < 18
  
  // 以下水果在优惠时间有8折优惠
  const discountFruits = ['樱桃', '梨', '黄金油蟠']
  
  let price = basePrice * priceFactors[fruitName] || 20
  
  if (isDiscountTime && discountFruits.includes(fruitName)) {
    price = price * 0.8
  }
  
  return Math.round(price * 10) / 10
}

// 市集商品
const marketItems = [
  { id: 1, name: '樱桃', price: getMarketPrice(199, '樱桃'), stallName: '樱桃园', image: '/images/cherry-tree-landscape.jpg' },
  { id: 2, name: '梨', price: getMarketPrice(249, '梨'), stallName: '梨园春色', image: '/images/pear-tree.jpg' },
  { id: 3, name: '黄金油蟠', price: getMarketPrice(229, '黄金油蟠'), stallName: '桃花园', image: '/images/peach-tree.jpg' },
  { id: 4, name: '阳光玫瑰', price: getMarketPrice(299, '阳光玫瑰'), stallName: '葡萄园', image: '/images/grape-tree.jpg' },
  { id: 5, name: '红美人果冻橙', price: getMarketPrice(269, '红美人果冻橙'), stallName: '橙子园', image: '/images/orange-tree.jpg' },
  { id: 6, name: '国庆一号无核蜜橘', price: getMarketPrice(239, '国庆一号无核蜜橘'), stallName: '橘子园', image: '/images/tangerine-tree.jpg' }
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
  position: relative;
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

/* 搜索框 */
.search-section {
  margin-bottom: 24px;
}

.search-box {
  background-color: white;
  color: #333;
  border-radius: 20px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.search-icon {
  font-size: 16px;
  color: #999;
}

.search-placeholder {
  color: #999;
  font-size: 14px;
}

/* 我的摊位 */
.my-stall {
  background-color: white;
  color: #333;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
}

.my-stall h2 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.stall-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stall-details p {
  font-size: 14px;
  margin: 0 0 5px 0;
  color: #666;
}

.sell-button {
  padding: 10px 20px;
  background-color: #2e7d32;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(46, 125, 50, 0.2);
}

.sell-button:hover {
  background-color: #1b5e20;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
}

.sell-button.disabled {
  background-color: #ddd;
  cursor: not-allowed;
  box-shadow: none;
}

.sell-button.disabled:hover {
  transform: none;
}

/* 市集商品区 */
.market-section {
  flex: 1;
  margin-bottom: 100px; /* 为悬浮按钮留出空间 */
}

.market-section h2 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
}

.market-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.item-info {
  padding: 12px;
}

.item-info h3 {
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #333;
}

.item-price {
  font-size: 14px;
  font-weight: bold;
  color: #2e7d32;
  margin: 0 0 5px 0;
}

.item-stall {
  font-size: 12px;
  color: #999;
  margin: 0;
}

/* 悬浮按钮 */
.floating-button {
  position: fixed;
  bottom: 80px;
  left: 20px;
  right: 20px;
  z-index: 100;
}

.btn-primary {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3);
}

.btn-primary:hover {
  background-color: #1b5e20;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(46, 125, 50, 0.4);
}

/* 底部平台提示 */
.platform-tip {
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 12px;
  color: #999;
  padding: 10px;
  background-color: white;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.platform-tip p {
  margin: 0;
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
    font-size: 15px;
  }
  
  .stall-details p {
    font-size: 13px;
  }
  
  .sell-button {
    padding: 8px 16px;
    font-size: 13px;
  }
  
  .item-image {
    height: 100px;
  }
  
  .item-info h3 {
    font-size: 13px;
  }
  
  .item-price {
    font-size: 13px;
  }
  
  .item-stall {
    font-size: 11px;
  }
  
  .btn-primary {
    padding: 14px;
    font-size: 15px;
  }
  
  .platform-tip {
    font-size: 10px;
    padding: 8px;
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
  
  .search-box {
    padding: 8px 12px;
  }
  
  .search-icon {
    font-size: 12px;
  }
  
  .search-placeholder {
    font-size: 10px;
  }
  
  .my-stall {
    padding: 16px;
  }
  
  .my-stall h2,
  .market-section h2 {
    font-size: 14px;
  }
  
  .stall-details p {
    font-size: 12px;
  }
  
  .sell-button {
    padding: 6px 12px;
    font-size: 12px;
  }
  
  .item-image {
    height: 80px;
  }
  
  .item-info {
    padding: 10px;
  }
  
  .item-info h3 {
    font-size: 12px;
  }
  
  .item-price {
    font-size: 12px;
  }
  
  .item-stall {
    font-size: 10px;
  }
  
  .btn-primary {
    padding: 12px;
    font-size: 14px;
  }
  
  .platform-tip {
    font-size: 9px;
    padding: 6px;
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