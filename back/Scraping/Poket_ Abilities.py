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

# 특성 : 총 310개

def extract_ability_data(driver):
    data_list = []

    # 페이지 로딩이 완료될 때까지 대기
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'table#abilitiesTable tbody tr'))
        )
    except Exception as e:
        print(f"Error waiting for page to load: {e}")
        return data_list  # 페이지가 로드되지 않으면 함수 종료
    
    # JavaScript를 사용하여 언어 메뉴 항목 강제 클릭
    try:
        driver.execute_script("document.querySelector('#langMenu > ul > li:nth-child(5)').click();")
        time.sleep(2)  # 클릭 후 페이지 로딩 대기
    except Exception as e:
        print(f"Error clicking language menu item with JavaScript: {e}")
        return data_list  # 클릭 실패 시 함수 종료

    # 페이지 끝까지 스크롤 (필요한 경우 사용)
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)  # 페이지 로딩 대기

        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

    # 특성 목록 가져오기
    ability_rows = driver.find_elements(By.CSS_SELECTOR, 'table#abilitiesTable tbody tr')

    for row in ability_rows:
        try:
            # 특성 이름과 설명 추출
            ability_name_tag = row.find_element(By.CSS_SELECTOR, 'td.ability')
            ability_description_tag = row.find_element(By.CSS_SELECTOR, 'td.description')
        except Exception as e:
            print(f"Error finding element: {e}")
            continue

        # 데이터 추출
        ability_name = ability_name_tag.text.strip() if ability_name_tag else "null"
        ability_description = ability_description_tag.text.strip() if ability_description_tag else "null"

        data = {
            'ability_name': ability_name,
            'ability_description': ability_description,
        }

        data_list.append(data)

    return data_list

def save_data_to_firebase(data_list):
    firebase_ref = db.reference('abilities')
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
    url = "https://ydarissep.github.io/PokeRogue-Pokedex/?table=abilitiesTable&"
    
    print(f"Fetching data from {url}")
    driver.get(url)

    # 데이터 추출 및 저장
    extracted_data = extract_ability_data(driver)
    print(f"Found {len(extracted_data)} abilities.")
    save_data_to_firebase(extracted_data)
    
    # 브라우저 닫기
    driver.quit()
