import React from 'react'; 
import { ThreeDMap } from '../components/ThreeDMap';
import { SideBar } from '../components/SideBar';
import { Loading } from '../components/Loading';
import { FlashMessages } from '../components/FlashMessages';

export default function Home() {
  return (
    <div>
      <Loading />
      <FlashMessages
        duration={5000}
        position={'bcenter'}
        width={'medium'}
      />
      <div id='sidebar' className="flex absolute left-2 top-[2vh]">
        <SideBar/>
      </div>
      <ThreeDMap/>
    </div>
  );
}
