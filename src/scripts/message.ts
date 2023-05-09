import { Action, ElMessageBox } from "element-plus";
type MessageType = "" | "success" | "warning" | "info" | "error";
const boxAlert = (
  type: MessageType,
  title: string,
  content: string,
  callback?: (action: Action) => void
) => {
  ElMessageBox.alert(content, title, {
    type,
    confirmButtonText: "OK",
    confirmButtonClass: "message-box-alert " + type,
    callback,
  });
};

const box = {
  alert: {
    success(
      title: string,
      content?: string,
      callback?: (action: Action) => void
    ): void {
      boxAlert("success", title, content || "", callback);
    },
    error(
      title: string,
      content?: string,
      callback?: (action: Action) => void
    ): void {
      boxAlert("error", title, content || "", callback);
    },
  },
};

export default { box };
