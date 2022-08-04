module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    parserOptions: {
        project: "./tsconfig.json",
    },
    env: {
        node: true,
    },
    extends: [
        "airbnb",
        "airbnb-typescript",
    ],
    rules: {
        // 'React' must be in scope when using JSX 에러 지우기(Next.js)
        "react/react-in-jsx-scope": "off",
        // ts파일에서 tsx구문 허용(Next.js)
        "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }], //should add ".ts" if typescript project
    },
};
