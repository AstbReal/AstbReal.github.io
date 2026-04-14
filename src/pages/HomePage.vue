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
  { id: 1, name: '樱桃树', price: 199, category: 'fruit', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cherry%20tree%20with%20fruits%2C%20realistic%2C%20high%20quality%20photo&image_size=landscape_4_3' },
  { id: 2, name: '苹果树', price: 299, category: 'fruit', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=apple%20tree%20with%20apples%2C%20realistic%2C%20high%20quality%20photo&image_size=landscape_4_3' },
  { id: 3, name: '梨树', price: 249, category: 'fruit', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pear%20tree%20with%20pears%2C%20realistic%2C%20high%20quality%20photo&image_size=landscape_4_3' },
  { id: 4, name: '桃树', price: 229, category: 'fruit', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=peach%20tree%20with%20peaches%2C%20realistic%2C%20high%20quality%20photo&image_size=landscape_4_3' },
  { id: 5, name: '樱花树', price: 399, category: 'ornamental', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cherry%20blossom%20tree%2C%20beautiful%2C%20realistic%2C%20high%20quality%20photo&image_size=landscape_4_3' },
  { id: 6, name: '枫树', price: 349, category: 'ornamental', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=maple%20tree%20with%20red%20leaves%2C%20beautiful%2C%20realistic%2C%20high%20quality%20photo&image_size=landscape_4_3' },
  { id: 7, name: '银杏', price: 499, category: 'ornamental', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ginkgo%20tree%20with%20yellow%20leaves%2C%20beautiful%2C%20realistic%2C%20high%20quality%20photo&image_size=landscape_4_3' },
  { id: 8, name: '桂花', price: 299, category: 'ornamental', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=osmanthus%20tree%20with%20flowers%2C%20fragrant%2C%20realistic%2C%20high%20quality%20photo&image_size=landscape_4_3' },
  { id: 9, name: '玉兰', price: 399, category: 'memorial', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=magnolia%20tree%20with%20white%20flowers%2C%20elegant%2C%20realistic%2C%20high%20quality%20photo&image_size=landscape_4_3' },
  { id: 10, name: '国槐', price: 599, category: 'memorial', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20scholar%20tree%2C%20majestic%2C%20realistic%2C%20high%20quality%20photo&image_size=landscape_4_3' },
  { id: 11, name: '松柏', price: 699, category: 'memorial', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pine%20tree%2C%20evergreen%2C%20majestic%2C%20realistic%2C%20high%20quality%20photo&image_size=landscape_4_3' }
]

// 根据选中的标签过滤树
const filteredTrees = computed(() => {
  return trees.filter(tree => tree.category === activeTab.value)
})

// 切换标签
const switchTab = (tabId) => {
  activeTab.value = tabId
}

// 点击树卡片，跳转到认养页面
const goToAdopt = (tree) => {
  router.push({
    path: '/adopt',
    query: { treeName: tree.name }
  })
}

// 跳转到我的树页面
const goToMyTree = () => {
  router.push('/my-tree')
}
</script>

<template>
  <div class="container">
    <!-- 顶部标题 -->
    <div class="header">
      <h1>认养一棵树</h1>
      <p>选择你想认养的树种</p>
    </div>

    <!-- 右上角我的树入口 -->
    <div class="my-tree-entry" @click="goToMyTree">
      我的树
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
        <img :src="tree.image" :alt="tree.name" class="tree-image" />
        <div class="tree-info">
          <h3>{{ tree.name }}</h3>
          <div class="tree-price">{{ tree.price }}元/年起</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  position: relative;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.header p {
  font-size: 16px;
  color: #666;
}

.my-tree-entry {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
}

.tab-container {
  margin-bottom: 20px;
  overflow: hidden;
}

.tab-scroll {
  display: flex;
  gap: 10px;
  padding: 10px 0;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tab-scroll::-webkit-scrollbar {
  display: none;
}

.tab-button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
}

.tab-button.active {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.tree-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tree-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.tree-card:hover {
  transform: translateY(-5px);
}

.tree-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.tree-info {
  padding: 15px;
  position: relative;
}

.tree-info h3 {
  font-size: 18px;
  margin-bottom: 5px;
}

.tree-price {
  position: absolute;
  bottom: 15px;
  right: 15px;
  font-size: 14px;
  color: #4CAF50;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header h1 {
    font-size: 28px;
  }
  
  .header p {
    font-size: 14px;
  }
  
  .my-tree-entry {
    padding: 6px 12px;
    font-size: 12px;
  }
  
  .tab-button {
    padding: 8px 16px;
    font-size: 12px;
  }
  
  .tree-image {
    height: 180px;
  }
  
  .tree-info h3 {
    font-size: 16px;
  }
  
  .tree-price {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 24px;
  }
  
  .header p {
    font-size: 12px;
  }
  
  .my-tree-entry {
    padding: 4px 8px;
    font-size: 10px;
  }
  
  .tab-button {
    padding: 6px 12px;
    font-size: 10px;
  }
  
  .tree-image {
    height: 150px;
  }
  
  .tree-info h3 {
    font-size: 14px;
  }
  
  .tree-price {
    font-size: 10px;
  }
}
</style>