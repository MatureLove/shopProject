<template>
  <div class="pagination">
    <!-- 上 -->
    <button @click="$emit('getPageNo', pageNo - 1)" :disabled="pageNo == 1">
      上一页
    </button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)" :class="{ active: pageNo == 1 }">
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中 -->
    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start"
      :class="{ active: pageNo == page }" @click="$emit('getPageNo', page)">
      {{ page }}
    </button>

    <!-- 下 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" :class="{ active: pageNo == totalPage }"
      @click="$emit('getPageNo', totalPage)">
      {{ totalPage }}
    </button>
    <button @click="$emit('getPageNo', pageNo + 1)" :disabled="pageNo == totalPage">
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条数据</button>
    <select style="margin-top: 2px; margin-left: 30px" v-model="size">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
    </select>
    <button @click="$emit('getPageSize', size)">修改每页展示的条数</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  data() {
    return {
      size: this.pageSize,
    };
  },
  computed: {
    //总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //分页器起始于结束数字计算
    startNumAndEndNum() {
      const { pageNo, continues, totalPage } = this;
      //给定起始数字和结束数字的初始值
      let start = 0,
        end = 0;
      //判断总页数是否小于连续页码数
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //判断其实数字是否小于1，因为不存在0页和-1页等
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //判断结束数字是否大于总页数
        if (end > totalPage) {
          end = totalPage;
          //起始数字等于总页数减去连续页码数+1
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}

.active {
  background-color: skyblue;
}
</style>
