// 临时保留工具：把指定图片上传到 Cloudinary 的 finmentor/about 目录。
// 已从文件中移除明文密钥 —— 凭证通过环境变量 CLOUDINARY_URL 提供，不进仓库。
//
// 用法（先设置环境变量，参数为可选本地图片路径）：
//   export CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
//   node upload-about.js [本地图片路径，默认 ../.doc/2026年7月27日/about.png]

const cloudinary = require("cloudinary").v2
const path = require("path")

// cloudinary SDK 会自动从 process.env.CLOUDINARY_URL 读取 cloud_name / api_key / api_secret
const cfg = cloudinary.config()
if (!cfg.cloud_name || !cfg.api_key || !cfg.api_secret) {
  console.error("✗ 未检测到 Cloudinary 凭证。请先设置环境变量：")
  console.error("  export CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>")
  process.exit(1)
}

const target = process.argv[2] || path.resolve(__dirname, "../.doc/2026年7月27日/about.png")

cloudinary.uploader
  .upload(target, {
    folder: "finmentor/about",
    public_id: "about-page",
    overwrite: true,
    resource_type: "image",
  })
  .then((result) => {
    console.log("✓ Uploaded:", result.secure_url)
  })
  .catch((err) => {
    console.error("✗ Error:", err.message)
  })
