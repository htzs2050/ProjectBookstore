<template>
  <div class="home">
    <div id="rotate">
        <div class="block">
          <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
          <el-carousel height="450px">
            <el-carousel-item v-for="item in carousData" :key="item">
<!--              <h3 class="small">{{ item }}</h3>-->
              <img :src="item.url" alt="" style="height: 100%; width: 100%" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!-- 滚动图end -->


      <!-- 分类栏 begin-->
      <div id="stand" class="container">
        <el-row :gutter="0">
          <el-col :span="4" class="card">
           

            <el-card shadow="hover">
              <img src="@/assets/policy.png" class="logo_img">
             <div class="logo_text">人文社科</div>
            </el-card>
          </el-col>
          <el-col :span="4" class="card">
            
            <el-card shadow="hover" >
              <img src="@/assets/technology.png" class="logo_img">
              <div class="logo_text">
                科学技术
              </div>
            </el-card>
          </el-col>
          <el-col :span="4" class="card" >
           
            <el-card shadow="hover">
              <img src="@/assets/edu.png" class="logo_img">
                <div class="logo_text">教育教学</div>
              
            </el-card>
          </el-col>
          <el-col :span="4" class="card">
            <el-card shadow="hover">
              <img src="@/assets/art.png" class="logo_img">
             
                <div class="logo_text">
                艺术文学
              </div>
              
              
            </el-card>
          </el-col>
          <el-col :span="4" class="card">
            
            <el-card shadow="hover">
              <img src="@/assets/enco.png" class="logo_img">
              <div class="logo_text">
                经济金融
              </div>
            </el-card>
          </el-col>
          <el-col :span="4" class="card">
           
            <el-card shadow="hover">
              <img src="@/assets/health.png" class="logo_img">
              <div class="logo_text">
                健康养生
              </div>
            </el-card>
          </el-col>
         
        </el-row>
        <!-- gutter为栅栏间隔，span为列间隔 -->
      </div>
    <div style="background-color: chocolate;height: 100px">
        <div class="item">{{admin.accountId}}</div>
        <div class="item">{{admin.username}}</div>
        <div class="item">{{admin.phone}}</div>
    </div>
    </div>

  </template>


<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import request from "@/utils/request";
import Cookies from "js-cookie";

export default {
   name: 'Homeview',
  data(){
    return {
      admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {},
      carousData:[
        { url: "https://images-cn.ssl-images-amazon.cn/images/G/28/img13_audit/bmvd/ruoxuaz/prime/pc_tcg_1500x300_1539858457._CB480931237_.jpg"},
        { url: "https://api.pup.cn/filestore/ad/fd5bc8091a9745a1a388eadaebe8ec13.jpg"},
        { url: require("@/assets/轮播图1.png")},
        { url: require("@/assets/轮播图2.png")},
        { url: require("@/assets/轮播图3.png")}
      ]
    }

  },

  created() {
        request.get('/admin/' + this.admin.accountId).then(res => {
        //此处未生效

        this.admin = res.data
      })
      // console.log(JSON.parse(Cookies.get('admin')))
    },

  methods: {

  }
}
</script>
<style>
.item{
  margin: 10px 0;
}
</style>
