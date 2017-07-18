/**
 * Created by 1 on 2017/6/23.
 */
;$(function(){
    //图片hover
   $(".pic_show").hover(function(){
       $(this).addClass('hover');
   },function(){
       $(this).removeClass('hover');
        });
   $(".pic_show h3").hover(function () {
       $(this).addClass('hover');
   }, function () {
       $(this).removeClass('hover');
   });
   $(".pic_show p").hover(function () {
       $(this).addClass('hover');
   }, function () {
       $(this).removeClass('hover');
   });
    //活动详情hover
   $(".pic_show .btn span").hover(function () {
       $(this).addClass('hover');
   }, function () {
       $(this).removeClass('hover');
   });
});