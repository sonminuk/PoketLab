import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './BiomeDetail.module.css';

function BiomeDetail({ data }) {
  const { id } = useParams();
  const biome = data[id];

  if (!biome) return <div className={styles.biomeNotFound}>바이옴을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.biomeDetail} >
      <div className={styles.biomeContent}>
        <h2 className={styles.biomeTitle}>{biome.title}</h2>
        <div className={styles.biomeInfo}>
          <img src={biome.imageUrl} alt={biome.title} className={styles.biomeImage} />
          <p className={styles.biomeDescription}>{biome.description}</p>
        </div>
      </div>
    </div>
  );
}

export default BiomeDetail;