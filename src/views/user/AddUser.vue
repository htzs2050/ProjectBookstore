<template>
    <div style="padding: 0 15px;width: 50%">
<!--      会员添加-->
      <h2>会员添加</h2>
      <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm"  label-width="90px" >
        <el-form-item label="用户昵称"  prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入需要添加的用户昵称"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="">
          <el-input v-model="form.password" placeholder="请输入需要添加账号的密码" ></el-input>
        </el-form-item>
        <el-form-item label="真名" prop="">
          <el-input v-model="form.username" placeholder="请输入用户真名"  ></el-input>
        </el-form-item>
        <el-form-item label="手机"  prop="phone">
          <el-input v-model="form.phone" placeholder="请输入用户号码" ></el-input>
        </el-form-item>
        <el-form-item label="地址"  prop="">
          <el-input v-model="form.address" placeholder="请输入用户地址"></el-input>
        </el-form-item>
        <el-form-item label="性别">

          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
        </el-form-item>
      </el-form>
      <div style="text-align: center;margin-top: 20px">
        <el-button type="primary" @click="save" size="medium">提交</el-button>


      </div>
    </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name:'AddUser',
  data() {
    const checkPhone = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('手机号不能为空'));
          }

            if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
              callback(new Error('请输入合法的手机号嗷'));
            }
            callback()

    };
    return {
      form: {
        sex: '男'
      },
      rules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },

        ],
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        phone: [
          {validator: checkPhone , trigger:'blur'}
        ],
      }
    }

  },
  methods: {

    save() {
      this.$refs['ruleForm'].validate((valid) => {
        if(valid) {
          request.post('/user/save', this.form).then(res => {
            if (res.code === '200') {
              // 通过是否等于200来判断本次请求是否成功
              //使用三等号来判断是否等于
              this.$notify.success('新增成功');
              this.$router.push("/userlist");
              // this.form = {sex: '男'};
            } else {
              this.$notify.error('插入失败');
            }
          })
        }
      });

    }

  }

}

</script>

