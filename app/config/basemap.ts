import TileLayer from "ol/layer/Tile";
import Layer from "ol/layer/Layer";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import { Tile } from "ol/source";

type BasemapConfig = {
  id: string;
  name: string;
  image: string;
  type: "ol";
  opacity: number;
  initVisible: boolean;
  urls: UrlItem[];
};

type UrlItem = { name: Tile };

export const configBasemap: BasemapConfig[] = [
  {
    id: "OSM",
    name: "OpenStreetMap",
    image: "OSM_MAP.png",
    type: "ol",
    opacity: 1,
    initVisible: true,
    urls: [
      {
        name: new OSM({}),
      },
    ],
  },
  {
    id: "EMap",
    name: "通用版電子地圖",
    image: "EMap_MAP.png",
    type: "ol",
    opacity: 1,
    initVisible: true,
    urls: [
      {
        name: new XYZ({
          url: "https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}",
          wrapX: true,
        }),
      },
    ],
  },
  {
    id: "OrthoPhoto",
    name: "臺灣正射影像圖(通用版)",
    image: "OrthoPhoto_MAP.png",
    type: "ol",
    opacity: 1,
    initVisible: true,
    urls: [
      {
        name: new XYZ({
          url: "https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}",
          wrapX: true,
        }),
      },
    ],
  },
  {
    id: "CartoDB",
    name: "CartoDB地圖",
    image: "CartoDB_MAP.png",
    type: "ol",
    opacity: 1,
    initVisible: true,
    urls: [
      {
        name: new XYZ({
          url: "https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
          wrapX: true,
        }),
      },
    ],
  },
  {
    id: "CartoDB_Dark",
    name: "CartoDB地圖(深色)",
    image: "CartoDB_Dark_MAP.png",
    type: "ol",
    opacity: 1,
    initVisible: true,
    urls: [
      {
        name: new XYZ({
          url: "https://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
          wrapX: true,
        }),
      },
    ],
  },
];

export default configBasemap.map((item) => {
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
