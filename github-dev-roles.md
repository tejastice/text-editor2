# GitHub開発フロー：役割定義と作業手順

## 🚨 最重要：作業開始前の必須確認事項

### ワーカーの鉄則
```
1. 作業開始前に必ずGitHubのIssuesを確認する
2. Issueがない場合は待機する（勝手に作業しない）
3. 自分で判断せず、ディレクターの指示に従う
4. .gitignoreを最初に作成する（node_modules等を除外）
5. 作業完了後は必ずIssueをクローズする
6. Claude使用時は必ずgithub-dev-roles.mdを確認する
7. 作業完了後は次の指示があるまで待機する
8. 30分ごとにIssueを確認して新しい指示がないか確認する
```

### ディレクターの鉄則
```
1. 必ずGitHub Issuesで作業指示を出す
2. ワーカーが確認できるように明確な指示を書く
3. 優先度とタスクの詳細を必ず記載する
4. 完了したIssueの成果物を確認してクローズする
5. 次のIssueを発行する前に前のIssueの完了を確認する
6. Claude使用時は必ずgithub-dev-roles.mdを確認する
7. 作業開始と停止を明確に指示する
8. ワーカーが勝手に作業を続けていないか監視する
```

## コミュニケーション方法

### 基本的な連絡手段（優先順）
1. **GitHub Issues** - すべての作業指示と進捗管理
2. **PR コメント** - コードに関する議論
3. **Issue コメント** - 質問、ブロッカー、進捗報告

### コミュニケーションルール

#### 通常の連絡
```bash
# ワーカーからディレクターへの質問
gh issue comment [ISSUE_NUMBER] --body "
@[ディレクター名] 
質問があります：
[具体的な質問内容]
"

# ディレクターからワーカーへの追加指示
gh issue comment [ISSUE_NUMBER] --body "
@[ワーカー名]
追加の要件です：
[具体的な指示]
"
```

#### 緊急時の連絡
- **ブロッカー発生時**: Issueに「🚨 BLOCKER」ラベルを追加
- **緊急確認が必要**: Issueタイトルに【緊急】を追加
- **1時間以内の返答が必要**: @メンションを使用

### 定期的な同期
- **日次**: 各Issueの進捗をコメントで報告
- **週次**: 完了したIssueと次週の計画を確認

### 禁止事項
- Issue/PR以外での作業指示（口頭、メール等）
- 記録に残らない方法での重要な決定
- Issueを介さない仕様変更

## 初期セットアップ

### リポジトリ構成
- **メインリポジトリ**: プロダクトコードを管理
- **Issues**: GitHubのIssues機能でタスク管理（別リポジトリ不要）

### 必須の初期ファイル（プロジェクト開始時に作成）
```bash
# .gitignoreファイル（必須）
node_modules/
dist/
build/
.env
.env.local
*.log
.DS_Store
coverage/
.vscode/
.idea/
```

### ブランチ戦略
- `main`: 本番環境相当
- `develop`: 開発ブランチ
- `feature/*`: 機能開発ブランチ
- `fix/*`: バグ修正ブランチ

## プルリクエスト（PR）ルール

### PRを作成するタイミングと担当者

#### ワーカーがPRを作成する場合
1. **機能実装完了時**（必須）
   - featureブランチでの実装が完了
   - テストが通過
   - Lintエラーがゼロ

2. **PRの作成手順**
   ```bash
   # developブランチに向けてPR作成
   gh pr create --base develop --head feature/issue-[NUMBER]
   ```

3. **PR作成後の流れ**
   ```
   ワーカー: PR作成
      ↓
   ワーカー: レビュー依頼コメント
      ↓
   ディレクター: コードレビュー
      ↓
   ディレクター: 承認 or 修正依頼
      ↓
   ディレクター: マージ実行
      ↓
   自動: Issueクローズ（Closes #XXで連動）
   ```

### ディレクターのPRレビュー責務

