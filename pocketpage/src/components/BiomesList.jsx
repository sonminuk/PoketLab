// components/BiomesList.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./BiomesList.css";

function BiomesList({ data }) {
  return (
    <div className="biomes-container">
      <h2 className="biomes-title">바이옴 목록</h2>
      <h3>
        포켓로그에는 35개의 바이옴이 존재한다. 각 바이옴마다 나타나는 포켓몬 및
        트레이너, 체육관 관장이 다르며, 연결된 바이옴도 각기 다르다. 이 바이옴
        페이지로 각 바이옴마다 갈 수 있는 각기 다른 바이옴들을 소개하였다.
      </h3>
      <div className="biomes-grid">
        {Object.entries(data).map(([id, biome]) => (
          <Link to={`/biome/${id}`} key={id} className="biome-card">
            <img
              src={biome.imageUrl}
              alt={biome.title}
              className="biome-image"
            />
            <h3 className="biome-title">{biome.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BiomesList;
