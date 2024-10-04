// components/BiomesList.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./BiomesList.css";

function BiomesList({ data }) {
  return (
    <div className="biomes-container">
      <h2 className="biomes-title">바이옴 목록</h2>
      <div className="biomes-grid">
        {Object.entries(data).map(([id, biome]) => (
          <Link to={`/biome/${id}`} key={id} className="biome-card">
            <img src={biome.imageUrl} alt={biome.title} className="biome-image" />
            <h3 className="biome-title">{biome.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BiomesList;