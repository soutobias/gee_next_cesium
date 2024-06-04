"use client";

import React from 'react'; 
import {
  ScreenSpaceEventHandler,
  Viewer,
  CameraFlyTo,
  CesiumComponentRef,
  Cesium3DTileset,
} from 'resium';
import {
  Ion,
  Rectangle,
  EllipsoidTerrainProvider,
  UrlTemplateImageryProvider,
  ImageryLayer as CesiumImageryLayer,
  CesiumTerrainProvider,
  Viewer as CesiumViewer, // Import CesiumViewer type
} from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

import { bbox } from "@turf/turf";
import { useEffect, useRef, useState } from "react";


Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_TOKEN!; // Non-null assertion

interface LayerData {
  urlFormat: string;
  geojson: any;
}

interface ThreeDData {
  dataInfo: { assetId: string };
  threeDCoordinates: any;
  cesiumHeading: number;
  cesiumPitch: number;
  cesiumRoll: number;
}

export function ThreeDMap() {
  const [layerData, setLayerData] = useState<LayerData | null>(null);
  const [viewer, setViewer] = useState<CesiumViewer | null>(null);
  const [threeD, setThreeD] = useState<ThreeDData | boolean>(true); // Union type

  const defaultWMSBounds = [
    [40, -10],
    [58, 10],
  ]
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

  async function handleTerrainLayer() {
    if (viewer && typeof threeD === "object") { // Type narrowing for threeD
      const terrainUrl = await CesiumTerrainProvider.fromIonAssetId(
        parseInt(threeD.dataInfo.assetId),
      );

      viewer.terrainProvider = terrainUrl;
      viewer.camera.flyTo({
        destination: threeD.threeDCoordinates, 
        orientation: {
          heading: threeD.cesiumHeading,
          pitch: threeD.cesiumPitch,
          roll: threeD.cesiumRoll,
        },
      });
      setThreeD(false)
    }
  }

  useEffect(() => {
    if (threeD && viewer) {
      handleTerrainLayer()
    }
  }, [threeD])

  return (
    <Viewer
      full
      animation={false}
      timeline={false}
      // ref={ref}
      ref={(ref) => {
        if (ref && !viewer) {
          setViewer(ref.cesiumElement as CesiumViewer);
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
