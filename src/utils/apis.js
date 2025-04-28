import instance from "./request";

export const getVideoInfo = (url) => {
  return instance.post("/video_info", { url: url });
};

export const downLoadApi = (url) => {
  return instance.post("/downLoad", { url: url }, { responseType: "blob" });
};
