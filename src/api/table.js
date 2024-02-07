import request from "@/utils/request";

export function getList(params) {
  return request({
    url: "/vue-admin-template/table/list",
    method: "get",
    params,
  });
}
export function gethxyList(data) {
  return request({
    url: "/mqtt/getKeyboardDataImpl",
    method: "get",
    data,
  });
}
