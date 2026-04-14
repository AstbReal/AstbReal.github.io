<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 弹窗状态
const showPopup = ref(false)

// 共养成员
const coAdopters = [
  { id: 1, name: '张三', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%2C%20cartoon%20style%2C%20male%2C%20friendly%20face&image_size=square' },
  { id: 2, name: '李四', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%2C%20cartoon%20style%2C%20female%2C%20friendly%20face&image_size=square' },
  { id: 3, name: '王五', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%2C%20cartoon%20style%2C%20male%2C%20glasses&image_size=square' }
]

// 打开弹窗
const openPopup = () => {
  showPopup.value = true
}

// 关闭弹窗
const closePopup = () => {
  showPopup.value = false
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
      <h1>邀请好友一起养树</h1>
      <div class="empty"></div>
    </div>

    <!-- 中部小树卡片 -->
    <div class="tree-card">
      <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20cherry%20tree%20with%20fruits%2C%20white%20background&image_size=square" alt="樱桃树" class="tree-image" />
      <h2>我的樱桃树</h2>
    </div>

    <!-- 共养成员 -->
    <div class="co-adopters-section">
      <h3>共养成员</h3>
      <div class="adopters-list">
        <div v-for="adopter in coAdopters" :key="adopter.id" class="adopter-item">
          <img :src="adopter.avatar" :alt="adopter.name" class="adopter-avatar" />
          <span class="adopter-name">{{ adopter.name }}</span>
        </div>
      </div>
    </div>

    <!-- 邀请卡片 -->
    <div class="invite-card">
      <p>快来和我一起照料这棵樱桃树吧！一起见证它的成长，分享收获的喜悦。</p>
      <button class="btn-primary" @click="openPopup">
        生成邀请海报
      </button>
    </div>

    <!-- 底部规则说明 -->
    <div class="rules-section">
      <h3>共养规则</h3>
      <ul>
        <li>每位共养成员都可以参与浇水、施肥等照料活动</li>
        <li>共养成员可以共同决定果实的分配</li>
        <li>邀请好友共养可以增加树的成长速度</li>
        <li>最多支持5位成员共同养护一棵树</li>
      </ul>
    </div>

    <!-- 弹窗 -->
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <h3>演示版：已生成海报</h3>
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

.tree-card {
  background-color: white;
  color: #333;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  text-align: center;
}

.tree-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 15px;
}

.tree-card h2 {
  font-size: 18px;
  font-weight: bold;
}

.co-adopters-section {
  margin-bottom: 30px;
}

.co-adopters-section h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
}

.adopters-list {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.adopter-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.adopter-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  border: 2px solid #4CAF50;
}

.adopter-name {
  font-size: 14px;
  text-align: center;
}

.invite-card {
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
}

.invite-card p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
  color: #333;
}

.invite-card button {
  padding: 12px 30px;
  font-size: 16px;
  font-weight: bold;
}

.rules-section {
  margin-top: auto;
  margin-bottom: 20px;
}

.rules-section h3 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #666;
}

.rules-section ul {
  font-size: 12px;
  line-height: 1.5;
  color: #666;
  list-style: none;
}

.rules-section li {
  margin-bottom: 5px;
  position: relative;
  padding-left: 15px;
}

.rules-section li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #4CAF50;
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
  
  .tree-image {
    width: 80px;
    height: 80px;
  }
  
  .tree-card h2 {
    font-size: 16px;
  }
  
  .co-adopters-section h3 {
    font-size: 14px;
  }
  
  .adopter-avatar {
    width: 50px;
    height: 50px;
  }
  
  .adopter-name {
    font-size: 12px;
  }
  
  .invite-card p {
    font-size: 14px;
  }
  
  .invite-card button {
    padding: 10px 20px;
    font-size: 14px;
  }
  
  .rules-section h3 {
    font-size: 12px;
  }
  
  .rules-section ul {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 16px;
  }
  
  .back-button {
    font-size: 18px;
  }
  
  .tree-image {
    width: 60px;
    height: 60px;
  }
  
  .tree-card h2 {
    font-size: 14px;
  }
  
  .co-adopters-section h3 {
    font-size: 12px;
  }
  
  .adopter-avatar {
    width: 40px;
    height: 40px;
  }
  
  .adopter-name {
    font-size: 10px;
  }
  
  .invite-card p {
    font-size: 12px;
  }
  
  .invite-card button {
    padding: 8px 16px;
    font-size: 12px;
  }
  
  .rules-section h3 {
    font-size: 10px;
  }
  
  .rules-section ul {
    font-size: 8px;
  }
}
</style>