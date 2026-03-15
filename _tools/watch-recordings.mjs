/**
 * watch-recordings.mjs
 * 监听录像目录，有新 .flv 文件就自动生成一期内容 md
 *
 * 运行：node watch-recordings.mjs
 * 放在：E:\OBS\nginx-rtmp\nginx-rtmp-win32-master\
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 配置区
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const RECORDINGS_DIR = path.join(__dirname, 'temp', 'recordings');
const CONTENT_DIR    = 'E:\\site-v4最终版git\\src\\content\\videos';
const PUBLIC_DIR     = 'E:\\site-v4最终版git\\public\\videos';
const FFMPEG         = path.join(__dirname, 'ffmpeg.exe');
const EPISODE_PREFIX = 'ep';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 确保目录存在
if (!fs.existsSync(RECORDINGS_DIR)) fs.mkdirSync(RECORDINGS_DIR, { recursive: true });
if (!fs.existsSync(CONTENT_DIR))    fs.mkdirSync(CONTENT_DIR,    { recursive: true });
if (!fs.existsSync(PUBLIC_DIR))     fs.mkdirSync(PUBLIC_DIR,     { recursive: true });

// 获取下一集编号
function getNextEpNum() {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  return String(files.length + 1).padStart(3, '0');
}

// flv 转 mp4
function transcode(flvPath, mp4Path) {
  console.log('🔄 转码中...');
  try {
    execSync(`"${FFMPEG}" -i "${flvPath}" -c:v copy -c:a aac "${mp4Path}" -y`, { stdio: 'inherit' });
    console.log('✅ 转码完成：', mp4Path);
    return true;
  } catch (e) {
    console.error('❌ 转码失败：', e.message);
    return false;
  }
}

// 生成 md 文件
function generateMd(mp4Filename, epNum, dateStr) {
  const slug   = `${EPISODE_PREFIX}${epNum}-${dateStr}`;
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);

  const content = `---
title: "Episode ${epNum}"
titleZh: "第 ${epNum} 期"
pubDate: ${dateStr}
platform: "自制"
file: "${mp4Filename}"
description: ""
descriptionZh: ""
---
`;

  fs.writeFileSync(mdPath, content, 'utf-8');
  console.log('📝 生成 md：', mdPath);
}

// 监听目录
const seen = new Set(fs.readdirSync(RECORDINGS_DIR));

console.log('👁  监听录像目录：', RECORDINGS_DIR);
console.log('📁  内容输出目录：', CONTENT_DIR);
console.log('🎬  视频输出目录：', PUBLIC_DIR);
console.log('    直播结束后自动转码并生成 md...\n');

fs.watch(RECORDINGS_DIR, (event, filename) => {
  if (!filename || !filename.endsWith('.flv')) return;
  if (seen.has(filename)) return;
  seen.add(filename);

  setTimeout(() => {
    const flvPath = path.join(RECORDINGS_DIR, filename);
    if (!fs.existsSync(flvPath)) return;

    const now        = new Date();
    const dateStr    = now.toISOString().split('T')[0];
    const epNum      = getNextEpNum();
    const mp4Name    = `${EPISODE_PREFIX}${epNum}-${dateStr}.mp4`;
    const mp4Path    = path.join(PUBLIC_DIR, mp4Name);

    console.log(`\n🎬 检测到新录像：${filename}`);

    const ok = transcode(flvPath, mp4Path);
    if (ok) generateMd(mp4Name, epNum, dateStr);
  }, 2000);
});