1. **レビュー確認項目**
   - [ ] Issueの要件を満たしているか
   - [ ] コード品質は適切か
   - [ ] テストは含まれているか
   - [ ] 不要なファイル（node_modules等）が含まれていないか

2. **レビューアクション**
   ```bash
   # 承認の場合
   gh pr review [PR_NUMBER] --approve --body "
   **From**: ディレクター
   **To**: ワーカー
   
   LGTMです！マージします。"
   
   # 修正依頼の場合
   gh pr review [PR_NUMBER] --request-changes --body "
   **From**: ディレクター
   **To**: ワーカー
   
   以下の修正をお願いします：
   - [修正点1]
   - [修正点2]"
   ```

3. **マージ実行**
   ```bash
   # Squash and mergeで実行（コミット履歴をクリーンに）
   gh pr merge [PR_NUMBER] --squash --delete-branch
   ```

### PR作成を忘れた場合の対処
- ワーカーがdevelopに直接pushした場合 → 即座にrevertして、PRで再提出
- ディレクターは直接pushを発見したら、ワーカーに通知して修正を依頼

## ワーカー（開発者）の作業指示

### 🔴 作業開始チェックリスト（必須）

```bash
# 1. リポジトリの最新状態を取得
git checkout develop
git pull origin develop

# 2. github-dev-roles.mdを必ず確認
cat github-dev-roles.md
# または
code github-dev-roles.md

# 3. GitHubでIssuesを確認
# ブラウザで https://github.com/[organization]/[repository]/issues を開く
# または
gh issue list --assignee @me

# 4. Issueがない場合
echo "ディレクターからのIssue発行を待機中..."
# 待機する（勝手に作業を始めない）
```

### 1. 日次作業フロー

#### 作業開始前の確認（厳守）
1. **プロジェクト初回作業時は.gitignoreを作成**
   ```bash
   # 最初に必ず実行
   echo "node_modules/
   dist/
   build/
   .env
   .env.local
   *.log
   .DS_Store
   coverage/
   .vscode/
   .idea/" > .gitignore
   ```

2. **必ずIssueを確認してから作業開始**
   ```bash
   # CLIでの確認方法（30分ごとに実行）
   gh issue list --assignee @me --state open
   ```

3. **Issueがない場合は作業しない**
   - ディレクターに確認を求める
   - 勝手な判断での実装は禁止
   - **待機中も30分ごとにIssueを確認**

4. **作業完了後の待機**
   ```bash
   # PR作成・マージ後
   echo "作業完了。次の指示を待機中..."
   
   # 30分ごとに新しいIssueを確認
   while true; do
     gh issue list --assignee @me --state open
     sleep 1800  # 30分待機
   done
   ```

#### Issue選択とステータス更新
1. **Issue選択とステータス更新**
   ```bash
   # Issueにコメントで作業開始を宣言
   gh issue comment [ISSUE_NUMBER] --body "
   **From**: ワーカー
   **To**: ディレクター
   
   作業を開始します"
   ```

2. **ブランチ作成**
   ```bash
   # Issue番号を必ず含める
   git checkout -b feature/issue-[ISSUE_NUMBER]-[簡潔な説明]
   ```

3. **実装作業**
   - Issueに書かれた受け入れ条件を満たすように実装
   - スコープ外の作業は行わない

4. **プルリクエスト作成（必須）**
   ```bash
   # 実装完了後、必ずPRを作成
   git push origin feature/issue-[ISSUE_NUMBER]-[簡潔な説明]
   
   # GitHub CLIでPR作成
   gh pr create \
     --title "[#ISSUE_NUMBER] 機能/修正の概要" \
     --body "
   **From**: ワーカー
   **To**: ディレクター
   
   ## 概要
   Closes #[ISSUE_NUMBER]
   
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
   ```

5. **レビュー依頼**
   ```bash
   # PRにレビュー依頼コメント
   gh pr comment [PR_NUMBER] --body "
   **From**: ワーカー
   **To**: ディレクター
   
   レビューをお願いします。"
   ```

### 2. コミットルール

