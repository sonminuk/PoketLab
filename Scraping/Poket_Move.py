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

# 기술 : 총 952개

def extract_move_data(driver):
    data_list = []

    # 페이지 로딩이 완료될 때까지 대기
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'table#movesTable tbody tr'))
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

    # 기술 목록 가져오기
    move_rows = driver.find_elements(By.CSS_SELECTOR, 'table#movesTable tbody tr')

    for row in move_rows:
        try:
            # 기술 데이터 추출
            move_name_tag = row.find_element(By.CSS_SELECTOR, 'td.nameContainer > div.move')
            move_type_tag = row.find_element(By.CSS_SELECTOR, 'td.type > div')
            move_class_img_tag = row.find_element(By.CSS_SELECTOR, 'td.split > img')
            move_power_tag = row.find_element(By.CSS_SELECTOR, 'td.powerContainer > div.movesBold.power')
            move_accuracy_tag = row.find_element(By.CSS_SELECTOR, 'td.accuracyContainer > div.movesBold.accuracy')
            move_pp_tag = row.find_element(By.CSS_SELECTOR, 'td.PPContainer > div.movesBold.PP')
            move_description_tag = row.find_element(By.CSS_SELECTOR, 'td:nth-child(7) > div.description > div')
        except Exception as e:
            print(f"Error finding element: {e}")
            continue

        # 데이터 추출
        move_name = move_name_tag.text.strip() if move_name_tag else "null"
        move_type = move_type_tag.get_attribute('class').split()[1] if move_type_tag else "null"
        move_class_img = move_class_img_tag.get_attribute('src') if move_class_img_tag else "null"
        move_power = move_power_tag.text.strip() if move_power_tag else "null"
        move_accuracy = move_accuracy_tag.text.strip() if move_accuracy_tag else "null"
        move_pp = move_pp_tag.text.strip() if move_pp_tag else "null"
        move_description = move_description_tag.text.strip() if move_description_tag else "null"

        data = {
            'move_name': move_name,
            'move_type': move_type,
            'move_class_img': move_class_img,
            'move_power': move_power,
            'move_accuracy': move_accuracy,
            'move_pp': move_pp,
            'move_description': move_description,
        }

        data_list.append(data)

    return data_list

def save_data_to_firebase(data_list):
    firebase_ref = db.reference('moves')
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
    url = "https://ydarissep.github.io/PokeRogue-Pokedex/?table=movesTable&"
    
    print(f"Fetching data from {url}")
    driver.get(url)

    # 데이터 추출 및 저장
    extracted_data = extract_move_data(driver)
    print(f"Found {len(extracted_data)} moves.")
    save_data_to_firebase(extracted_data)
    
    # 브라우저 닫기
    driver.quit()
