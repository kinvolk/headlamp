# headlamp

![Version: 0.1.0](https://img.shields.io/badge/Version-0.1.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 0.4.0](https://img.shields.io/badge/AppVersion-0.4.0-informational?style=flat-square)

Headlamp is an easy-to-use and extensible Kubernetes web UI.

**Homepage:** <https://github.com/kinvolk/headlamp/tree/main/deploy/helm>

## TL;DR

```console
$ helm repo add headlamp https://kinvolk.github.io/headlamp/
$ helm install my-headlamp nebraska/headlamp
```

## Maintainers

| Name | Email | Url |
| ---- | ------ | --- |
| kinvolk |  | https://kinvolk.io/ |

## Source Code

* <https://github.com/kinvolk/headlamp>
* <https://kinvolk.io/>

### Headlamp parameters

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| affinity | object | `{}` | Affinity settings for pod assignment	 |
| clusterRoleBinding.annotations | object | `{}` | Annotations to add to the cluster role binding |
| clusterRoleBinding.create | bool | `true` | Specified whether a cluster role binding should be created |
| fullnameOverride | string | `""` | Overrides the full name of the chart	 |
| image.pullPolicy | string | `"IfNotPresent"` | Image pull policy. One of Always, Never, IfNotPresent	 |
| image.registry | string | `"ghcr.io"` | Container image registry	 |
| image.repository | string | `"kinvolk/headlamp"` | Container image name	 |
| image.tag | string | `""` | Container image tag, If ""	uses appVersion in Chart.yaml |
| imagePullSecrets | list | `[]` | An optional list of references to secrets in the same namespace to use for pulling any of the images used	 |
| ingress.annotations | object | `{}` | Annotations for Ingress resource	 |
| ingress.enabled | bool | `false` | Enable ingress controller resource	 |
| ingress.hosts | list | `[]` |  |
| ingress.tls | list | `[]` |  |
| nameOverride | string | `""` | Overrides the name of the chart	 |
| nodeSelector | object | `{}` | Node labels for pod assignment	 |
| podAnnotations | object | `{}` | Annotations to add to the pod |
| podSecurityContext | object | `{}` | Headlamp pods' Security Context	 |
| replicaCount | int | `1` | Number of desired pods |
| resources | object | `{}` | CPU/Memory resource requests/limits	 |
| securityContext | object | `{}` | Headlamp containers Security Context |
| service.port | int | `80` | Kubernetes Service port	 |
| service.type | string | `"ClusterIP"` | Kubernetes Service type	 |
| serviceAccount.annotations | object | `{}` | Annotations to add to the service account |
| serviceAccount.create | bool | `true` | Specifies whether a service account should be created |
| serviceAccount.name | string | `""` | The name of the service account to use.(If not set and create is true, a name is generated using the fullname template) |
| tolerations | list | `[]` | Toleration labels for pod assignment	 |

### Headlamp Configuration

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| config.baseURL | string | `nil` | base url path at which headlamp should run |
| config.oidc.clientID | string | `nil` | OIDC client ID |
| config.oidc.clientSecret | string | `nil` | OIDC client secret |
| config.oidc.issuerURL | string | `nil` | OIDC issuer URL |
| config.oidc.scopes | string | `nil` | OIDC scopes to be used |
