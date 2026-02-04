import React, { Component } from 'react';
import styled from 'styled-components';
import { version } from 'antd';
import { originTargetUrl } from '../config/rescriptsrc';

function Theme({ moduleKey = 'team', children }) {

    const antdVersion = Number(version.split('.')[0]) > 4;

    const { fontSize, color, background, fontHoverColor,
        logoWidth, leftIconSize, rightIconSize,
        leftMenuHoverColor } = window?.globalConfig?.theme[window?.globalConfig?.theme.enable];
    const module = window?.globalConfig?.header?.[moduleKey];
    const headerHeight = '40px';
    const logoImage = process.env.NODE_ENV == 'development' ? `${originTargetUrl}${module?.path}` : module?.path;
    window.globalConfig.defaultHeaderModule = module;
    window.globalConfig.defaultModulePath = originTargetUrl;

    const StyledButton = styled.div`
    .Navigation-theme, .ant-layout-header {
        font-size: ${fontSize} !important;
        color: ${color} !important;
        background: ${background} !important;
        margin-bottom: 1px;
        border-bottom: 1px solid #d6dee6;
        padding: 0px;
        height: ${headerHeight};
        width: 100%;
        display: flex;
        align-items: center
    }
    .Navigation-theme {
        padding: 0px 20px;
    }
    .Navigation-left-theme {
        width: 45%;
        height: ${headerHeight};
    }
    .Navigation-plugins {
        width: 195px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 10px;
        color: gainsboro;
    }
    .Navigation-right-theme {
        flex: 1;
        height: ${headerHeight};
    }
    .ant-col {
        padding-left: 4px !important;
        padding-right: 4px !important;
    }
    .Navigation-logo {
        background-image: url(${logoImage});
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        height: 100%;
        width: ${logoWidth};
        margin-right: 5px
    }
    .Navigation-title {
        height: ${headerHeight};
        font-size: 15px !important;
        color: ${color} !important;
        flex: 1;
    }
    .Navigation-left-logo {
        width: ${leftIconSize};
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        margin-right: 3px;
        height: 100%;
    }
    .Navigation-r-svg {
        width: ${rightIconSize};
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        margin-right: 3px;
    }
    .Navigation-r-divider {
        background: ${color} !important;
        height: 50%;
        margin: 0px 5px;
    }
    .Navigation-popover, .Navigation-r-li {
        display: flex;
        height: ${headerHeight} !important;
        align-items: center;
        height: 100%;
    }
    .Navigation-display-divider {
        height: ${headerHeight} !important;
        line-height: ${headerHeight} !important;
    }
    .Navigation-card {
        align-items: center;
        height: 100%;
    }
    .Navigation-card, .Navigation-r-title {
        transition: all .3s
    }
    .Navigation-r-title{
        height: ${headerHeight} !important;
        line-height: ${headerHeight} !important;
    }
    .Navigation-card:hover, .Navigation-r-title:hover {
        color: ${fontHoverColor} !important;
    }
    .ant-popover-inner {
        background: ${background} !important;
        padding: 0px 20px;
        border-radius: 8px;
    }
    .ant-popover-inner-content {
        color: ${color} !important;
        padding: ${antdVersion ? 'revert-layer' : '0px'}
    }
    .idp-content-title {
        position: relative;
    }
    .idp-content-title::after {
        position: absolute;
        content: "";
        height: 30px;
        width: 2px;
        background: #0066ff;
        left: 0;
    }
    .idp-content-title, .idp-content-color {
        transition: all .3s
    }
    .idp-content-title:hover, .idp-content-color:hover {
        color: ${leftMenuHoverColor};
    }
    .ant-popover-arrow, .ant-popover-arrow::before, .ant-dropdown-arrow, .ant-dropdown-arrow::before {
        display: none !important;;
    }
    .ant-popover-content {
        min-width: 150px;
    }
    .ant-popover {
        top: ${antdVersion ? '40px' : '25px'} !important;
    }
    .ant-dropdown-trigger {
        height: 100%;
    }
    .ant-dropdown .ant-menu-vertical {
        color: ${color} !important;
        background: ${background} !important;
    }
    .ant-dropdown .ant-menu-vertical > li {
        color: ${color} !important;
    }
    .ant-dropdown .ant-menu {
        box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05) !important;
    }
    .ant-menu-submenu-placement-rightTop .ant-menu-vertical {
        margin-left: -2px !important;
    }
    .Navigation-left-title {
        max-width: 80px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        height: ${headerHeight} !important;
        line-height: ${headerHeight} !important;
    }
    .ant-dropdown-open {
        color: ${color} !important;
    }
    .Navigation-dropdown, .Navigation-logo-dropdown {
        top: 30px !important;
    }
    .Navigation-downMenu {
        margin: 0px;
        line-height: 30px !important;
        height: 30px !important;
        font-size: 13px !important;
    }
    .ant-dropdown .ant-menu-vertical>li {
        margin: 0px;
    }
    .ant-menu-item-only-child {
        height: 35px !important;
        line-height: 35px !important;
    }
    .ant-menu-title-content:hover {
        color: ${fontHoverColor} !important;
    }
    .header-container .ant-dropdown-trigger {
        display: flex;
    }
  `;
    return <StyledButton>{children}</StyledButton>
}

export default Theme