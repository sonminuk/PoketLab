import React, { useEffect, useState } from 'react';
import database from '../firebase';
import './ToolPage.css';

function ToolPage() {
  const [toolsData, setToolsData] = useState({});

  // Firebase에서 도구 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await database.ref('items').once('value');
      setToolsData(snapshot.val());
    };
    
    fetchData();
  }, []);

  return (
    <div className="tool-page">
      {Object.keys(toolsData).map(category => (
        <div key={category} className="tool-category">
          <h3>{category}</h3>
          <ul>
            {toolsData[category] && Object.values(toolsData[category]).map(tool => (
              <li key={tool.name}>
                <img src={tool.img_href} alt={tool.name} />
                <span>{tool.name}</span>
                <span>{tool.effect}</span>
                {tool.rarity && <span>{tool.rarity}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ToolPage;
