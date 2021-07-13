---
title: "Class: default"
linkTitle: "default"
slug: "plugin_registry.default"
---

[plugin/registry](../modules/plugin_registry.md).default

## Constructors

### constructor

• **new default**()

## Methods

### registerAppBarAction

▸ **registerAppBarAction**(`actionName`, `actionFunc`): `void`

Add a component into the app bar (at the top of the app).

**`example`**

```JSX
register.registerAppBarAction('monitor', () => <MonitorLink /> );
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionName` | `string` | a unique name for it |
| `actionFunc` | (...`args`: `any`[]) => ``null`` \| `Element` | a function that returns your component |

#### Returns

`void`

#### Defined in

plugin/registry.tsx:101

___

### registerDetailsViewHeaderAction

▸ **registerDetailsViewHeaderAction**(`actionName`, `actionFunc`): `void`

Add a component into the details view header.

**`example`**

```JSX
register.registerDetailsViewHeaderAction('traces', (props) =>
  <TraceIcon {...props} />
);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionName` | `string` | a unique name for it |
| `actionFunc` | (...`args`: `any`[]) => ``null`` \| `Element` | a function that returns your component                     with props to pass into it. |

#### Returns

`void`

#### Defined in

plugin/registry.tsx:82

___

### registerRoute

▸ **registerRoute**(`routeSpec`): `void`

Add a Route for a component.

**`see`** [Route examples](https://github.com/kinvolk/headlamp/blob/main/frontend/src/lib/router.tsx)

**`example`**

```JSX
// Add a route that will display the given component and select
// the "traces" sidebar item.
register.registerRoute({
  path: '/traces',
  sidebar: 'traces',
  component: () => <TraceList />
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `routeSpec` | `Route` | details of URL, highlighted sidebar and component to use. |

#### Returns

`void`

#### Defined in

plugin/registry.tsx:63

___

### registerSidebarItem

▸ **registerSidebarItem**(`parentName`, `itemName`, `itemLabel`, `url`, `opts?`): `void`

Add a SidebarItem.

**`example`**

```javascript
registerSidebarItem('cluster', 'traces', 'Traces', '/traces');
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `parentName` | `string` | `undefined` | the name of the parent SidebarItem. |
| `itemName` | `string` | `undefined` | name of this SidebarItem. |
| `itemLabel` | `string` | `undefined` | label to display. |
| `url` | `string` | `undefined` | the URL to go to, when this item is followed. |
| `opts` | `Object` | `undefined` | ... todo |
| `opts.useClusterURL` | `boolean` | `true` | - |

#### Returns

`void`

#### Defined in

plugin/registry.tsx:26
