import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// electronAPI のモック
Object.defineProperty(window, 'electronAPI', {
  value: {
    platform: 'darwin',
    sendMessage: jest.fn(),
    onMessage: jest.fn(),
  },
  writable: true,
});

describe('App', () => {
  test('renders the application title', () => {
    render(<App />);
    const titleElement = screen.getByText('Text Editor 2');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the toolbar buttons', () => {
    render(<App />);
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('renders the text editor', () => {
    render(<App />);
    const textEditor = screen.getByPlaceholderText('テキストを入力してください...');
    expect(textEditor).toBeInTheDocument();
  });

  test('displays platform information', () => {
    render(<App />);
    const platformInfo = screen.getByText('Platform: darwin');
    expect(platformInfo).toBeInTheDocument();
  });
});