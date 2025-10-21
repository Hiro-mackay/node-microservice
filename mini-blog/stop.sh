#!/bin/bash

# マイクロサービス停止スクリプト
echo "🛑 マイクロサービスを停止しています..."

# コンテナを停止・削除
docker-compose down --remove-orphans

echo "✅ マイクロサービスが停止しました！"
