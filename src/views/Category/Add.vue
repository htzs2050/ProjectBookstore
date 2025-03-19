<template>
    <div style="padding: 0 15px;width: 50%">

      <h2>图书分类添加</h2>
      <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm"  label-width="90px" >
        <el-form-item label="图书分类名"  prop="name">
          <el-input v-model="form.name" placeholder="请输入需要添加的图书分类名"></el-input>
        </el-form-item>
        <el-form-item label="备注" >
          <el-input v-model="form.remark" placeholder="请输入需要添加的备注" ></el-input>
        </el-form-item>


<!--        <el-form-item label="邮箱"  prop="email">-->
<!--          <el-input v-model="form.phone" placeholder="请输入邮箱" ></el-input>-->
<!--        </el-form-item>-->


      </el-form>
      <div style="text-align: center;margin-top: 20px">
        <el-button type="primary" @click="save" size="medium">提交</el-button>


      </div>
    </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name:'AddCategory',
  data() {
    // const checkPhone = (rule, value, callback) => {
    //       if (!value) {
    //         return callback(new Error('手机号不能为空'));
    //       }
    //
    //         if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
    //           callback(new Error('请输入合法的手机号嗷'));
    //         }
    //         callback()
    //
    // };
    return {
      form: {
        remark:'',
        name:''
      },
      rules: {

        username: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          {min:3 , max: 10,  message: '昵称长度在3-10之间', trigger: 'blur'}
        ],
        // phone: [
        //   {validator: checkPhone , trigger:'blur'}
        // ],
      }
    }

  },
  methods: {

    save() {
      this.$refs['ruleForm'].validate((valid) => {
        if(valid) {
          request.post('/category/save', this.form).then(res => {
            if (res.code === '200') {
              // 通过是否等于200来判断本次请求是否成功
              //使用三等号来判断是否等于
              this.$notify.success('新增成功');
               //this.form = {};
               // this.$refs['ruleForm'].resetFields();
              this.$router.push("/CategoryList");
            } else {
            //  this.$notify.error('插入失败');
              this.$notify.error(res.msg)
            }
          })
        }
      });



    }

  }

}

</script>

