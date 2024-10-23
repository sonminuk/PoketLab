import React, { useEffect, useState } from "react";
import database from "../firebase";
import "./ToolPage.css";

function ToolPage() {
  const [toolsData, setToolsData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await database.ref("items").once("value");
      setToolsData(snapshot.val());
    };

    fetchData();
  }, []);

  const renderToolItem = (tool, category) => {
    return (
      <li key={tool.name} className="tool-item">
        <img src={tool.img_href} alt={tool.name} className="tool-image" />
        <div className="tool-info">
          <h4>{tool.name}</h4>
          {category === "도구 드롭 확률" ? (
            <p>드롭율: {tool.effect}</p>
          ) : category === "랭크업 도구" ? (
            <p>오르는 능력치: {tool.effect}</p>
          ) : category === "영양제" ? (
            <p>능력치 상승: {tool.effect}</p>
          ) : category === "진화도구" ? (
            <p>레어도: {tool.effect}</p>
          ) : category === "나무열매" ? (
            <>
              <p>효과: {tool.effect}</p>
              <p>최대 보유량: {tool.rarity}</p>
            </>
          ) : category === "타입 강화 도구" ? (
            <>
              <p>강화 타입: {tool.effect}</p>
              <p>최대 중첩 개수: {tool.rarity}</p>
            </>
          ) : ["기타 소지 도구", "중요한 도구"].includes(category) ? (
            <>
              <p>레어도: {tool.effect}</p>
              <p>효과: {tool.rarity}</p>
            </>
          ) : (
            <p>효과: {tool.effect}</p>
          )}
        </div>
      </li>
    );
  };

  const categoryOrder = [
    "PP 포인트 상승",
    "도구 드롭 확률",
    "회복 도구 정보", // "도구 정보"를 "회복 도구 정보"로 변경
    "몬스터볼",
    "랭크업 도구",
    "영양제",
    "이상한 사탕",
    "PP 포인트 상승",
    "민트",
    "진화도구",
    "특수도구",
    "나무열매",
    "타입 강화 도구",
    "기타 소지 도구",
    "중요한 도구",
  ];

  return (
    <div className="tool-page">
      {categoryOrder.map(
        (category) =>
          toolsData[category === "회복 도구 정보" ? "도구 정보" : category] && (
            <div key={category} className="tool-category">
              <h2>{category}</h2>
              <ul className="tool-list">
                {Object.values(
                  toolsData[
                    category === "회복 도구 정보" ? "도구 정보" : category
                  ]
                ).map((tool) => renderToolItem(tool, category))}
              </ul>
            </div>
          )
      )}
    </div>
  );
}

export default ToolPage;
