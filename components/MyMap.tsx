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

import { createStringXY } from "ol/coordinate";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
// import TileSource from "ol/layer";
import { register } from "ol/proj/proj4";
import proj4 from "proj4";
import { configBasemap } from "@/app/config/basemap";
import { Tile } from "ol/source";
import OSM from "ol/source/OSM";

proj4.defs([
  // 羅賓森投影
  [
    "ESRI:54030",
    "+proj=robin +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +units=m +no_defs",
  ],

  // 摩爾維德投影
  [
    "MOLLWEIDE",
    "+proj=moll +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +units=m +no_defs",
  ],

  // 以台北為中心的方位等距投影
  [
    "AEQD_TAIPEI",
    "+proj=aeqd +lat_0=25.0478 +lon_0=121.5319 +x_0=0 +y_0=0 +ellps=WGS84 +units=m +no_defs",
  ],
]);

register(proj4);

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
