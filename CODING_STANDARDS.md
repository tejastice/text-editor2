# コーディング規約・品質基準

## TypeScript/JavaScript規約

### 命名規則
- **変数・関数**: camelCase (`getUserName`, `isFileLoaded`)
- **定数**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`, `DEFAULT_THEME`)
- **型・インターフェース**: PascalCase (`FileManager`, `EditorConfig`)
- **コンポーネント**: PascalCase (`TextEditor`, `MenuBar`)

### ファイル構成
```
src/
├── main/              # Electronメインプロセス
├── renderer/          # Reactレンダラープロセス
│   ├── components/    # Reactコンポーネント
│   ├── hooks/         # カスタムフック
│   ├── utils/         # ユーティリティ関数
│   ├── types/         # 型定義
│   └── styles/        # スタイルファイル
├── shared/            # 共通コード
└── tests/             # テストファイル
```

### コード品質基準

#### 必須事項
- [ ] すべての関数に型注釈
- [ ] パブリックメソッドにJSDoc
- [ ] エラーハンドリングの実装
- [ ] null/undefined チェック
- [ ] ESLintエラーゼロ
- [ ] Prettierでフォーマット済み

#### パフォーマンス要件
- [ ] ファイル読み込み: 100MB → 3秒以内
- [ ] 検索機能: 100万行 → 1秒以内
- [ ] 起動時間: 2秒以内
- [ ] メモリ使用量: アイドル時200MB以下

## React規約

### コンポーネント設計
```typescript
// ✅ Good
interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
  isReadOnly?: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({ 
  content, 
  onChange, 
  isReadOnly = false 
}) => {
  // 実装
};

// ❌ Bad - propsの型がない
const TextEditor = ({ content, onChange }) => {
  // 実装
};
```

### カスタムフック規則
- `use`で開始
- 単一責任の原則
- 型安全性の確保
- エラーハンドリング含む

```typescript
// ✅ Good
const useFileManager = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFile = useCallback(async (path: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const fileContent = await electronAPI.readFile(path);
      setFile(fileContent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { file, isLoading, error, loadFile };
};
```

## Electron規約

### IPC通信
- 型安全なIPC定義
- エラーハンドリング必須
- セキュリティ考慮

```typescript
// preload.ts
const electronAPI = {
  readFile: (path: string): Promise<string> => 
    ipcRenderer.invoke('read-file', path),
  
  writeFile: (path: string, content: string): Promise<void> => 
    ipcRenderer.invoke('write-file', path, content),
};

// main.ts
ipcMain.handle('read-file', async (_, path: string) => {
  try {
    return await fs.readFile(path, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
});
```

## テスト規約

### テストファイル命名
- `*.test.ts` - 単体テスト
- `*.integration.test.ts` - 結合テスト
- `*.e2e.test.ts` - E2Eテスト

### カバレッジ要件
- 単体テスト: 80%以上
- 重要な機能: 95%以上
- ユーティリティ関数: 100%

### テスト構造
```typescript
describe('FileManager', () => {
  beforeEach(() => {
    // セットアップ
  });

  describe('loadFile', () => {
    it('should load file successfully', async () => {
      // Arrange
      const filePath = '/test/file.txt';
      const expectedContent = 'test content';

      // Act
      const result = await fileManager.loadFile(filePath);

      // Assert
      expect(result).toBe(expectedContent);
    });

    it('should handle file not found error', async () => {
      // テスト実装
    });
  });
});
```

## セキュリティ要件

### 必須対応
- [ ] nodeIntegration: false
- [ ] contextIsolation: true
- [ ] サンドボックス有効化
- [ ] CSP設定
- [ ] 外部リソース検証

### 禁止事項
- eval()の使用
- innerHTML による動的HTML生成
- 外部スクリプトの動的読み込み
- 機密情報のローカルストレージ保存

## Git規約

### コミットメッセージ
```
feat: add file auto-save functionality
fix: resolve memory leak in text editor
docs: update API documentation
style: format code with prettier
refactor: optimize file reading performance
test: add unit tests for search function
chore: update dependencies
```

### ブランチ戦略
- `main`: 本番リリース版
- `develop`: 開発統合ブランチ
- `feature/issue-XX-description`: 機能開発
- `fix/issue-XX-description`: バグ修正

## PR・レビュー基準

### PR作成時チェックリスト
- [ ] 関連Issueの番号記載
- [ ] 変更内容の説明
- [ ] テスト実行結果
- [ ] スクリーンショット（UI変更時）
- [ ] パフォーマンス影響評価

### レビュー観点
1. **機能性**: 要件を満たしているか
2. **可読性**: コードが理解しやすいか
3. **保守性**: 将来的な変更に対応できるか
4. **パフォーマンス**: 性能要件を満たしているか
5. **セキュリティ**: 脆弱性がないか