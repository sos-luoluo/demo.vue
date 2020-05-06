# demo.vue介绍

这是一个vue demo项目，目的是建设一个上手即用的vue项目。目前vue用在后台管理系统中较多，但是没有找到适合普通项目的demo，所以还是自己弄一个。
# 安装
## 克隆项目
git clone https://github.com/sos-luoluo/demo.vue
## 安装依赖
npm install
## 启动服务
npm run dev
# 开发
项目按照普通vue项目开发即可
# 发布
npm run build
将dist目录文件拷贝到项目目录即可
# 文档
## components 组件
### AjaxLoading
ajaxloading组件，可以作为普通vue组件使用，也支持方法调用。loading图标使用的ajaxloading.svg
show:function 显示loading
hide:function 隐藏loading
### Confirm
一个弹框确认的组件，仅支持方法调用。
### ListState
列表状态组件，配合listAjax使用。一般列表拥有常规状态、加载中、已无更多、暂无数据等状态
### PageLoading
PageLoading组件，可以作为普通vue组件使用，也支持方法调用，一般在页面之前调用，页面就绪之后隐藏。loading图标使用的pageloading.svg
show:function 显示loading
hide:function 隐藏loading
### SvgIcon
图标组件，图标放在icons,已注册为全局组件
### TinyMCE
富文本编辑器，使用方法参考官方文档https://github.com/tinymce/tinymce
### Tips
一个简易的消息提示组件，显示1.5s后消失
### Upload
上传图片组件，支持裁剪，支持多图
## directive 指令
### clipboard
复制指令
### waves
水波纹点击动画指令
## filters 过滤器
项目已经注册了timeFormat、priceFormat、timeIntervalChange、timeAgo等全局过滤器
## utils 公共库
### extensions
基础方法扩展
Array：求和、分组
Map：求长度
Object：递归序列化、是否为空、是否为数组
### base
基础方法
extend：合并对象，支持深度合并
isArray：判断对象是否为数组
Deferred：延迟对象，使用方法类似于jquery.Deferred
deferredAll: 将多个延迟对象合并为一个
random：随机数算法，支持自定义种子
guid： guid生成器
mmoize：缓存函数
serialize：序列化对象
convertTree：扁平数据转化为树状结构数据
base64：base64加解密方法
getFile：获取文件
WorkerManage：多线程管理器
userAgent：判断用户环境
### config
项目配置文件
environment：环境配置
version：程序版本
projectInfo：项目信息
ajaxConfig：ajax配置
pageConfig：页面配置
mobileConfig：移动端配置
key：key配置
### constants
静态数据
NPCInfo：虚拟用户
wordLib：字典库
regular：正则表达式
### cookie
cookie及localStorage操作方法
cookie：cookie操作方法
storage： localStorage操作方法
### form
表单操作方法，已封装表单验证方法
verificationCodeTime：验证码计时器

