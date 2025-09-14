import type { Nullable } from '@silverhand/essentials';
import classNames from 'classnames';
import type { TFuncKey } from 'i18next';

import ConnectIcon from '@/assets/icons/connect-icon.svg?react';
import DynamicT from '@/shared/components/DynamicT';

import styles from './index.module.scss';

export type Props = {
  readonly className?: string;
  readonly logo?: Nullable<string>;
  readonly thirdPartyLogo?: Nullable<string>;
  readonly headline?: TFuncKey;
  readonly headlineInterpolation?: Record<string, unknown>;
  /** Optional literal headline text to override i18n key */
  readonly headlineText?: string;
};

const BrandingHeader = ({
  logo,
  thirdPartyLogo,
  headline,
  headlineInterpolation,
  className,
  headlineText,
}: Props) => {
  const shouldShowLogo = Boolean(thirdPartyLogo ?? logo);
  const shouldConnectSvg = Boolean(thirdPartyLogo && logo);

  return (
    <div className={classNames(styles.container, className)}>
      {shouldShowLogo && (
        <div className={styles.logoWrapper}>
          {thirdPartyLogo && (
            <img className={styles.logo} alt="third party logo" src={thirdPartyLogo} />
          )}
          {shouldConnectSvg && <ConnectIcon className={styles.connectIcon} />}
          {logo && <img className={styles.logo} alt="app logo" src={logo} />}
        </div>
      )}

      {(headlineText || headline) && (
        <div className={styles.headline}>
          {headlineText ? (
            headlineText
          ) : (
            <DynamicT forKey={headline} interpolation={headlineInterpolation} />
          )}
        </div>
      )}
    </div>
  );
};

export default BrandingHeader;
