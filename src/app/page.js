"use client";

import {
  ScreenSpaceEventHandler,
  Viewer,
  CameraFlyTo,
  ScreenSpaceEvent,
  CesiumComponentRef,
} from 'resium';
import {
  Ion,
  ScreenSpaceEventType,
  UrlTemplateImageryProvider,
  ImageryLayer as CesiumImageryLayer,
  EllipsoidTerrainProvider,
  Rectangle
} from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

import { bbox } from "@turf/turf";
import { useEffect, useRef, useState } from "react";


Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_TOKEN

export default function Home() {
  // const ref = useRef<CesiumComponentRef>(null);
  const [layerData, setLayerData] = useState(null);
  const [viewer, setViewer] = useState(null);

  const defaultWMSBounds = [
    [-10, 110],
    [10, 120],
  ];

  const cesiumStartCoordinates = Rectangle.fromDegrees(
    defaultWMSBounds[0][1],
    defaultWMSBounds[0][0],
    defaultWMSBounds[1][1],
    defaultWMSBounds[1][0],
  );

  const terrainProvider = new EllipsoidTerrainProvider({});

  async function fetchData() {
    try {
      const res = await fetch("/api/ee");
      const { urlFormat, geojson, message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }
      setLayerData({ urlFormat, geojson });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (!layerData) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (layerData && viewer) {
      const { urlFormat } = layerData;
      const imageryProvider = new UrlTemplateImageryProvider({ url: urlFormat });
      const imageryLayer = new CesiumImageryLayer(imageryProvider);
      // const viewer = viewer;
      if (viewer) {
        viewer.imageryLayers.add(imageryLayer);
      }
    }
  }, [layerData]);

  return (
    <Viewer
      full
      animation={false}
      timeline={false}
      // ref={ref}
      ref={(ref) => {
        if (ref && !viewer) {
          setViewer(ref.cesiumElement);
        }
      }}
      infoBox={true}
      terrainProvider={terrainProvider}
      navigationHelpButton={false}
      scene3DOnly={true}
    >
      <CameraFlyTo destination={cesiumStartCoordinates} duration={3} />
    </Viewer>
  );
}