#### コミット前の必須確認
```bash
# 1. 不要なファイルが含まれていないか確認
git status

# 2. node_modulesが含まれていたら除外
git rm -r --cached node_modules/

# 3. .gitignoreが適切に設定されているか確認
cat .gitignore

# 4. 適切なファイルのみをステージング
git add src/ package.json package-lock.json README.md など
```

#### コミットメッセージ規則
- `feat: 新機能追加`
- `fix: バグ修正`
- `docs: ドキュメント更新`
- `style: コードスタイル修正`
- `refactor: リファクタリング`
- `test: テスト追加・修正`
- `chore: ビルド設定等の修正`

### 3. Issue管理とクローズ手順

#### Issue対応完了時の手順
1. **動作確認**
   ```bash
   # テスト実行
   npm test
   # ビルド確認
   npm run build
   # Lintチェック
   npm run lint
   ```

2. **PRの説明に含める内容**
   ```markdown
   ## 概要
   Closes #[ISSUE_NUMBER]
   
   ## 実装内容
   - 実装した機能の説明
   - 変更したファイル
   
   ## 動作確認
   - [ ] ローカルで動作確認済み
   - [ ] テスト追加済み
   - [ ] Lint/Format確認済み
   
   ## スクリーンショット
   （該当する場合は添付）
   ```

3. **Issueクローズ確認**
   - PRがマージされたら自動的にIssueがクローズされることを確認
   - されない場合は手動でクローズ

---

## ディレクター（レビュアー/PM）の作業指示

### 🔴 プロジェクト開始時の必須作業

1. **初回Issue作成（最重要）**
   ```bash
   # プロジェクト開始時は必ず最初のIssueを作成
   gh issue create \
     --title "プロジェクト初期セットアップ" \
     --body "詳細な作業内容..." \
     --assignee [ワーカー]
   ```

2. **ラベル作成**
   ```bash
   gh label create "critical" --color "FF0000"
   gh label create "high" --color "FFA500"
   gh label create "medium" --color "FFFF00"
   gh label create "low" --color "00FF00"
   ```

### 1. Issue作成の必須項目

#### Issueテンプレート（厳格版）
```markdown
## 📍 宛先・送信者
**To**: ワーカー
**From**: ディレクター

## 🎯 タスク概要
[1-2文で明確に記載]

## 🚦 作業指示
**作業開始**: 即座に開始してください
**作業停止**: このタスク完了後は次の指示まで待機

## 📋 具体的な作業内容
1. [ ] 作業項目1（具体的に）
2. [ ] 作業項目2（具体的に）
3. [ ] 作業項目3（具体的に）

## ⏰ 期限
- 開始予定: YYYY/MM/DD HH:MM
- 完了期限: YYYY/MM/DD HH:MM

## 🚦 優先度
- [x] Critical（本日中）
- [ ] High（2日以内）
- [ ] Medium（1週間以内）
- [ ] Low（期限なし）

## ✅ 受け入れ条件
- [ ] 条件1（測定可能な形で）
- [ ] 条件2（測定可能な形で）

## 🚫 やらないこと（スコープ外）
- スコープ外の内容を明記
- このタスク以外の作業は禁止

## 📎 参考資料
- 必要なドキュメントやリンク

## ⚠️ 重要な注意事項
**このタスク完了後は、新しいIssueが発行されるまで作業を停止してください**
```

### 2. 進捗管理

#### 日次確認事項
1. **朝のIssue確認**
   ```bash
   # 全Issueの状態確認
   gh issue list --state all
   
   # 進捗確認が必要なIssue
   gh issue list --label "in-progress"
   ```

2. **ブロッカー対応**
   - ワーカーからの質問には1時間以内に回答
   - ブロッカーは最優先で解決

### 3. Issue完了確認プロセス

