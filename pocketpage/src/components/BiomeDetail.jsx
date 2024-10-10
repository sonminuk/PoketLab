import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./BiomeDetail.module.css";

function BiomeDetail({ data }) {
  const { id } = useParams();
  const biome = data[id];
  const navigate = useNavigate();

  if (!biome)
    return (
      <div className={styles.biomeNotFound}>바이옴을 찾을 수 없습니다.</div>
    );

  const goToBiome = (biomeId) => {
    navigate(`/biome/${biomeId}`); // 지정된 바이옴으로 이동
  };

  return (
    <div className={styles.biomeDetail}>
      <div className={styles.biomeContent}>
        <h2 className={styles.biomeTitle}>{biome.title}</h2>
        <div className={styles.biomeInfo}>
          <img
            src={biome.imageUrl}
            alt={biome.title}
            className={styles.biomeImage}
          />
          <p className={styles.biomeDescription}>{biome.description}</p>
        </div>

        {/* 마을 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ4a-XXVJORZ82DdV" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_plains_bg.png?w=200&tok=1479c0" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="평야"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ4dML4mNptaZKNRk")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 평야 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ4dML4mNptaZKNRk" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_metropolis_bg.png?w=200&tok=402caf" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="대도시"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ4ggXGD9JQfUXBsw")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_lake_bg.png?w=200&tok=6412b2" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="호수"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5wAF7BKWCD-L80K")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_meadow_bg.png?w=200&tok=abadd6" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="목초지"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5UnF8ytICUkEynn")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 대도시 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ4ggXGD9JQfUXBsw" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_slum_bg.png?w=200&tok=4fb597" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="슬럼"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ4k2wAnVygUkZwLk")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 슬럼 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ4k2wAnVygUkZwLk" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_construction_site_bg.png?w=200&tok=82d8f4" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="공사장"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ4nQXAR05MavSrJi")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 공사장 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ4nQXAR05MavSrJi" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_power_plant_bg.png?w=200&tok=d17b3e" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="발전소"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ4uM3-iK97mvmH0I")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_dojo_bg.png?w=200&tok=64b819" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="도장"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ4r80-YwiyHHkGgC")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 도장 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ4r80-YwiyHHkGgC" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_plains_bg.png?w=200&tok=1479c0" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="평야"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ4dML4mNptaZKNRk")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_temple_bg.png?w=200&tok=bccd04" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="사원"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5HFC2JPibz6kKCq")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 발전소 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ4uM3-iK97mvmH0I" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_factory_bg.png?w=200&tok=3ef7a3" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="공장"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ4xoqKMH4qhvEqeH")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 공장 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ4xoqKMH4qhvEqeH" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_plains_bg.png?w=200&tok=1479c0" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="평야"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ4dML4mNptaZKNRk")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_laboratory_bg.png?w=200&tok=9f664a" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="연구소"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ50AUaGT6tngBfuO")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 연구소 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ50AUaGT6tngBfuO" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_construction_site_bg.png?w=200&tok=82d8f4" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="공사장"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ4nQXAR05MavSrJi")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 풀숲 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ53arn-eBfmf3ymu" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_tall_grass_bg.png?w=200&tok=b3497c" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="높은 풀숲"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ56w_oZgogr_iE7Q")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 높은 풀숲 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ56w_oZgogr_iE7Q" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_forest_bg.png?w=200&tok=cb3c90" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="숲"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5Abn4m4LLXmCpAK")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_cave_bg.png?w=200&tok=905d8b" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="동굴"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5spz3_Si3ALNwfm")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 숲 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ5Abn4m4LLXmCpAK" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_meadow_bg.png?w=200&tok=abadd6" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="목초지"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5UnF8ytICUkEynn")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_jungle_bg.png?w=200&tok=98f88a" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="정글"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5DwTTDqS2w5myk7")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 정글 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ5DwTTDqS2w5myk7" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_temple_bg.png?w=200&tok=bccd04" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="사원"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5HFC2JPibz6kKCq")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 사원 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ5HFC2JPibz6kKCq" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_swamp_bg.png?w=200&tok=8313ed" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="늪지"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5KcNwKnaPabP2HP")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_anicent_ruins_bg.png?w=200&tok=fc35a1" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="고대 유적"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5eIts5L2SDx8FPt")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 늪지 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ5KcNwKnaPabP2HP" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_tall_grass_bg.png?w=200&tok=b3497c" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="높은 풀숲"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ56w_oZgogr_iE7Q")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_graveyard_bg.png?w=200&tok=2bfd03" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="묘지"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5NwpN8yO9WnbmKC")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 묘지 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ5NwpN8yO9WnbmKC" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_abyss_bg.png?w=200&tok=415646" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="심연"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5RRbrmX9_-4XgPe")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 심연 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ5RRbrmX9_-4XgPe" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_cave_bg.png?w=200&tok=905d8b" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="동굴"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5spz3_Si3ALNwfm")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_space_bg.png?w=200&tok=1174bc" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="우주"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5aylXCA-fopG9q0")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_wasteland_bg.png?w=200&tok=313dd2" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="황무지"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5hdokWHJXSvDsL0")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 목초지 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ5UnF8ytICUkEynn" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_plains_bg.png?w=200&tok=1479c0" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="평야"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ4dML4mNptaZKNRk")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_fairy_cave_bg.png?w=200&tok=45194c" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="페어리 동굴"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5Y4T83tw0e-R-sc")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 페어리 동굴 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ5Y4T83tw0e-R-sc" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_ice_cave_bg.png?w=200&tok=7620c7" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="얼음 동굴"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ6IgYapZEmCU6O1x")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_space_bg.png?w=200&tok=1174bc" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="우주"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5aylXCA-fopG9q0")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 우주 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ5aylXCA-fopG9q0" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_anicent_ruins_bg.png?w=200&tok=fc35a1" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="고대 유적"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5eIts5L2SDx8FPt")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 고대 유적 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ5eIts5L2SDx8FPt" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_forest_bg.png?w=200&tok=cb3c90" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="숲"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5Abn4m4LLXmCpAK")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 황무지 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ5hdokWHJXSvDsL0" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_badlands_bg.png?w=200&tok=37d070" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="악지"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5lzzbTm0GAIprxf")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 악지 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ5lzzbTm0GAIprxf" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_desert_bg.png?w=200&tok=d0a3d1" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="사막"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5pR4ieAe9fDLeBx")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_mountain_bg.png?w=200&tok=e1c9f3" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="산"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ6C3lheTN_zYbwL6")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 사막 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ5pR4ieAe9fDLeBx" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_anicent_ruins_bg.png?w=200&tok=fc35a1" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="고대 유적"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5eIts5L2SDx8FPt")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 동굴 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ5spz3_Si3ALNwfm" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_lake_bg.png?w=200&tok=6412b2" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="호수"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5wAF7BKWCD-L80K")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_badlands_bg.png?w=200&tok=37d070" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="악지"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5lzzbTm0GAIprxf")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_laboratory_bg.png?w=200&tok=9f664a" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="연구소"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ50AUaGT6tngBfuO")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 호수 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ5wAF7BKWCD-L80K" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_beach_bg.png?w=200&tok=1f68bb" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="해변"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5zbDXNOtgnAFmwJ")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_swamp_bg.png?w=200&tok=8313ed" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="늪지"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5KcNwKnaPabP2HP")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_construction_site_bg.png?w=200&tok=82d8f4" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="공사장"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ4nQXAR05MavSrJi")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 해변 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ5zbDXNOtgnAFmwJ" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_sea_bg.png?w=200&tok=e1e68d" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="바다"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ65As1kBcNsFuJ3k")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_island_bg.png?w=200&tok=c2ebfe" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="섬"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ61rlKeaugbepNAn")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 섬 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ61rlKeaugbepNAn" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_sea_bg.png?w=200&tok=e1e68d" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="바다"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ65As1kBcNsFuJ3k")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 바다 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ65As1kBcNsFuJ3k" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_seabed_bg.png?w=200&tok=b2c38b" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="해저"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ68bZgwZLLT-tcnF")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_ice_cave_bg.png?w=200&tok=7620c7" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="얼음 동굴"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ6IgYapZEmCU6O1x")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 해저 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ68bZgwZLLT-tcnF" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_cave_bg.png?w=200&tok=905d8b" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="동굴"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5spz3_Si3ALNwfm")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_volcano_bg.png?w=200&tok=430720" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="화산"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ6FIBX7r00x1sK7a")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 산 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ6C3lheTN_zYbwL6" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_volcano_bg.png?w=200&tok=430720" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="화산"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ6FIBX7r00x1sK7a")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_wasteland_bg.png?w=200&tok=313dd2" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="황무지"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5hdokWHJXSvDsL0")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 화산 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ6FIBX7r00x1sK7a" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_beach_bg.png?w=200&tok=1f68bb" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="해변"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5zbDXNOtgnAFmwJ")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_ice_cave_bg.png?w=200&tok=7620c7" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="얼음 동굴"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ6IgYapZEmCU6O1x")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 얼음 동굴 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ6IgYapZEmCU6O1x" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_snowy_forest_bg.png?w=200&tok=bb2b81" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="눈덮인 숲"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ6LvAYze4cJg-mYG")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}

        {/* 눈덮인 숲 바이옴에만 추가 이미지를 표시 */}
        {id === "-O8MJ6LvAYze4cJg-mYG" && (
          <div className={styles.additionalImagesContainer}>
            <h3>갈 수 있는 다른 바이옴</h3>
            <div className={styles.additionalImagesGrid}>
              <div className={styles.linkedBiomeCard}>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_forest_bg.png?w=200&tok=cb3c90" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="숲"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5Abn4m4LLXmCpAK")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_lake_bg.png?w=200&tok=6412b2" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="호수"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ5wAF7BKWCD-L80K")} // 평원 바이옴으로 이동
                />
                <p></p>
                <img
                  src="https://wiki.pokerogue.net/_media/ko:biomes:ko_mountain_bg.png?w=200&tok=e1c9f3" // 평원 바이옴 이미지 URL을 여기에 넣어주세요
                  alt="산"
                  className={styles.linkedBiomeImage}
                  onClick={() => goToBiome("-O8MJ6C3lheTN_zYbwL6")} // 평원 바이옴으로 이동
                />
                <p></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BiomeDetail;
