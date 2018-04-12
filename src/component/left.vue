<template>
    <div class="left">
      <div class="top">
        <div class="avatar">
          <img src="../assets/logo.png">
        </div>
        <div class="name">伍 伟</div>
        <div class="career">前端工程师</div>
        <div class="location">
          <img src="../assets/location.png">
          <span>浙江，杭州</span>
        </div>
      </div>
      <div class="middle">
        <div class="sex wrapper">
          <p class="content">男</p>
          <p class="type">性别</p>
        </div>
        <div class="age wrapper">
          <p class="content">26</p>
          <p class="type">年龄</p>
        </div>
        <div class="degree wrapper">
          <p class="content">硕士</p>
          <p class="type">学历</p></div>
      </div>
      <div class="bottom">
        <div class="contact">
          <img src="../assets/contact.png" class="pic">
          <span>联系方式</span>
        </div>
        <div class="phone contain">
          <img src="../assets/phone.png" class="pic">
          <span>159*****450</span>
        </div>
        <div class="email contain">
          <img src="../assets/email.png" class="pic">
          <span>574***131@qq.com</span>
        </div>
        <div class="wx contain">
          <img src="../assets/wx.png" class="pic">
          <span>Nirvana_cn</span>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .left
    width:300px
    display:flex
    flex-direction:column
    align-items:center
    .top
      width:100%
      display:flex
      flex-direction:column
      align-items:center
      background-color: #F6F7F7
      .avatar
        display:flex
        justify-content:center
        align-items:center
        margin:40px 0 20px
        width:130px
        height:130px
        background-color:#fff
        border-radius:50%
        img
          width: 100px
          height: 100px
      .name
        margin-bottom:10px
        font-weight:600
      .career
        margin-bottom:10px
      .location
        margin-bottom:40px
        img
          display:inline-block
          vertical-align: middle
          width: 20px
          height: 20px
        span
          display:inline-block
          vertical-align:middle
    .middle
      width:100%
      height:80px
      display:flex
      flex-direction:row
      justify-content:space-around
      align-items:center
      background-color: #F6F7F7
      text-align:center
      border-top: 1px solid #E9E9E8
      border-bottom: 1px solid #E9E9E8
      .wrapper
        display:flex
        flex-direction:column
        justify-content:center
        align-items:center
      .sex
        width:100%
        height:100%
        border-right: 1px solid #E9E9E8
      .age
        width:100%
        height:100%
        border-right: 1px solid #E9E9E8
      .degree
        width:100%
        height:100%
      .content
        font-weight:600
        margin-bottom:10px
      .type
        font-size:14px
    .bottom
      width:100%
      height:200px
      display:flex
      flex-direction:column
      justify-content:space-between
      text-align:center
      .contain
        display:flex
        flex-direction:row
        justify-content:flex-start
        align-items: center
        height:50px
        padding-left:60px
        border-bottom: 1px solid #E9E9E8
      .pic
        width: 20px
        height: 20px
        margin-right:30px
      .contact
        display:flex
        flex-direction:row
        justify-content:flex-start
        align-items: center
        height:50px
        padding-left:50px
        background-color: #F6F7F7
        border-bottom: 1px solid #E9E9E8
        img
          width: 35px
          height: 35px
          margin-right:24px


</style>
