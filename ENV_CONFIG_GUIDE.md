# Logto 环境变量配置指南

## .env 文件配置

在你的 Logto 项目根目录下的 `.env` 文件中添加以下配置：

```bash
# 自定义登录页面底部版权信息配置

# 方式1: 显示自定义版权信息（自动加年份）+ 可点击链接
LOGTO_CUSTOM_COPYRIGHT="您的公司名称"  # 显示为 "© 2025 您的公司名称"
LOGTO_CUSTOM_BRAND_URL="https://www.yourcompany.com"  # 点击跳转到公司官网
LOGTO_SHOW_POWERED_BY="true"

# 方式2: 显示自定义版权信息（纯文本，不可点击）
LOGTO_CUSTOM_COPYRIGHT="您的公司名称"  # 显示为 "© 2025 您的公司名称"
# 不设置 LOGTO_CUSTOM_BRAND_URL
LOGTO_SHOW_POWERED_BY="true"

# 方式3: 显示默认 "Powered by Logto"
# LOGTO_SHOW_POWERED_BY="true"
# 不设置 LOGTO_CUSTOM_COPYRIGHT

# 方式4: 隐藏所有底部信息
# LOGTO_SHOW_POWERED_BY="false"
# 不设置 LOGTO_CUSTOM_COPYRIGHT
```

## 配置项说明

### LOGTO_CUSTOM_COPYRIGHT
- **作用**: 设置自定义品牌名称
- **自动格式化**: 系统会自动在前面加上 "© 当前年份"
- **优先级**: 最高，如果设置了此变量，将显示自定义版权信息
- **格式**: 品牌名称字符串（不需要包含年份和版权符号）
- **示例**: 
  - `LOGTO_CUSTOM_COPYRIGHT="TMAPI"` → 显示为 "© 2025 TMAPI"
  - `LOGTO_CUSTOM_COPYRIGHT="我的公司"` → 显示为 "© 2025 我的公司"
  - `LOGTO_CUSTOM_COPYRIGHT="XXXX科技有限公司"` → 显示为 "© 2025 XXXX科技有限公司"

### LOGTO_CUSTOM_BRAND_URL
- **作用**: 设置自定义品牌名点击跳转的 URL
- **依赖**: 需要同时设置 `LOGTO_CUSTOM_COPYRIGHT` 才会生效
- **可选**: 如果不设置，版权信息显示为纯文本；如果设置了，版权信息显示为可点击链接
- **格式**: 完整的 URL 地址
- **示例**: 
  - `LOGTO_CUSTOM_BRAND_URL="https://www.tmapi.com"`
  - `LOGTO_CUSTOM_BRAND_URL="https://www.mycompany.com"`
  - `LOGTO_CUSTOM_BRAND_URL="https://about.mycompany.com"`

### LOGTO_SHOW_POWERED_BY
- **作用**: 控制是否显示底部信息
- **默认**: `"true"`（显示）
- **隐藏**: 设置为 `"false"` 时隐藏
- **注意**: 如果设置了 `LOGTO_CUSTOM_COPYRIGHT`，此选项被忽略

## 使用步骤

1. **编辑 .env 文件**：
   ```bash
   cd /usr/local/logto_dev
   nano .env  # 或使用其他编辑器
   ```

2. **添加配置**：
```bash
# 在 .env 文件末尾添加
LOGTO_CUSTOM_COPYRIGHT="您的公司名称"  # 会显示为 "© 2025 您的公司名称"
LOGTO_CUSTOM_BRAND_URL="https://www.yourcompany.com"  # 可选：点击跳转链接
LOGTO_SHOW_POWERED_BY="true"
```3. **重启服务**：
   ```bash
   # 停止当前服务
   Ctrl+C
   
   # 重新启动
   pnpm dev
   ```

4. **验证效果**：
   - 访问登录页面 `http://localhost:5001/sign-in`
   - 查看页面底部是否显示了自定义版权信息

## 完整的 .env 文件示例

```bash
PORT=4001
ADMIN_PORT=4002
DB_URL=postgres://postgres:123456@127.0.0.1:5435/logto_dev
REDIS_URL=redis://127.0.0.1:6380/1

# 自定义登录页面底部版权信息配置
LOGTO_CUSTOM_COPYRIGHT="您的公司名称"  # 显示为 "© 2025 您的公司名称"
LOGTO_CUSTOM_BRAND_URL="https://www.yourcompany.com"  # 可选：点击跳转链接
LOGTO_SHOW_POWERED_BY="true"
```

## 不同部署环境的配置

### 开发环境 (.env.development)
```bash
LOGTO_CUSTOM_COPYRIGHT="开发环境 - 您的公司"  # 显示为 "© 2025 开发环境 - 您的公司"
LOGTO_SHOW_POWERED_BY="true"
```

### 生产环境 (.env.production)
```bash
LOGTO_CUSTOM_COPYRIGHT="您的公司名称"  # 显示为 "© 2025 您的公司名称 版权所有"
LOGTO_SHOW_POWERED_BY="true"
```

### 测试环境 (.env.test)
```bash
LOGTO_SHOW_POWERED_BY="false"  # 测试环境隐藏底部信息
```

## 注意事项

1. **重启服务**: 修改 `.env` 文件后必须重启 Logto 服务
2. **文件权限**: 确保 `.env` 文件有正确的读取权限
3. **特殊字符**: 如果版权信息包含特殊字符，请使用引号包围
4. **环境变量优先级**: 系统环境变量 > `.env` 文件中的变量
5. **版本控制**: 不要将包含敏感信息的 `.env` 文件提交到版本控制系统

## 动态切换示例

你可以通过修改 `.env` 文件快速切换不同的显示模式：

```bash
# 显示自定义版权（自动加年份）
LOGTO_CUSTOM_COPYRIGHT="我的公司"  # 显示为 "© 2025 我的公司"

# 修改为隐藏所有信息
# LOGTO_CUSTOM_COPYRIGHT="我的公司"  # 注释掉
LOGTO_SHOW_POWERED_BY="false"

# 修改为显示默认 Logto 标识
# LOGTO_CUSTOM_COPYRIGHT="我的公司"  # 注释掉  
# LOGTO_SHOW_POWERED_BY="false"  # 注释掉或设为 true
```

每次修改后重启服务即可看到效果变化。
