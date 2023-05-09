<template>
  <div
    class="user-view"
    :style="{
      'max-height': status == 'login' ? '350px' : '2000px',
    }"
  >
    <div class="title" v-if="status != 'user'">
      <div
        :class="status == 'login' ? 'selected' : ''"
        @click="toUser('login')"
      >
        登录
      </div>
      <div
        :class="status == 'register' ? 'selected' : ''"
        @click="toUser('register')"
      >
        注册
      </div>
    </div>
    <cropper-comp
      v-if="cropperVisible"
      :cropSize="256"
      :imagePath="imagePath"
      fileType="blob"
      @save="onSave"
      @cancel="onCancel"
      :ratio="1"
      :anchor="4"
      mode="scale"
    />
    <div
      class="container"
      :style="{
        'margin-left': status == 'login' ? '-100%' : '0',
      }"
    >
      <div class="card register" :class="status">
        <el-form
          ref="regRuleFormRef"
          :model="regRuleForm"
          :rules="status == 'register' ? regRules : userRules"
          label-width="5rem"
          class="demo-ruleForm"
          label-position="top"
          size="default"
          status-icon
        >
          <el-form-item label="头像" prop="avatar" class="avatar">
            <el-upload
              action="#"
              class="avatar-uploader"
              :show-file-list="false"
              :auto-upload="false"
              accept="image/*"
              :drag="true"
              :on-change="onChange"
            >
              <el-avatar
                v-if="regRuleForm.avatar"
                :size="196"
                :src="regRuleForm.avatar"
              />
              <el-avatar
                v-else
                :size="196"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
            </el-upload>
            <div style="display: flex">
              <el-button
                v-if="!modifyItem.avatar"
                class="modify"
                type="primary"
                plain
                disabled
                >点击头像进行修改</el-button
              >
              <el-button
                v-if="modifyItem.avatar"
                class="modify"
                type="primary"
                style="padding: 8px"
                @click="modifySave('avatar')"
                >保存</el-button
              >
              <el-button
                v-if="modifyItem.avatar"
                class="modify"
                type="danger"
                style="margin-left: 0; padding: 8px"
                @click="modifyCancel('avatar')"
                >取消</el-button
              >
            </div>
          </el-form-item>
          <el-form-item label="昵称" prop="name">
            <el-popover
              ref="popover"
              placement="top"
              :width="300"
              trigger="click"
              content="用户名不能小于4字节也不能大于20字节，英文字符算作1字节，中文字符算作2字符"
            >
              <template #reference>
                <el-input
                  v-model="regRuleForm.name"
                  :disabled="status == 'user' && !modifyItem.name"
                />
              </template>
            </el-popover>
            <el-button
              v-if="!modifyItem.name"
              class="modify"
              type="primary"
              plain
              @click="modifyStart('name')"
              >点击修改</el-button
            >
            <el-button
              v-if="modifyItem.name"
              class="modify"
              type="primary"
              style="padding: 8px"
              @click="modifySave('name')"
              >保存</el-button
            >
            <el-button
              v-if="modifyItem.name"
              class="modify"
              type="danger"
              style="margin-left: 0; padding: 8px"
              @click="modifyCancel('name')"
              >取消</el-button
            >
          </el-form-item>
          <el-form-item label="手机" prop="tel" v-if="status == 'register'">
            <el-popover
              ref="popover"
              placement="top"
              :width="160"
              trigger="click"
              content="手机号将被用于登录"
            >
              <template #reference>
                <el-input v-model="regRuleForm.tel" />
              </template>
            </el-popover>
          </el-form-item>
          <el-form-item label="手机" prop="tel" v-else-if="status == 'user'">
            <el-popover
              ref="popover"
              placement="top"
              :width="300"
              trigger="click"
            >
              <span style="color: red"
                >手机号将被用于登录，修改手机号会导致登录账号发生改变，请谨慎修改！</span
              >
              <template #reference>
                <el-input
                  v-model="regRuleForm.tel"
                  :disabled="status == 'user' && !modifyItem.tel"
                />
              </template>
            </el-popover>
            <el-button
              v-if="!modifyItem.tel"
              class="modify"
              type="primary"
              plain
              @click="modifyStart('tel')"
              >点击修改</el-button
            >
            <el-button
              v-if="modifyItem.tel"
              class="modify"
              type="primary"
              style="padding: 8px"
              @click="modifySave('tel')"
              >保存</el-button
            >
            <el-button
              v-if="modifyItem.tel"
              class="modify"
              type="danger"
              style="margin-left: 0; padding: 8px"
              @click="modifyCancel('tel')"
              >取消</el-button
            >
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              v-model="regRuleForm.pass"
              type="password"
              :disabled="status == 'user' && !modifyItem.pass"
              show-password
            />
            <el-button
              v-if="!modifyItem.pass"
              class="modify"
              type="primary"
              plain
              @click="modifyStart('pass')"
              >点击修改</el-button
            >
            <el-button
              v-if="modifyItem.pass"
              class="modify"
              type="primary"
              style="padding: 8px"
              @click="modifySave('pass')"
              >保存</el-button
            >
            <el-button
              v-if="modifyItem.pass"
              class="modify"
              type="danger"
              style="margin-left: 0; padding: 8px"
              @click="modifyCancel('pass')"
              >取消</el-button
            >
          </el-form-item>
          <el-form-item
            v-if="status == 'register'"
            label="确认密码"
            prop="verify"
            show-password
          >
            <el-input v-model="regRuleForm.verify" type="password" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group
              v-model="regRuleForm.gender"
              :disabled="status == 'user' && !modifyItem.gender"
            >
              <el-radio-button label="未知/其他" />
              <el-radio-button label="男" />
              <el-radio-button label="女" />
            </el-radio-group>
            <el-button
              v-if="!modifyItem.gender"
              class="modify"
              type="primary"
              plain
              @click="modifyStart('gender')"
              >点击修改</el-button
            >
            <el-button
              v-if="modifyItem.gender"
              class="modify"
              type="primary"
              style="padding: 8px"
              @click="modifySave('gender')"
              >保存</el-button
            >
            <el-button
              v-if="modifyItem.gender"
              class="modify"
              type="danger"
              style="margin-left: 0; padding: 8px"
              @click="modifyCancel('gender')"
              >取消</el-button
            >
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="regRuleForm.email"
              :disabled="status == 'user' && !modifyItem.email"
            />
            <el-button
              v-if="!modifyItem.email"
              class="modify"
              type="primary"
              plain
              @click="modifyStart('email')"
              >点击修改</el-button
            >
            <el-button
              v-if="modifyItem.email"
              class="modify"
              type="primary"
              style="padding: 8px"
              @click="modifySave('email')"
              >保存</el-button
            >
            <el-button
              v-if="modifyItem.email"
              class="modify"
              type="danger"
              style="margin-left: 0; padding: 8px"
              @click="modifyCancel('email')"
              >取消</el-button
            >
          </el-form-item>
          <el-form-item v-if="status == 'register'" class="submit">
            <el-button
              type="primary"
              @click="submitForm(status, regRuleFormRef)"
            >
              "注册"
            </el-button>
          </el-form-item>
          <el-form-item v-else-if="status == 'user'" class="submit">
            <el-button type="danger" @click="User.logout"> 登出 </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="card login">
        <el-form
          ref="logRuleFormRef"
          :model="logRuleForm"
          :rules="logRules"
          label-width="120px"
          class="demo-ruleForm"
          label-position="top"
          size="default"
          status-icon
        >
          <el-form-item label="手机" prop="tel">
            <el-input v-model="logRuleForm.tel" />
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              v-model="logRuleForm.pass"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item class="submit">
            <el-button
              type="primary"
              @click="submitForm(status, logRuleFormRef)"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import message from "@/scripts/message";
