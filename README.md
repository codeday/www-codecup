# www-codecup
New CodeCup website design, built off graphctf

## Config
All configuration is done through environment variables or [`.env.local`](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables) files (Using the same variable names).

Name | Description
--- | ---
`AUTH0_CLIENT_ID` | Auth0 OAuth Client ID
`AUTH0_CLIENT_SECRET` | Auth0 OAuth Client Secret
`AUTH0_DOMAIN` | Auth0 Organization Endpoint
`NEXTAUTH_SECRET` | [NextAuth global secret](https://next-auth.js.org/configuration/options#secret)
`NEXTAUTH_URL` | [NextAuth site URL](https://next-auth.js.org/configuration/options#nextauth_url)
`GRAPHCTF_AUDIENCE` | GraphCTF exchange token audience
`GRAPHCTF_SECRET` | GraphCTF exchange token secret
`GRAPHCTF_URL` | Fully-qualified URL of the GraphCTF server

## Production

### Building
1. Build the Docker image:
```bash
docker build -t codeday/www-codecup:latest .
```
2. Run the image:
```bash
docker run -d -p 3000:3000 --name www-codecup codeday/www-codecup:latest
```
3. Access the site at `http://[CONTAINER IP]` (Port 3000/HTTP)

## Development

### Git hooks
1. Copy all files from `.githooks` to `.git/hooks`:

Bash | Powershell
--- | ---
`cp $(find .githooks -type f \| grep -v -E "\.\w+$") .git/hooks` | `Copy-Item -Filter *. .githooks/* .git/hooks`

### Create a new component
1. Create the React component:
```bash
npx generate-react-cli component {Name}
```

### Create a new page
1. Create the React component:
```bash
npx generate-react-cli component {Name} --type=page
```
2. Add the route to [`routes.ts`](src/routes.ts)

### Serve for development
1. Start React with:
```bash
npm start
```

## Theming

### Colors
Shades and tints can be computed via [Shadowlord](https://noeldelgado.github.io/shadowlord) (Use `22%` different to calculate 9 values for [Chakra UI](https://chakra-ui.com/docs/theming/customize-theme#customizing-theme-tokens)). Everything should be dark mode by default.

Type | Chakra UI Color Property | Hex | Preview | Color Name
--- | --- | --- | --- | ---
Primary Color | `primary` | `#00a6e2` | ![Preview of #00a6e2](https://img.shields.io/badge/Primary-%2300a6e2-00a6e2?style=for-the-badge) | [Pantone P 115-7 C](https://encycolorpedia.com/00a6e2)
Secondary Color | `secondary` | `#00ff00` | ![Preview of #00ff00](https://img.shields.io/badge/Secondary-%2300ff00-00ff00?style=for-the-badge) | [Electric Green](https://encycolorpedia.com/00ff00)
Background Color | `gray.900` | `#171923` | ![Preview of #171923](https://img.shields.io/badge/Background-%23171923-171923?style=for-the-badge) | [Chakra UI Gray 900](https://chakra-ui.com/docs/theming/theme#gray)

### Typography
* Body, heading, mono: [`Source Code Pro`](https://fonts.google.com/specimen/Source+Code+Pro)
