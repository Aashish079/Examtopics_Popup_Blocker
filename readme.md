# ExamTopics Popup Blocker

A Chrome extension that automatically blocks and hides annoying popups on ExamTopics and similar websites.

## 📋 Features

- 🚫 Automatically detects and hides popup overlays
- ⚡ Works in real-time with dynamic content
- 🔄 Monitors DOM changes for dynamically loaded popups
- 🌐 Compatible with Chromium-based browsers (Chrome, Edge, etc.)

## 🚀 Installation Guide

Clone the repo or just download as Zip then:

Follow these step-by-step instructions to install the extension in your browser:


### 1. 🌐 Open Browser Extensions Page

Choose your browser:

- **Chrome**: Navigate to `chrome://extensions`
- **Edge**: Navigate to `edge://extensions`

### 2. 🔧 Enable Developer Mode

1. Find the **"Developer mode"** toggle (usually in the top-right corner)
2. Turn it **ON**

### 3. 📂 Load the Extension

1. Click the **"Load unpacked"** button
2. In the file dialog, navigate to and select the folder you created in Step 1
3. Click **"Select Folder"**

## ✅ Verification

The extension is now installed! 🎉

- It will run automatically on every website you visit
- When it detects popup overlays (like those on ExamTopics), it will hide them instantly
- You'll see console messages in Developer Tools when popups are blocked

## 🛠️ How It Works

The extension uses a content script that:

1. **Scans** the page for elements with popup classes (`.popup-overlay.show`)
2. **Monitors** DOM changes using MutationObserver for dynamically loaded content
3. **Hides** detected popups by setting `display: none`
4. **Watches** for attribute changes that might reveal hidden popups

## 🔍 Troubleshooting

If the extension isn't working:

1. Check that **Developer mode** is enabled
2. Refresh the webpage after installing the extension
3. Open Developer Tools (F12) and check the Console for any error messages
4. Verify both files are in the correct folder structure

## 📝 Notes

- The extension targets elements with both `popup-overlay` and `show` CSS classes
- It works on any website using similar popup structures
- No internet connection required - works entirely offline
