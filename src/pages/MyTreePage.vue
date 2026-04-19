<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 树状态
const treeName = ref('我的樱桃树')
const userName = ref('用户')
const healthValue = ref(50)
const growthProgress = ref(0)

// 根据成长进度计算当前阶段
const treeStage = computed(() => {
  if (growthProgress.value < 20) {
    return 'seed' // 种子阶段
  } else if (growthProgress.value < 70) {
    return 'seedling' // 幼苗阶段
  } else {
    return 'adult' // 成年阶段
  }
})

// 根据阶段获取对应的树图片
const treeImage = computed(() => {
  switch (treeStage.value) {
    case 'seed':
      return '/images/seed.jpg'
    case 'seedling':
      return '/images/seedling.jpg'
    case 'adult':
      return '/images/adult-tree.jpg'
    default:
      return '/images/seed.jpg'
  }
})

// 弹窗状态
const showPopup = ref(false)
const popupMessage = ref('')
const showMarketPopup = ref(false) // 进入市集的弹窗

// 季节背景（默认夏季）
const season = ref('summer')

// 按钮状态
const isFertilizerEnabled = ref(true) // 施肥/除虫按钮是否可用

// 初始化
onMounted(() => {
  // 从sessionStorage中获取用户昵称和树名
  const savedNickname = sessionStorage.getItem('userName')
  const savedTreeName = sessionStorage.getItem('treeName')
  
  // 优先使用sessionStorage中的数据，如果没有则使用URL参数
  if (savedNickname) {
    userName.value = savedNickname
  } else if (route.query.nickname) {
    userName.value = route.query.nickname
    // 保存到sessionStorage
    sessionStorage.setItem('userName', route.query.nickname)
  }
  
  if (savedTreeName) {
    treeName.value = savedTreeName
  } else if (route.query.treeName) {
    treeName.value = route.query.treeName
    // 保存到sessionStorage
    sessionStorage.setItem('treeName', route.query.treeName)
  }
})

// 打开弹窗
const openPopup = (message) => {
  popupMessage.value = message
  showPopup.value = true
}

// 关闭弹窗
const closePopup = () => {
  showPopup.value = false
}

// 浇水
const waterTree = () => {
  // 增加健康值，最多100
  healthValue.value = Math.min(healthValue.value + 10, 100)
  // 增加成长进度，最多100
  growthProgress.value = Math.min(growthProgress.value + 5, 100)
  
  // 检查是否达到100%
  if (growthProgress.value >= 100) {
    showMarketPopup.value = true
  } else {
    openPopup('演示版：浇水功能')
  }
}

// 施肥/除虫
const fertilizeTree = () => {
  if (isFertilizerEnabled.value) {
    // 增加健康值，最多100
    healthValue.value = Math.min(healthValue.value + 15, 100)
    // 增加成长进度，最多100
    growthProgress.value = Math.min(growthProgress.value + 8, 100)
    
    // 检查是否达到100%
    if (growthProgress.value >= 100) {
      showMarketPopup.value = true
    } else {
      openPopup('演示版：施肥/除虫功能')
    }
  }
}

// 关闭进入市集弹窗并跳转
const closeMarketPopup = () => {
  showMarketPopup.value = false
  router.push('/market')
}

// 邀请共养
const inviteCoAdopt = () => {
  router.push('/co-adopt')
}

// 线下预约
const makeAppointment = () => {
  router.push('/appointment')
}

// 进入市集
const goToMarket = () => {
  router.push('/market')
}

// 回到认养界面
const goToAdopt = () => {
  router.push('/')
}
</script>

