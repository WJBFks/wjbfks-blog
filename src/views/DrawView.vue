<template>
  <div class="draw-view">
    <div class="menu">
      <el-button type="primary" @click="onNewOpen">新建</el-button>
      <el-button type="primary" @click="onOpenLink" plain>链接云项目</el-button>
    </div>
    <div class="divider">我的项目</div>
    <div class="my-draw">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="(item, index) in drawList"
          :key="item._id"
          :name="index"
        >
          <template #title>
            <span
              style="font-weight: bold"
              :style="item.online != 'offline' ? 'color: var(--blue)' : ''"
              >{{ item.name }}
            </span>
            <span style="color: gray">
              {{ "#" + item.code }}
              <span style="font-size: 1rem">
                {{
                  item.online == "private"
                    ? "(私有)"
                    : item.online == "public"
                    ? "(公开)"
                    : ""
                }}
              </span>
            </span></template
          >
          <div class="owner">创建者:{{ userInfo[item.owner].name }}</div>
          <div class="items">
            <el-tag
              class="item"
              v-for="(it, ind) in item.items"
              :key="it.name + it.weight"
              closable
              :disable-transitions="false"
              size="large"
              @close="removeItemDrawList(index, ind)"
            >
              <span style="font-weight: bold">{{ it.name }} </span>
              <span style="color: gray"> {{ "#" + it.weight }}</span>
            </el-tag>
            <el-button
              class="button-new-tag ml-1"
              style="font-size: 1.5rem"
              @click="addItemDrawList(index)"
            >
              + 新增
            </el-button>
          </div>
          <div class="operator">
            <el-button type="primary" plain @click="update(index)"
              >上传</el-button
            >
            <el-button type="primary" style="flex: 1" @click="draw(item.items)"
              >抽签</el-button
            >
            <el-button type="primary" plain @click="optRename(index)"
              >重命名</el-button
            >
            <el-button type="danger" plain @click="delDrawList(index)"
              >删除</el-button
            >
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="draw-new">
      <el-dialog v-model="newVisible">
        <template #title
          ><el-form-item>
            <el-input v-model="editDrawName" clearable /> </el-form-item
        ></template>
        <div class="tips" style="color: gray">
          每行一个项目，可以使用"#"为项目添加权重 <br />
          如<span style="color: var(--blue)">麻辣毛蛋#2</span>代表项目为<span
            style="color: var(--blue)"
            >麻辣毛蛋</span
          >，且权重为<span style="color: var(--blue)">2</span><br />
          权重越大抽中的概率越大，不填写权重默认为1<br />
        </div>
        <div class="form">
          <el-form>
            <el-form-item>
              <el-input
                type="textarea"
                v-model="editDrawForm"
                autosize
                autocomplete="off"
                clearable
                autofocus
                placeholder="在此输入项目"
              />
            </el-form-item>
          </el-form>
        </div>
        <span class="dialog-footer">
          <el-button @click="onNewCancel">取消</el-button>
          <el-button type="primary" @click="onNewConfirm">新建</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="draw-link">
      <el-dialog v-model="linkVisible" title="链接云项目">
        <el-form label-position="top">
          <el-form-item label="项目名称">
            <el-input v-model="linkDrawName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="项目编号">
            <el-input type="number" v-model="linkDrawCode" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="linkVisible = false" clearable>取消</el-button>
            <el-button type="primary" @click="onLinkConfirm" clearable
              >链接</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import message from "@/scripts/message";
