---
title: "Module: lib/k8s"
linkTitle: "lib/k8s"
slug: "lib_k8s"
---

## Variables

### ResourceClasses

• `Const` **ResourceClasses**: `Object`

#### Index signature

▪ [className: `string`]: `KubeObject`

#### Defined in

lib/k8s/index.ts:71

## Functions

### getVersion

▸ **getVersion**(): `Promise`<`StringDict`\>

#### Returns

`Promise`<`StringDict`\>

#### Defined in

lib/k8s/index.ts:143

___

### useCluster

▸ **useCluster**(): ``null`` \| `string`

#### Returns

``null`` \| `string`

#### Defined in

lib/k8s/index.ts:126

___

### useClustersConf

▸ **useClustersConf**(): `ConfigState`[``"clusters"``]

#### Returns

`ConfigState`[``"clusters"``]

#### Defined in

lib/k8s/index.ts:78

___

### useConnectApi

▸ **useConnectApi**(...`apiCalls`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...apiCalls` | () => `CancellablePromise`[] |

#### Returns

`void`

#### Defined in

lib/k8s/index.ts:149
