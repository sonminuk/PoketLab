import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

def initialize_firebase():
    cred_path = "C:/POKETLAB/back/Scraping/poketlab-590f5-firebase-adminsdk-pxdq2-df8b6f4003.json"
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://poketlab-590f5-default-rtdb.firebaseio.com/'
    })

def save_biome_data_to_firebase(biome_data):
    firebase_ref = db.reference('biomes')
    for biome in biome_data:
        firebase_ref.push(biome)

biome_data = [
    {
        "id": "town",
        "title": "마을(Town)",
        "description": "웨이브 1~10의 고정 바이옴. 웨이브 5에서 반바지 꼬마/짧은 치마와의 첫 트레이너 배틀이, 웨이브 8에서 라이벌과 1차전이 고정되어 있다. 첫 바이옴이기 때문인지 전설/환상의 포켓몬이 아예 없는 것이 특징.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_town_bg.png?w=200&tok=f448de"
    },
    {
        "id": "plains",
        "title": "평야(Plains)",
        "description": "11~20단계의 고정 바이옴. 등장하는 체육관 관장은 성신체육관의 3인방 (덴트, 팟, 콘)과 체렌. 다른 바이옴과는 달리 4명의 타입이 전부 다른데 그냥 하나지방의 첫 관장들을 묶은 것이다.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_plains_bg.png?w=200&tok=1479c0"
    },
    {
        "id": "metropolis",
        "title": "대도시(Metropolis)",
        "description": "평야에서만 확률적으로 진입 가능한 바이옴, 이후 바이옴은 슬럼으로 고정이다. 주로 노말 포유류 포켓몬들이 등장하는데 전설/환상의 포켓몬은 등장하지 않는다. 등장하는 체육관은 모야모, 청목, 종길, 꼭두. 청목은 관장 신분인 만큼 노말 타입으로 등장한다.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_metropolis_bg.png?w=200&tok=402caf"
    },
    {
        "id": "slum",
        "title": "슬럼(Slum)",
        "description": "대도시 바이옴을 통해 확정적으로 진입 가능한 바이옴. 이후로는 공사장 바이옴으로 넘어간다. 주로 독, 악 타입 포켓몬들이 등장한다. 등장 체육관 관장은 두송.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_slum_bg.png?w=200&tok=4fb597"
    },
    {
        "id": "construction site",
        "title": "공사장(Construction Site)",
        "description": "슬럼, 연구소 바이옴에서 확정적으로 진입 가능한 바이옴. 주로 강철, 바위, 격투 타입의 포켓몬이 등장한다. 등장 체육관 관장은 사도, 마티스, 암페어.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_construction_site_bg.png?w=200&tok=82d8f4"
    },
    {
        "id": "dojo",
        "title": "도장(Dojo)",
        "description": "공사장을 통해서만 확률적으로 진입 가능한 바이옴. 이름에서도 보이듯 격투 포켓몬만 출현한다. 등장하는 체육관 관장은 철구, 자두, 코르니, 채두.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_dojo_bg.png?w=200&tok=64b819"
    },
    {
        "id": "power plant",
        "title": "발전소(Power Plant)",
        "description": "공사장에서 확률적으로 진입 가능한 바이옴. 이후 바이옴은 공장으로 고정이다. 당연히 전기 타입 포켓몬만 등장하며, 대부분의 전기 타입 전설/환상의 포켓몬들도 여기서 출현한다. 등장하는 체육관 관장은 시트론, 카밀레, 전진.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_power_plant_bg.png?w=200&tok=d17b3e"
    },
    {
        "id": "factory",
        "title": "공장(Factory)",
        "description": "발전소를 통해 진입 가능한 바이옴. 강철 타입 포켓몬들이 주로 등장한다. 등장하는 체육관 관장은 동관, 규리.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_factory_bg.png?w=200&tok=3ef7a3"
    },
    {
        "id": "laboratory",
        "title": "연구소(Laboratory)",
        "description": "공장과 동굴에서 50% 확률로 진입할 수 있는 바이옴. 과거에는 확률이 낮았으나 2024년 9월 1일 패치로 확률이 올라가고 갈 수 있는 장소가 추가되었다. 이후 등장하는 바이옴은 공사장 고정이다. 등장하는 체육관 관장은 비주기.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_laboratory_bg.png?w=200&tok=9f664a"
    },
    {
        "id": "grass",
        "title": "풀숲(Grass)",
        "description": "평야에서만 확률적으로 진입 가능한 바이옴. 이후 바이옴은 높은 풀숲으로 고정이다. 등장하는 체육관 관장은 민화.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_grassy_fields_bg.png?w=200&tok=745c5b"
    },
    {
        "id": "tall grass",
        "title": "높은 풀숲(Tall Grass)",
        "description": "풀, 벌레 타입 포켓몬이 주로 출현하는 바이옴. 등장하는 체육관 관장은 콜사, 유채(포켓몬스터), 비올라.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_tall_grass_bg.png?w=200&tok=b3497c"
    },
    {
        "id": "forest",
        "title": "숲(Forest)",
        "description": "주로 풀, 벌레, 독 타입 포켓몬이 출현하는 바이옴이다. 고대 유적을 통해 확정적으로 진입 가능. 등장하는 체육관 관장은 호일, 아티, 단풍.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_forest_bg.png?w=200&tok=cb3c90"
    },
    {
        "id": "jungle",
        "title": "정글(Jungle)",
        "description": "숲에서만 확률적으로 진입할 수 있는 바이옴. 이후 바이옴은 사원으로 고정이다. 특이하게도 UR 보스로 다른 전설/환상의 포켓몬을 제치고 사마자르가 등장한다. 등장하는 체육관 관장은 후쿠지.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_jungle_bg.png?w=200&tok=98f88a"
    },
    {
        "id": "temple",
        "title": "사원(Temple)",
        "description": "정글을 통해 확정적으로 진입할 수 있는 바이옴. 고스트 타입의 포켓몬들이 주로 출현한다. 등장하는 체육관 관장은 멜리사.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_temple_bg.png?w=200&tok=bccd04"
    },
    {
        "id": "swamp",
        "title": "늪지(Swamp)",
        "description": "물, 독 타입 포켓몬이 주로 출현하는 바이옴. 등장하는 체육관 관장은 도희, 보미카.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_swamp_bg.png?w=200&tok=8313ed"
    },
    {
        "id": "graveyard",
        "title": "묘지(Graveyard)",
        "description": "늪지를 통해 확률적으로 진입 가능한 바이옴. 이후로는 심연으로 이어진다. 텅구리를 제외하면 고스트 타입 포켓몬만 등장한다. 등장하는 체육관 관장은 어니언, 유빈, 라임.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_graveyard_bg.png?w=200&tok=2bfd03"
    },
    {
        "id": "abyss",
        "title": "심연(Abyss)",
        "description": "묘지를 통해 확정적으로 진입할 수 있는 바이옴. 악 타입 포켓몬들만 등장하며, UR 보스로는 펄기아가 등장한다. 등장하는 체육관 관장은 마리/두송.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_abyss_bg.png?w=200&tok=415646"
    },
    {
        "id": "meadow",
        "title": "목초지(Meadow)",
        "description": "숲을 통해 확률적으로 진입 가능한 바이옴. 주로 노말, 풀, 페어리 타입 포켓몬들이 등장하며 낮 시간에만 등장하는 포켓몬의 비중이 높다. 등장하는 체육관 관장은 알로에, 아킬.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_meadow_bg.png?w=200&tok=abadd6"
    },
    {
        "id": "fairy cave",
        "title": "페어리 동굴(Fairy Cave)",
        "description": "목초지를 통해 확률적으로 진입 가능한 바이옴.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_fairy_cave_bg.png?w=200&tok=abadd6"
    },
        {
        "id": "space",
        "title": "우주(Space)",
        "description": "주로 우주에서 등장할 법한 에스퍼 포켓몬들이 등장하는 바이옴. 이후 등장하는 바이옴은 고대 유적 고정이다. 등장하는 체육관 관장은 고지카.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_space_bg.png?w=200&tok=1174bc"
    },
    {
        "id": "ancient ruins",
        "title": "고대 유적(Ancient Ruins)",
        "description": "사막, 우주를 통해 확정적으로 진입 가능한 바이옴. 이후 등장하는 바이옴은 숲 고정이다. 주로 에스퍼 타입 포켓몬들이 출현한다. 등장하는 체육관 관장은 풍, 란, 초련, 리파.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_anicent_ruins_bg.png?w=200&tok=fc35a1"
    },
    {
        "id": "wasteland",
        "title": "황무지(Wasteland)",
        "description": "대부분의 600족과 드래곤타입 포켓몬이 총 집합해있는 바이옴. 이후 바이옴은 악지 고정이다. 등장하는 체육관 관장은 이향, 사간, 금랑.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_wasteland_bg.png?w=200&tok=313dd2"
    },
    {
        "id": "badlands",
        "title": "악지(Badlands)",
        "description": "황무지와 동굴에서 나오면 도착하는 바이옴. 등장하는 체육관 관장은 야콘, 자크로.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_badlands_bg.png?w=200&tok=37d070"
    },
    {
        "id": "desert",
        "title": "사막(Desert)",
        "description": "악지를 통해서만 확률적으로 진입할 수 있는 바이옴. 등장하는 체육관 관장은 마쿠와.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_desert_bg.png?w=200&tok=d0a3d1"
    },
    {
        "id": "cave",
        "title": "동굴(Cave)",
        "description": "동굴에서 등장할 법한 바위, 박쥐류 포켓몬들이 주로 등장하는 바이옴. 등장하는 체육관 관장은 웅, 원규, 강석.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_cave_bg.png?w=200&tok=905d8b"
    },
    {
        "id": "lake",
        "title": "호수(Lake)",
        "description": "물 타입 바이옴의 시작을 알리는 바이옴. 등장하는 체육관 관장은 맥실러.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_lake_bg.png?w=200&tok=6412b2"
    },
    {
        "id": "beach",
        "title": "해변(Beach)",
        "description": "물 타입 전문 바이옴 그 2번째. 등장하는 체육관 관장은 이슬, 곤포.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_beach_bg.png?w=200&tok=1f68bb"
    },
    {
        "id": "island",
        "title": "섬(Island)",
        "description": "오직 해변을 통해서만 낮은 확률로 진입 가능한 바이옴. 등장하는 체육관 관장은 야청.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_island_bg.png?w=200&tok=c2ebfe"
    },
    {
        "id": "sea",
        "title": "바다(Sea)",
        "description": "물 타입 전문 바이옴 그 3번째. 등장하는 체육관 관장은 시즈.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_sea_bg.png?w=200&tok=e1e68d"
    },
    {
        "id": "seabed",
        "title": "해저(Seabed)",
        "description": "물 타입 전문 바이옴 그 마지막. 등장하는 체육관 관장은 아단.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_seabed_bg.png?w=200&tok=b2c38b"
    },
    {
        "id": "mountain",
        "title": "산(Mountain)",
        "description": "주로 바위, 비행 타입 포켓몬들이 등장하는 바이옴. 등장하는 체육관 관장은 비상, 은송, 풍란.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_mountain_bg.png?w=200&tok=e1c9f3"
    },
    {
        "id": "volcano",
        "title": "화산(Volcano)",
        "description": "스타팅 포켓몬을 포함한 불꽃 타입 포켓몬이 대부분 모여있는 바이옴. 등장하는 체육관 관장은 강연, 민지, 순무.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_volcano_bg.png?w=200&tok=430720"
    },
    {
        "id": "ice cave",
        "title": "얼음 동굴(Ice Cave)",
        "description": "얼음 타입 포켓몬 전문 바이옴 그 첫번째. 등장하는 체육관 관장은 류옹, 담죽, 우르프, 그루샤.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_ice_cave_bg.png?w=200&tok=7620c7"
    },
    {
        "id": "snowy forest",
        "title": "눈덮인 숲(Snowy Forest)",
        "description": "얼음 타입 전문 바이옴 그 두번째. 등장하는 체육관 관장은 무청, 멜론.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_snowy_forest_bg.png?w=200&tok=bb2b81"
    },
    {
        "id": "end",
        "title": "엔드(End)",
        "description": "마을, 평야와 더불어 고정적으로 거치는 바이옴. 등장하는 체육관 관장은 고지카.",
        "imageUrl": "https://wiki.pokerogue.net/_media/ko:biomes:ko_end_bg.png?w=200&tok=0c0e87"
    }
    

]

# Firebase 초기화 및 데이터 저장
initialize_firebase()
save_biome_data_to_firebase(biome_data)