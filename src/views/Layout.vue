<template>
  <div>

    <div class='top'>
      <div class="banner">
        <div class="top_nav" style="overflow: hidden">

          <!-- ele组件begin -->
          <el-menu :default-active="$route.path" mode="horizontal" router text-color="#ff0066"
                   active-text-color="#ffd04b">
            <!--            :default-active="$route.path" router class="el-menu-demo" style="margin-bottom: 10px"-->
            <el-submenu index="//">
              <template slot="title">用户相关</template>
              <el-menu-item index="">{{admin.username}}</el-menu-item>
              <el-menu-item index="/Collect">我的收藏</el-menu-item>
              <el-menu-item index="/login" @click="logout">退出</el-menu-item>

            </el-submenu>
            <el-submenu index="/">
              <template slot="title">管理模块</template>

              <el-submenu index="user">
                <template slot="title">会员管理</template>
                <el-menu-item>

                  <router-link to="/AddUser">会员添加</router-link>

                </el-menu-item>
                <el-menu-item>
                  <nav>
                    <router-link to="/userList">会员列表</router-link>
                  </nav>
                </el-menu-item>

              </el-submenu>
              <el-submenu index="admin">
                <template slot="title">管理员管理</template>
                <el-menu-item>

                  <router-link to="/AddAdmin">管理员添加</router-link>

                </el-menu-item>
                <el-menu-item>
                  <nav>
                    <router-link to="/AdminList">管理员列表</router-link>
                  </nav>
                </el-menu-item>

              </el-submenu>
              <el-submenu index="Category">
                <template slot="title">图书分类管理</template>
                <el-menu-item>

                  <router-link to="/AddCategory">图书分类添加</router-link>

                </el-menu-item>
                <el-menu-item>
                  <nav>
                    <router-link to="/CategoryList">图书分类列表</router-link>
                  </nav>
                </el-menu-item>

              </el-submenu>
              <el-submenu index="book">
                <template slot="title">图书管理</template>
                <el-menu-item>

                  <router-link to="/AddBook">图书添加</router-link>

                </el-menu-item>
                <el-menu-item>
                  <nav>
                    <router-link to="/BookList">图书列表</router-link>
                  </nav>
                </el-menu-item>

              </el-submenu>
            </el-submenu>
            <el-menu-item index="/">主页</el-menu-item>
            <el-menu-item index="/Cardbook">
              书籍售卖
            </el-menu-item>

          </el-menu>
          <!-- ele组件end -->
        </div>
        <div class="research">
          <div style="margin-top: 15px;">
            <el-input style="width: 88%" placeholder="请输入内容" v-model="params.name">

            </el-input>
            <el-button style="height: 40px;" type="primary" @click="load" class="el-icon-search"></el-button>

          </div>
        </div>
      </div>
      <!-- 滚动条begin -->

      <!-- 分类栏end -->

      <!-- 书籍推介begin -->
      <div>

      </div>
      <!-- 书籍推介end -->

    </div>

    <router-view/>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

import request from "@/utils/request";

export default {

  name: "Layout",
  data() {
    return {

       admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {},

          params: {
            name:'',
          },

      }



  },
  created() {
    // request.get('/admin/' + this.admin.accountId).then(res => {
    //   //此处未生效
    //
    //   this.admin = res.data;
    //   console.log(res.data);
    // })
  },
  methods: {
    load(){
      // fetch('http://localhost:9090/Book/list').then(res => res.json()).then(res => {
      //   console.log(res)
      //   this.tableData = res
      request.get('/book/page' , {
        params: this.params

      } ).then(res => {

        if(res.code === '200'){
          // tablecard:res.data.list
          this.tableData = res.data.list
          this.total = res.data.total
          // console.log(this.tableData);
          this.$router.push('/Cardbook');


        }
      })

    },
    set() {
      this.params = {
        pageNum: 1,
        pageSize: 12,
        name: '',
        id: '',
        isbn:'',
        category:'',
        price:''
      }


    },


    logout() {

      Cookies.remove('admin');
      this.$router.push('/login');


    },

  },

}
</script>

<style scoped>

</style>