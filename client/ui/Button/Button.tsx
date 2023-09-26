/* eslint-disable react/no-multi-comp */
import type { ComponentProps, FC, HTMLAttributes, ReactNode } from 'react';
// import { Children } from 'react';
import { useHistory } from 'react-router-dom';

// import styled, { css } from 'styled-components';
// import type { CSSType } from '../../Styled';
// import type { Props as IconPropsOriginal } from '../Icon/Icon';
import { Icon } from '../Icon/Icon';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  variant: 'danger' | 'dark' | 'info' | 'primary' | 'success' | 'warning';
  icon?: ComponentProps<typeof Icon>['glyph'];
  navigate?: string;
  title: string;
  children: ReactNode;
}

// const variantToColor = {
//   danger: '#d9534f',
//   dark: '#3e3f3a',
//   info: '#1b8dbb',
//   primary: '#325d88',
//   success: '#79a736',
//   warning: '#ef5c0e',
// };

const variantToColorClass = {
  danger: 'bg-red-500',
  dark: 'bg-neutral-700',
  info: 'bg-cyan-600',
  primary: 'bg-cyan-800',
  success: 'bg-lime-600',
  warning: 'bg-orange-600',
};

// const ButtonStyled = styled.button`
//   border: 0;
//   border-radius: 2px;
//   color: #fff;
//   font-family: inherit;
//   font-size: 10px;
//   font-weight: 500;
//   outline: none;
//   padding: 4px 6px;
//   transition: background-color 200ms;
//   vertical-align: middle;
//   margin-right: 5px;
//   white-space: nowrap;

//   &:first-child {
//     margin-left: 0;
//   }

//   &:last-child {
//     margin-right: 0;
//   }

//   &:hover {
//     filter: brightness(90%);
//   }

//   &:active {
//     filter: brightness(80%);
//   }

//   ${({ variant }: Readonly<Props>): CSSType => css`
//     background-color: ${variantToColor[variant]};
//   `}

//   &:disabled {
//     cursor: not-allowed;
//     background-color: #959595 !important;
//   }
// `;

// interface IconProps extends IconPropsOriginal {
//   isAlone: boolean;
// }

// const ButtonIconn = styled(Icon)<IconProps>`
//   margin-right: 3px;
//   vertical-align: middle;
//   path {
//     fill: white;
//   }

//   svg {
//     color: blue; /* Or any color of your choice. */
//   }

//   ${({ isAlone }: Readonly<IconProps>): CSSType =>
//     isAlone &&
//     css`
//       margin-right: 0;
//     `}
// `;

export const ButtonIcon: FC<ComponentProps<typeof Icon>> = ({ glyph }) => {
  return <Icon className="[&>path]:text-white" glyph={glyph} />;
};

export const Button: React.FC<Props> = ({
  icon,
  children,
  navigate,
  variant,
  ...props
}) => {
  const history = useHistory();

  if (navigate) {
    props.onClick = (): void => history.push(navigate);
  }

  return (
    <button
      className={`rounded-sm	text-white p-1 text-xs ${variantToColorClass[variant]}`}
      type="button"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {icon !== undefined && (
        <ButtonIcon
          glyph={icon}
          // isAlone={Children.toArray(children).length === 0}
        />
      )}
      {icon && children ? ` ${children}` : children}
    </button>
  );
};
