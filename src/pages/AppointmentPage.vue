<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 弹窗状态
const showPopup = ref(false)
const showSuccessPopup = ref(false)

// 联系电话
const phone = ref('')

// 选中的日期和时间
const selectedDate = ref(null)
const selectedTime = ref(null)

// 时间段选项
const timeSlots = [
  { id: 'morning', name: '上午9-11' },
  { id: 'afternoon', name: '下午14-16' },
  { id: 'evening', name: '傍晚16-18' }
]

// 生成未来30天的日期
const dates = ref([])

// 生成日期
onMounted(() => {
  const today = new Date()
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    dates.value.push({
      date: date,
      day: date.getDate(),
      month: date.getMonth() + 1,
      isToday: i === 0,
      isPast: false // 这里简化处理，所有日期都可选
    })
  }
})

// 选择日期
const selectDate = (date) => {
  selectedDate.value = date
}

// 选择时间段
const selectTime = (timeSlot) => {
  selectedTime.value = timeSlot
}

// 提交预约
const submitAppointment = () => {
  showSuccessPopup.value = true
}

// 关闭弹窗
const closePopup = () => {
  showPopup.value = false
  showSuccessPopup.value = false
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
      <h1>预约线下看望小树</h1>
      <div class="empty"></div>
    </div>

    <!-- 日历区 -->
    <div class="calendar-section">
      <h2>选择日期</h2>
      <div class="calendar-grid">
        <div 
          v-for="(item, index) in dates" 
          :key="index"
          class="date-item"
          :class="{ 
            selected: selectedDate === item, 
            today: item.isToday 
          }"
          @click="selectDate(item)"
        >
          <div class="date-month">{{ item.month }}月</div>
          <div class="date-day">{{ item.day }}</div>
        </div>
      </div>
    </div>

    <!-- 时间段 -->
    <div class="time-section">
      <h2>选择时间段</h2>
      <div class="time-slots">
        <button 
          v-for="slot in timeSlots" 
          :key="slot.id"
          class="time-slot"
          :class="{ selected: selectedTime === slot }"
          @click="selectTime(slot)"
        >
          {{ slot.name }}
        </button>
      </div>
    </div>

    <!-- 联系电话 -->
    <div class="phone-section">
      <h2>联系电话</h2>
      <input 
        type="tel" 
        v-model="phone" 
        placeholder="请输入您的联系电话"
      />
    </div>

    <!-- 底部按钮 -->
    <div class="bottom-button">
      <button class="btn-primary" @click="submitAppointment">
        提交预约
      </button>
    </div>

    <!-- 预约成功弹窗 -->
    <div v-if="showSuccessPopup" class="popup">
      <div class="popup-content">
        <h3>预约成功</h3>
        <div class="appointment-code">
          <p>预约码：123456</p>
        </div>
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

/* 日历区、时间段、联系电话 */
.calendar-section,
.time-section,
.phone-section {
  margin-bottom: 24px;
}

.calendar-section h2,
.time-section h2,
.phone-section h2 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

/* 日历网格 */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.date-item {
  background-color: white;
  color: #333;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.date-item:hover {
  border-color: #2e7d32;
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(46, 125, 50, 0.1);
}

.date-item.selected {
  background-color: #2e7d32;
  color: white;
  border-color: #2e7d32;
  box-shadow: 0 2px 6px rgba(46, 125, 50, 0.2);
}

.date-item.today {
  border-color: #1976d2;
  font-weight: bold;
  box-shadow: 0 1px 3px rgba(25, 118, 210, 0.2);
}

.date-month {
  font-size: 12px;
  margin-bottom: 5px;
  color: #666;
}

.date-item.selected .date-month {
  color: rgba(255, 255, 255, 0.8);
}

.date-day {
  font-size: 16px;
  font-weight: bold;
}

/* 时间段选择 */
.time-slots {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.time-slot {
  flex: 1;
  min-width: 100px;
  padding: 12px;
  background-color: white;
  color: #333;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  font-weight: 500;
}

.time-slot:hover {
  border-color: #2e7d32;
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(46, 125, 50, 0.1);
}

.time-slot.selected {
  background-color: #2e7d32;
  color: white;
  border-color: #2e7d32;
  box-shadow: 0 2px 6px rgba(46, 125, 50, 0.2);
}

/* 联系电话输入框 */
.phone-section input {
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

.phone-section input:focus {
  outline: none;
  border-color: #2e7d32;
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.1);
}

.phone-section input::placeholder {
  color: #999;
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

/* 预约成功弹窗 */
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

.appointment-code {
  margin: 20px 0;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 12px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
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
  
  .calendar-section h2,
  .time-section h2,
  .phone-section h2 {
    font-size: 15px;
  }
  
  .date-item {
    padding: 8px;
  }
  
  .date-month {
    font-size: 10px;
  }
  
  .date-day {
    font-size: 14px;
  }
  
  .time-slot {
    padding: 10px;
    font-size: 13px;
  }
  
  .phone-section input {
    padding: 12px 14px;
    font-size: 13px;
  }
  
  .btn-primary {
    padding: 14px;
    font-size: 15px;
  }
  
  .appointment-code {
    padding: 14px;
    font-size: 16px;
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
  
  .calendar-section h2,
  .time-section h2,
  .phone-section h2 {
    font-size: 14px;
  }
  
  .date-item {
    padding: 6px;
  }
  
  .date-month {
    font-size: 8px;
  }
  
  .date-day {
    font-size: 12px;
  }
  
  .time-slots {
    gap: 8px;
  }
  
  .time-slot {
    padding: 8px;
    font-size: 12px;
  }
  
  .phone-section input {
    padding: 10px 12px;
    font-size: 12px;
    border-radius: 10px;
  }
  
  .btn-primary {
    padding: 12px;
    font-size: 14px;
    border-radius: 10px;
  }
  
  .appointment-code {
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