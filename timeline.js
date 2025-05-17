

import React, { useState } from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect } from 'react-konva';

const Timeline = ({ videoDuration, onTrim }) => {
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(videoDuration);

  const handleDragMove = (e) => {
    const newTrimStart = e.target.x();
    setTrimStart(newTrimStart);
    onTrim(newTrimStart, trimEnd);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Stage width={window.innerWidth} height={50}>
        <Layer>
          <Rect
            x={trimStart}
            y={5}
            width={trimEnd - trimStart}
            height={30}
            fill="rgba(0, 180, 255, 0.5)"
            draggable
            onDragMove={handleDragMove}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Timeline;