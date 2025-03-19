<template>
  <div>
    <div style=" margin: auto;
    width:85%;">
      <div style="margin-bottom: 25px">
        <el-input style="width: 240px;" placeholder="搜索书名" v-model="params.name"></el-input>
        <el-input style="width: 240px;" placeholder="搜索id" v-model="params.id"></el-input>
        <el-input style="width: 240px;" placeholder="搜索标识码" v-model="params.isbn"></el-input>
        <el-input style="width: 240px;" placeholder="搜索分类" v-model="params.category"></el-input>
        <el-button style="margin-left: 5px;" type="primary" @click="load"><i class="el-icon-search"></i>搜索</el-button>
        <el-button style="margin-left: 5px;" type="warning" @click="reset"><i class="el-icon-refresh"></i> 重置</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" ></el-table-column>
      <el-table-column prop="isbn" label="标识码" ></el-table-column>
      <el-table-column prop="name" label="书名" ></el-table-column>
      <el-table-column prop="description" label="简介" width="500px"></el-table-column>
      <el-table-column  prop="publishdate" label="出版日期" ></el-table-column>
      <el-table-column prop="publisher" label="出版社" ></el-table-column>
      <el-table-column prop="author" label="作者" ></el-table-column>
      <el-table-column prop="category" label="分类" ></el-table-column>
      <el-table-column prop="createtime" label="创建日期" ></el-table-column>
      <el-table-column prop="updatetime" label="更新日期" ></el-table-column>
      <el-table-column prop="cover" label="图片" width="180">
        <template v-slot="scope">
          <el-image :src="scope.row.cover" :preview-src-list="[scope.row.cover]">

          </el-image>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template v-slot="scope">
          <!--          scope.row就是当前行数据-->
          <el-button type="warning" icon="el-icon-edit"  @click="$router.push('/EditBook?id=' + scope.row.id)">修改
          </el-button>
          <el-popconfirm

              icon="el-icon-info"
              icon-color="red"
              title="您确认要删除该书籍信息吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" icon="el-icon-delete" slot="reference">删除</el-button>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 20px">
      <el-pagination
          background
          :current-page="params.pageNum"
          :page-size="params.pageSize"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total">
      </el-pagination>`
    </div>
  </div>
</template>

<script>

import request from "../../utils/request";

export default {
  name:'BookList',

  data() {
    return{
      tableData: [],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 10,
        id: '',
        isbn:'',
        name: '',
        category:'',
        createtime:'',
        updatetime:'',


      }
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      // fetch('http://localhost:9090/Book/list').then(res => res.json()).then(res => {
      //   console.log(res)
      //   this.tableData = res
     request.get('/book/page' , {
        params: this.params

      } ).then(res => {

        if(res.code === '200'){
          this.tableData = res.data.list
          this.total = res.data.total
          // console.log(this.tableData);
        }
      })

    },
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 10,
        name: '',
        id: '',
        isbn:'',
        category:'',
      }
      this.load()
    },
    handleCurrentChange(pageNum){
      //分页按钮触发份分页
      this.params.pageNum = pageNum
      this.load()
    },
    del(id){
      request.delete("/book/delete/" + id).then(res => {
        if(res.code === '200') {
            this.$notify.success("成功删除");
            this.load();
        }else{
          this.$notify.error(res.msg);
        }
      })

    }


  }


}
</script>

<style scoped>

</style>