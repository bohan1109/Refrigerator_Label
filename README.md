# 雲端智慧標籤系統(Refrigerator Label & management system)

## 系統需求：
### 冰箱物品標籤🏷️  
* 讀卡機
* 標籤機/紙 (測試使用brother-QL系列)
* 樹梅派 (測試使用Raspberry Pi 2)
* 掃標機
### 冰箱管理系統💻
* 前端(使用React)
* 後端(使用Express)
* 伺服器(測試使用Heroku)
* 資料庫(測試使用PostgreSQL)

## 實作方法：
### 冰箱物品標籤🏷️
* 使用"Raspberry Pi 2"連接"讀卡機"、"標籤機"、"掃標機"
* 利用"讀卡機"讀取"資料庫"會員資料後使用"標籤機"列印(使用SDK or CUPS)標籤，標籤內容包括：
  - 會員名稱
  - 列印日期(物品放入日期)
  - 條碼(提供掃碼功能)
### 冰箱管理系統💻
* 前後端分離的方式打造之網站管理平台，前端使用"React"、後端使用"Express"。
* 管理系統能夠顯示"資料庫"裡標籤資料，讓管理者在整理冰箱時可以更方便清點。
* 管理者使用系統清點過後，透過管理系統提醒物品放置超過7日之主人(email通知)。

## 進行方式：

團隊透過敏捷開發，預計在4週內完成

### 1️⃣ 第一週
#### 冰箱物品標籤🏷️
* 利用"Raspberry Pi 2"成功讀取悠遊卡

#### 冰箱管理系統💻
* 設計並實作前端管理頁面
* 實作後端API管理資料庫(暫定API 讀取標籤資料、刪除標籤資料)
* 架設資料庫(暫定兩個table: 1.會員資料 2.冰箱印的標籤)

### 2️⃣ 第二週
#### 冰箱物品標籤🏷️
* 利用"Raspberry Pi 2"讀取到的悠遊卡，到"資料庫"提取會員資料並由"標籤機"列印出來。

#### 冰箱管理系統💻
* 同上週
### 3️⃣ 第三週
#### 冰箱物品標籤🏷️
* 同上週
* 若沒延宕，利用掃標機提醒"冰箱物品"之主人or刪除"冰箱物品"之功能實作。
#### 冰箱管理系統💻
* 同上週
### 4️⃣ 第四週
* 成果展示
## 預期目標：
1. 使用者能利用刷卡自動列印資料標籤，省去自行書寫的時間。
2. 管理者可以利用管理系統更好管控冰箱內容物。

## 啟動專案：
---
### 後端：
`cd ./refrigerator_label_back/ ` -> 進入後端資料夾

`cp .env.example .env` -> 複製.env.example檔 產生.env檔

修改env檔設定
```
FRONTEND_URL='http://localhost:xxxx' -> 前端網站port號

SUPER_USER_USERNAME='root'
SUPER_USER_PASSWORD='root'
SUPER_USER_MAIL='test@gmail.com'

JWT_SECRET='test'

DB_USERNAME='root'
DB_PASSWORD='root'  -> 為設定mysql時所輸入的密碼
DB_DATABASE='db'
DB_HOST='localhost'
DB_PORT='3306'      -> 為設定mysql時所設定的port號
DB_DIALECT='mysql' 
```

`npm install`  -> 下載套件

**於資料庫先新增名為"db"的資料庫**

`npx sequelize db:migrate`   -> 建立資料表

`npx sequelize db:seed:all`  -> 塞入假資料

**確認"admin"的資料表是否有root資料**

`npm start`  -> 啟動後端server

---
### 前端：
`cd ./refrigerator_label_front/ ` -> 進入前端資料夾

`cp .env.example .env` -> 複製.env.example檔 產生.env檔

修改env檔設定
```
REACT_APP_BACK_END='http://localhost:xxxx' ->後端網站port號
```

`npm install`  -> 下載套件

`npm start`  -> 啟動前端

### **root身份登入 進行維護**
