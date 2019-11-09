import browser from 'webextension-polyfill';

const getText = browser.i18n.getMessage;

function createTab(url, index, openerTabId, active = true) {
  const props = {url: url, active: active};
  if (typeof index !== 'undefined') {
    props['index'] = index;
  }
  if (typeof openerTabId !== 'undefined') {
    props['openerTabId'] = openerTabId;
  }
  return browser.tabs.create(props);
}

function executeCode(string, tabId, frameId = 0, runAt = 'document_start') {
  return browser.tabs.executeScript(tabId, {
    frameId: frameId,
    runAt: runAt,
    code: string
  });
}

function executeFile(file, tabId, frameId = 0, runAt = 'document_start') {
  return browser.tabs.executeScript(tabId, {
    frameId: frameId,
    runAt: runAt,
    file: file
  });
}

function onComplete(n) {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  }
}

async function isAndroid() {
  const {os} = await browser.runtime.getPlatformInfo();
  return os === 'android';
}

async function getActiveTab() {
  const [tab] = await browser.tabs.query({
    lastFocusedWindow: true,
    active: true
  });
  return tab;
}

export {
  getText,
  createTab,
  executeCode,
  executeFile,
  onComplete,
  isAndroid,
  getActiveTab
};
