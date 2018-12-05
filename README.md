# Pin dependencies

This package allows you to pin dependencies in your npm or yarn packages.

```bash
yarn add pin-packages
```

**Use it with npx**

```bash
npx pin-packages # [...fileGlob] [...flags]
```
**cli commands**

-    **pin-dependencies**: main cli command
-    **pin**: alias

**flags**

-    **--dev**: pin devDependencies
-    **--peer**: pin peerDependencies
-    **--all**: pin all dependencies
-    **--yarn**: use yarn instead of npm

**Pin dependencies**

```bash
pin
```

**Use yarn**

```bash
pin --yarn
```

**Pin devDependencies**

```bash
pin --dev
```

**Pin peerDependencies**

```bash
pin --peer
```

**Include nested packages**

```bash
pin **/package.json --all
```

**Mix it up**

```bash
pin package.json {src,packages}/**/package.json --dev --peer --yarn
```
