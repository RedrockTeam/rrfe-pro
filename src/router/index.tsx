/* eslint-disable @typescript-eslint/no-explicit-any */
import { set } from 'lodash-es';
import { ComponentType, lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

/**
 * 根据 pages 目录生成路径配置
 */

function generatePathConfig(): Record<string, any> {
  // 扫描 src/pages 下的所有具有路由文件
  const modules = import.meta.glob('/src/app/**/*.{ts,tsx}');

  const pathConfig = {};
  Object.keys(modules).forEach((filePath) => {
    const routePath = filePath
      // 去除 src/pages 不相关的字符
      .replace('/src/app/', '')
      // 去除文件名后缀
      .replace(/.tsx?/, '')
      // 以目录分隔
      .split('/');
    // 使用 lodash.set 合并为一个对象
    set(pathConfig, routePath, modules[filePath]);
  });
  return pathConfig;
}
function wrapSuspense(importer: () => Promise<{ default: ComponentType }>) {
  if (!importer) {
    return undefined;
  }
  // 使用 React.lazy 包裹 () => import() 语法
  const Component = lazy(importer);
  // 结合 Suspense，这里可以自定义 loading 组件
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
}

function mapPathConfigToRoute(cfg: Record<string, any>): RouteObject[] {
  // route 的子节点为数组
  return Object.entries(cfg).map(([routePath, child]) => {
    // () => import() 语法判断
    if (typeof child === 'function') {
      // 等于 index 则映射为当前根路由
      const isIndex = routePath === 'page';
      return {
        index: isIndex,
        path: isIndex ? '' : routePath,
        // 转换为组件
        element: wrapSuspense(child),
      };
    }
    // 否则为目录，则查找下一层级
    const { layout, ...rest } = child;
    return {
      path: routePath,
      // layout 处理
      element: wrapSuspense(layout),
      // 递归 children
      children: mapPathConfigToRoute(rest),
    };
  });
}

function generateRouteConfig(): RouteObject[] {
  const { layout, ...pathConfig } = generatePathConfig();
  // 提取跟路由的 layout
  return [
    {
      path: '/',
      element: wrapSuspense(layout),
      children: mapPathConfigToRoute(pathConfig),
    },
  ];
}

// eslint-disable-next-line react-refresh/only-export-components
export default generateRouteConfig();