import request from "@/scripts/request";
import { ElMessage, FormInstance, FormRules, UploadFile } from "element-plus";
import { reactive, ref, watch, toRefs } from "vue";
import { AxiosError } from "_axios@1.1.3@axios";
import CropperComp from "../components/CropperComp.vue";
import { ImgCompressor } from "img-compressor";
import User from "@/scripts/user";
// TIPS 总
type StatusType = "login" | "register" | "user";
const status = ref("user" as StatusType);
const toUser = (p: string) => {
  router.push("/user?status=" + p);
};
watch(
  () => router.currentRoute.value.query,
  (now) => {
    if (now?.status == undefined) {
      status.value = "user";
    } else if (now?.status == "login") {
      status.value = "login";
    } else if (now?.status == "register") {
      status.value = "register";
    }
  },
  { immediate: true }
);
// TIPS 注册
const state = reactive({
  cropperVisible: false,
  imagePath: "",
} as {
  cropperVisible: boolean;
  imagePath: string;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onChange = (e: UploadFile) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state.imagePath = URL.createObjectURL(e.raw as any);
  state.cropperVisible = true;
  if (status.value == "user") {
    modifyItem.avatar = true;
  }
};

const blobToBase64 = (blob: Blob, callback: (base64: string) => void) => {
  const fileReader = new FileReader();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileReader.onload = (e: any) => {
    callback(e.target.result);
  };
  fileReader.readAsDataURL(blob);
};

function dealImage(
  base64: string,
  w: number,
  callback: (base64: string) => void
) {
  var newImage = new Image();
  var quality = 1; //压缩系数0-1之间
  newImage.src = base64;
  newImage.setAttribute("crossOrigin", "Anonymous"); //url为外域时需要
  var imgWidth, imgHeight;
  newImage.onload = function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imgWidth = (this as any).width;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imgHeight = (this as any).height;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    if (Math.max(imgWidth, imgHeight) > w) {
      if (imgWidth > imgHeight) {
        canvas.width = w;
        canvas.height = (w * imgHeight) / imgWidth;
      } else {
        canvas.height = w;
        canvas.width = (w * imgWidth) / imgHeight;
      }
    } else {
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      quality = 0.6;
    }
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ctx?.drawImage(this as any, 0, 0, canvas.width, canvas.height);
    var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
    callback(base64); //必须通过回调函数返回，否则无法及时拿到该值
  };
}

