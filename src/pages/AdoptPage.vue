<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 从URL参数中获取树名
const treeName = ref('樱桃树')

// 表单数据
const nickname = ref('')
const treeNickname = ref('')
const years = ref(1)

// 价格计算（基础价格）
const basePrice = ref(199)

// 计算总价
const totalPrice = computed(() => {
  return basePrice.value * years.value
})

// 认养年限选项
const yearOptions = [1, 3, 5, 10]

// 弹窗状态
const showPopup = ref(false)

// 初始化树名和价格
onMounted(() => {
  if (route.query.treeName) {
    treeName.value = route.query.treeName
  }
  if (route.query.price) {
    basePrice.value = parseInt(route.query.price)
  }
})

// 返回首页
const goBack = () => {
  router.push('/')
}

// 选择年限
const selectYear = (year) => {
  years.value = year
}

// 确认认养
const confirmAdopt = () => {
  showPopup.value = true
}

// 关闭弹窗并跳转到我的树页面
const closePopup = () => {
  showPopup.value = false
  router.push({
    path: '/my-tree',
    query: {
      nickname: nickname.value || '用户',
      treeName: treeNickname.value || '我的樱桃树'
    }
  })
}
</script>

<template>
  <div class="container">
    <!-- 顶部 -->
    <div class="header">
      <button class="back-button" @click="goBack">
        ←
      </button>
      <h1>{{ treeName }}认养</h1>
      <div class="empty"></div>
    </div>

    <!-- 表单区 -->
    <div class="form-container">
      <div class="form-item">
        <label>昵称/姓名</label>
        <input 
          type="text" 
          v-model="nickname" 
          placeholder="请输入您的昵称或姓名"
        />
      </div>

      <div class="form-item">
        <label>树名</label>
        <input 
          type="text" 
          v-model="treeNickname" 
          placeholder="请为您的树起个名字"
        />
      </div>

      <div class="form-item">
        <label>认养年限</label>
        <div class="year-buttons">
          <button 
            v-for="year in yearOptions" 
            :key="year"
            class="year-button"
            :class="{ active: years === year }"
            @click="selectYear(year)"
          >
            {{ year }}年
          </button>
        </div>
      </div>

      <div class="price-info">
        认养{{ years }}年，总价{{ totalPrice }}元
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom-button">
      <button class="btn-primary" @click="confirmAdopt">
        确认认养
      </button>
    </div>

    <!-- 弹窗 -->
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <h3>演示版：认养成功</h3>
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #333;
}

.empty {
  width: 44px;
}

/* 表单容器 */
.form-container {
  flex: 1;
}

.form-item {
  margin-bottom: 24px;
}

.form-item label {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
}

.form-item input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
  background-color: white;
  color: #333;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.form-item input:focus {
  outline: none;
  border-color: #2e7d32;
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.1);
}

.form-item input::placeholder {
  color: #999;
}

/* 年限选择 */
.year-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.year-button {
  flex: 1;
  min-width: 80px;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  background-color: white;
  color: #666;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.year-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.year-button.active {
  background-color: #2e7d32;
  color: white;
  border-color: #2e7d32;
  box-shadow: 0 2px 6px rgba(46, 125, 50, 0.2);
}

/* 价格信息 */
.price-info {
  margin-top: 24px;
  padding: 16px;
  background-color: white;
  border-radius: 12px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #2e7d32;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
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
  }
  
  .back-button {
    font-size: 18px;
  }
  
  .form-item {
    margin-bottom: 20px;
  }
  
  .form-item label {
    font-size: 13px;
  }
  
  .form-item input {
    padding: 12px 14px;
    font-size: 13px;
  }
  
  .year-button {
    padding: 10px 14px;
    font-size: 13px;
  }
  
  .price-info {
    padding: 14px;
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
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .header h1 {
    font-size: 15px;
  }
  
  .empty {
    width: 40px;
  }
  
  .form-item {
    margin-bottom: 16px;
  }
  
  .form-item label {
    font-size: 12px;
    margin-bottom: 8px;
  }
  
  .form-item input {
    padding: 10px 12px;
    font-size: 12px;
    border-radius: 10px;
  }
  
  .year-buttons {
    gap: 8px;
  }
  
  .year-button {
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 10px;
  }
  
  .price-info {
    padding: 12px;
    font-size: 13px;
    border-radius: 10px;
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