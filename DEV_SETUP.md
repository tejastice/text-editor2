# 開発環境セットアップガイド

## 必要な環境

### 必須ツール
- **Node.js**: v18.0.0以上
- **npm**: v8.0.0以上
- **Git**: v2.30.0以上
- **GitHub CLI**: v2.0.0以上 (`gh`)

### 推奨エディタ設定
- **VS Code** with extensions:
  - TypeScript and JavaScript
  - ESLint
  - Prettier
  - Auto Rename Tag
  - Bracket Pair Colorizer

## プロジェクト初期セットアップ

### 1. リポジトリクローン
```bash
git clone https://github.com/tejastice/text-editor-pro.git
cd text-editor-pro
```

### 2. ブランチ確認
```bash
# developブランチに切り替え
git checkout develop
git pull origin develop
```

### 3. 依存関係インストール
```bash
# package.jsonが作成されたら実行
npm install
```

### 4. 開発サーバー起動
```bash
# 開発環境で起動
npm run dev
```

## 開発フロー

### 作業開始前の必須確認
```bash
# 1. github-dev-roles.mdを確認
cat github-dev-roles.md

# 2. 自分に割り当てられたIssueを確認
gh issue list --assignee @me --state open

# 3. 最新のdevelopブランチを取得
git checkout develop
git pull origin develop
```

### Issue対応の作業フロー
```bash
# 1. Issue番号を確認（例: Issue #5）
ISSUE_NUMBER=5

# 2. 作業開始をIssueにコメント
gh issue comment $ISSUE_NUMBER --body "
**From**: ワーカー
**To**: ディレクター

作業を開始します"

# 3. feature ブランチを作成
git checkout -b feature/issue-$ISSUE_NUMBER-description

# 4. 実装作業
# ... コーディング ...

# 5. コミット前の品質チェック
npm run lint    # ESLintチェック
npm run test    # テスト実行
npm run build   # ビルド確認

# 6. コミット
git add .
git commit -m "feat: implement feature description

Closes #$ISSUE_NUMBER"

# 7. プッシュ
git push origin feature/issue-$ISSUE_NUMBER-description

# 8. PR作成
gh pr create \
  --title "[#$ISSUE_NUMBER] Feature description" \
  --body "
**From**: ワーカー
**To**: ディレクター

## 概要
Closes #$ISSUE_NUMBER

## 実装内容
- 実装した機能の説明
- 変更したファイル

## 動作確認
- [ ] ローカルで動作確認済み
- [ ] テスト追加済み
- [ ] Lint/Format確認済み

## スクリーンショット
（該当する場合は添付）
" \
  --base develop

# 9. レビュー依頼
gh pr comment --body "
**From**: ワーカー
**To**: ディレクター

レビューをお願いします。"
```

## よく使うコマンド

### 開発中
```bash
# 開発サーバー起動
npm run dev

# TypeScript型チェック
npm run typecheck

# ESLint実行
npm run lint

# ESLint自動修正
npm run lint:fix

# Prettier実行
npm run format

# テスト実行
npm test

# テスト（watch mode）
npm run test:watch
```

### ビルド・パッケージング
```bash
# 開発ビルド
npm run build

# 本番ビルド
npm run build:prod

# Electronアプリパッケージ化
npm run dist

# macOS用パッケージ作成
npm run dist:mac
```

### Git操作
```bash
# Issue確認
gh issue list --assignee @me --state open

# PR一覧
gh pr list

# PR詳細確認
gh pr view [PR_NUMBER]

# ブランチ確認
git branch -a

# 変更差分確認
git diff

# ファイル状態確認
git status
```

## トラブルシューティング

### Node.js関連
```bash
# Node.jsバージョン確認
node --version

# npmキャッシュクリア
npm cache clean --force

# node_modules再インストール
rm -rf node_modules package-lock.json
npm install
```

### Git関連
```bash
# リモートブランチと同期
git fetch origin
git checkout develop
git pull origin develop

# 競合解決後の続行
git add .
git commit -m "resolve merge conflict"
```

### Electron関連
```bash
# Electronキャッシュクリア
npx electron-rebuild

# Electron再インストール
npm uninstall electron
npm install electron --save-dev
```

## 開発時の注意事項

### 必ず守ること
1. **Issue無しでの作業禁止**
2. **直接push禁止**（必ずPR経由）
3. **node_modules のコミット禁止**
4. **作業完了後は待機**（次のIssue待ち）

### コード品質
- TypeScriptエラーゼロ
- ESLintエラーゼロ
- テストカバレッジ80%以上
- パフォーマンス要件遵守

### セキュリティ
- 機密情報のコミット禁止
- 外部ライブラリ使用時は事前確認
- Electronセキュリティベストプラクティス遵守