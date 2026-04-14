<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 树状态
const isSeed = ref(true)
const treeName = ref('我的樱桃树')
const userName = ref('用户')
const healthValue = ref(85)
const growthProgress = ref(60)

// 弹窗状态
const showPopup = ref(false)
const popupMessage = ref('')

// 季节背景（默认夏季）
const season = ref('summer')

// 按钮状态
const isFertilizerEnabled = ref(true) // 施肥/除虫按钮是否可用

// 模拟种子发芽动画
onMounted(() => {
  setTimeout(() => {
    isSeed.value = false
  }, 2000)
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
  openPopup('演示版：浇水功能')
}

// 施肥/除虫
const fertilizeTree = () => {
  if (isFertilizerEnabled.value) {
    openPopup('演示版：施肥/除虫功能')
  }
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
      <div v-if="isSeed" class="seed-container">
        <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=seed%20in%20a%20pot%2C%20cute%20cartoon%20style%2C%20white%20background&image_size=square" alt="种子" class="seed-image" />
      </div>
      <div v-else class="tree-image-container">
        <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20cherry%20tree%20with%20fruits%2C%20white%20background&image_size=square" alt="樱桃树" class="tree-image" />
      </div>
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
  align-items: center;
  transition: background-color 0.5s ease;
}

/* 季节背景 */
.container.summer {
  background-color: #e8f5e8;
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

.tree-info {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}

.tree-info h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.tree-info p {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.health-bar,
.growth-bar {
  margin-bottom: 15px;
}

.health-bar span,
.growth-bar span {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  text-align: left;
}

.progress-container {
  width: 100%;
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #4CAF50;
  border-radius: 5px;
  transition: width 0.3s ease;
}

.progress-bar.growth {
  background-color: #2196F3;
}

.tree-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
}

.seed-image,
.tree-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.tree-image {
  animation: grow 1s ease-out;
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.action-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
}

.market-entry {
  width: 100%;
  margin-bottom: 20px;
}

.market-entry button {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 768px) {
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
  
  .market-entry button {
    padding: 12px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
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
  
  .market-entry button {
    padding: 10px;
    font-size: 12px;
  }
}
</style>