#### ワーカーがIssue完了時に必ず実行
```bash
# 1. 最終動作確認
npm test && npm run build && npm run lint

# 2. Issue完了報告コメント
gh issue comment [ISSUE_NUMBER] --body "
**From**: ワーカー
**To**: ディレクター

## 完了報告
- ✅ 実装完了
- ✅ テスト実行: パス
- ✅ ビルド確認: 成功
- ✅ Lint確認: エラーなし

### 成果物
- [実装したファイルのリスト]
- [動作確認手順]

PR: #[PR_NUMBER]
"
```

#### ディレクターのIssue確認手順
1. **PR内容の確認**
   - 受け入れ条件を満たしているか
   - コードの品質は適切か
   - テストは追加されているか

2. **動作確認**
   ```bash
   # ブランチをチェックアウト
   git checkout feature/issue-[NUMBER]
   # 動作確認
   npm install && npm run dev
   ```

3. **Issue状態の更新**
   ```bash
   # 承認の場合
   gh issue close [ISSUE_NUMBER] --comment "
   **From**: ディレクター
   **To**: ワーカー
   
   確認完了。良い実装です！"
   
   # 修正が必要な場合
   gh issue comment [ISSUE_NUMBER] --body "
   **From**: ディレクター
   **To**: ワーカー
   
   以下の修正をお願いします: [修正内容]"
   ```

---

## 作業フロー図（改訂版）

```
ディレクター                    ワーカー
    |                             |
    |-- 1. Issue作成 ------------>|
    |                             |-- 2. Issue確認
    |                             |-- 3. .gitignore作成（初回）
    |                             |-- 4. 作業開始宣言
    |                             |-- 5. ブランチ作成
    |                             |-- 6. 実装
    |<-- 7. 質問（あれば）--------|
    |-- 8. 回答 ---------------->|
    |                             |-- 9. git status確認
    |                             |-- 10. 適切なコミット
    |                             |-- 11. PR作成 ★
    |<-- 12. レビュー依頼 --------|
    |-- 13. コードレビュー ------>|
    |-- 14. 承認&マージ -------->|
    |                             |
    |-- 15. Issue自動クローズ --->|
    |-- 16. 次のIssue作成 ------->|
```

---

## トラブルシューティング

### ワーカーが勝手に作業を続けた場合
1. ディレクターが発見次第、即座に停止指示
2. 作成したコードは一旦退避
3. 正式なIssueを作成してから再開
4. 以下のコメントで注意
   ```bash
   gh issue comment --body "
   **From**: ディレクター
   **To**: ワーカー
   
   ⚠️ 作業停止指示
   Issueなしでの作業を確認しました。
   即座に作業を停止し、次の指示を待ってください。"
   ```

### ワーカーが30分ごとのIssue確認を忘れた場合
1. ディレクターから定期確認のリマインド
2. 自動化スクリプトの導入を検討

### 基本的なミスを防ぐチェックリスト
- [ ] .gitignoreは作成したか？
- [ ] git statusで確認したか？
- [ ] node_modulesは除外されているか？
- [ ] package-lock.jsonは含めたか？
- [ ] PRは作成したか？（直接pushは禁止）
- [ ] PR本文に`Closes #[ISSUE_NUMBER]`を含めたか？
- [ ] To/Fromは記載したか？

---

## Claude使用時の必須ルール

### Claude.mdファイル作成時
```markdown
# claude.md テンプレート

## 最初に確認したこと
- [ ] github-dev-roles.mdを読みました
- [ ] 現在のIssueを確認しました（Issue #XX）
- [ ] 役割（ワーカー/ディレクター）を理解しました

## 私の役割
[ワーカー/ディレクター]として作業します

## 現在のタスク
Issue #XX: [タスクの内容]

## 作業ルール（github-dev-roles.mdより）
- Issueなしでの作業は禁止
- .gitignoreを最初に作成
- node_modulesは絶対にコミットしない
- 作業完了後は必ずIssueをクローズ
```

### Claude起動時の確認事項
1. **必ず最初にgithub-dev-roles.mdを読む**
2. **自分の役割を明確にする**
3. **現在のIssueを確認する**
4. **ルールに従って作業する**