const onCancel = () => {
  state.cropperVisible = false;
};

const { cropperVisible, imagePath } = { ...toRefs(state) };

const regRuleFormRef = ref<FormInstance>();
const regRuleForm = reactive({
  name: "",
  tel: "",
  pass: "",
  verify: "",
  avatar: "",
  gender: "未知/其他",
  email: "",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSave = async (res: any) => {
  let imgCompressor = new ImgCompressor({
    width: 256,
    height: 256,
    quality: 1,
  });
  let blob = await imgCompressor.compressPromise(res);
  blobToBase64(blob, (base64) => {
    dealImage(base64, 256, (base64) => {
      regRuleForm.avatar = base64;
      console.log(base64);
    });
  });
  state.cropperVisible = false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkVerify = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== regRuleForm.pass) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkName = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else {
    let reg = new RegExp("[\\u4E00-\\u9FFF]+");
    let isASCII = (str: string) => {
      // eslint-disable-next-line no-control-regex
      return /^[\x00-\x7F]*$/.test(str);
    };
    let len = 0;
    for (let c of value) {
      if (reg.test(c)) {
        len += 2;
      } else if (isASCII(c)) {
        len += 1;
      } else {
        len += 3;
      }
    }
    if (len < 4 || len > 20) {
      callback(new Error("用户名不能小于4字节也不能大于20字节"));
    } else {
      callback();
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkEmail = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback();
  } else {
    var reg =
      /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("邮箱格式错误"));
    }
  }
};

const regRules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      validator: checkName,
      trigger: "blur",
    },
  ],
  tel: [
    {
      required: true,
      message: "请输入手机号",
      trigger: "change",
    },
    { min: 11, max: 11, message: "手机号必须是11位", trigger: "blur" },
  ],
  pass: [
    {
      required: true,
      message: "请设置密码",
    },
    {
      min: 6,
      max: 20,
      message: "密码必须不小于6位且不大于20位",
      trigger: "blur",
    },
  ],
  verify: [
    {
      required: true,
      message: "请再次输入密码",
    },
    {
      validator: checkVerify,
    },
  ],
  email: [
    {
      validator: checkEmail,
    },
  ],
});

