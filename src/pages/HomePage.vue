<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 标签数据
const tabs = [
  { id: 'fruit', name: '果树类' },
  { id: 'ornamental', name: '观赏树类' },
  { id: 'memorial', name: '纪念树类' }
]

// 选中的标签
const activeTab = ref('fruit')

// 树数据
const trees = [
  { id: 1, name: '樱桃树', price: 199, category: 'fruit', image: '/images/cherry-tree-landscape.jpg' },
  { id: 3, name: '梨树', price: 249, category: 'fruit', image: '/images/pear-tree.jpg' },
  { id: 4, name: '桃树', price: 229, category: 'fruit', image: '/images/peach-tree.jpg', variety: '黄金油蟠' },
  { id: 5, name: '葡萄树', price: 299, category: 'fruit', image: '/images/grape-tree.jpg', variety: '阳光玫瑰' },
  { id: 6, name: '橙子树', price: 269, category: 'fruit', image: '/images/orange-tree.jpg', variety: '红美人果冻橙', recommended: true },
  { id: 7, name: '橘子树', price: 239, category: 'fruit', image: '/images/tangerine-tree.jpg', variety: '国庆一号无核蜜橘', recommended: true },
  { id: 8, name: '樱花树', price: 399, category: 'ornamental', image: '/images/cherry-blossom.jpg' },
  { id: 10, name: '银杏', price: 499, category: 'ornamental', image: '/images/ginkgo-tree.jpg' },
  { id: 12, name: '玉兰', price: 399, category: 'memorial', image: '/images/magnolia-tree.jpg' },
  { id: 14, name: '松柏', price: 699, category: 'memorial', image: '/images/pine-tree.jpg' }
]

// 根据选中的标签过滤树
const filteredTrees = computed(() => {
  return trees
    .filter(tree => tree.category === activeTab.value)
    .sort((a, b) => {
      // 推荐的树排在前面
      if (a.recommended && !b.recommended) return -1
      if (!a.recommended && b.recommended) return 1
      return 0
    })
})

// 切换标签
const switchTab = (tabId) => {
  activeTab.value = tabId
}

// 计算折扣后的价格
const getDiscountedPrice = (tree) => {
  // 检查是否是优惠时间（假设每天的9点到18点为优惠时间）
  const now = new Date()
  const hour = now.getHours()
  const isDiscountTime = hour >= 9 && hour < 18
  
  // 以下种类在优惠时间有8折优惠
  const discountTrees = ['樱桃树', '梨树', '桃树']
  
  if (isDiscountTime && discountTrees.includes(tree.name)) {
    return Math.round(tree.price * 0.8)
  }
  return tree.price
}

// 点击树卡片，跳转到认养页面
const goToAdopt = (tree) => {
  const price = getDiscountedPrice(tree)
  router.push({
    path: '/adopt',
    query: { 
      treeName: tree.name,
      price: price.toString()
    }
  })
}

// 跳转到我的树页面
const goToMyTree = () => {
  router.push('/my-tree')
}
</script>

<template>
  <div class="container">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="back-button">
        <span style="font-size: 20px;">&larr;</span>
      </div>
      <div class="page-title">认养一棵树</div>
      <div class="my-tree-entry" @click="goToMyTree">
        我的树
      </div>
    </div>

    <!-- 标签栏 -->
    <div class="tab-container">
      <div class="tab-scroll">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          class="tab-button"
          :class="{ active: activeTab === tab.id }"
          @click="switchTab(tab.id)"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>

    <!-- 卡片区 -->
    <div class="tree-list">
      <div 
        v-for="tree in filteredTrees" 
        :key="tree.id"
        class="tree-card"
        @click="goToAdopt(tree)"
      >
        <div class="tree-image-container">
          <img :src="tree.image" :alt="tree.name" class="tree-image" />
          <span v-if="tree.recommended" class="recommended-tag">推荐</span>
          <span v-if="getDiscountedPrice(tree) < tree.price" class="discount-tag">8折</span>
        </div>
        <div class="tree-info">
          <h3 v-if="tree.variety">{{ tree.variety }}</h3>
          <h3 v-else>{{ tree.name }}</h3>
          <p v-if="tree.variety" class="tree-name">{{ tree.name }}</p>
          <div class="tree-price">
            <span v-if="getDiscountedPrice(tree) < tree.price" class="original-price">{{ tree.price }}元/年起</span>
            {{ getDiscountedPrice(tree) }}元/年起
          </div>
        </div>
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
  background-color: #e8f5e9;
  position: relative;
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
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.page-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.my-tree-entry {
  padding: 8px 16px;
  background-color: white;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* 分类栏 */
.tab-container {
  margin-bottom: 20px;
  overflow: hidden;
}

.tab-scroll {
  display: flex;
  gap: 12px;
  padding: 10px 0;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tab-scroll::-webkit-scrollbar {
  display: none;
}

.tab-button {
  padding: 12px 24px;
  border: 1px solid #e0e0e0;
  background-color: white;
  border-radius: 24px;
  font-size: 14px;
  white-space: nowrap;
  font-weight: 500;
  color: #666;
  transition: all 0.3s ease;
}

.tab-button.active {
  background-color: #2e7d32;
  color: white;
  border-color: #2e7d32;
  box-shadow: 0 2px 6px rgba(46, 125, 50, 0.2);
}

/* 树列表 */
.tree-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tree-card {
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tree-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tree-image-container {
  position: relative;
  width: 100%;
  height: 200px;
}

.tree-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recommended-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff6b35;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.discount-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #ff4757;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 12px;
  margin-right: 8px;
}

.tree-info {
  padding: 16px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.tree-info h3 {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 0 4px 0;
}

.tree-name {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.tree-price {
  font-size: 16px;
  font-weight: bold;
  color: #2e7d32;
  white-space: nowrap;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 16px;
  }
  
  .page-title {
    font-size: 16px;
  }
  
  .my-tree-entry {
    padding: 6px 12px;
    font-size: 12px;
  }
  
  .tab-button {
    padding: 10px 20px;
    font-size: 13px;
  }
  
  .tree-image-container {
    height: 180px;
  }
  
  .tree-info h3 {
    font-size: 15px;
  }
  
  .tree-name {
    font-size: 13px;
  }
  
  .tree-price {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 12px;
  }
  
  .back-button {
    width: 40px;
    height: 40px;
  }
  
  .page-title {
    font-size: 15px;
  }
  
  .my-tree-entry {
    padding: 5px 10px;
    font-size: 11px;
  }
  
  .tab-button {
    padding: 8px 16px;
    font-size: 12px;
  }
  
  .tree-image-container {
    height: 150px;
  }
  
  .tree-info {
    padding: 14px;
  }
  
  .tree-info h3 {
    font-size: 14px;
  }
  
  .tree-name {
    font-size: 12px;
  }
  
  .tree-price {
    font-size: 14px;
  }
  
  .recommended-tag {
    padding: 4px 12px;
    font-size: 11px;
  }
}
</style>