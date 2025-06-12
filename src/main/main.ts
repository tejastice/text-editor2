import { app, BrowserWindow } from 'electron';
import * as path from 'path';

class App {
  private mainWindow: BrowserWindow | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    app.whenReady().then(() => {
      this.createWindow();

      app.on('activate', () => {
        // macOS では、アプリがアクティブになったときにウィンドウがない場合は新しいウィンドウを作成
        if (BrowserWindow.getAllWindows().length === 0) {
          this.createWindow();
        }
      });
    });

    app.on('window-all-closed', () => {
      // macOS 以外では、すべてのウィンドウが閉じられたときにアプリを終了
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
  }

  private createWindow(): void {
    // メインウィンドウを作成
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
      },
      titleBarStyle: 'hiddenInset', // macOS ネイティブなタイトルバー
      show: false, // 準備ができるまで非表示
    });

    // 開発環境では dev server から、本番環境では dist から読み込み
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
      this.mainWindow.loadURL('http://localhost:3000');
      this.mainWindow.webContents.openDevTools();
    } else {
      this.mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
    }

    // ウィンドウの準備が完了したら表示
    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow?.show();
    });

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });
  }
}

// アプリケーションを開始
new App();