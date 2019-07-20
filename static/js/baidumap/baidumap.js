var gzl_baidu_map = {
  // input_array 填入出发地和目的地元素的选择器
  init: function (geo) {
    "use strict";
    var d_geo = { lng: 114.133443, lat: 23.977559, scale: 20, name: "飞翔公园"};
    var geo_attr;
    if(geo === undefined){
      geo = d_geo;
    }else{
      for(geo_attr in d_geo){
        geo[geo_attr] = geo[geo_attr] === undefined ? d_geo[geo_attr] : geo[geo_attr];
      }
      d_geo = geo;
    }
    // 初始化地图
    var map = new BMap.Map("baidumap");
    // 创建点
    var point = new BMap.Point(geo.lng, geo.lat);
    // 定位点
    map.centerAndZoom(point, geo.scale);
    // 允许鼠标缩放
    map.enableScrollWheelZoom(true);
    // 创建标注
    var marker = new BMap.Marker(point);
    // 将标注添加到地图中
    map.addOverlay(marker);
    // 添加动画
    marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    // 将地图对象写入全局变量方便调用
    window.gzlmap = map;
    window.gzlpoint = point;
    window.marker = marker;
  },
  addMarker: function (geo) {
      var map = window.gzlmap;
      map.clearOverlays();
      var point = new BMap.Point(geo[0], geo[1]);
      map.centerAndZoom(point, 16);
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
      marker.setAnimation(BMAP_ANIMATION_BOUNCE);
  }
};

