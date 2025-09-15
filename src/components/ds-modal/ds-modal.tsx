import React from 'react';
import { prefix } from '../prefix';
import { DsButton, type DsButtonProps } from '../ds-button/ds-button';
import Modal from 'react-modal';
import DsIconX12x12 from '../../icons/ds-icon-x-16x16';
import classnames from 'classnames';

const compPrefix = `${prefix}-modal`;
export interface ModalAction {
  label: string
  onClick: () => void
}

interface ModalHeaderConfig {
  modalTitle: string
  layout?: 'horizontal' | 'vertical'
  modalSubtitle?: string
  icon?: JSX.Element
}

interface ModalFooterConfig {
  primaryAction: DsButtonProps
  secondaryAction?: DsButtonProps
  footerContent?: string
  layout?: 'horizontal' | 'vertical'
}

export interface DsModalProps {
  open: boolean
  onOpenChange: (nextOpen: boolean) => void
  shouldCloseOnOverlayClick?: boolean
  modalHeader?: JSX.Element | ModalHeaderConfig
  modalBody?: JSX.Element
  modalFooter?: JSX.Element | ModalFooterConfig
  showDismiss?: boolean
  divided?: boolean

  className?: string
}

export const DsModal = ({ shouldCloseOnOverlayClick = true, ...props }: DsModalProps) => {
  const header = React.useMemo(() => {
    if (!props.modalHeader) return null;
    if (React.isValidElement(props.modalHeader)) return props.modalHeader;
    const { modalTitle, modalSubtitle, icon, layout } = props.modalHeader as ModalHeaderConfig;
    return (
      <div className={`${compPrefix}-header layout-${layout || 'horizontal'}`}>
        {icon && <div className={`${compPrefix}-icon`}>{icon}</div>}
        <div className={`${compPrefix}-header-content-wrapper layout-${layout || 'horizontal'}`}>
          {modalTitle}
          {modalSubtitle && <span className={`${compPrefix}-subtitle`}>{modalSubtitle}</span>}
        </div>
      </div>
    );
  }, [props.modalHeader]);

  const footer = React.useMemo(() => {
    if (!props.modalFooter) return null;
    if (React.isValidElement(props.modalFooter)) return props.modalFooter;
    const { primaryAction, secondaryAction, footerContent, layout } = props.modalFooter as ModalFooterConfig;
    return (
      <div className={`${compPrefix}-footer layout-${layout || 'horizontal'}`}>
        {(footerContent && layout === 'horizontal' || !layout) && <span className={`${compPrefix}-footer-content`}>{footerContent}</span>}
        <div className={`${compPrefix}-footer-actions`}>
          {secondaryAction && <DsButton {...secondaryAction} />}
          <DsButton {...primaryAction} />
        </div>
        {footerContent && layout === 'vertical' && <span className={`${compPrefix}-footer-content`}>{footerContent}</span>}
      </div>
    );
  }, [props.modalFooter]);

  const classNames = classnames(
    compPrefix,
    props.className,
    props.divided ? `${compPrefix}-divided` : ''
  );

  return (
    <Modal
      isOpen={props.open}
      onRequestClose={() => { props.onOpenChange(false); }}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      className={classNames}
      overlayClassName={`${compPrefix}-overlay`}
    >
      {props.showDismiss && <DsButton onClick={() => { props.onOpenChange(false); }} className={`${compPrefix}-dismiss`} hierarchy='tertiary' icon={<DsIconX12x12 />} />}
      {header}
      {props.modalBody}
      {footer}
    </Modal>
  );
};

// Backward compatibility export
export const dsModal = DsModal;
export type dsModalProps = DsModalProps;
