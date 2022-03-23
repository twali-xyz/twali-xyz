from selenium.webdriver.chrome.options import Options
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, UnexpectedAlertPresentException
from selenium.webdriver.common.action_chains import ActionChains
from bs4 import BeautifulSoup as soup
import os

# open chrome


executable_path = "test/chromedriver"
os.environ["webdriver.chrome.driver"] = executable_path

chrome_options = Options()
# need to add metamask or frame extension to options here to complete

driver = webdriver.Chrome(
    executable_path=executable_path, chrome_options=chrome_options)
driver.get("http://localhost:3000/steps")
driver.maximize_window()

expert = WebDriverWait(driver, 7).until(
    EC.presence_of_element_located(
        (By.XPATH,  '//*[@id="__next"]/div/div/div/div/div/div[1]')))
expert.click()

time.sleep(.5)

client = WebDriverWait(driver, 7).until(
    EC.presence_of_element_located(
        (By.XPATH,  '//*[@id="__next"]/div/div/div/div/div/div[2]')))
client.click()

time.sleep(.5)

expert = WebDriverWait(driver, 7).until(
    EC.presence_of_element_located(
        (By.XPATH,  '//*[@id="__next"]/div/div/div/div/div/div[1]')))
expert.click()

continue_button = WebDriverWait(driver, 7).until(
    EC.presence_of_element_located(
        (By.XPATH,  '//*[@id="__next"]/div/div/div/div/div/div[1]/button')))
continue_button.click()


first_name = WebDriverWait(driver, 7).until(
    EC.presence_of_element_located(
        (By.XPATH,  "//input[@placeholder='First name']")))
first_name.click()
first_name.send_keys("firstName")

last_name = driver.find_element_by_xpath("//input[@placeholder='Last name']")
last_name.click()
last_name.send_keys("lastName")

display_name = driver.find_element_by_xpath(
    "//input[@placeholder='choose your unique name']")
display_name.click()
display_name.send_keys("test1er")

email = driver.find_element_by_xpath("//input[@placeholder='Email']")
email.click()
email.send_keys("test@twali.xyz")

twitter = driver.find_element_by_xpath("//input[@placeholder='Twitter']")
twitter.click()
twitter.send_keys("https://twitter.com/vitalikButerin")

linked_in = driver.find_element_by_xpath("//input[@placeholder='LinkedIn']")
linked_in.click()
linked_in.send_keys("https://linkedIn.com/")

website = driver.find_element_by_xpath("//input[@placeholder='Website URL']")
website.click()
website.send_keys("https://twali.xyz/")

time.sleep(1)

continue_button_2 = driver.find_element_by_xpath(
    '//*[@id="__next"]/div/div/div/div/div[2]/button[2]')
continue_button_2.click()


biz_type = WebDriverWait(driver, 7).until(
    EC.presence_of_element_located(
        (By.XPATH,  '//*[@id="business-type"]')))
biz_type.click()
biz_type.send_keys("i'")

time.sleep(1)

biz_type = WebDriverWait(driver, 7).until(
    EC.presence_of_element_located(
        (By.XPATH,  '//*[@id="business-type"]')))
biz_type.click()
biz_type.send_keys("s")
biz_type.send_keys(Keys.ENTER)

time.sleep(.5)

biz_name = driver.find_element_by_xpath('//*[@id="business-name"]')
biz_name.click()
biz_name.send_keys("test")


biz_name = driver.find_element_by_xpath('//*[@id="business-location"]')
biz_name.click()
biz_name.send_keys("un")
biz_type.send_keys(Keys.ENTER)


time.sleep(1)

continue_button_3 = driver.find_element_by_xpath(
    '//*[@id="__next"]/div/div/div/div/div[2]/button[2]')
continue_button_3.click()


current_title = WebDriverWait(driver, 7).until(
    EC.presence_of_element_located(
        (By.XPATH,  "//input[@placeholder='Current title']")))
current_title.click()
current_title.send_keys("test engineer")

current_location = driver.find_element_by_xpath('//*[@id="current-location"]')
current_location.click()
current_location.send_keys("s")
time.sleep(.2)
current_location.send_keys(Keys.TAB)


functional_expertise = driver.find_element_by_xpath(
    '//*[@id="functional-Expertise"]')
functional_expertise.click()
functional_expertise.send_keys("c")
functional_expertise.send_keys(Keys.TAB)


industry = driver.find_element_by_xpath(
    '//*[@id="industry-Expertise"]')
industry.click()
industry.send_keys("b")
industry.send_keys(Keys.TAB)

functional_expertise_add_button = driver.find_element_by_xpath(
    '//*[@id="__next"]/div/div/div/div/form/div/div/h4/div[3]/button')
functional_expertise_add_button.click()
functional_expertise_add_button.click()


industry_add_button = driver.find_element_by_xpath(
    '//*[@id="__next"]/div/div/div/div/form/div/div/h4/div[4]/button')
industry_add_button.click()
industry_add_button.click()


final_continue = driver.find_element_by_xpath(
    '//*[@id="__next"]/div/div/div/div/div[2]/button[2]')
final_continue.click()
