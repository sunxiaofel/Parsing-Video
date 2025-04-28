/**
 * 下载文件
 * @param {*} blobData
 * @param {*} filename
 */
export function download(blobData, filename) {
  const blob = blobData; // 直接拿到 blob 对象
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename; // 可以自定义文件名
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
