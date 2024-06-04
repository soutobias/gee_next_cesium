"use client";

import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useContextHandle } from '../context/contextHandle';


export function SideBar() {
  const { listLayers } = useContextHandle()
  const [selectedSidebarOption, setSelectedSidebarOption] = useState('')

  return (
    <div id="side-selection" className='relative w-80vh bg-black bg-opacity-60 text-md p-2 z-[201]' >
      <div className="flex flex-col gap-3 md:gap-6 pl-2 pr-2">
        <div className="flex justify-between items-center"
          title={'Data Exploration'}
          // {/* onClick={handleShowSelection} */}
          id={'data_exploration'}
          // {/* className={
          //   selectedSidebarOption === 'data_exploration' ? styles.active : ''
          // } */}
          // {/* // id="data_exploration" */}
        >
          <FontAwesomeIcon icon={faLayerGroup} className=' cursor-pointer h-4 w-auto flex items-center justify-center' />
        </div>
      </div>
      {/* <div>
        {selectedSidebarOption === 'data_exploration' &&
          listLayers.forEach
          
          <DataExplorationSelection
            selectedLayers={selectedLayers}
            setSelectedLayers={setSelectedLayers}
            actualLayer={actualLayer}
            setActualLayer={setActualLayer}
            layerAction={layerAction}
            setLayerAction={setLayerAction}
            layerLegend={layerLegend}
            setLayerLegend={setLayerLegend}
            setInfoButtonBox={setInfoButtonBox}
            listLayers={listLayers}
            setShowPhotos={setShowPhotos}
            getPolyline={getPolyline}
            setGetPolyline={setGetPolyline}
            setClickPoint={setClickPoint}
            selectedBaseLayer={selectedBaseLayer}
            setSelectedBaseLayer={setSelectedBaseLayer}
            setDownloadPopup={setDownloadPopup}
          />
      }
      </div> */}
    </div>
  );
}
