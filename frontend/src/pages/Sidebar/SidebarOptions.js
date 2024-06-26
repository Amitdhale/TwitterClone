import React from 'react';
import './SidebarOptions.css';

export default function SidebarOptions({active,text,Icon}) {
  return (
    <div className={`sidebarOptions ${active && 'sidebarOptions_active'}`}>
        <Icon/>
        <h2>{text}</h2>

    </div>
  )
}
