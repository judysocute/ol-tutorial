"use client";
import React, { useEffect, useRef, useMemo } from "react";
import {
  ZoomSlider,
  ScaleLine,
  OverviewMap,
  FullScreen,
  MousePosition,
} from "ol/control";
import type { Control } from "ol/control";
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

import { createStringXY } from "ol/coordinate";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { Stroke, Style, Fill } from "ol/style";
// import TileSource from "ol/layer";
import { register } from "ol/proj/proj4";
import proj4 from "proj4";
import { configBasemap } from "@/app/config/basemap";
import { Tile } from "ol/source";
import OSM from "ol/source/OSM";

proj4.defs(
  "EPSG:3826",
  "+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);

register(proj4);

const geojsonData = {
  type: "FeatureCollection",
  crs: {
    type: "name",
    properties: {
      name: "EPSG:3826",
    },
  },
  features: [
    {
      type: "Feature",
      id: 16,
      geometry: {
        type: "LineString",
        coordinates: [
          [296396.72799417039, 2772682.1894586021],
          [296408.22903794236, 2772648.8550580316],
          [296402.2761829645, 2771349.2287268392],
          [296425.86617186479, 2770430.9546751003],
          [296457.81126049819, 2770216.2118949336],
          [296837.33073879144, 2769288.6917546685],
          [297126.13607243734, 2768670.3449095902],
          [297181.67560026643, 2768537.0485720653],
          [297207.59369947424, 2768416.7117771744],
          [297210.90513308049, 2768389.0770076169],
          [297204.91971117252, 2768314.8618114362],
          [297159.43262167001, 2768235.8586085304],
          [296770.67574627686, 2767705.8013738263],
          [296763.27027172415, 2767670.6260270225],
          [296778.08079301455, 2767642.8559054579],
          [296968.76756742661, 2767494.7483376325],
          [296987.28092190006, 2767483.6402742006],
          [297022.45621361991, 2767487.3427819796],
          [297135.38802509248, 2767570.6523613948],
          [297218.69813383353, 2767603.9760470041],
          [297296.45427092555, 2767618.7863520049],
          [297376.06161707488, 2767605.8266917621],
          [297548.23535152548, 2767541.0291746068],
          [297711.15226434445, 2767437.3537576338],
          [298016.62146378867, 2767231.8543424662],
          [298148.06584165443, 2767146.6923670387],
          [298364.67141514958, 2767039.3140538055],
          [298507.22379844578, 2766959.7061208365],
          [298727.53207485669, 2766839.3683774811],
          [299360.68679280271, 2766511.6795147252],
          [299429.18600977829, 2766465.3958532307],
          [299458.73650257202, 2766422.0262103467],
          [299523.60326505871, 2766285.8159856768],
          [299538.41380964592, 2766263.5999553697],
          [299562.48109744518, 2766239.5324540315],
          [299820.4693891764, 2766119.7418525284],
          [299858.69396288897, 2766108.0863931477],
          [300104.92138628347, 2766130.3013777887],
          [300125.28609480686, 2766124.7472970379],
          [300149.17677067517, 2766098.6667632372],
          [300158.60947173933, 2765972.9377542697],
          [300190.08192333358, 2765935.9109072122],
          [300441.86744438519, 2765709.9100851822],
          [300469.63225207594, 2765676.7229175419],
          [300486.294061361, 2765639.696135581],
          [300567.75184684939, 2765424.9410471758],
          [300597.37293519708, 2765380.5088865981],
          [300797.31621929829, 2765202.7798861],
          [300825.08619145071, 2765184.2664596653],
          [300858.41017882113, 2765171.307000068],
          [302370.94911703042, 2764973.2075767345],
          [302676.41867494967, 2764852.8694494078],
          [302928.19994888199, 2764821.3957188507],
          [303065.19862957788, 2764808.4356997786],
          [303178.12986780371, 2764784.3679045006],
          [303211.45383009838, 2764765.8543527778],
          [303215.1563674222, 2764738.0843800781],
          [303205.51132921939, 2764719.9016240034],
          [303148.50800099515, 2764652.9232757958],
          [303080.00827012298, 2764582.5729230833],
          [303056.05180289387, 2764542.8943771934],
          [303020.7652084821, 2764493.7091252673],
          [303009.65703828784, 2764451.1284748819],
          [303018.30113538285, 2764418.6263026875],
          [303035.57540868048, 2764371.5209524259],
          [303059.64259503735, 2764347.4535505679],
          [303154.06025937281, 2764262.2917337767],
          [303289.20723934821, 2764166.0217541666],
          [303528.02853249258, 2764006.8059813366],
          [303568.75779067795, 2763982.7385055963],
          [303616.89245195716, 2763977.1843010662],
          [303894.59253688483, 2763966.0749874678],
          [304287.0754606839, 2763991.9919715938],
          [304638.82892909122, 2763997.5444005034],
          [304827.66502083803, 2763999.394891615],
          // 加入所有座標點...
        ],
      },
      properties: {
        FID: 16,
        OBJECTID: 13,
        LENGTH: 15.4,
        RouteName: "環狀線",
      },
    },
  ],
};

export default function MyMap({
  width = "500px",
  height = "500px",
  projection = "EPSG:3857",
}: {
  width?: string;
  height?: string;
  projection?: string;
}) {
  // DOM 元素的 ref (HTMLDivElement)
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef<HTMLDivElement>(null);
  // OpenLayers Map 實例的 ref
  const mapInstanceRef = useRef<Map | null>(null);
  const mapLayers = useMemo<TileLayer[]>(() => {
    return configBasemap.map((item) => {
      return new TileLayer({
        source: item.urls[0].name,
        opacity: item.opacity,
        visible: item.initVisible,
        properties: {
          id: item.id,
          name: item.name,
          image: item.image,
        },
      });
    });
  }, []);

  function addZoomsliderContro() {
    const control = new ZoomSlider();
    control.setProperties({ id: "zoomSlider" });
    addControl(control);
  }

  function addScaleLineControl() {
    const control = new ScaleLine({ units: "metric" });
    control.setProperties({ id: "scaleLine" });
    addControl(control);
  }

  function addFullScreenControl() {
    const control = new FullScreen();
    control.setProperties({ id: "fullScreen" });
    addControl(control);
  }

  function addMousePositionControl() {
    const control = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: "EPSG:4326",
      className: "custom-mouse-position",
      target: mousePositionRef.current!,
    });
    control.setProperties({ id: "mousePosition" });
    addControl(control);
  }

  function addOverViewControl() {
    const control = new OverviewMap({
      className: "ol-overviewmap ol-custom-overviewmap",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}",
            wrapX: true,
          }),
          opacity: 1,
          visible: true,
          properties: {
            id: "Taiwan_Orthophoto",
            name: "臺灣正射影像圖(通用版)",
            image: "Taiwan_Orthophoto.png",
          },
        }),
      ],
      collapseLabel: "\u00BB",
      label: "\u00AB",
      collapsed: false,
    });
    control.setProperties({ id: "overviewMap" });
    addControl(control);
  }

  function addControl(control: Control) {
    if (!mapInstanceRef.current) {
      return;
    }
    mapInstanceRef.current.addControl(control);
  }
  function removeControl(ap: Map, control: Control) {
    if (!mapInstanceRef.current) {
      return;
    }
    mapInstanceRef.current.removeControl(control);
  }

  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = new Map({
      target: mapContainerRef.current!,
      layers: mapLayers,
      view: new View({
        projection: projection,
        center: [0, 0], //
        zoom: 2,
      }),
    });

    // 建立 GeoJSON 格式化器，指定來源投影
    const geojsonFormat = new GeoJSON({
      dataProjection: "EPSG:3826", // 資料的投影（TWD97）
      featureProjection: "EPSG:3857", // 地圖的投影（Web Mercator）
    });

    const features = geojsonFormat.readFeatures(geojsonData);

    // 建立向量資料源
    const vectorSource = new VectorSource({
      features: features,
    });

    const routeName = "環狀線";
    // 定義不同捷運線的顏色
    const lineColors: Record<string, string> = {
      環狀線: "#FFD21E", // 黃色
      板南線: "#0070C0", // 藍色
      淡水信義線: "#E3002C", // 紅色
      松山新店線: "#008659", // 綠色
      中和新蘆線: "#FF8C00", // 橘色
      文湖線: "#C48C31", // 棕色
    };

    // 建立向量圖層並設定樣式
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: function (feature) {
        const color = lineColors[routeName] || "#999999";

        return new Style({
          stroke: new Stroke({
            color: color,
            width: 4,
            lineCap: "round",
            lineJoin: "round",
          }),
        });
      },
    });

    // 添加圖層到地圖
    map.addLayer(vectorLayer);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, []);

  function changeBasemap(tile: TileLayer) {
    mapLayers.forEach((layer) => {
      layer.setVisible(false);
    });
    tile.setVisible(true);
  }

  return (
    <div>
      <div
        ref={mapContainerRef} // 將 ref 附加到 div 元素
        style={{ width: width, height: height }}
      ></div>
      <ul>
        {mapLayers.map((layerItem) => (
          <li
            key={layerItem.getProperties()["id"]}
            onClick={() => changeBasemap(layerItem)}
            className="cursor-pointer"
          >
            {layerItem.getProperties()["name"]}
          </li>
        ))}
      </ul>
      <div>
        <a className="logo">
          <span>OpenLayers Demo</span>
        </a>
        <div ref={mousePositionRef} className="text-sm font-bold"></div>
      </div>
      <button
        onClick={() => {
          addZoomsliderContro();
          addScaleLineControl();
          addFullScreenControl();
          addMousePositionControl();
          addOverViewControl();
          // mapInstanceRef.current
          //   ?.getControls()
          //   .getArray()
          //   .forEach((control) => {
          //     console.log(control.getProperties());
          //   });
        }}
      >
        Enable
      </button>
    </div>
  );
}
