import { IconArrow } from '../icons/Icons'

/**
 * variant: 'primary' | 'ghost'
 * as: 'a' | 'button' (defaults to 'a' when href is given, else 'button')
 * showArrow: whether to render the trailing arrow icon
 */
export function Button({
  variant = 'primary',
  href,
  as,
  showArrow = false,
  className = '',
  children,
  type = 'button',
  ...rest
}) {
  const cls = `btn btn-${variant}${className ? ' ' + className : ''}`
  const Tag = as || (href ? 'a' : 'button')

  const content = (
    <>
      {children}
      {showArrow && <IconArrow />}
    </>
  )

  if (Tag === 'a') {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={cls} {...rest}>
      {content}
    </button>
  )
}
