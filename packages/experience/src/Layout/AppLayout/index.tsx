import classNames from 'classnames';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import PageContext from '@/Providers/PageContextProvider/PageContext';
import usePlatform from '@/hooks/use-platform';
import LogtoSignature from '@/shared/components/LogtoSignature';
import { layoutClassNames } from '@/utils/consts';

import CustomContent from './CustomContent';
import styles from './index.module.scss';

const AppLayout = () => {
  const { experienceSettings, theme } = useContext(PageContext);
  const { isMobile } = usePlatform();

  // 简化显示逻辑：基于环境变量决定是否显示签名
  const showSignature = process.env.LOGTO_SHOW_POWERED_BY !== 'false' || process.env.LOGTO_CUSTOM_COPYRIGHT;

  return (
    <div className={styles.viewBox}>
      <div className={classNames(styles.container, layoutClassNames.pageContainer)}>
        {!isMobile && <CustomContent className={layoutClassNames.customContent} />}
        <main className={classNames(styles.main, layoutClassNames.mainContent)}>
          <Outlet />
          {showSignature && (
            <LogtoSignature 
              className={classNames(styles.signature, layoutClassNames.signature)} 
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
