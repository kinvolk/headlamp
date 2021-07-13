---
title: "Class: Plugin"
linkTitle: "Plugin"
slug: "plugin.Plugin"
---

[plugin](../modules/plugin.md).Plugin

Plugins should call registerPlugin(pluginId: string, pluginObj: Plugin) to register themselves.

They will have their initialize(register) method called at plugin initialization time.

## Constructors

### constructor

• **new Plugin**()

## Methods

### initialize

▸ `Abstract` **initialize**(`register`): `boolean`

initialize is called for each plugin with a Registry which gives the plugin methods for doing things.

**`see`** Registry

#### Parameters

| Name | Type |
| :------ | :------ |
| `register` | [`default`](plugin_registry.default.md) |

#### Returns

`boolean`

#### Defined in

plugin/index.tsx:86
