<template>
  <div style=" width: 100%">
    <div style=" margin: auto;
    width:85%;">
      <div style="margin-bottom: 25px">
        <el-input style="width: 240px;" placeholder="搜索用户名" v-model="params.nickname"></el-input>
        <el-input style="width: 240px;" placeholder="搜索号码" v-model="params.phone"></el-input>
        <el-input style="width: 240px;" placeholder="搜索id" v-model="params.accountId"></el-input>
        <el-button style="margin-left: 5px;" type="primary" @click="load"><i class="el-icon-search"></i>搜索</el-button>
        <el-button style="margin-left: 5px;" type="warning" @click="reset"><i class="el-icon-refresh"></i> 重置</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="accountId" label="账号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column prop="password" label="密码">
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间">
      </el-table-column>
      <el-table-column prop="updatetime" label="更新时间">
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <!--          scope.row就是当前行数据-->
          <el-button type="warning" icon="el-icon-edit"  @click="$router.push('/ManageUser?accountId=' + scope.row.accountId)">修改
          </el-button>
          <el-popconfirm

              icon="el-icon-info"
              icon-color="red"
              title="您确认要删除该用户吗？"
              @confirm="del(scope.row.accountId)"
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
  name : 'user',
  data() {
    return{
      tableData: [],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 10,
        name: '',
        phone: ''
      }
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      // fetch('http://localhost:9090/user/list').then(res => res.json()).then(res => {
      //   console.log(res)
      //   this.tableData = res
      request.get('/user/page' , {
        params: this.params
      } ).then(res => {

        if(res.code === '200'){
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })

    },
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 10,
        username: '',
        phone: '',
        accountId:'',
      }
      this.load()
    },
    handleCurrentChange(pageNum){
      //分页按钮触发份分页
      this.params.pageNum = pageNum
      this.load()
    },
    del(accountId){
      request.delete("user/delete/" + accountId).then(res => {
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