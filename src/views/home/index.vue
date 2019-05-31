<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.main,
.el-aside {
  height: 100%;
  background: $backcolor;
}
.el-menu {
  text-align: left;
  background: $backcolor;
}
.main {
  background: #e9ebee;
  color: $backcolor;
  display: flex;
  .aside {
    width: 200px;
    background: $backcolor;
  }
  .acside {
    width: 64px;
    background: $backcolor;
  }
  & > div {
    height: 100%;
  }
  & > div:last-child {
    flex: 1;
    .menucol {
      height: 100%;
      float: left;
      text-align: left;
      i {
        font-size: 36px;
        line-height: 65px;
      }
    }
    .userinfo {
      float: right;
      color: $backcolor;
      & > div {
        float: left;
        font-size: 14px;
        line-height: 60px;
      }
      & > div + div {
        margin-left: 10px;
      }
    }
    .biotabs {
      background: #fff;
      height: 40px;
      width: 100%;
      border-bottom: 1px solid #d8dce5;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
      padding: 0 20px;
      .biohome {
        width: 36px;
        float: left;
        i {
          font-size: 20px;
          line-height: 40px;
        }
      }
      .biocard {
        float: left;
      }
    }
  }
  .logo {
    width: 100%;
    height: 65px;
    padding: 10px;
    background: #2983cf;
    img {
      width: 100%;
      height: 100%;
      display: inline-block;
    }
  }
  .el-menu {
    border-right: solid 1px $backcolor;
  }
  .el-submenu,
  .el-menu-item {
    width: 100%;
  }
}
.el-tabs__item.is-active {
        background: #e9ebee;
    }
