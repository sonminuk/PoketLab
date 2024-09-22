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

# Firebase 초기화 함수
def initialize_firebase():
    try:
        cred_path = "C:\\PoketLab\\back\\Scraping\\poketlab-590f5-firebase-adminsdk-pxdq2-cd8aef9dca.json"
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://poketlab-590f5-default-rtdb.firebaseio.com/'
        })
        print("Firebase initialized successfully.")
    except Exception as e:
        print(f"Error initializing Firebase: {e}")

# 데이터 추출 함수 (컬럼 3개와 4개 모두 지원)
def extract_item_data(driver, css_selector, category, start_index, end_index):
    data_list = []
    try:
        # 해당 요소가 나타날 때까지 대기
        WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, css_selector))
        )
        item_rows = driver.find_elements(By.CSS_SELECTOR, css_selector)

        for i, row in enumerate(item_rows, start=1):
            # 지정된 범위 내의 아이템만 처리
            if start_index <= i <= end_index:
                try:
                    # 첫 번째 열은 항상 이미지
                    img_tag = row.find_element(By.CSS_SELECTOR, 'td:nth-child(1) > img')
                    img_href = img_tag.get_attribute('src') if img_tag else "null"
                    
                    # 두 번째 열은 이름
                    name_tag = row.find_element(By.CSS_SELECTOR, 'td:nth-child(2)')
                    name = name_tag.text.strip() if name_tag else "null"
                    
                    # 세 번째 열은 효과 (혹은 드롭률 등)
                    effect_tag = row.find_element(By.CSS_SELECTOR, 'td:nth-child(3)')
                    effect = effect_tag.text.strip() if effect_tag else "null"
                    
                    # 네 번째 열이 있는 경우 희귀도 처리
                    try:
                        rarity_tag = row.find_element(By.CSS_SELECTOR, 'td:nth-child(4)')
                        rarity = rarity_tag.text.strip() if rarity_tag else "null"
                    except:
                        rarity = "null"  # 네 번째 열이 없는 경우

                    # 추출된 데이터를 딕셔너리 형태로 저장
                    data = {
                        'img_href': img_href,
                        'name': name,
                        'effect': effect,
                        'rarity': rarity  # 3개일 때는 null로 처리됨
                    }

                    # 결과 리스트에 추가
                    data_list.append(data)

                except Exception as e:
                    print(f"Error extracting data from row: {e}")
                    continue

    except Exception as e:
        print(f"Error waiting for element: {e}")

    return data_list

# Firebase에 데이터 저장 함수
def save_data_to_firebase(data_list, category):
    try:
        firebase_ref = db.reference(f'items/{category}')
        for data in data_list:
            firebase_ref.push(data)
        print(f"Data saved to Firebase under category: {category}")
    except Exception as e:
        print(f"Error saving data to Firebase: {e}")

if __name__ == "__main__":
    # 1. Firebase 초기화
    initialize_firebase()

    # 2. Selenium 설정
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)
    url = "https://begchi.com/%ED%8F%AC%EC%BC%93%EB%A1%9C%EA%B7%B8-%EC%95%84%EC%9D%B4%ED%85%9C-%EB%8F%84%EA%B5%AC-%EC%83%81%EC%A0%90-%ED%99%95%EB%A5%A0-%EC%A4%91%EC%B2%A9-%EC%A0%95%EB%B3%B4/"
    driver.get(url)

    # 3. 데이터 범위 설정
    categories_ranges = {
        '도구 정보': (1, 13),
        '도구 드롭 확률': (14, 18),
        '몬스터볼': (19, 23),
        '랭크업 도구': (24, 30),
        '영양제': (31, 36),
        '이상한 사탕': (37, 38),
        'PP 포인트 상승': (39, 40),
        '민트': (41, 65),
        '진화 도구': (66, 93),
        '특수 도구': (94, 98),
        '나무열매': (99, 109),
        '타입 강화 도구': (110, 127),
        '기타 소지 도구': (128, 146),
        '중요한 도구': (147, 166)
    }

    # 4. 상점 정보 테이블 CSS 셀렉터
    shop_info_selector = 'figure table:nth-of-type(1) tbody tr'

    # 5. 각 카테고리에 대한 데이터 추출 및 저장
    for category, (start_index, end_index) in categories_ranges.items():
        print(f"Extracting {category} data...")
        extracted_data = extract_item_data(driver, shop_info_selector, category, start_index, end_index)
        if extracted_data:
            print(f"Found {len(extracted_data)} items in {category}.")
            save_data_to_firebase(extracted_data, category)
        else:
            print(f"No data found for {category}.")

    # 6. 드라이버 종료
    driver.quit()
