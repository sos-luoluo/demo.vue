module.exports = {
  devServer: {
    open: true,
    overlay: true, //出现错误之后会在页面中出现遮罩层提示
    proxy: {
      "/api": {
        target: "http://192.168.0.174:8085",
        //target: "https://www.bimao.com",
        // target: "https://vsys.yykik.com",
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true
      }
    }
  }
};
