import { contextBridge, ipcRenderer } from 'electron';

// レンダラープロセスに安全なAPIを公開
contextBridge.exposeInMainWorld('electronAPI', {
  // 将来的にファイル操作などのAPIを追加予定
  platform: process.platform,
  
  // IPCメッセージの送受信（将来使用）
  sendMessage: (channel: string, data: any) => {
    // 許可されたチャンネルのみ
    const validChannels = ['file-open', 'file-save', 'file-new'];
    if (validChannels.includes(channel)) {
      ipcRenderer.invoke(channel, data);
    }
  },
  
  onMessage: (channel: string, callback: Function) => {
    const validChannels = ['file-opened', 'file-saved'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
  },
});

// TypeScript型定義をグローバルに追加
declare global {
  interface Window {
    electronAPI: {
      platform: string;
      sendMessage: (channel: string, data: any) => void;
      onMessage: (channel: string, callback: Function) => void;
    };
  }
}