const submitForm = async (
  mode: StatusType,
  formEl: FormInstance | undefined
) => {
  if (mode == "login") {
    if (!formEl) return;
    await formEl.validate((valid) => {
      if (valid) {
        request.post("login", { ...logRuleForm }).then(
          (res) => {
            User.data = res.data.user;
            User.token = res.data.token;
            User.isLogin = true;
            ElMessage({
              showClose: true,
              message: "登录成功",
              type: "success",
            });
          },
          (err: AxiosError) => {
            console.error(err);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            message.box.alert.error(
              "登录失败",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (err.response?.data as any).msg
            );
          }
        );
      }
    });
  } else if (mode == "register") {
    if (!formEl) return;
    await formEl.validate((valid) => {
      if (valid) {
        const map: { [index: string]: string } = {
          "未知/其他": "0",
          男: "1",
          女: "2",
        };
        let form = { ...regRuleForm };
        form.gender = map[form.gender];
        request.post("users", form).then(
          (res) => {
            User.data = res.data.user;
            User.token = res.data.token;
            User.isLogin = true;
            ElMessage({
              showClose: true,
              message: "注册成功",
              type: "success",
            });
          },
          (err: AxiosError) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            message.box.alert.error(
              "注册失败",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (err.response?.data as any).msg
            );
          }
        );
      }
    });
  }
};
// TIPS 登录
const logRuleFormRef = ref<FormInstance>();
const logRuleForm = reactive({
  tel: "",
  pass: "",
});
const logRules = reactive<FormRules>({
  tel: [
    {
      required: true,
      message: "请输入手机号",
      trigger: "change",
    },
  ],
  pass: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
});
// TIPS 用户
const userRules = reactive<FormRules>({
  name: [
    {
      validator: checkName,
      trigger: "blur",
    },
  ],
  tel: [{ min: 11, max: 11, message: "手机号必须是11位", trigger: "blur" }],
  pass: [
    {
      min: 6,
      max: 20,
      message: "密码必须不小于6位且不大于20位",
      trigger: "blur",
    },
  ],
  email: [
    {
      validator: checkEmail,
    },
  ],
});
const ifLogin = () => {
  if (router.currentRoute.value.path != "/user") {
    return;
  }
  if (User.isLogin == null) {
    return;
  }
  if (User.isLogin) {
    status.value = "user";
    router.push("/user");
    if (User.data) {
      const map = ["未知/其他", "男", "女"];
      regRuleForm.name = User.data.name;
      regRuleForm.tel = User.data.tel;
      regRuleForm.avatar = User.data.avatar;
      regRuleForm.gender = map[User.data.gender];
      regRuleForm.email = User.data.email;
      regRuleForm.pass = "";
    }
  } else {
    if (status.value == "user") {
      toUser("login");
      status.value = "login";
      regRuleForm.name = "";
      regRuleForm.tel = "";
      regRuleForm.pass = "";
      regRuleForm.verify = "";
      regRuleForm.avatar = "";
      regRuleForm.gender = "未知/其他";
      regRuleForm.email = "";
    }
  }
};
watch(
  () => [status.value, User.isLogin],
  () => {
    ifLogin();
  }
);
ifLogin();
type ModifyType = "avatar" | "name" | "tel" | "pass" | "gender" | "email";
let modifyItem = reactive({
  avatar: false,
  name: false,
  tel: false,
  pass: false,
  gender: false,
  email: false,
});
const modifyStart = (key: ModifyType) => {
  modifyItem[key] = true;
};
const modifySave = (key: ModifyType) => {
  let value = regRuleForm[key];
  if (key == "gender") {
    const map = ["未知/其他", "男", "女"];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value = map[(User.data as any).gender];
  }
  request
    .put("users", true, {
      key: key,
      value,
    })
    .then(
      () => {
        modifyItem[key] = false;
        const map = {
          avatar: "头像",
          name: "昵称",
          tel: "手机",
          pass: "密码",
          gender: "性别",
          email: "邮箱",
        };
        ElMessage({
          showClose: true,
          message: map[key] + "修改成功",
          type: "success",
        });
        if (User.data) {
          const user = User.data;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (user as any)[key] = value;
          User.data = user;
        }
        modifyItem[key] = false;
      },
      (err) => {
        message.box.alert.error("修改失败", err.response.data.msg);
      }
    );
};
const modifyCancel = (key: ModifyType) => {
  if (key == "gender") {
    const map = ["未知/其他", "男", "女"];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    regRuleForm.gender = map[(User.data as any).gender];
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    regRuleForm[key] = (User.data as any)[key] as any;
  }
  modifyItem[key] = false;
};
</script>

<style lang="stylus" scoped>
.user-view
  overflow hidden
  transition max-height 1s
.container
  min-width 200%
  transition margin-left 1s
.title
  font-size 1.75rem
  font-weight bold
  cursor pointer
  display flex
  color gray
  margin-left 1rem
  margin-bottom 3rem
  & .selected
    color var(--blue)
    transition color 0.5s
  & div
    margin-right 1rem
.card
  float left
  width 50%
  display flex
  justify-content center
  padding-bottom 3rem
  &.register
    /deep/& .el-radio-group
      width 100%
      & .el-radio-button
        flex 1
        & .el-radio-button__inner
          width 100%
  & .el-form
    width 100%
    max-width 500px
  /deep/& .submit .el-form-item__content
    display flex
    justify-content center
    & .el-button
      width 100%
/deep/.el-form-item__content
  display flex
  justify-content center
  & .el-upload-dragger
    border 0
    padding 0
.cropper
  height 100vh
  width 100vw
  position absolute
.modify
  display none
/deep/.user
  & .el-input, .el-radio-group
    flex 1
  & .modify
    display block
  & .el-radio-button__original-radio:disabled:checked+.el-radio-button__inner
    background-color var(--el-color-primary-light-3)
    color white
  & .avatar .el-form-item__content
    flex-direction column
</style>
