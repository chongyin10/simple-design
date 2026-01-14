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
    let hasChanged = false;
    const newLinks = links.map((link) => {
      const targetElement = document.querySelector(link.href);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        let scrollPosition = 0;
        
        // 安全获取滚动位置
        if (container === window.document.documentElement || container === document.body) {
          scrollPosition = window.scrollY;
        } else if (container && 'scrollTop' in container) {
          scrollPosition = container.scrollTop;
        } else {
          scrollPosition = window.scrollY;
        }
        
        const newTop = rect.top + scrollPosition - offsetTop;
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
    // 如果用户正在点击锚点，暂时禁用滚动检测
    if (isUserClickingRef.current) {
      console.log('用户正在点击锚点，跳过滚动检测');
      return;
    }
    
    console.log('当前滚动位置:', activeLinkRef.current);
    // 只有当有选中锚点时，检查其是否在可视区域内
    const currentActiveLink = activeLinkRef.current;
    if (!currentActiveLink) {
      return;
    }
    
    const container = getContainer();
    let containerHeight = 0;
    
    // 安全获取容器高度
    if (container === window.document.documentElement || container === document.body) {
      containerHeight = window.innerHeight;
    } else if (container && 'clientHeight' in container) {
      containerHeight = (container as HTMLElement).clientHeight;
    } else {
      containerHeight = window.innerHeight;
    }

    // 找到当前选中的锚点对应的目标元素
    const targetElement = document.querySelector(currentActiveLink) as HTMLElement;
    if (!targetElement) {
      return;
    }

    // 检查目标元素是否在可视区域内
    // 使用更宽松的检测条件：只要元素的一部分在可视区域内就认为是可见的
    const targetRect = targetElement.getBoundingClientRect();
    console.log('目标元素位置:', targetRect);
    const isInViewport = (
      targetRect.top < containerHeight &&  // 元素顶部在容器底部之上
      targetRect.bottom > 0 &&             // 元素底部在容器顶部之下
      targetRect.left < (container === window.document.documentElement || container === document.body ? window.innerWidth : (container as HTMLElement).clientWidth) &&
      targetRect.right > 0
    );

    // 调试信息：输出检测结果
    console.log('当前选中锚点:', currentActiveLink);
    console.log('目标元素位置:', {
      top: targetRect.top,
      bottom: targetRect.bottom,
      containerHeight: containerHeight,
      isInViewport: isInViewport
    });

    // 如果选中锚点不在可视区域内，取消选中状态
    if (!isInViewport) {
      console.log('取消选中状态:', currentActiveLink);
      setActiveLink('');
      onChange?.('');
    } else {
      console.log('保持选中状态:', currentActiveLink);
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