<template>
  <div class="container" :class="season">
    <!-- 树信息 -->
    <div class="tree-info">
      <h1>{{ treeName }}</h1>
      <p>{{ userName }}的树</p>
      <div class="health-bar">
        <span>健康值: {{ healthValue }}%</span>
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: healthValue + '%' }"></div>
        </div>
      </div>
      <div class="growth-bar">
        <span>成长进度: {{ growthProgress }}%</span>
        <div class="progress-container">
          <div class="progress-bar growth" :style="{ width: growthProgress + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- 中央3D区 -->
    <div class="tree-container">
      <transition name="fade" mode="out-in">
        <img :key="treeStage" :src="treeImage" :alt="treeName" class="tree-image" />
      </transition>
    </div>

    <!-- 下方按钮 -->
    <div class="button-container">
      <button class="action-button" @click="waterTree">
        <div class="button-icon">💧</div>
        <span>浇水</span>
      </button>
      <button 
        class="action-button" 
        :class="{ disabled: !isFertilizerEnabled }"
        @click="fertilizeTree"
        :disabled="!isFertilizerEnabled"
      >
        <div class="button-icon">🌱</div>
        <span>施肥/除虫</span>
      </button>
      <button class="action-button" @click="inviteCoAdopt">
        <div class="button-icon">👥</div>
        <span>邀请共养</span>
      </button>
      <button class="action-button" @click="makeAppointment">
        <div class="button-icon">📅</div>
        <span>线下预约</span>
      </button>
    </div>

    <!-- 进入市集按钮 -->
    <div class="market-entry">
      <button class="btn-primary" @click="goToMarket">
        进入水果市集
      </button>
    </div>

    <!-- 回到认养界面按钮 -->
    <div class="adopt-entry">
      <button class="btn-secondary" @click="goToAdopt">
        回到认养界面
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

    <!-- 进入市集弹窗 -->
    <div v-if="showMarketPopup" class="popup">
      <div class="popup-content">
        <h3>恭喜！您的树已经成熟了！</h3>
        <p>现在可以进入水果市集查看和售卖您的果实了。</p>
        <button class="btn-primary" @click="closeMarketPopup">
          进入水果市集
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
  align-items: center;
  transition: background-color 0.5s ease;
  background-color: #e8f5e9;
}

/* 季节背景 */
.container.summer {
  background-color: #e8f5e9;
}

.container.spring {
  background-color: #f3e5f5;
}

.container.autumn {
  background-color: #fff3e0;
}

.container.winter {
  background-color: #e3f2fd;
}

/* 树信息 */
.tree-info {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}

.tree-info h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.tree-info p {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

/* 健康值和成长进度 */
.health-bar,
.growth-bar {
  margin-bottom: 15px;
  text-align: left;
}

.health-bar span,
.growth-bar span {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #666;
  font-weight: 500;
}

.progress-container {
  width: 100%;
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  height: 100%;
  background-color: #2e7d32;
  border-radius: 5px;
  transition: width 0.3s ease;
}

.progress-bar.growth {
  background-color: #1976d2;
}

/* 树容器 */
.tree-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
}

.seed-image,
.tree-image {
  width: 500px;
  height: 500px;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.tree-image {
  animation: grow 1s ease-out;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

@keyframes grow {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* 按钮容器 */
.button-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
}

.action-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: white;
  color: #333;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.action-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button-icon {
  font-size: 24px;
  margin-bottom: 10px;
}

.action-button span {
  font-size: 14px;
  font-weight: 500;
}

/* 进入市集按钮 */
.market-entry {
  width: 100%;
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

/* 回到认养界面按钮 */
.adopt-entry {
  width: 100%;
  margin-bottom: 20px;
}

.btn-secondary {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  background-color: white;
  color: #2e7d32;
  border: 2px solid #2e7d32;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.btn-secondary:hover {
  background-color: #f1f8e9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.15);
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

.popup-content p {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
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
  
  .tree-info h1 {
    font-size: 20px;
  }
  
  .tree-info p {
    font-size: 12px;
  }
  
  .health-bar span,
  .growth-bar span {
    font-size: 12px;
  }
  
  .seed-image,
  .tree-image {
    width: 180px;
    height: 180px;
  }
  
  .action-button {
    padding: 15px;
  }
  
  .button-icon {
    font-size: 20px;
  }
  
  .action-button span {
    font-size: 12px;
  }
  
  .btn-primary {
    padding: 14px;
    font-size: 14px;
  }
  
  .btn-secondary {
    padding: 14px;
    font-size: 14px;
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
  
  .tree-info h1 {
    font-size: 18px;
  }
  
  .tree-info p {
    font-size: 10px;
  }
  
  .health-bar span,
  .growth-bar span {
    font-size: 10px;
  }
  
  .seed-image,
  .tree-image {
    width: 150px;
    height: 150px;
  }
  
  .action-button {
    padding: 12px;
  }
  
  .button-icon {
    font-size: 18px;
  }
  
  .action-button span {
    font-size: 10px;
  }
  
  .btn-primary {
    padding: 12px;
    font-size: 12px;
    border-radius: 10px;
  }
  
  .btn-secondary {
    padding: 12px;
    font-size: 12px;
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