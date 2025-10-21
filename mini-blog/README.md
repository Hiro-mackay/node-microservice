# マイクロサービス ブログアプリケーション

このプロジェクトは、Docker Compose を使用してマイクロサービスアーキテクチャで構築されたブログアプリケーションです。

## 🏗️ アーキテクチャ

- **Posts Service** (ポート 3000): 投稿の作成・取得
- **Event Bus** (ポート 4005): イベントバス
- **Query Service** (ポート 4002): データクエリ
- **Comments Service** (ポート 4001): コメント管理
- **Moderation Service** (ポート 4003): コンテンツモデレーション

## 🚀 クイックスタート

### 1. 全サービスを起動

```bash
./start.sh
```

### 2. サービスを停止

```bash
./stop.sh
```

### 3. 個別のサービス管理

```bash
# 特定のサービスのみ起動
docker-compose up -d posts event-bus

# ログを確認
docker-compose logs -f posts

# サービス状況を確認
docker-compose ps
```

## 📡 API エンドポイント

### Posts Service (http://localhost:3000)

- `GET /posts` - 全投稿を取得
- `POST /posts` - 新規投稿を作成
- `POST /events` - イベントを受信

### Event Bus (http://localhost:4005)

- `POST /events` - イベントを送信
- `GET /events` - イベント履歴を取得

## 🔧 開発

### 個別サービスの開発

```bash
# postsサービスのみ起動
cd posts
npm run dev
```

### Docker イメージの再ビルド

```bash
docker-compose build --no-cache
```

## 📝 ログとデバッグ

```bash
# 全サービスのログ
docker-compose logs -f

# 特定サービスのログ
docker-compose logs -f posts

# リアルタイムログ
docker-compose logs -f --tail=100
```

## 🧹 クリーンアップ

```bash
# コンテナとボリュームを削除
docker-compose down -v

# イメージも削除
docker-compose down --rmi all
```