</style>
<template>
  <div class="main">
    <div :class="collapse?'acside':'aside'">
      <div class="logo">
        <img src="static/img/logo.png" alt v-if="!collapse">
        <img src="static/img/logo.png" alt v-else>
      </div>
      <el-menu
        :default-active="$route.path"
        router
        class="el-menu-vertical-demo"
        background-color="#444c63"
        text-color="#747f9a"
        active-text-color="#fff"
        :collapse-transition="collapsetrs"
        @select="menuselect"
        :unique-opened='unique'
      >
        <div v-for="(item,index) in menu" :key="index">
          <el-submenu v-if="item.children" index>
            <template slot="title">
              <div :index="item.path">
                <i :class="item.icon"></i>
                <span v-if="!collapse">{{item.name}}</span>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="items.path"
                :key="indexs"
                v-for="(items,indexs) in item.children"
              >
                <i :class="items.icon"></i>
                <span slot="title">{{items.name}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item :index="item.path" v-else>
            <i :class="item.icon"></i>
            <span v-if="!collapse">{{item.name}}</span>
          </el-menu-item>
        </div>
      </el-menu>
      <!-- <el-menu
        :unique-opened='true'
        :default-active="$route.path"
        router
        class="el-menu-vertical-demo"
        background-color="#444c63"
        text-color="#747f9a"
        active-text-color="#fff"
        :collapse-transition="collapsetrs"
        @select="menuselect">
        <el-menu-item index="/home">
        <i class="iconfont el-icon-biomain"></i>
        <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/infoentry">
          <i class="iconfont el-icon-biopen"></i>
          <span slot="title">信息录入</span>
        </el-menu-item>
        <el-menu-item index="/query">
          <i class="iconfont el-icon-biosearch"></i>
          <span slot="title">查询系统</span>
        </el-menu-item>
        <el-menu-item index="/scientific">
          <i class="iconfont el-icon-bioscientific"></i>
          <span slot="title">科研管理</span>
        </el-menu-item>
        <el-menu-item index="/preview">
          <i class="iconfont el-icon-bionews"></i>
          <span slot="title">预览系统</span>
        </el-menu-item>
        <el-submenu index='/authority'>
          <template slot="title">
            <i class="iconfont el-icon-bioshield"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/authority/role">角色管理</el-menu-item>
            <el-menu-item index="/authority/user">用户管理</el-menu-item>
            <el-menu-item index="/authority/depart">部门管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index='/dict'>
          <template slot="title">
            <i class="iconfont el-icon-zhiyebingbingliguanli"></i>
            <span>字典管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/dict/dict">字典编码管理</el-menu-item>
            <el-menu-item index="/dict/select">字典管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu> -->
    </div>
    <div>
      <el-header
        style="text-align: right; font-size: 12px;height: 65px;background: #fff;border:1px solid #e9ebee;"
      >
        <div class="menucol" @click="colchange">
          <i class="iconfont el-icon-biomenu"></i>
        </div>
        <div class="userinfo">
          <div>
            <i class="iconfont el-icon-biouserinfo" style="font-size:26px;line-height: 65px;"></i>
          </div>
          <div>医院科室名...</div>
          <div>
            <i class="iconfont el-icon-biorights"></i>
          </div>
          <div>
            <i class="iconfont el-icon-bioset" style="font-size:26px;line-height: 65px;"></i>
          </div>
        </div>
      </el-header>
      <div class="biotabs">
        <div class="biohome">
          <i class="iconfont el-icon-biomain"></i>
        </div>
        <div class="biocard">
          <el-tabs v-model="activeName" class="tags-view-wrapper" closable @tab-click="handleTabs" @tab-remove="removeTab">
            <el-tab-pane
              :key="item.name"
              v-for="(item) in topNavList"
              :label="item.name"
              :name="item.path"
            ></el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div style="padding:20px 20px 0;width:100%;box-sing:border-box;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      unique:true,
      collapsetrs: false,
      collapse: false,
      menu: [
        {
          name: "首页",
          icon: "iconfont el-icon-biomain",
          path: "/home"
        },
        {
          name: "信息录入",
          icon: "iconfont el-icon-biopen",
          path: "/infoentry"
        },
        {
          name: "查询系统",
          icon: "iconfont el-icon-biosearch",
          path: "/query"
        },
        {
          name: "科研管理",
          icon: "iconfont el-icon-bioscientific",
          path: "/scientific"
        },
        {
          name: "预览系统",
          icon: "iconfont el-icon-bionews",
          path: "/preview"
        },
        {
          name: "权限管理",
          icon: "iconfont el-icon-bioshield",
          children: [
            {
              name: "角色管理",
              icon: "",
              path: "/authority/role"
            },
            {
              name: "用户管理",
              icon: "",
              path: "/authority/user"
            },
            {
              name: "部门管理",
              icon: "",
              path: "/authority/depart"
            }
          ]
        },{
          name: "字典管理",
          icon: "iconfont el-icon-zhiyebingbingliguanli",
          path: "/dict/dict"
        },
      ],
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content"
        }
      ],
      topNavList: [
        {
          name: "首页",
          path: "/home"
        }
      ],
      activeName:'/home'
    };
  },
  watch:{
    activeName(newval,oldval){
      setTimeout(()=>{
      let tab=document.querySelectorAll('.el-tabs__item.is-top.is-active.is-closable');
      let bar=document.querySelectorAll('.el-tabs__active-bar.is-top');
      if(tab.length>0){
        bar[0].style.width=tab[0].offsetWidth+'px';
        bar[0].style.transform='translateX('+tab[0].offsetLeft+'px)';
      }
      
    })
    }
  },
  methods: {
    menuselect(index, indexPath,flag) {
      console.log(index, indexPath,flag)
      let obj = {};
      if (this.topNavList.some(item => indexPath[0] === item.path)) {
      } else {
        this.menu.forEach(item => {
          if (indexPath[0] === item.path) {
            obj = {
              path: indexPath[0],
              name: item.name
            };
          } else if (item.children) {
            item.children.forEach(items => {
              if (indexPath[0] === items.path) {
                obj = {
                path: indexPath[0],
                name: items.name
              };
              }
            });
          }
        });
        this.topNavList.push(obj);
      }
      this.activeName=indexPath[0];   
    },
    colchange() {
      this.collapse = !this.collapse;
    },
    handleTabs(){
      this.$router.push(this.activeName);
    },
    removeTab(targetName){
      this.topNavList.forEach((item,index)=>{
        if(targetName === item.path){
          this.topNavList.splice(index,1)
        }
      })
      this.activeName=this.topNavList[this.topNavList.length-1].name;
      this.$router.push(this.topNavList[this.topNavList.length-1].path)
    } 
  },
  mounted(){
    let path='/'+this.$route.path.split('/')[1];
    this.menuselect(0,[path]);
    setTimeout(()=>{
      let tab=document.querySelectorAll('.el-tabs__item.is-top.is-active.is-closable');
      let bar=document.querySelectorAll('.el-tabs__active-bar.is-top');
      if(tab.length>0){
        bar[0].style.width=tab[0].offsetWidth+'px';
        bar[0].style.transform='translateX('+tab[0].offsetLeft+'px)';
      }
    })
    
  },
  components: {}
};
</script>
