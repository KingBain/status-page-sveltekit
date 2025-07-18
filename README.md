# ⬆️ Modified Upptime Status Page (SvelteKit Edition)

> **Note:** This repository is a **modified fork** loosely based on the [original Upptime static site generator](https://github.com/upptime/status-page). It’s been updated to use a modern web stack (SvelteKit, Vite, GitHub Actions, semantic-release) instead of the legacy Sapper setup.

This project still provides an embeddable, static status page for monitoring uptime, but with improved developer ergonomics, automated releases, and a streamlined build pipeline.

---

|        | Status                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build  | [![Node CI](https://github.com/KingBain/status-page-sveltekit/actions/workflows/release.yml/badge.svg)](https://github.com/KingBain/status-page-sveltekit/actions) [![Dependencies](https://img.shields.io/librariesio/github/KingBain/status-page-sveltekit)](https://libraries.io/github/KingBain/status-page-sveltekit) [![GitHub release (latest by date)](https://img.shields.io/github/v/release/KingBain/status-page-sveltekit)](https://github.com/KingBain/status-page-sveltekit/releases) |


---

## 🎁 Contributing

Contributions and feedback are welcome! This repository has diverged from the original Upptime project, so please:

1. Read our [Contributing Guidelines](https://github.com/KingBain/status-page-sveltekit/blob/main/CONTRIBUTING.md).
2. Follow our [Code of Conduct](https://github.com/KingBain/status-page-sveltekit/blob/main/CODE_OF_CONDUCT.md).
3. Open issues or pull requests on this repository for bugs and enhancements.

## 💻 Local Development

> **Tip:** This project includes a Dev Container definition for a consistent development environment. In VS Code, install the Remote Containers extension and select **Reopen in Container** (or run `Dev Containers: Reopen in Container` from the command palette).

1. **Install dependencies**

   ```bash
   npm ci
   ```

2. **Run in development mode**

   ```bash
   npm run dev
   ```

3. **Build for production**

   ```bash
   npm run build
   ```

4. **Preview the production build**

   ```bash
   npm run preview
   ```

## 🧪 Testing the Package

To try out this custom status page package, update your `.upptimerc.yml` configuration:

```yaml
customStatusWebsitePackage: "@kingbain/status-page-sveltekit"
```

Then configure and run the standard Upptime Site CI GitHub Action (for example, using `upptime/actions/site@v2`) in your CI workflow to regenerate the status page with this custom package.

## 🚀 Release & Deployment

* **Automated Releases:** We use `semantic-release` and GitHub Actions to bump versions, generate changelogs, publish to npm, and create GitHub Releases on every merge to `main`.
