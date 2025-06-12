import React from 'react';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Text Editor 2</h1>
        <p>Mac用超高機能テキストエディタ</p>
      </header>
      
      <main className="app-main">
        <div className="editor-container">
          <div className="toolbar">
            <button className="btn">New</button>
            <button className="btn">Open</button>
            <button className="btn">Save</button>
          </div>
          
          <div className="editor-area">
            <textarea 
              className="text-editor"
              placeholder="テキストを入力してください..."
              defaultValue="Hello, Text Editor 2!"
            />
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <span>Platform: {window.electronAPI?.platform || 'unknown'}</span>
        <span>Ready</span>
      </footer>
    </div>
  );
};

export default App;