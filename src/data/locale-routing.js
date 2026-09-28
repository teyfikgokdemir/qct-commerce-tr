import { localeParityClusters } from './locale-parity.js';

export function getLocaleSwitchTargets(currentPath) {
  const cluster = localeParityClusters.find(
    (item) => item.tr === currentPath || item.en === currentPath || item.az === currentPath
  );
  return cluster ? { tr: cluster.tr, en: cluster.en, az: cluster.az } : null;
}
