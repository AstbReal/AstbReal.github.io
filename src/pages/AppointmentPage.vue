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

.calendar-section,
.time-section,
.phone-section {
  margin-bottom: 30px;
}

.calendar-section h2,
.time-section h2,
.phone-section h2 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
}

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
  border: 1px solid #ddd;
  transition: all 0.3s ease;
}

.date-item:hover {
  border-color: #4CAF50;
}

.date-item.selected {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.date-item.today {
  border-color: #2196F3;
  font-weight: bold;
}

.date-month {
  font-size: 12px;
  margin-bottom: 5px;
}

.date-day {
  font-size: 16px;
  font-weight: bold;
}

.time-slots {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.time-slot {
  flex: 1;
  min-width: 100px;
  padding: 12px;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.time-slot:hover {
  border-color: #4CAF50;
}

.time-slot.selected {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
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

.appointment-code {
  margin: 20px 0;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;
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
  
  .calendar-section h2,
  .time-section h2,
  .phone-section h2 {
    font-size: 14px;
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
    font-size: 12px;
  }
  
  .bottom-button button {
    padding: 12px;
    font-size: 14px;
  }
  
  .appointment-code {
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
  
  .calendar-section h2,
  .time-section h2,
  .phone-section h2 {
    font-size: 12px;
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
  
  .time-slot {
    padding: 8px;
    font-size: 10px;
  }
  
  .bottom-button button {
    padding: 10px;
    font-size: 12px;
  }
  
  .appointment-code {
    padding: 10px;
    font-size: 14px;
  }
}
</style>