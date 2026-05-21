/* Copyright (c) 2026 HOMO AI. Proprietary. License required. Contact: 16208204@qq.com */
const assert = require('assert');
const SandboxEngine = require('../engine');

let passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`  ✅ ${name}`); }
  catch(e) { failed++; console.log(`  ❌ ${name}: ${e.message}`); }
}

console.log('\n📋 HOMO UI-TARS Sandbox 测试\n');

const sandbox = new SandboxEngine({
  allowedDomains: ['example.com', 'github.com'],
  blockedPatterns: ['password', 'secret', 'token'],
  maxActions: 100
});

test('沙箱初始化', () => {
  assert.ok(sandbox.sessionId);
  assert.equal(sandbox.maxActions, 100);
});

test('审计Agent操作', () => {
  const entry = sandbox.audit('agent-1', 'click', { url: 'https://example.com', selector: '#btn' });
  assert.equal(entry.agentId, 'agent-1');
  assert.equal(sandbox.actionCount, 1);
});

test('域名白名单 — 允许', () => {
  assert.ok(sandbox.checkPolicy('navigate', { url: 'https://github.com/homo-ai' }).allowed);
});

test('域名白名单 — 阻止', () => {
  const r = sandbox.checkPolicy('navigate', { url: 'https://evil.com/malware' });
  assert.ok(!r.allowed);
});

test('敏感输入检测 — 阻止密码', () => {
  const r = sandbox.checkPolicy('type', { value: 'myPassword123!' });
  assert.ok(!r.allowed);
});

test('正常输入放行', () => {
  assert.ok(sandbox.checkPolicy('type', { value: 'Hello world' }).allowed);
});

test('记录截屏', () => {
  sandbox.recordScreenshot('base64_screenshot_data');
  assert.equal(sandbox.screenshots.length, 1);
});

test('导出审计报告', () => {
  const report = sandbox.exportReport('object');
  assert.ok(report.sessionId);
  assert.ok(report.actions.length > 0);
});

test('操作次数限制', () => {
  const limited = new SandboxEngine({ maxActions: 3 });
  limited.audit('agent', 'click', {url:'https://example.com'});
  limited.audit('agent', 'click', {url:'https://example.com'});
  limited.audit('agent', 'click', {url:'https://example.com'});
  assert.ok(!limited.checkPolicy('click', {url:'https://example.com'}).allowed);
});

test('无白名单时放行', () => {
  assert.ok(new SandboxEngine({}).checkPolicy('click', { url: 'https://any.com' }).allowed);
});

console.log(`\n📊 UI-TARS Sandbox: ${passed} ✅ / ${failed} ❌ / ${passed + failed} 总计\n`);
process.exit(failed > 0 ? 1 : 0);
