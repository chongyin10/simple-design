import React, { useState, useEffect, useRef } from 'react';
import { AnchorProps, AnchorLinkProps, AnchorItem } from './types';
import './Anchor.css';

const AnchorLink: React.FC<AnchorLinkProps> = () => {
  // 这个组件只是用来作为占位符，实际不渲染任何内容
  // 由父组件 Anchor 来解析这些组件并构建链接结构
  return null;
};

const Anchor: React.FC<AnchorProps> & { Link: React.FC<AnchorLinkProps> } = ({
  className,
  style,
  children,
  offsetTop = 0,
  affix = true,
  bounds = 5,
  getContainer = () => window.document.documentElement,
  onChange,
}) => {
  const [activeLink, setActiveLink] = useState<string>('');
  const [links, setLinks] = useState<AnchorItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollListenerRef = useRef<(() => void) | null>(null);
  const activeLinkRef = useRef<string>(''); // 使用ref来跟踪最新的activeLink
  const isUserClickingRef = useRef<boolean>(false); // 标记用户是否正在点击锚点

  // 同步activeLink到ref
  useEffect(() => {
    activeLinkRef.current = activeLink;
  }, [activeLink]);

  const extractLinks = (children: React.ReactNode) => {
    const extractedLinks: AnchorItem[] = [];

    const traverse = (child: React.ReactNode) => {
      if (!React.isValidElement(child)) return;

      const element = child as React.ReactElement<any>;
      
      if (element.type === AnchorLink && element.props.href && element.props.title) {
        extractedLinks.push({
          href: element.props.href,
          title: element.props.title,
          top: 0,
        });
      }

      if ('children' in element.props && element.props.children) {
        const childrenToTraverse = element.props.children;
        if (Array.isArray(childrenToTraverse)) {
          childrenToTraverse.forEach(traverse);
        } else {
          traverse(childrenToTraverse);
        }
      }
    };

    if (Array.isArray(children)) {
      children.forEach(traverse);
    } else {
      traverse(children);
    }

    return extractedLinks;
  };

  const updateLinkPositions = () => {
    const container = getContainer();
    const isWindowContainer = container === window.document.documentElement || container === document.body;
    let hasChanged = false;
    const newLinks = links.map((link) => {
      const targetElement = document.querySelector(link.href) as HTMLElement | null;
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        let newTop = 0;

        if (isWindowContainer) {
          newTop = rect.top + window.scrollY - offsetTop;
        } else {
          const containerRect = container.getBoundingClientRect();
          newTop = rect.top - containerRect.top + container.scrollTop - offsetTop;
        }

        if (Math.abs(newTop - link.top) > 1) {
          hasChanged = true;
          return {
            ...link,
            top: newTop,
          };
        }
      }
      return link;
    });
    if (hasChanged) {
      setLinks(newLinks);
    }
  };

  const handleScroll = () => {
    if (isUserClickingRef.current || links.length === 0) {
      return;
    }

    const container = getContainer();
    const isWindowContainer = container === window.document.documentElement || container === document.body;
    const scrollTop = isWindowContainer ? window.scrollY : container.scrollTop;
    const currentScroll = scrollTop + offsetTop + bounds;

    let nextActive = '';
    const sortedLinks = [...links].sort((a, b) => a.top - b.top);
    for (let i = 0; i < sortedLinks.length; i += 1) {
      if (currentScroll >= sortedLinks[i].top) {
        nextActive = sortedLinks[i].href;
      } else {
        break;
      }
    }

    if (nextActive !== activeLinkRef.current) {
      setActiveLink(nextActive);
      onChange?.(nextActive);
    }
  };

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href) as HTMLElement;
    if (targetElement) {
      const container = getContainer();
      
      // 标记用户正在点击锚点
      isUserClickingRef.current = true;
      console.log('开始点击锚点，设置isUserClickingRef为true');
      
      // 立即更新激活链接状态，提供即时反馈
      setActiveLink(href);
      
      // 确保onChange回调传递正确的href值
      if (onChange) {
        console.log('点击锚点，触发onChange:', href);
        onChange(href);
      }
      
      // 执行滚动
      setTimeout(() => {
        if (container !== window.document.documentElement && container !== document.body) {
          // 对于自定义容器，计算相对于容器的滚动位置
          const containerRect = container.getBoundingClientRect();
          const targetRect = targetElement.getBoundingClientRect();
          const targetOffsetTop = targetRect.top - containerRect.top + container.scrollTop;
          const finalTop = targetOffsetTop - offsetTop;
          
          if (container && typeof (container as HTMLElement).scrollTo === 'function') {
            const htmlContainer = container as HTMLElement;
            htmlContainer.scrollTo({
              top: finalTop,
              behavior: 'smooth',
            });
          }
        } else {
          // 对于全局滚动，直接滚动到目标位置
          const targetRect = targetElement.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const finalTop = targetRect.top + scrollTop - offsetTop;
          
          window.scrollTo({
            top: finalTop,
            behavior: 'smooth',
          });
        }
        
        // 滚动完成后，延迟清除点击标记，允许滚动检测重新工作
        setTimeout(() => {
          isUserClickingRef.current = false;
          console.log('滚动完成，清除isUserClickingRef标记');
        }, 800); // 等待滚动动画完全完成
        
      }, 0); // 使用0ms延迟，在下一个事件循环中执行滚动
    }
  };

  useEffect(() => {
    const initialLinks = extractLinks(children);
    setLinks(initialLinks);
  }, [children]);

  useEffect(() => {
    updateLinkPositions();
    handleScroll();

    const container = getContainer();
    scrollListenerRef.current = () => {
      handleScroll();
    };
    container.addEventListener('scroll', scrollListenerRef.current);

    const resizeListener = () => {
      updateLinkPositions();
      handleScroll();
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      if (scrollListenerRef.current) {
        container.removeEventListener('scroll', scrollListenerRef.current);
      }
      window.removeEventListener('resize', resizeListener);
    };
  }, [links, offsetTop, bounds, getContainer, onChange]);

  const renderLinks = () => {
    return links.map((link) => (
      <li
        key={link.href}
        className={`idp-anchor-link ${activeLink === link.href ? 'idp-anchor-link-active' : ''}`}
      >
        <a
          href={link.href}
          onClick={(e) => handleClick(e, link.href)}
          className="idp-anchor-link-a"
        >
          {link.title}
        </a>
      </li>
    ));
  };

  const containerClasses = `idp-anchor ${className || ''} ${affix ? 'idp-anchor-affix' : ''}`;

  return (
    <div ref={containerRef} className={containerClasses} style={style}>
      <ul className="idp-anchor-list">
        {renderLinks()}
      </ul>
    </div>
  );
};

Anchor.Link = AnchorLink;

export default Anchor;
