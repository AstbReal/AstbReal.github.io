<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 弹窗状态
const showPopup = ref(false)

// 好友列表
const friends = [
  { id: 1, name: '张三', avatar: 'https://gitee.com/AstbReal/grow-up/raw/main/public/images/avatar.jpg' },
  { id: 2, name: '李四', avatar: 'https://gitee.com/AstbReal/grow-up/raw/main/public/images/avatar.jpg' },
  { id: 3, name: '王五', avatar: 'https://gitee.com/AstbReal/grow-up/raw/main/public/images/avatar.jpg' }
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
      <img src="https://gitee.com/AstbReal/grow-up/raw/main/public/images/cherry-tree.jpg" alt="我的树" class="tree-image" />
      <h2>我的树</h2>
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

/* 小树卡片 */
.tree-card {
  background-color: white;
  color: #333;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
  text-align: center;
  transition: all 0.3s ease;
}

.tree-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tree-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 15px;
}

.tree-card h2 {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

/* 共养成员 */
.co-adopters-section {
  margin-bottom: 24px;
}

.co-adopters-section h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.adopters-list {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.adopters-list::-webkit-scrollbar {
  display: none;
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
  border: 2px solid #2e7d32;
  box-shadow: 0 2px 6px rgba(46, 125, 50, 0.2);
}

.adopter-name {
  font-size: 14px;
  text-align: center;
  color: #333;
  font-weight: 500;
}

/* 邀请卡片 */
.invite-card {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.invite-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.invite-card p {
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 20px 0;
  color: #666;
}

.btn-primary {
  padding: 12px 30px;
  font-size: 14px;
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

/* 规则说明 */
.rules-section {
  margin-top: auto;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
  margin: 0;
  padding: 0;
}

.rules-section li {
  margin-bottom: 8px;
  position: relative;
  padding-left: 15px;
}

.rules-section li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #2e7d32;
  font-weight: bold;
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
  
  .tree-image {
    width: 80px;
    height: 80px;
  }
  
  .tree-card h2 {
    font-size: 15px;
  }
  
  .co-adopters-section h3 {
    font-size: 15px;
  }
  
  .adopter-avatar {
    width: 50px;
    height: 50px;
  }
  
  .adopter-name {
    font-size: 13px;
  }
  
  .invite-card p {
    font-size: 13px;
  }
  
  .btn-primary {
    padding: 10px 24px;
    font-size: 13px;
  }
  
  .rules-section h3 {
    font-size: 13px;
  }
  
  .rules-section ul {
    font-size: 11px;
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
  
  .tree-card {
    padding: 16px;
  }
  
  .tree-image {
    width: 60px;
    height: 60px;
  }
  
  .tree-card h2 {
    font-size: 14px;
  }
  
  .co-adopters-section h3 {
    font-size: 14px;
  }
  
  .adopter-avatar {
    width: 40px;
    height: 40px;
  }
  
  .adopter-name {
    font-size: 12px;
  }
  
  .invite-card {
    padding: 16px;
  }
  
  .invite-card p {
    font-size: 12px;
  }
  
  .btn-primary {
    padding: 8px 16px;
    font-size: 12px;
    border-radius: 10px;
  }
  
  .rules-section {
    padding: 12px;
  }
  
  .rules-section h3 {
    font-size: 12px;
  }
  
  .rules-section ul {
    font-size: 10px;
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