import request from "@/scripts/request";
import User, { IUserData } from "@/scripts/user";
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";
import { ObjectId } from "bson";
import qs from "qs";
interface IDrawItem {
  name: string;
  weight: number;
}
interface IDraw {
  _id: string;
  name: string;
  code: number;
  owner: string;
  items: IDrawItem[];
  online: "offline" | "private" | "public";
}
const newVisible = ref(false);
const linkVisible = ref(false);
const editDrawName = ref("未命名项目");
const editDrawForm = ref("");
const linkDrawName = ref("");
const linkDrawCode = ref(null);
const toDraw = (str: string) => {
  let ans = [] as IDrawItem[];
  let ss = str.split("\n");
  for (let s of ss) {
    if (s == "") {
      continue;
    }
    let p = s.split("#");
    if (p.length == 1) {
      ans.push({
        name: p[0],
        weight: 1,
      });
    } else if (p.length == 2) {
      ans.push({
        name: p[0],
        weight: Number(p[1]),
      });
    } else {
      let n = [];
      let w = Number(p[p.length - 1]);
      for (let i = 0; i < p.length - 1; i++) {
        n.push(p[i]);
      }
      ans.push({
        name: n.join("#"),
        weight: w,
      });
    }
  }
  return ans;
};
const onNewOpen = () => {
  newVisible.value = true;
};
const onOpenLink = () => {
  linkVisible.value = true;
};
const onNewCancel = () => {
  newVisible.value = false;
};
const onNewConfirm = () => {
  newVisible.value = false;
  if (User.data == null) {
    return;
  }
  try {
    addDrawList({
      _id: new ObjectId().toString(),
      name: editDrawName.value,
      code: generateCode(editDrawName.value),
      items: toDraw(editDrawForm.value),
      owner: User.data._id,
      online: "offline",
    });
  } catch (err) {
    ElMessage({
      message: err as string,
      type: "error",
    });
  }
};
const onLinkConfirm = () => {
  if (linkDrawName.value == "" || linkDrawCode.value == null) {
    ElMessage({
      message: "名称和编号不能为空",
      type: "error",
    });
    return;
  }
  if (linkDrawCode.value < 100) {
    ElMessage({
      message: "云项目的编号一定是不小于100的",
      type: "error",
    });
    return;
  }
  linkVisible.value = false;
  request
    .post("userdraw", true, {
      name: linkDrawName.value,
      code: linkDrawCode.value,
    })
    .then(
      (res) => {
        ElMessage({
          message: res.data.msg,
          type: "success",
        });
      },
      (err) => {
        console.log(err);
        ElMessage({
          message: err.response.data.msg,
          type: "error",
        });
      }
    );
};
let drawList = reactive([] as IDraw[]);
const loadDrawList = async () => {
  let draws: IDraw[] = await request.get("draw", true).then(
    (res) => {
      return res.data.draws;
    },
    (err) => {
      console.log(err);
      return [];
    }
  );
  const isIn = (id: string) => {
    for (let i = 0; i < draws.length; i++) {
      if (id == draws[i]._id) {
        return true;
      }
    }
    return false;
  };
  console.log(draws);

  let str = localStorage.getItem("drawList");
  if (str != null) {
    let t = JSON.parse(str) as unknown as IDraw[];
    for (let i = 0; i < t.length; i++) {
      if (!isIn(t[i]._id)) {
        draws.push(t[i]);
      }
    }
  }
  for (let i = 0; i < draws.length; i++) {
    drawList.push(draws[i]);
    if (userInfo[draws[i].owner] == undefined) {
      userInfo[draws[i].owner] = {} as IUserData;
      request.get("users/" + draws[i].owner, false).then((res) => {
        userInfo[draws[i].owner] = res.data.user as IUserData;
      });
    }
  }
  return drawList;
};
const saveDrawList = () => {
  localStorage.setItem("drawList", JSON.stringify(drawList));
};
const addDrawList = (item: IDraw) => {
  drawList.push(item);
  console.log(JSON.stringify(drawList));
  saveDrawList();
};
const addItemDrawList = (index: number) => {
  ElMessageBox.prompt("请输入你要添加的项", "添加项", {
    confirmButtonText: "确定添加",
    cancelButtonText: "取消",
  }).then(({ value }) => {
    if (value == "" || value == null) {
      return;
    }
    drawList[index].items.push(toDraw(value)[0]);
    saveDrawList();
  });
};
const removeItemDrawList = (index: number, ind: number) => {
  drawList[index].items.splice(ind, 1);
  saveDrawList();
};
const delDrawList = (index: number) => {
  if (drawList[index].online) {
    ElMessageBox.confirm(
      "该项目储存在云端，如果删除项目会同时删除云端项目，其他所有导入该项目的用户都会受到影响，你确定要删除吗？",
      "删除云端项目",
      {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "error",
      }
    )
      .then(() => {
        console.log(drawList[index]._id);

        return request.del("draw/" + drawList[index]._id, true);
      })
      .then((res) => {
        if (res.status == 200) {
          drawList.splice(index, 1);
          saveDrawList();
          ElMessage({
            message: "删除成功，云端数据已删除",
            type: "success",
          });
        } else {
          console.log(res);
          throw "删除失败";
        }
      })
      .catch((err) => {
        if (typeof err == "string") {
          console.log(err);
        } else if (err.request.response == "删除失败，项目不存在") {
          drawList.splice(index, 1);
          saveDrawList();
          ElMessage({
            message: "云端数据不存在，已删除本地数据",
            type: "success",
          });
        } else {
          console.log(err.request.response);
          ElMessage({
            message: "删除失败",
            type: "error",
          });
        }
      });
  } else {
    ElMessageBox.confirm("你确定要删除该项目吗？", "删除项目", {
      confirmButtonText: "确定删除",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      drawList.splice(index, 1);
      saveDrawList();
      ElMessage({
        message: "删除成功",
        type: "success",
      });
    });
  }
};
const optRename = (index: number) => {
  ElMessageBox.prompt("请输入你要修改的项目名", "重命名", {
    confirmButtonText: "重命名",
    cancelButtonText: "取消",
  }).then(({ value }) => {
    renameDrawList(index, value);
  });
};
const renameDrawList = (index: number, value: string) => {
  drawList[index].name = value;
  drawList[index].code = generateCode(value);
  saveDrawList();
};
const getCodeByName = (name: string) => {
  let codes = [];
  let max = -1;
  for (let item of drawList) {
    if (item.name == name) {
      codes.push(item.code);
      if (item.code < 100 && max < item.code) {
        max = item.code;
      }
    }
  }
  return { codes, max };
};
// code是否冲突
const isConflict = (code: number, codes: number[]) => {
  for (let s of codes) {
    if (s == code) {
      return true;
    }
  }
  return false;
};
const generateCode = (name: string) => {
  const MAX = 100;
  let { codes, max } = getCodeByName(name);
  let code = (max + 1) % MAX;
  if (codes.length >= MAX) {
    throw new Error("无法创建更多同名项目");
  }
  while (isConflict(code, codes)) {
    code++;
  }
  return code;
};
const draw = (arr: IDrawItem[]) => {
  let sum = 0;
  arr.forEach((v) => {
    sum += v.weight;
  });
  let r = Math.floor(Math.random() * sum);
  sum = 0;
  let ans = "";
  for (let v of arr) {
    sum += v.weight;
    if (r <= sum) {
      ans = v.name;
      break;
    }
  }
  message.box.alert.success("抽签结果", ans);
};
const update = (index: number, online: "private" | "public" = "private") => {
  request
    .post("draw", true, {
      _id: drawList[index]._id,
      name: drawList[index].name,
      code: drawList[index].code,
      owner: drawList[index].owner,
      items: qs.stringify(drawList[index].items),
      online,
    })
    .then(
      (res) => {
        drawList[index].code = res.data.draw.code;
        drawList[index].online = online;
        saveDrawList();
        if (res.status == 200) {
          ElMessage({
            message: "上传成功，修改已在云端更新",
            type: "success",
          });
        } else if (res.status == 201) {
          ElMessage({
            message: "上传成功，项目已保存在云端",
            type: "success",
          });
        }
      },
      (err) => {
        ElMessage({
          message: err.response.data.msg,
          type: "error",
        });
      }
    );
};
let userInfo: { [index: string]: IUserData } = reactive({});
userInfo[User.data._id] = User.data;
loadDrawList();
const activeName = ref(0);
</script>

<style lang="stylus" scoped>
.draw-view
  min-height calc(100vh - 5.5rem)
  & .menu
    display flex
.draw-new
  /deep/& .el-dialog
    width 95vw
    max-width 720px
    height 80vh
    margin-top 10vh
    &>div
      padding-top 0
    & .el-dialog__header
      margin 0
      & .el-form-item.asterisk-left
        margin 0
    & .el-dialog__headerbtn
      display none
  & .form
    height calc(80vh - 180px)
    overflow-y auto
.draw-link
  /deep/& .el-dialog
    min-width 300px
.divider
  font-size 1.5rem
  color gray
  margin 0.5rem
/deep/.my-draw
  margin-left 0.5rem
  & .el-collapse-item__header
    font-size 1.5rem
    height 3rem
  & .el-collapse-item__content
    padding-bottom 0.5rem
  & .items
    display flex
    flex-wrap wrap
    & .el-tag__content
      font-size 1.5rem
    & .item
      margin-right 1rem
      margin-bottom 0.5rem
  & .owner
    text-align left
    color gray
  & .operator
    display flex
    margin-top 1rem
</style>
