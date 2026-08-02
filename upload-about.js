// 临时保留工具：把指定图片上传到 Cloudinary 的 finmentor/about 目录（签名上传，无需 cloudinary SDK）。
// 已从文件中移除明文密钥 —— 凭证通过环境变量 CLOUDINARY_URL 提供，不进仓库。
//
// 用法（先设置环境变量，参数为可选本地图片路径）：
//   export CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
//   node upload-about.js [本地图片路径，默认 ../.doc/2026年7月27日/about.png]

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// 从 CLOUDINARY_URL 解析 cloud_name / api_key / api_secret（SDK 会自动读此变量，这里手动解析以去掉 SDK 依赖）
const m = (process.env.CLOUDINARY_URL || "").match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
if (!m) {
  console.error("✗ 未检测到 Cloudinary 凭证。请先设置环境变量：");
  console.error("  export CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>");
  process.exit(1);
}
const [, apiKey, apiSecret, cloudName] = m;

const target = process.argv[2] || path.resolve(__dirname, "../.doc/2026年7月27日/about.png");
if (!fs.existsSync(target)) {
  console.error("✗ 找不到图片:", target);
  process.exit(1);
}

// 需要签名的参数（不含 file / api_key），按 key 字母序拼接后末尾加 secret 做 sha1
const params = {
  folder: "finmentor/about",
  overwrite: "true",
  public_id: "about-page",
  timestamp: String(Math.round(Date.now() / 1000)),
};
const sorted = Object.keys(params)
  .sort()
  .map((k) => `${k}=${params[k]}`)
  .join("&");
const signature = crypto.createHash("sha1").update(sorted + apiSecret).digest("hex");

const form = new FormData();
form.append("file", new Blob([fs.readFileSync(target)]), path.basename(target));
form.append("api_key", apiKey);
form.append("timestamp", params.timestamp);
form.append("signature", signature);
form.append("folder", params.folder);
form.append("public_id", params.public_id);
form.append("overwrite", "true");

fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
  method: "POST",
  body: form,
})
  .then((r) => r.json())
  .then((r) => {
    if (r.secure_url) {
      console.log("✓ Uploaded:", r.secure_url);
    } else {
      console.error("✗ Error:", JSON.stringify(r));
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("✗ Error:", err.message);
    process.exit(1);
  });
