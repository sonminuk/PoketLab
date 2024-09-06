import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

def extract_pokemon_data(driver):
    data_list = []

    # 언어 선택 메뉴 클릭
    try:
        lang_menu_item = driver.find_element(By.CSS_SELECTOR, "#langMenu > ul > li:nth-child(5)")
        lang_menu_item.click()
        time.sleep(2)  # 클릭 후 페이지 로딩 대기
    except Exception as e:
        print(f"Error clicking language menu item: {e}")

    # 페이지 끝까지 스크롤
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        # 스크롤 다운
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)  # 페이지 로딩 대기

        # 새로운 높이 가져오기
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break  # 스크롤 완료
        last_height = new_height

    # 포켓몬 목록 가져오기
    pokemon_rows = driver.find_elements(By.CSS_SELECTOR, 'table#speciesTable tbody tr')

    for row in pokemon_rows:
        try:
            img_tag = row.find_element(By.CSS_SELECTOR, 'td.sprite > img')
            name_tag = row.find_element(By.CSS_SELECTOR, 'td.nameContainer > div.species')
            types_tag = row.find_element(By.CSS_SELECTOR, 'td.types > div')
            abilities_tag = row.find_element(By.CSS_SELECTOR, 'td.abilities')
            hp_tag = row.find_element(By.CSS_SELECTOR, 'td.baseHPContainer')
            attack_tag = row.find_element(By.CSS_SELECTOR, 'td.baseAttackContainer')
            defense_tag = row.find_element(By.CSS_SELECTOR, 'td.baseDefenseContainer')
            sp_attack_tag = row.find_element(By.CSS_SELECTOR, 'td.baseSpAttackContainer')
            sp_defense_tag = row.find_element(By.CSS_SELECTOR, 'td.baseSpDefenseContainer')
            speed_tag = row.find_element(By.CSS_SELECTOR, 'td.baseSpeedContainer')
            total_tag = row.find_element(By.CSS_SELECTOR, 'td.BSTContainer')
        except Exception as e:
            print(f"Error finding element: {e}")
            continue

        # 데이터 추출
        img_href = img_tag.get_attribute('src') if img_tag else "null"
        name = name_tag.text.strip() if name_tag else "null"
        types = types_tag.text.strip() if types_tag else "null"
        abilities = abilities_tag.text.strip() if abilities_tag else "null"
        hp = hp_tag.text.strip() if hp_tag else "null"
        attack = attack_tag.text.strip() if attack_tag else "null"
        defense = defense_tag.text.strip() if defense_tag else "null"
        sp_attack = sp_attack_tag.text.strip() if sp_attack_tag else "null"
        sp_defense = sp_defense_tag.text.strip() if sp_defense_tag else "null"
        speed = speed_tag.text.strip() if speed_tag else "null"
        total = total_tag.text.strip() if total_tag else "null"

        data = {
            'img_href': img_href,
            'name': name,
            'types': types,
            'abilities': abilities,
            'hp': hp,
            'attack': attack,
            'defense': defense,
            'sp_attack': sp_attack,
            'sp_defense': sp_defense,
            'speed': speed,
            'total': total
        }

        data_list.append(data)

    return data_list

def save_data_to_firebase(data_list):
    firebase_ref = db.reference('pokemon')
    for data in data_list:
        firebase_ref.push(data)

if __name__ == "__main__":
    # Firebase 설정
    cred_path = "C:/POKETLAB/poketlab-590f5-firebase-adminsdk-pxdq2-e1537f04f4.json"
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://poketlab-590f5-default-rtdb.firebaseio.com/'
    })

    # Selenium 설정
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)
    url = "https://ydarissep.github.io/PokeRogue-Pokedex/?table=speciesTable&"
    
    print(f"Fetching data from {url}")
    driver.get(url)

    # 데이터 추출 및 저장
    extracted_data = extract_pokemon_data(driver)
    print(f"Found {len(extracted_data)} Pokémon entries.")
    save_data_to_firebase(extracted_data)
    
    # 브라우저 닫기
    driver.quit()
