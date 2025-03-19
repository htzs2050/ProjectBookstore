<template>
  <div class="BP">
    <div style="width: 100%;height: 100%">
      <div style="margin: 0 auto;height:500px; width: 400px;  border-radius:10px;  padding: 30px;" >
        <div style="margin-top: 250px">
          <div style="width: 100px;margin: 0 auto;text-align: center;font-size: large;"><p>登录</p></div>
          <el-form :model="admin" :rules="ruleForm" ref="loginForm" >
            <el-form-item prop="accountId">
              <el-input placeholder="输入账号" prefix-icon="el-icon-user" v-model="admin.accountId"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="输入密码" show-password prefix-icon="el-icon-key" v-model="admin.password"></el-input>
            </el-form-item>
            <el-button type="primary" style="width: 100%" size="medium" @click="login">登录</el-button>


          </el-form>
        </div>



      </div>
    </div>

  </div>
</template>

<script>
import request from "@/utils/request";
import Cookies from 'js-cookie'

export  default  {
  name: 'LOGIN',
  data: function () {
    return {
      admin: {},
      ruleForm: {
        accountId: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          { min: 3, max: 30, message: '昵称长度在3-30之间', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          { min: 3, max: 30, message: '昵称长度在3-30之间', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login()  {
      this.$refs['loginForm'].validate((valid) => {
          if(valid){
            request.post('/admin/login',this.admin).then(res =>
                {
                  if(res.code === '200'){

                    this.$notify.success("登录成功");
                    this.$router.push('/');
                    if(res.data !== null){

                      Cookies.set('admin', JSON.stringify(res.data))  // 默认失效时间为该网站关闭时

                    }


                  }else {
                    this.$notify.error(res.msg);
                  }
                }
            )
          }else{

          }


      })

    }
  }
}
</script>
<style>
.BP{

  height: 100vh;
  background-size: cover;
  background-image: url("@/assets/XTU.jpg");

}
</style>