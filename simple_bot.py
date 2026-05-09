import requests
import time
import random
from bs4 import BeautifulSoup

# ==============================
# 設定：ここを自分で書き換えてください
# ==============================

DISCORD_WEBHOOK_URL = "https://discordapp.com/api/webhooks/1502667491959378102/BO_mUMG49lZLq0nVWFsOuAgjx9SXNSFU7rc3iybHmTEgTvJ8rzb9jkTJlqAMQp9G_lRZ"

# 監視するカードと上限価格（円）、検索URL（ダミー）
CARDS = [
    {
        "name": "ゼニガメ AR",
        "max_price": 900,
        "url": "https://auctions.yahoo.co.jp/search/search?p=ゼニガメ+AR&va=ゼニガメ+AR&istatus=1",
    },
    {
        "name": "アブソルex SAR",
        "max_price": 700,
        "url": "https://auctions.yahoo.co.jp/search/search?p=アブソルex+SAR&va=アブソルex+SAR&istatus=1",
    },
    {
        "name": "プライムキャッチャー",
        "max_price": 1300,
        "url": "https://auctions.yahoo.co.jp/search/search?p=プライムキャッチャー&va=プライムキャッチャー&istatus=1",
    },
    {
        "name": "イーブイ AR",
        "max_price": 1100,
        "url": "https://auctions.yahoo.co.jp/search/search?p=イーブイ+AR&va=イーブイ+AR&istatus=1",
    },
    {
        "name": "ナンジャモ SR",
        "max_price": 1600,
        "url": "https://auctions.yahoo.co.jp/search/search?p=ナンジャモ+SR&va=ナンジャモ+SR&istatus=1",
    },
    {
        "name": "大地の器 UR",
        "max_price": 1600,
        "url": "https://auctions.yahoo.co.jp/search/search?p=大地の器+UR&va=大地の器+UR&istatus=1",
    },
]

# ==============================
# 関数
# ==============================

def get_item_info(url):
    """指定URLの一番上の商品から価格と商品URLを取得する"""
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept-Language": "ja,en-US;q=0.7,en;q=0.3",
    }
    try:
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")

        # ヤフオク検索結果の商品リストを探す（複数の書き方に対応）
        item = (
            soup.select_one("li.Product")
            or soup.select_one("div.Product")
            or soup.select_one("[class*='Product__item']")
        )
        if item is None:
            return None, None

        # 価格を探す（複数の書き方に対応）
        price_tag = (
            item.select_one(".Product__priceValue")
            or item.select_one(".Product__price")
            or item.select_one("[class*='price']")
        )

        # リンクを探す
        link_tag = (
            item.select_one("a.Product__titleLink")
            or item.select_one("a.Product__imageLink")
            or item.select_one("a[href*='auctions.yahoo']")
        )

        if price_tag is None or link_tag is None:
            return None, None

        # 価格文字列から数字だけ取り出す（例："1,200円" → 1200）
        price_text = price_tag.get_text()
        price = int("".join(filter(str.isdigit, price_text)))
        item_url = link_tag.get("href", "")

        return price, item_url

    except Exception as e:
        print(f"  エラー: {e}")
        return None, None


def send_discord_notification(card_name, price, item_url):
    """Discordに通知を送る"""
    message = (
        f"【お買い得情報】\n"
        f"カード名：{card_name}\n"
        f"価格：{price}円\n"
        f"URL：{item_url}"
    )
    payload = {"content": message}
    try:
        requests.post(DISCORD_WEBHOOK_URL, json=payload, timeout=10)
        print(f"  → Discord通知送信済み")
    except Exception as e:
        print(f"  Discord通知エラー: {e}")


# ==============================
# メイン処理
# ==============================

def main():
    print("=== ポケカ価格チェックBOT 起動 ===\n")

    for card in CARDS:
        print(f"チェック中: {card['name']}（上限: {card['max_price']}円）")

        price, item_url = get_item_info(card["url"])

        if price is None:
            print("  → 価格を取得できませんでした\n")
        elif price <= card["max_price"]:
            print(f"  → 価格 {price}円 ≦ 上限 {card['max_price']}円 → 通知します！")
            send_discord_notification(card["name"], price, item_url)
        else:
            print(f"  → 価格 {price}円 > 上限 {card['max_price']}円 → スキップ")

        # 連続アクセスを避けるため、2〜5秒ランダムに待機
        wait = random.uniform(2, 5)
        print(f"  （{wait:.1f}秒 待機中...）\n")
        time.sleep(wait)

    print("=== 全カードのチェック完了 ===")


if __name__ == "__main__":
    main()
