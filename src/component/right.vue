<template>
  <div class="right">
    <div class="introduce">
      <p class="title">自我介绍</p>
      <p>1.对技术有执着的追求。熟悉前端基本技术，对Vue等流向框架有深入完整的实践。有较强的前端工程架构和组织能力</p>
      <p>2.有一定的技术视野。并不把自己局限在某个细小的领域，了解后端业务，了解基本的Linux命令以及运维技巧</p>
      <p>3.有很强的业务逻辑抽象能力。在项目中追求系统化、模块化、工程化。善于发现系统的弱点，并有能动性去改变缺陷。以追求系统的健壮性为终极目标</p>
      <p>4.在开发中一贯遵从代码格式规范，能够通过Git进行版本控制</p>
      <!--<p>个人博客 - http://iceiceice.top</p>-->
      <!--<p>Github - https://github.com/Nirvana-cn</p>-->
      <!--<p>在线简历 - https://resume.orangecat.top</p>-->
    </div>
    <div class="education">
      <p class="title">教育经历</p>
      <div class="school">
        <span>浙江理工大学</span>
        <span>研究生</span>
        <span>2016年9月 - 2019年3月</span>
      </div>
      <div class="school">
        <span>南京晓庄学院</span>
        <span>本科</span>
        <span>2011年9月 - 2015年6月</span>
      </div>
    </div>
    <div class="project">
      <p class="title">项目经历</p>
      <div>
        <p class="subtitle">基于JavaScript的智能车位管理系统</p>
        <p>软件开发领域有一个流行的原则：DRY，Don’t repeat yourself，我们翻译过来更形象通俗：不要重复造轮子。开源项目主要目的是共享，其实就是为了让大家不要重复造轮子，尤其是在互联网这样一个快速发展的领域，速度就是生命，引入开源项目，可以节省大量的人力和时间，大大加快业务的发展速度，何乐而不为呢？然而现实往往没有那么美好，开源项目虽然节省了大量的人力和时间，但带来的问题也不少，相信绝大部分同学都踩过开源软件的坑，小的影响可能是宕机半小时，大的问题可能是丢失几十万数据，甚至灾难性的事故是全部数据都丢失。</p>
      </div>
      <!--<div>-->
        <!--<p class="subtitle">基于webRTC的在线直播系统</p>-->
        <!--<p>在直播场景中，有一种情况是切换前后台造成累积延时。这里举个例子：在前台时，直播视频在播放，然后退到后台，此时暂停播放器，音视频数据继续缓存，当回到前台时，继续从刚才退出时的视频流数据开始播放，而实际的直播现在已经不在这个时间点了。这段前后台切换的时间里，就积累了一段延时。</p>-->
      <!--</div>-->
    </div>
    <div class="skill">
      <p class="title">个人技能</p>
      <p>较为扎实的HTML，CSS，JavaScript基础</p>
      <p>使用Vue开发前端页面，理解Vue组件式开发以及数据驱动的思想</p>
      <p>使用mpvue开发微信小程序</p>
      <p>使用Node.js开发后端服务器</p>
      <p>使用Weex开发原生app</p>
      <p>熟悉webpack、MongoDB、nginx等辅助技术，并具有一定的移动端适配经验</p>
    </div>
    <div class="prize">
      <p class="title">获奖情况</p>
      <p>2017年全国研究生数学建模竞赛三等奖</p>
      <p>2018年挑战者杯校赛一等奖</p>
      <p>2018年全国研究生移动端创新实践大赛</p>
      <p>申请国家发明专利两项</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.right
  width: 600px
  height:100%
  /*margin-left:20px*/
  padding:0 20px
  border:1px solid #ccc
  border-left:none
  .title
    margin: 20px 0
    font-size:18px
    font-weight:800
  p
    margin: 10px 0
  .school
    display:flex
    flex-direction:row
    justify-content:space-between
    margin-bottom:10px
  .project
    .subtitle
      font-weight:600
</style>
