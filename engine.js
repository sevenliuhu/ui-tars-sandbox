/**
 * HOMO UI-TARS Sandbox Engine — Agent execution security sandbox
 * 闭源C++二进制交付（原型为Node.js）
 * 
 * 功能: 审计Agent的每一步操作、记录屏幕、策略控制、操作回放
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class SandboxEngine {
  constructor(options = {}) {
    this.sessionId = crypto.randomUUID();
    this.auditLog = [];
    this.screenshots = [];
    this.policy = options.policy || {};
    this.startTime = Date.now();
    this.actionCount = 0;
    this.dbPath = options.dbPath || process.env.HOMO_SANDBOX_DB || '/tmp/sandbox.db';
    this.allowedDomains = options.allowedDomains || this.policy.allowedDomains || [];
    this.blockedPatterns = options.blockedPatterns || this.policy.blockedPatterns || [];
    this.maxActions = options.maxActions || this.policy.maxActions || 1000;
    this.maxScreenshots = options.maxScreenshots || this.policy.maxScreenshots || 500;
  }

  // 审计单个Agent操作
  audit(agentId, action, details = {}) {
    this.actionCount++;
    const entry = {
      id: this.actionCount,
      timestamp: new Date().toISOString(),
      agentId,
      action,
      details: {
        url: details.url,
        selector: details.selector,
        text: details.text ? details.text.substring(0, 100) : undefined,
        value: details.value ? '***' : undefined,
      },
      result: details.result,
      duration: details.duration
    };
    this.auditLog.push(entry);
    return entry;
  }

  // 策略检查 — 操作是否被允许
  checkPolicy(action, details = {}) {
    // 域名白名单
    if (details.url && this.allowedDomains.length > 0) {
      try {
        const domain = new URL(details.url).hostname;
        if (!this.allowedDomains.some(d => domain.endsWith(d))) {
          return { allowed: false, reason: `Domain not allowed: ${domain}` };
        }
      } catch(e) { /* invalid URL */ }
    }

    // 敏感操作检查
    if (action === 'type' && details.value) {
      for (const pattern of this.blockedPatterns) {
        if (details.value.match(new RegExp(pattern, 'i'))) {
          return { allowed: false, reason: `Blocked pattern matched: ${pattern}` };
        }
      }
    }

    // 操作次数限制
    if (this.actionCount >= this.maxActions) {
      return { allowed: false, reason: 'Max actions exceeded' };
    }

    return { allowed: true };
  }

  // 记录截屏
  recordScreenshot(screenshot) {
    if (this.screenshots.length >= this.maxScreenshots) return;
    this.screenshots.push({
      id: this.screenshots.length + 1,
      timestamp: new Date().toISOString(),
      actionId: this.actionCount,
      data: screenshot.substring(0, 50) + '...' // 仅记录hash，不存完整图片
    });
  }

  // 导出审计报告
  exportReport(format = 'json') {
    const report = {
      sessionId: this.sessionId,
      started: new Date(this.startTime).toISOString(),
      duration: Date.now() - this.startTime,
      totalActions: this.actionCount,
      totalScreenshots: this.screenshots.length,
      actions: this.auditLog,
      screenshots: this.screenshots
    };
    
    if (format === 'json') {
      const filePath = `/tmp/sandbox-report-${this.sessionId}.json`;
      fs.writeFileSync(filePath, JSON.stringify(report, null, 2));
      return filePath;
    }
    return report;
  }

  // 操作回放
  replay(actionId) {
    const entry = this.auditLog.find(a => a.id === actionId);
    if (!entry) throw new Error(`Action #${actionId} not found`);
    return entry;
  }

  getStats() {
    return {
      sessionId: this.sessionId,
      duration: Date.now() - this.startTime,
      actions: this.actionCount,
      screenshots: this.screenshots.length,
      violations: this.auditLog.filter(a => a.result === 'blocked').length
    };
  }
}

module.exports = SandboxEngine;
