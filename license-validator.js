/* Copyright (C) 2026 HOMO AI. License required. */
const _k=process.env.HOMO_LICENSE_KEY;const licenseOk=_k&&_k.length>=16;if(!licenseOk)console.warn('[HOMO] License required. Contact: 16208204@qq.com');module.exports={validateLicense:()=>licenseOk};
