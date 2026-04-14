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

// 初始化树名
onMounted(() => {
  if (route.query.treeName) {
    treeName.value = route.query.treeName
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.empty {
  width: 40px;
}

.form-container {
  flex: 1;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.year-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.year-button {
  flex: 1;
  min-width: 80px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.year-button.active {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.price-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #4CAF50;
}

.bottom-button {
  margin-top: 30px;
  margin-bottom: 20px;
}

.bottom-button button {
  width: 100%;
  padding: 15px;
  font-size: 18px;
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
  
  .form-item label {
    font-size: 12px;
  }
  
  .year-button {
    padding: 8px;
    font-size: 12px;
  }
  
  .price-info {
    font-size: 14px;
  }
  
  .bottom-button button {
    padding: 12px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 16px;
  }
  
  .back-button {
    font-size: 18px;
  }
  
  .form-item label {
    font-size: 10px;
  }
  
  .year-button {
    padding: 6px;
    font-size: 10px;
  }
  
  .price-info {
    font-size: 12px;
  }
  
  .bottom-button button {
    padding: 10px;
    font-size: 14px;
  }
}
</style>