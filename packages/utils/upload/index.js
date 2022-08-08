export default class UploadFiles {
    constructor(){
    }
    uploadCode(event) {
        //此处校验文件后缀
        var filea = event.target.files[0];
        let file = event.target.files[0].name; // (利用console.log输出看file文件对象)json
        let num = file.split(".");
        let mun = num[num.length - 1];
        if (mun === "gltf") {
          let _that = this;
          const selectedFile = event.target.files[0];
          // 读取文件名
          const name = selectedFile.name;
          // 读取文件大小
          const size = selectedFile.size;
          // FileReader对象，h5提供的异步api，可以读取文件中的数据。
          const reader = new FileReader();
          // readAsText是个异步操作，只有等到onload时才能显示数据。
          reader.readAsText(selectedFile);
          return URL.createObjectURL(selectedFile)
          this.gltfld(URL.createObjectURL(selectedFile))
        } else {
            return false
        //   this.$message({
        //     message: "请重新点击选择文件传入符合标准的文件",
        //     type: "warning",
        //   });
        }
      }
}