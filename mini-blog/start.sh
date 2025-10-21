#!/bin/bash

# マイクロサービス起動スクリプト
echo "🚀 マイクロサービスを起動しています..."

# 既存のコンテナを停止・削除
echo "📦 既存のコンテナを停止・削除中..."
docker-compose down --remove-orphans

# イメージを再ビルド
echo "🔨 Dockerイメージをビルド中..."
docker-compose build --no-cache

# サービスを起動
echo "🌟 サービスを起動中..."
docker-compose up -d

# 起動状況を確認
echo "⏳ サービス起動を待機中..."
sleep 5

# サービス状況を表示
echo "📊 サービス状況:"
docker-compose ps

echo ""
echo "✅ マイクロサービスが起動しました！"
echo ""
echo "🌐 利用可能なサービス:"
echo "  - Posts API: http://localhost:4000"
echo "  - Comments Service: http://localhost:4001"
echo "  - Query Service: http://localhost:4002"
echo "  - Moderation Service: http://localhost:4003"
echo "  - Event Bus: http://localhost:4005"
echo ""
echo "📝 ログを確認するには: docker-compose logs -f [service-name]"
echo "🛑 停止するには: docker-compose down"
