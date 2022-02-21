<template>
  <div ref="listRef" class="infinite-list-container" @scroll="scrollEvent($event)">
    <div class="infinite-list-phantom" :style="{height: totalHeight + 'px'}"></div>
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div ref="items"
        class="infinite-list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemSize + 'px',lineHeight: itemSize + 'px' }"
      >{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
const data = []

for(let i = 0; i< 20000; i++) {
  data.push({
    id: i,
    value: `item${i}`
  })
}


import { reactive, ref, computed, onMounted } from "vue";
 export default {
   props: {
     msg: String
   },
   setup(props) {
     const itemSize = ref(60);
     const startOffset = ref(0);
     const screenHeight = ref(0);
     const start = ref(0);
     const end = ref(0)
     const listRef = ref()
    //  const visibleData = computed(() => )
    const totalHeight = computed(() => itemSize.value  * data.length)
    const visibleCount = computed(() => Math.ceil(screenHeight.value / itemSize.value));
    const visibleData = computed(() => data.slice(start.value, Math.min(end.value, data.length)));
    const getTransform = computed(() => `translate3d(0,${startOffset.value}px,0)`);

     const scrollEvent = e => {
        const scrollTop = listRef.value.scrollTop;
        start.value = Math.floor(scrollTop / itemSize.value);
        end.value = start.value + visibleCount.value;
        startOffset.value = scrollTop - (scrollTop % itemSize.value);
        console.log(startOffset.value, scrollTop)
     }
    
    //  console.log("visibleData", itemSize, visibleData,list.value)
     onMounted(() => {
       screenHeight.value = listRef.value.clientHeight;
       end.value = start.value + visibleCount.value;
     })
     return {
       visibleData,
       totalHeight,
       itemSize,
       listRef,
       getTransform,
       scrollEvent
     }
   }
 }
</script>

<style>
.infinite-list-container {
  height: 100vh;
  overflow: auto;
  position: relative;
}
.infinite-list-phantom {
  position: absolute;
  left: 0;
  right: 0;
  top:0;
  z-index: -1;
}
.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}
.infinite-list-item {
  line-height: 50px;
  text-align: center;
  color: #555;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

</style>