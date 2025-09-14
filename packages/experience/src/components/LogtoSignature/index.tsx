import { Theme } from '@logto/schemas';
import { useContext } from 'react';

import PageContext from '@/Providers/PageContextProvider/PageContext';
import LogtoLogtoDark from '@/assets/icons/logto-logo-dark.svg?react';
import LogtoLogoLight from '@/assets/icons/logto-logo-light.svg?react';
import LogtoLogoShadow from '@/assets/icons/logto-logo-shadow.svg?react';

import styles from './index.module.scss';

const logtoUrl = `https://logto.io/?${new URLSearchParams({
  utm_source: 'sign_in',
  utm_medium: 'powered_by',
}).toString()}`;

type Props = {
  readonly className?: string;
};

const LogtoSignature = ({ className }: Props) => {
  const { theme } = useContext(PageContext);
  const LogtoLogo = theme === Theme.Light ? LogtoLogoLight : LogtoLogtoDark;

  // 从环境变量获取自定义品牌名和 URL
  const customBrandName = process.env.LOGTO_CUSTOM_COPYRIGHT;
  const customBrandUrl = process.env.LOGTO_CUSTOM_BRAND_URL;
  
  // 调试信息
  console.log('环境变量调试:', {
    customBrandName,
    customBrandUrl,
    LOGTO_CUSTOM_COPYRIGHT: process.env.LOGTO_CUSTOM_COPYRIGHT,
    LOGTO_CUSTOM_BRAND_URL: process.env.LOGTO_CUSTOM_BRAND_URL,
    LOGTO_SHOW_POWERED_BY: process.env.LOGTO_SHOW_POWERED_BY
  });
  
  // 如果有自定义品牌名，自动生成版权信息
  if (customBrandName) {
    const currentYear = new Date().getFullYear();
    const customCopyright = `© ${currentYear} ${customBrandName}`;
    
    console.log('显示自定义版权:', customCopyright);
    console.log('品牌 URL:', customBrandUrl);
    
    // 如果有自定义 URL，显示为可点击链接；否则显示为纯文本
    if (customBrandUrl) {
      return (
        <div className={className}>
          <a
            className={styles.signature}
            href={customBrandUrl}
            target="_blank"
            rel="noopener"
            aria-label={`Visit ${customBrandName} website`}
          >
            <span className={styles.text}>{customCopyright}</span>
          </a>
        </div>
      );
    } else {
      return (
        <div className={className}>
          <div className={styles.signature}>
            <span className={styles.text}>{customCopyright}</span>
          </div>
        </div>
      );
    }
  }

  // 从环境变量检查是否显示 Powered by Logto
  const showPoweredBy = process.env.LOGTO_SHOW_POWERED_BY !== 'false';
  
  if (!showPoweredBy) {
    return null;
  }

  // 默认显示 Powered by Logto
  return (
    <div className={className}>
      <a
        className={styles.signature}
        href={logtoUrl.toString()}
        target="_blank"
        rel="noopener"
      >
        <span className={styles.text}>Powered by</span>
        <LogtoLogoShadow className={styles.staticIcon} />
        <LogtoLogo className={styles.highlightIcon} />
      </a>
    </div>
  );
};

export default LogtoSignature;
