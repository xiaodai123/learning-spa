# learning-spa
版本：webpack@3.11.0、vue@2.4.2、element-ui@2.3.6。

初始化（下载依赖包）：npm install

启动：

		1、开发模式：npm run dev-server
		
		2、生成模式：npm run prod-build
		
该项目采用多页应用，整体分为两部分，build文件夹是用来构建的代码，src文件夹是用来写业务代码的。

初始后台业务用mockjs做拦截http请求返回数据。后期采用node写。

该项目使用eslint规范开发。

# 没整明白nuxt如何去掉postcss.config.js文件

小图标采用阿里图标库：

	[class^="el-icon-spa"], [class*=" el-icon-spa"] {

  		font-family:"fontFamily" !important;
	
  		/* 以下内容参照第三方图标库本身的规则 */
	
  		font-size: 18px;
	
  		font-style:normal;
	
  		-webkit-font-smoothing: antialiased;
	
  		-moz-osx-font-smoothing: grayscale;
	
	}
