---
title: "Module: lib/util"
linkTitle: "lib/util"
slug: "lib_util"
---

## Interfaces

- [FilterState](../interfaces/lib_util.FilterState.md)

## Variables

### CLUSTER\_ACTION\_GRACE\_PERIOD

• `Const` **CLUSTER\_ACTION\_GRACE\_PERIOD**: ``5000``

#### Defined in

lib/util.ts:17

## Functions

### filterResource

▸ **filterResource**(`item`, `filter`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `KubeObjectInterface` |
| `filter` | [`FilterState`](../interfaces/lib_util.FilterState.md) |

#### Returns

`boolean`

#### Defined in

lib/util.ts:84

___

### getCluster

▸ **getCluster**(): `string` \| ``null``

#### Returns

`string` \| ``null``

#### Defined in

lib/util.ts:119

___

### getClusterPrefixedPath

▸ **getClusterPrefixedPath**(`path?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path?` | `string` \| ``null`` |

#### Returns

`string`

#### Defined in

lib/util.ts:111

___

### getPercentStr

▸ **getPercentStr**(`value`, `total`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `total` | `number` |

#### Returns

``null`` \| `string`

#### Defined in

lib/util.ts:33

___

### getReadyReplicas

▸ **getReadyReplicas**(`item`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `Workload` |

#### Returns

`any`

#### Defined in

lib/util.ts:42

___

### getResourceMetrics

▸ **getResourceMetrics**(`item`, `metrics`, `resourceType`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `Node` |
| `metrics` | `KubeMetrics`[] |
| `resourceType` | ``"cpu"`` \| ``"memory"`` |

#### Returns

`any`[]

#### Defined in

lib/util.ts:60

___

### getResourceStr

▸ **getResourceStr**(`value`, `resourceType`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `resourceType` | ``"cpu"`` \| ``"memory"`` |

#### Returns

`string`

#### Defined in

lib/util.ts:50

___

### getTotalReplicas

▸ **getTotalReplicas**(`item`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `Workload` |

#### Returns

`any`

#### Defined in

lib/util.ts:46

___

### localeDate

▸ **localeDate**(`date`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `DateParam` |

#### Returns

`string`

#### Defined in

lib/util.ts:25

___

### timeAgo

▸ **timeAgo**(`date`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `DateParam` |

#### Returns

`string`

#### Defined in

lib/util.ts:21

___

### useErrorState

▸ **useErrorState**(`dependentSetter?`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `dependentSetter?` | (...`args`: `any`) => `void` |

#### Returns

`any`[]

#### Defined in

lib/util.ts:131

___

### useFilterFunc

▸ **useFilterFunc**(): (`item`: `KubeObjectInterface`) => `boolean`

#### Returns

`fn`

▸ (`item`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `KubeObjectInterface` |

##### Returns

`boolean`

#### Defined in

lib/util.ts:106
