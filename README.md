
# React Native Boilerplate  

[![React Native](https://img.shields.io/badge/React%20Native-0.76.1-blue)](https://reactnative.dev/) [![Ethers](https://img.shields.io/badge/ethers-6.13.4-red)](https://docs.ethers.org/v6/) [![Web3Auth](https://img.shields.io/badge/Web3Auth-9.4.5-teal)](https://web3auth.io/docs/sdk/pnp/web/modal) [![ReduxPersist](https://img.shields.io/badge/Redux_Toolkit-6.0.0-violet)](https://redux-toolkit.js.org/introduction/getting-started)


A highly customizable React Native boilerplate based on **TheCodingMachine** structure, updated with additional features and improvements to suit modern development needs.  

## Features 

- **Modern Development Setup**: Optimized for React Native 0.76+ with the New Architecture.
- **Cross-Platform Ready**: Works seamlessly on Web, iOS and Android.
- **Well-Organized Folder Structure** for scalability.
- **Redux Toolkit** for state management.
- **User Management** using Web3Auth SDK.
- **API/GraphQL Integration** using Ky.
- **Custom Hooks** for common patterns.
- **Preconfigured Linting and Formatting**: ESLint, Prettier, and EditorConfig.
- **Environment Management**: Configured `.env.${environment}` for multi-environment support.

## Table of Contents  

- [Getting Started](#getting-started)  
- [Folder Structure](#folder-structure)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)
- [Web3Auth Integration](#web3auth-integration)
- [Environment Setup](#environment-setup)  
- [Scripts](#scripts)  
- [Customization](#customization)  
- [Contributing](#contributing)  
- [Guidelines](#guidelines) 
- [License](#license)  

## Getting Started  

Follow these instructions to set up and run the project on your local machine.  

### Folder Structure

```markdown
rn-boilerplate/  
├── android/                # Android native code
├── ios/                    # iOS native code
├── src/                    # Main application source code  
│   ├── components/         # Reusable UI components (follows Atomic Design principles)  
│   ├── constants/          # Application-wide constants
│   ├── contracts/          # Blockchain contracts
│   │   ├── abis/           # Contract ABIs (Application Binary Interfaces)  
│   │   ├── typechain/      # Auto-generated TypeScript factories for contract interactions
│   ├── enums/              # TypeScript enums for standardized values
│   ├── helpers/            # Utility functions and helpers
│   ├── hooks/              # Custom React hooks for encapsulating logic
│   ├── interfaces/         # TypeScript interfaces and types  
│   ├── navigation/         # React Navigation setup and navigation configuration  
│   ├── screens/            # Application screens and views  
│   ├── services/           # API, GraphQL, and other external service integrations  
│   ├── store/              # Redux Toolkit store, slices, and middleware  
│   ├── theme/              # Global styles, themes, and design system  
│   └── App.tsx             # Application entry point and main component  
├── .env.example            # Example environment file for configuration reference  
├── .env.development        # Environment configuration for development  
├── .env.staging            # Environment configuration for staging  
├── .env.production         # Environment configuration for production  
├── index.web.js            # Entry point for web applications (React Native Web)  
├── index.js                # Entry point for mobile applications  
├── injections.ts           # Dependency injection and initialization logic  
├── webpack.config.js       # Webpack configuration for bundling and web optimizations  
├── package.json            # Project dependencies, scripts, and metadata  
├── ...                     # configs, common files etc.
```

### Prerequisites  

- **Node.js** >= 18.x
- **Yarn**
- **React Native CLI**
- **Xcode** (for iOS development)
- **Android Studio** (for Android development)

### Web3Auth Integration

1. Obtain a Client ID from [Web3Auth](https://web3auth.io/).
2. Update the appropriate `.env` files with your `WEB3AUTH_CLIENT_ID`.
3. Use the `useWallet` hook in the application to handle user login/logout and wallet interactions.


### Installation  

1. Clone the repository:
   
   ```bash
   git clone https://github.com/UsmanAleh/rn-boilerplate.git
   cd rn-boilerplate
   ```
2. Install dependencies:
   
   ```bash
   yarn
   ```
3. Run the project:

- Web
  ```bash
  yarn web:development
  ```
- iOS
  ```bash
  yarn pod-install && yarn ios
   ```
- Android
  ```bash
  yarn android
  ```
   
### Environment Setup

1. Run the command to create environment-specific files.
	```bash
	for env in development staging production; do cp .env.example .env.$env; done
	```
2. Add environment-specific variables.

### Scripts

| Command               | Description                                                           |
|-----------------------|-----------------------------------------------------------------------|
| `yarn start`          | Starts the Metro server for React Native local development            |
| `yarn android`        | Builds and runs the Android app on a connected device/emulator        |
| `yarn pod-install`    | Installs iOS dependencies by running `pod install` in the iOS folder  |
| `yarn ios`            | Builds and runs the iOS app on the simulator                          |
| `yarn web:development`| Serves the web version with development settings                      |
| `yarn web:staging`    | Serves the web version with staging environment settings              |
| `yarn web:production` | Serves the web version with production environment settings           |
| `yarn clean`          | Clears caches and node_modules                                        |
| `yarn typechain:build`| Generates TypeScript factories from smart contract ABIs               |
| `yarn lint`           | Runs ESLint to check and fix code style issues                        |


## Customization

- **General Guidelines**: Follow existing code conventions and patterns to ensure maintainable and scalable updates.
- **Add Navigation**: Update or create navigators and screens in [`src/navigation`](./src/navigation).
- **State Management**: Introduce new slices, actions, or reducers under [`src/store`](./src/store) to expand state management.
- **Themes and Styles**: Adjust global themes and styles in [`src/theme`](./src/theme) to maintain a consistent UI/UX.
- **Contracts**: Place new contract ABIs in [`src/contracts/abis`](./src/contracts/abis) and then run `yarn typechain:build` to regenerate TypeScript types.

### GraphQL Queries

Use the `GraphClient` utility class.

**Example Query Usage:**
```typescript
import { GraphClient } from  '@/services/Graph/GraphClient';
import { USER_BY_ID_QUERY } from  '@/services/Graph/Query/users.query';

export async function fetchUser(id: string) {
  const client = new GraphClient();
  // or
  // const client = new GraphClient(GraphNodeKeys.BASE_URL);
  // const client = new GraphClient('https://example.com/graphql');
  const response = await client.get('users');
  // ...handle the response.
}
```
## Contributing

> Please follow the [Guidelines](#guidelines) for contributions.

Please follow these steps:
1. Clone the repository.
3. Create a new branch: `git checkout -b WL8-XXXX-your-ticket-title`
5. Commit your changes: `git commit -m 'feat(WL8-XXXX): Add new feature'`
6. Push the branch: `git push origin WL8-XXXX-your-ticket-title`
7. Submit a pull request to the development branch.

### Guidelines 

Follow existing code conventions and patterns to ensure maintainable and scalable updates

#### Handling Secrets and Sensitive Data

- Store API keys, client IDs, and other sensitive values in `.env` files.
- Never commit `.env` files to version control. Use `.env.example` for reference.
- For production, use secure environment management (e.g., CI/CD pipelines with secret injection).
---
#### Branches

Format: `<ticket-id>-<ticket-title>`

Examples:
```bash
git checkout -b WL8-1043-web3auth-integration
```
---
#### Semantic Commit Messages

Format: `<type>(<ticket-id>): <subject>`

Examples:

```
feat(WL8-XXXX): add web3auth sdk, useWallet hook and configuration
```

Types:
-   `feat`: (new feature for the user, not a new feature for build script)
-   `fix`: (bug fix for the user, not a fix to a build script)
-   `docs`: (changes to the documentation)
-   `style`: (formatting, missing semi colons, etc; no production code change)
-   `refactor`: (refactoring production code, eg. renaming a variable)
-   `test`: (adding missing tests, refactoring tests; no production code change)
-   `chore`: (updating grunt tasks etc; no production code change)

## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for details.

